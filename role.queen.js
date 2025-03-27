const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

hlog("Creating queen role...");

/**
 * queen that takes energy from the storage and dumps it into the towers, terminal, and extensions
 */
Creep.prototype.runQueen = function () {
    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            let target = this.room.storage;
            if (target == undefined || target.store[RESOURCE_ENERGY] == 0) {
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
            }else{
                this.memory.task = Tasks.gather(target, RESOURCE_ENERGY);
            }
        }else{
            let target = this.getQueenDumpTarget();
            if (target != null) {
                this.memory.task = Tasks.deposit(target, RESOURCE_ENERGY);
            }else{
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};