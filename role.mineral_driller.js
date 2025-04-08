const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

/**
 * mineral driller that drills a mineral deposit for resources
 */
Creep.prototype.runMineralDriller = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        this.memory.task = Tasks.drill(Game.getObjectById(this.memory.mineral), this.memory.container_location.x, this.memory.container_location.y);
        // announce the new task
        this.announceTask();
    }
    // run the task
    TaskRunner.run(this);
};