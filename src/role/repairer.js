// set up the role constants
global.RepairerRole = new Role("repairer", "🔧🪛", [WORK, CARRY, MOVE, MOVE], 250, 12);

// add the role to the roles hash
global.ROLES[RepairerRole.name] = RepairerRole;
/**
 * RepairerMemory class represents memory structure for repair-focused creeps that maintain structures
 * by identifying and fixing damaged buildings, walls, and other structures within their assigned room
 * @class RepairerMemory
 */
class RepairerMemory extends CreepMemory {
    /**
     * Creates a new RepairerMemory instance to manage creeps dedicated to maintaining structures
     * @param {string} room_name - The identifier of the room where the repairer creep will operate and repair structures
     */
    constructor(room_name) {
        super(RepairerRole.name, room_name);
    }
}

global.RepairerMemory = RepairerMemory;

/**
 * Defines behavior for repair-focused creeps that actively maintain structures by identifying
 * and fixing damaged buildings, walls, and other infrastructure. These creeps will gather energy
 * when depleted and automatically switch to construction or upgrading tasks when no repairs are needed.
 * @memberOf Creep#
 * @member {function} runRepairer
 */
Creep.prototype.runRepairer = function () {
    // if we don't have a task currently assigned
    if (this.task == null) {
        // if we are out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // gather some energy
            this.gatherEnergy();
        } else {
            // find a new repair target
            let target = this.findRepairTarget();
            // if a target was found
            if (target == null) {
                // find a new build target
                let build_target = this.findBuildTarget();
                // if a target was found
                if (build_target == null) {
                    // assign a new upgrade task
                    this.task = new UpgradeTask(this.memory.room_name);
                } else {
                    // assign a new build task
                    this.task = new BuildTask(build_target);
                }
            } else {
                // assign a new repair task
                this.task = new RepairTask(target);
            }
        }
    }
    // run the task
    neuro_task.run(this);
};