/**
 * repairer that repairs any damaged structures in the room
 */
Creep.prototype.runRepairer = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            this.gatherEnergy();
        }else{
            // find a new repair target
            let target = this.getRepairTarget();
            // if a target was found
            if (target != null) {
                // assign a new task
                this.memory.task = new RepairTask(target);
                // announce the new task
                this.announceTask();
            }else{
                // find a new build target
                let build_target = this.getBuildTarget();
                // if a target was found
                if (build_target != null) {
                    // assign a new task
                    this.memory.task = new BuildTask(build_target);
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