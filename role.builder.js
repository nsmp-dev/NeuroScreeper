const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

hlog("Creating builder role...");

/**
 * builder that builds any construction sites that are found
 */
Creep.prototype.runBuilder = function () {
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
            let target = this.getBuildTarget();
            if (target != null) {
                this.memory.task = Tasks.build(target);
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