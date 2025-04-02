const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

hlog("Creating claimer role...");

/**
 * claimer that moves toward the assigned room and either reserves or claims the controller
 */
Creep.prototype.runClaimer = function () {
    if (this.memory.task == null) {
        // assign a new task
        this.memory.task = Tasks.claim(this.memory.room_name);
        this.announceTask();
    }
    // run the task
    TaskRunner.run(this);
};