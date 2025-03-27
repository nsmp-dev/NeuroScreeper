const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

hlog("Creating attacker role...");

/**
 * attacker that attacks hostile creeps in the room
 */
Creep.prototype.runAttacker = function () {
    if (this.memory.task == null) {
        // find all hostile creeps in the room
        let creeps = this.room.find(FIND_HOSTILE_CREEPS);
        // if any hostile creeps are found
        if (creeps.length > 0) {
            // find the closest hostile creep
            let target = this.pos.findClosestByPath(creeps);
            // assign a new task
            this.memory.task = Tasks.attack(target);
        }else{
            // assign a new task
            this.memory.task = Tasks.idle(this.memory.room_name, 10);
        }
    }

    // run the task
    TaskRunner.run(this);
};