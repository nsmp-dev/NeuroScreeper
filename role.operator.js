const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

hlog("Creating operator role...");
PowerCreep.prototype.runOperator = function (plant_data) {

    if (this.ticksToLive < 50 && plant_data.operator_state != PLANT.RENEWING) {
        let power_spawn = Game.getObjectById(plant_data.power_spawn_id);
        if (power_spawn != null) {
            this.memory.task = Tasks.renewOperator(power_spawn, this.memory.task);
        }
    }

    if (this.memory.task == null) {
        // assign a new task
    }
    // run the task
    TaskRunner.run(this);
};