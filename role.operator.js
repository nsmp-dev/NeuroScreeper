/**
 * run the operator
 * @param {PlantData} plant_data - The name of the room this creep is assigned to
 */
PowerCreep.prototype.runOperator = function (plant_data) {
    // if the operator is close to death and not already renewing
    if (this.ticksToLive < 50 && this.memory.task.type != TASK_TYPES.RENEW_OPERATOR) {
        // grab the power spawn in the room
        let power_spawn = this.room.getPowerSpawn();
        // if a power spawn was found
        if (power_spawn != null) {
            // assign a new task
            this.memory.task = new RenewOperatorTask(power_spawn, this.memory.task);
        }
    }

    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        if (plant_data.factory_state == STATES.CLEANING) {
            // TODO: assign a move resource task
        }else if (plant_data.labs_state == STATES.CLEANING){
            // TODO: assign a move resource task
        }else if (plant_data.factory_state == STATES.FINISHED){
            // TODO: assign a move resource task
        }else if (plant_data.labs_state == STATES.FINISHED){
            // TODO: assign a move resource task
        }else if (plant_data.factory_state == STATES.LOADING){
            // TODO: assign a move resource task
        }else if (plant_data.labs_state == STATES.LOADING){
            // TODO: assign a move resource task
        }else{
            this.memory.task = new IdleTask(this.room.name);
        }
    }
    // run the task
    TaskRunner.run(this);
};