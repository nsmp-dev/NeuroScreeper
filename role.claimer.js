const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

hlog("Creating claimer role...");

/**
 * claimer that moves toward the assigned room and either reserves or claims the controller
 */
Creep.prototype.runClaimer = function () {
    if (this.memory.task == null) {
        // assign a new task
        this.memory.task = Tasks.claim(this.memory.room_name);
    }
    // run the task
    TaskRunner.run(this);
};