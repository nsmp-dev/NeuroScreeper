hlog("Creating operator role...");
PowerCreep.prototype.runOperator = function (plant_data) {
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



    // if we are not in the middle of a request
        // if we have any requests
            // mark the front of the queue as in progress
    // if there is an in progress request
        // work on it
    // else
        // see what power is the highest priority power off cooldown
        // work on using that power
};