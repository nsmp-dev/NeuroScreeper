const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

hlog("Creating operator role...");

/**
 * run the observer, keeping a log of rooms to be scanned and scanning the next one
 */
PowerCreep.prototype.runOperator = function (plant_data) {
    // if the operator is close to death and not already renewing
    if (this.ticksToLive < 50 && this.memory.task.type != TASK_TYPES.RENEW_OPERATOR) {
        // grab the power spawn in the room
        let power_spawn = this.room.getPowerSpawn();
        // if a power spawn was found
        if (power_spawn != null) {
            // assign a new task
            this.memory.task = Tasks.renewOperator(power_spawn, this.memory.task);
        }
    }

    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        this.memory.task = Tasks.idle(this.room.name);
    }
    // run the task
    TaskRunner.run(this);
};