/**
 * Power Transporter name, body, and initializer
 * @constant {Object} POWER_TRANSPORTER
 */
global.POWER_TRANSPORTER = {
    // identifying string
    NAME: "power_transporter",
    // emoji for shorthand visuals
    EMOJI: "🔴🚛",
    // standard body build that can be multiplied arbitrarily to build larger creeps
    BODY: [CARRY, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[POWER_TRANSPORTER.NAME] = POWER_TRANSPORTER;

/**
 * PowerTransporterMemory class, storing data for an attacker
 * @class PowerTransporterMemory
 */
class PowerTransporterMemory extends CreepMemory{
    /**
     * creates an PowerTransporterMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(POWER_TRANSPORTER.NAME, room_name);
    }
}
global.PowerTransporterMemory = PowerTransporterMemory;

Creep.prototype.runPowerTransporter = function () {
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
                let power_piles = this.room.find(FIND_DROPPED_RESOURCES, { filter: { resourceType: RESOURCE_POWER } });
                if (power_piles.length > 0) {
                    let target = this.pos.findClosestByPath(power_piles);
                    this.memory.task = new GatherTask(target, RESOURCE_POWER);
                }else{
                    this.memory.task = new IdleTask(this.room.name)
                }
            }if (squad.state == STATES.RETURNING) {
                if (this.room.name == squad.return_room_name) {
                    this.memory.task = new DepositTask(this.room.storage, RESOURCE_POWER);
                }else{
                    this.memory.task = new MoveRoomTask(squad.return_room_name);
                }
            }
        }
    }
    TaskRunner.run(this);
};