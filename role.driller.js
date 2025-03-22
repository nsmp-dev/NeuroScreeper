const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

hlog("Creating driller role...");
// driller that harvests energy from the assigned source, dropping the energy on the container
Creep.prototype.runDriller = function () {
    if (this.memory.task == null) {
        // assign a new task
        this.memory.task = Tasks.drill(Game.getObjectById(this.memory.source), this.memory.container_x, this.memory.container_y);
    }
    // run the task
    TaskRunner.run(this);
};