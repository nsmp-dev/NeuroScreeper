/**
 * builder that builds any construction sites that are found
 */
Creep.prototype.runBuilder = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            this.gatherEnergy();
        }else{
            // find a new build target
            let target = this.getBuildTarget();
            // if we found a target
            if (target != null) {
                // assign a new task
                this.memory.task = new BuildTask(target);
                // announce the new task
                this.announceTask();
            }else{
                // find a new repair target
                let repair_target = this.getRepairTarget();
                // if we found a target
                if (repair_target != null) {
                    // assign a new task
                    this.memory.task = new RepairTask(repair_target);
                    // announce the new task
                    this.announceTask();
                }else{
                    // assign a new task
                    this.memory.task = new UpgradeTask(this.memory.room_name);
                    // announce the new task
                    this.announceTask();
                }

            }
        }
    }
    // run the task
    TaskRunner.run(this);
};