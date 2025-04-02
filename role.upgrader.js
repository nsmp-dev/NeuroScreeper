const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

hlog("Creating upgrader role...");

/**
 * upgrader that upgrades the room's controller
 */
Creep.prototype.runUpgrader = function () {
    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            let target = this.getFillTarget();
            if (target != null) {
                this.memory.task = Tasks.gather(target, RESOURCE_ENERGY);
                this.announceTask();
            }else{
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
                this.announceTask();
            }
        }else{
            this.memory.task = Tasks.upgrade(this.room.name);
            this.announceTask();
        }
    }
    // run the task
    TaskRunner.run(this);
};