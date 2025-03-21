hlog("Creating operator role...");
PowerCreep.prototype.runOperator = function (plant_data) {
    if (this.ticksToLive < 50 && plant_data.operator_state != PLANT.RENEWING) {
        plant_data.operator_previous_state = plant_data.operator_state;
        plant_data.operator_state = PLANT.RENEWING;
    }

    if (plant_data.operator_state == PLANT.RENEWING) {
        // move to the power spawn
        // if we've been renewed
            // set the state back to the previous state
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