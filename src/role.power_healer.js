// set up the role constants
global.PowerHealerRole = new Role("power_healer", "🔴⚕️", [HEAL, TOUGH, MOVE, MOVE], 360, 12);

// add the role to the roles hash
global.ROLES[PowerHealerRole.name] = PowerHealerRole;

/**
 * PowerHealerMemory class represents memory storage for specialized creeps that heal power attackers.
 * It extends CreepMemory to store state information for power healers working in squads.
 * @class PowerHealerMemory
 * @extends CreepMemory
 */
class PowerHealerMemory extends CreepMemory {
    /**
     * Creates a new PowerHealerMemory instance for a creep specialized in healing power squad members.
     * This healer is essential for maintaining the health of power attackers during power bank operations.
     * @param {string} room_name - The identifier of the spawn room where this power healer is created and operates from
     */
    constructor(room_name) {
        super(PowerHealerRole.name, room_name);
    }
}

global.PowerHealerMemory = PowerHealerMemory;
/**
 * Specialized creep behavior for healing members of power bank squads.
 * Follows squad state machine transitions and prioritizes healing damaged
 * squad members during power bank harvesting operations. Works in coordination
 * with power attackers to maintain squad sustainability.
 */
Creep.prototype.runPowerHealer = function () {
    // if no task is assigned
    if (this.memory.task == null) {
        // grab the power squad
        let squad = this.getPowerSquad();
        // if the power squad is idle
        if (squad.state == STATES.IDLE) {
            // assign a new idle task
            this.memory.task = new IdleTask(this.memory.room_name);
            // announce the idle task
            this.announceTask();
            // if the power squad is searching
        } else if (squad.state == STATES.SEARCHING) {
            // if we are in the room next in the queue
            if (this.room.name == squad.highway_queue[0]) {
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            } else {
                // assign a new MoveRoomTask
                this.memory.task = new MoveRoomTask(squad.highway_queue[0]);
                // announce the MoveRoomTask
                this.announceTask();
            }
            // if the power squad is collecting
        } else if (squad.state == STATES.COLLECTING) {
            // find all the creeps in the room
            let creeps = this.room.find(FIND_MY_CREEPS, {
                // that are not at full health
                filter: creep => creep.hits < creep.hitsMax,
            });
            // if any creeps were found
            if (creeps.length > 0) {
                // find the closest path
                let target = this.pos.findClosestByPath(creeps);
                // assign a new heal task
                this.memory.task = new HealTask(target);
                // announce the heal task
                this.announceTask();
            } else {
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            }
            // if the power squad is returning
        } else if (squad.state == STATES.RETURNING) {
            // if we are in the room that the power squad is returning to
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
    NeuroTask.run(this);
};