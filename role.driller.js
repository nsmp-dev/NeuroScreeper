const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

hlog("Creating driller role...");

/**
 * driller that harvests energy from the assigned source, dropping the energy on the container
 */
Creep.prototype.runDriller = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        this.memory.task = Tasks.drill(Game.getObjectById(this.memory.source), this.memory.container_location.x, this.memory.container_location.y);
        // announce the new task
        this.announceTask();
    }
    // run the task
    TaskRunner.run(this);
};