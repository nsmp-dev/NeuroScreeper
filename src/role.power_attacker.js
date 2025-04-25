// set up the role constants
global.PowerAttackerRole = new Role("power_attacker", "🔴⚔️", [ATTACK, TOUGH, MOVE, MOVE], 100, 12);

// add the role to the roles hash
global.ROLES[PowerAttackerRole.name] = PowerAttackerRole;

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
        super(PowerAttackerRole.name, room_name);
    }
}
global.PowerAttackerMemory = PowerAttackerMemory;
/**
 * power attacker that attacks power banks
 */
Creep.prototype.runPowerAttacker = function () {
    // if no task is assigned
    if (this.memory.task == null) {
        // grab the power squad this creep is assigned to
        let squad = this.getPowerSquad();
        // if the power squad is idle
        if (squad.state == STATES.IDLE) {
            // assign a new IdleTask
            this.memory.task = new IdleTask(this.memory.room_name);
            // announce the IdleTask
            this.announceTask();
        // if the power squad is searching
        }else if (squad.state == STATES.SEARCHING) {
            // if we are in the next room in the queue
            if (this.room.name == squad.highway_queue[0]) {
                // assign a new IdleTask
                this.memory.task = new IdleTask(this.room.name);
                // announce the IdleTask
                this.announceTask();
            }else{
                // assign a new MoveRoomTask
                this.memory.task = new MoveRoomTask(squad.highway_queue[0]);
                // announce the MoveRoomTask
                this.announceTask();
            }
        // if the power squad is collecting
        }else if (squad.state == STATES.COLLECTING) {
            // grab any power banks in the room
            let power_banks = this.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_POWER_BANK } });
            // if any power banks were found
            if (power_banks.length > 0) {
                // assign a new attack task
                this.memory.task = new AttackTask(power_banks[0]);
                // announce the attack task
                this.announceTask();
            }else{
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            }
        // if the power squad is returning
        }else if (squad.state == STATES.RETURNING) {
            // if we are in the room we are returning to
            if (this.room.name == squad.return_room_name) {
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            }else{
                // assign a new MoveRoomTask
                this.memory.task = new MoveRoomTask(squad.return_room_name);
                // announce the MoveRoomTask
                this.announceTask();
            }
        }
    }
    // run the task
    NeuroTask.run(this);
};