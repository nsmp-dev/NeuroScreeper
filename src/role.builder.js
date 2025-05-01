// set up the role constants
global.BuilderRole = new Role("builder", "⚒️🛠️", [WORK, CARRY, MOVE, MOVE], 250, 12);

// add the role to the roles hash
global.ROLES[BuilderRole.name] = BuilderRole;

/**
 * BuilderMemory class represents the memory structure for builder creeps.
 * Stores essential data needed by builder creeps to track construction targets,
 * manage building tasks, and maintain their current work assignments.
 * @class BuilderMemory
 */
class BuilderMemory extends CreepMemory {
    /**
     * Creates a new BuilderMemory instance to manage construction-focused creeps.
     * Initializes memory structure for tracking building tasks, construction sites,
     * and maintaining the creep's room assignment.
     * @param {string} room_name - The identifier of the room where the builder will operate and construct
     */
    constructor(room_name) {
        super(BuilderRole.name, room_name);
    }
}

global.BuilderMemory = BuilderMemory;

/**
 * Controls a builder creep's behavior to construct and maintain structures.
 * Automatically seeks out construction sites, repairs damaged structures, and upgrades
 * room controllers when other tasks are complete. Manages energy gathering and task
 * assignment to ensure efficient building operations.
 * @memberOf Creep#
 * @member {function} runBuilder
 */
Creep.prototype.runBuilder = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if the store is empty
        if (this.store[RESOURCE_ENERGY] == 0) {
            // gather some energy
            this.gatherEnergy();
        } else {
            // find a new build target
            let target = this.getBuildTarget();
            // if we found a target
            if (target == null) {
                // find a new repair target
                let repair_target = this.getRepairTarget();
                // if we found a target
                if (repair_target == null) {
                    let main_memory = util.getMainMemory();
                    if (main_memory.room_data[this.memory.room_name].type == COLONY) {
                        // assign a new upgrade task
                        this.memory.task = new UpgradeTask(this.memory.room_name);
                        // announce the upgrade task
                        this.announceTask();
                    }else{
                        // assign a new idle task
                        this.memory.task = new IdleTask(this.memory.room_name);
                        // announce the idle task
                        this.announceTask();
                    }
                } else {
                    // assign a new repair task
                    this.memory.task = new RepairTask(repair_target);
                    // announce the repair task
                    this.announceTask();
                }
            } else {
                // assign a new build task
                this.memory.task = new BuildTask(target);
                // announce the new build task
                this.announceTask();
            }
        }
    }
    // run the task
    neuro_task.run(this);
};