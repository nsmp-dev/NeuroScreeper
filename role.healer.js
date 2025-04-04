const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

hlog("Creating healer role...");

/**
 * healer that heals any damaged creeps in the room
 */
Creep.prototype.runHealer = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // find my creeps
        let creeps = this.room.find(FIND_MY_CREEPS, {
            // that are damaged
            filter: creep => creep.hits < creep.hitsMax,
        });
        // if we found any
        if (creeps.length > 0) {
            // find the closest one
            let target = this.pos.findClosestByPath(creeps);
            // assign a new task
            this.memory.task = Tasks.heal(target);
            // announce the new task
            this.announceTask();
        }else{
            // assign a new task
            this.memory.task = Tasks.idle(this.memory.room_name, 10);
            // announce the new task
            this.announceTask();
        }
    }
    // run the task
    TaskRunner.run(this);
};