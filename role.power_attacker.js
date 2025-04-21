/**
 * Power Attacker name, body, and initializer
 * @constant {Object} POWER_ATTACKER
 */
global.POWER_ATTACKER = {
    // identifying string
    NAME: "power_attacker",
    // emoji for shorthand visuals
    EMOJI: "⚖️",
    // standard body build that can be multiplied arbitrarily to build larger creeps
    BODY: [ATTACK, TOUGH, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 12,
};
global.ROLES[POWER_ATTACKER.NAME] = POWER_ATTACKER;

/**
 * PowerAttackerMemory class, storing data for an attacker
 * @class PowerAttackerMemory
 */
class PowerAttackerMemory extends CreepMemory{
    /**
     * creates an PowerAttackerMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(POWER_ATTACKER.NAME, room_name);
    }
}
global.PowerAttackerMemory = PowerAttackerMemory;

Creep.prototype.runPowerAttacker = function () {
    if (this.memory.task == null) {
        let squad = this.getPowerSquad();
        if (squad.state == STATES.IDLE) {
            this.memory.task = new IdleTask(this.memory.room_name);
        }else{
            if (squad.state == STATES.SEARCHING) {
                if (this.room.name == squad.highway_queue[0]) {
                    this.memory.task = new IdleTask(this.room.name);
                }else{
                    this.memory.task = new MoveRoomTask(squad.highway_queue[0]);
                }
            }else if (squad.state == STATES.COLLECTING) {
                let power_banks = this.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_POWER_BANK } });
                if (power_banks.length > 0) {
                    this.memory.task = new AttackTask(power_banks[0]);
                }else{
                    this.memory.task = new IdleTask(this.room.name);
                }
            }if (squad.state == STATES.RETURNING) {
                if (this.room.name == squad.return_room_name) {
                    this.memory.task = new IdleTask(this.room.name);
                }else{
                    this.memory.task = new MoveRoomTask(squad.return_room_name);
                }
            }
        }
    }
    TaskRunner.run(this);
};