// set up the role constants
global.BuilderRole = new Role("builder", "⚒️🛠️", [WORK, CARRY, MOVE, MOVE], 250, 12);

// add the role to the roles hash
global.ROLES[BuilderRole.name] = BuilderRole;

/**
 * BuilderMemory class, storing data for a builder
 * @class BuilderMemory
 */
class BuilderMemory extends CreepMemory{
    /**
     * creates an BuilderMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(BuilderRole.name, room_name);
    }
}
global.BuilderMemory = BuilderMemory;

/**
 * builder that builds any construction sites that are found
 */
Creep.prototype.runBuilder = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if the store is empty
        if (this.store[RESOURCE_ENERGY] == 0) {
            // gather some energy
            this.gatherEnergy();
        }else{
            // find a new build target
            let target = this.getBuildTarget();
            // if we found a target
            if (target != null) {
                // assign a new build task
                this.memory.task = new BuildTask(target);
                // announce the new build task
                this.announceTask();
            }else{
                // find a new repair target
                let repair_target = this.getRepairTarget();
                // if we found a target
                if (repair_target != null) {
                    // assign a new repair task
                    this.memory.task = new RepairTask(repair_target);
                    // announce the repair task
                    this.announceTask();
                }else{
                    // assign a new upgrade task
                    this.memory.task = new UpgradeTask(this.memory.room_name);
                    // announce the upgrade task
                    this.announceTask();
                }

            }
        }
    }
    // run the task
    TaskRunner.run(this);
};