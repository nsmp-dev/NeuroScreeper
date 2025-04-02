const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

hlog("Creating repairer role...");

/**
 * repairer that repairs any damaged structures in the room
 */
Creep.prototype.runRepairer = function () {
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
            let target = this.getRepairTarget();
            if (target != null) {
                this.memory.task = Tasks.repair(target);
                this.announceTask();
            }else{
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
                this.announceTask();
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};