// set up the role constants
global.AttackerRole = new Role("attacker", "🗡️⚔️", [ATTACK, TOUGH, MOVE, MOVE], 100, 12);

// add the role to the roles hash
global.ROLES[AttackerRole.name] = AttackerRole;

/**
 * AttackerMemory class represents memory storage for offensive combat creeps.
 * This class maintains essential data needed by attacker creeps, including their
 * target tracking, combat state, and patrol area assignments.
 * @class AttackerMemory
 */
class AttackerMemory extends CreepMemory {
    /**
     * Creates a new AttackerMemory object to manage combat-focused creeps for offensive operations
     * @param {string} room_name - The identifier of the room where the attacker will be based and patrol
     */
    constructor(room_name) {
        super(AttackerRole.name, room_name);
    }
}

global.AttackerMemory = AttackerMemory;

/**
 * Controls an attacker creep's behavior to engage and eliminate hostile entities.
 * Automatically searches for enemy creeps within the room, prioritizing the closest
 * targets for efficient combat engagement. When no hostiles are present, enters an
 * idle patrol state.
 * @memberOf Creep#
 * @member {function} runAttacker
 */
Creep.prototype.runAttacker = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // find all hostile creeps in the room
        let creeps = this.room.find(FIND_HOSTILE_CREEPS);
        // if any hostile creeps are found
        if (creeps.length > 0) {
            // find the closest hostile creep
            let target = this.pos.findClosestByPath(creeps);
            // assign a new attack task
            this.memory.task = new AttackTask(target);
            // announce the attack task
            this.announceTask();
        } else {
            // assign a new idle task
            this.memory.task = new IdleTask(this.memory.room_name, 10);
            // announce the idle task
            this.announceTask();
        }
    }

    // run the task
    neuro_task.run(this);
};