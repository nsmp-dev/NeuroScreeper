// set up the role constants
global.PowerAttackerRole = new Role("power_attacker", "🔴⚔️", [ATTACK, TOUGH, MOVE, MOVE], 100, 12);

// add the role to the roles hash
global.ROLES[PowerAttackerRole.name] = PowerAttackerRole;

/**
 * PowerAttackerMemory class represents memory storage for specialized creeps that attack power banks.
 * It extends CreepMemory to store state information for power attackers working in squads.
 * @class PowerAttackerMemory
 * @extends CreepMemory
 */
class PowerAttackerMemory extends CreepMemory {
    /**
     * Creates a new PowerAttackerMemory instance for a creep specialized in attacking power banks.
     * @param {string} room_name - The identifier of the spawn room where this power attacker is created and operates from
     */
    constructor(room_name) {
        super(PowerAttackerRole.name, room_name);
    }
}

global.PowerAttackerMemory = PowerAttackerMemory;
/**
 * Specialized creep class for attacking power banks in foreign rooms. Works as part of a power collection squad,
 * coordinating with healers and carriers to efficiently harvest power from banks. Executes attack tasks while
 * following squad state machine transitions between searching, collecting and returning phases.
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
        } else if (squad.state == STATES.SEARCHING) {
            // if we are in the next room in the queue
            if (this.room.name == squad.highway_queue[0]) {
                // assign a new IdleTask
                this.memory.task = new IdleTask(this.room.name);
                // announce the IdleTask
                this.announceTask();
            } else {
                // assign a new MoveRoomTask
                this.memory.task = new MoveRoomTask(squad.highway_queue[0]);
                // announce the MoveRoomTask
                this.announceTask();
            }
            // if the power squad is collecting
        } else if (squad.state == STATES.COLLECTING) {
            // grab any power banks in the room
            let power_banks = this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_POWER_BANK}});
            // if any power banks were found
            if (power_banks.length > 0) {
                // assign a new attack task
                this.memory.task = new AttackTask(power_banks[0]);
                // announce the attack task
                this.announceTask();
            } else {
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            }
            // if the power squad is returning
        } else if (squad.state == STATES.RETURNING) {
            // if we are in the room we are returning to
            if (this.room.name == squad.return_room_name) {
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            } else {
                // assign a new MoveRoomTask
                this.memory.task = new MoveRoomTask(squad.return_room_name);
                // announce the MoveRoomTask
                this.announceTask();
            }
        }
    }
    // run the task
    neuro_task.run(this);
};