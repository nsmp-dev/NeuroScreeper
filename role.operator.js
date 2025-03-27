const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

hlog("Creating operator role...");
PowerCreep.prototype.runOperator = function (plant_data) {

    if (this.ticksToLive < 50 && this.memory.task.type != TASK_TYPES.RENEW_OPERATOR) {
        let power_spawn = Game.getObjectById(plant_data.power_spawn_id);
        if (power_spawn != null) {
            this.memory.task = Tasks.renewOperator(power_spawn, this.memory.task);
        }
    }

    if (this.memory.task == null) {
        // assign a new task
        this.memory.task = Tasks.idle(this.room.name);
    }
    // run the task
    TaskRunner.run(this);
};