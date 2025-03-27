const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

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
            }else{
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
            }
        }else{
            let target = this.getBuildTarget();
            if (target != null) {
                this.memory.task = Tasks.build(target);
            }else{
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};