// set up the role constants
global.HealerRole = new Role("healer", "⚕️🌡️", [HEAL, TOUGH, MOVE, MOVE], 360, 12);

// add the role to the roles hash
global.ROLES[HealerRole.name] = HealerRole;

/**
 * HealerMemory class represents the memory structure for healer creeps that specialize in healing damaged units.
 * It maintains essential data required for healing operations and tracking assignments within a room.
 * @class HealerMemory
 */
class HealerMemory extends CreepMemory {
    /**
     * Creates a new HealerMemory instance to track the memory state of a healer creep
     * @param {string} room_name - The identifier of the room where the healer will perform healing operations
     */
    constructor(room_name) {
        super(HealerRole.name, room_name);
    }
}

global.HealerMemory = HealerMemory;

/**
 * Specialized healer role responsible for restoring damaged creeps to full health.
 * Actively searches for injured friendly units within the room and prioritizes healing
 * based on proximity. If no damaged creeps are found, enters an idle state until needed.
 * @memberOf Creep#
 * @member {function} runHealer
 */
Creep.prototype.runHealer = function () {
    // if we don't have a task currently assigned
    if (this.task == null) {
        // find my creeps
        /** @type {Creep[]} */
        let creeps = this.room.find(FIND_MY_CREEPS, {
            // that are damaged
            filter: creep => creep.hits < creep.hitsMax,
        });
        // if we found any
        if (creeps.length > 0) {
            // find the closest one
            /** @type {Creep} */
            let target = this.pos.findClosestByPath(creeps);
            // assign a new heal task
            this.task = new HealTask(target);
        } else {
            // assign a new idle task
            this.task = new IdleTask(this.memory.room_name, 10);
        }
    }
    // run the task
    neuro_task.run(this);
};