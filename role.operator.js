const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

hlog("Creating operator role...");
PowerCreep.prototype.runOperator = function (plant_data) {

    if (this.memory.task == null) {
        // assign a new task
    }
    // run the task
    TaskRunner.run(this);

    if (this.ticksToLive < 50 && plant_data.operator_state != PLANT.RENEWING) {
        plant_data.operator_previous_state = plant_data.operator_state;
        plant_data.operator_state = PLANT.RENEWING;
    }

    if (plant_data.operator_state == PLANT.RENEWING) {
        let power_spawn = Game.getObjectById(plant_data.power_spawn_id);
        let result = this.renew(power_spawn);
        if (result == ERR_NOT_IN_RANGE) {
            this.moveTo(power_spawn);
        }
        if (result == OK) {
            plant_data.operator_state = plant_data.operator_previous_state;
            plant_data.operator_previous_state = null;
        }
    }


};