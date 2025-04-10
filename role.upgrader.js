/**
 * upgrader that upgrades the room's controller
 */
Creep.prototype.runUpgrader = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            this.gatherEnergy();
        }else{
            // assign a new task
            this.memory.task = new UpgradeTask(this.room.name);
            // announce the new task
            this.announceTask();
        }
    }
    // run the task
    TaskRunner.run(this);
};