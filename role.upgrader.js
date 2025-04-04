const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

hlog("Creating upgrader role...");

/**
 * upgrader that upgrades the room's controller
 */
Creep.prototype.runUpgrader = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            // find a new fill target
            let target = this.getFillTarget();
            // if a new target was found
            if (target != null) {
                // assign a new task
                this.memory.task = Tasks.gather(target, RESOURCE_ENERGY);
                // announce the new task
                this.announceTask();
            }else{
                // assign a new task
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }
        }else{
            // assign a new task
            this.memory.task = Tasks.upgrade(this.room.name);
            // announce the new task
            this.announceTask();
        }
    }
    // run the task
    TaskRunner.run(this);
};