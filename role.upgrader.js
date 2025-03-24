const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

hlog("Creating upgrader role...");
// upgrader that upgrades the room's controller
Creep.prototype.runUpgrader = function () {
    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            let target = this.getFillTarget();
            if (target != null) {
                this.memory.task = Tasks.gather(target, RESOURCE_ENERGY);
            }else{
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
            }
        }else{
            this.memory.task = Tasks.upgrade(this.room.name);
        }
    }
    // run the task
    TaskRunner.run(this);
};