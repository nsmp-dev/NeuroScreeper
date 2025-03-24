const Tasks = require("data.tasks");
const TaskRunner = require("global.task_runner");

hlog("Creating transporter role...");
// transporter that takes energy from the containers under drillers and dumps the energy into the base
Creep.prototype.runTransporter = function () {

    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            // grab the container from memory
            let target = Game.getObjectById(this.memory.container);
            // if the container is null
            if (target == null) {
                // grab all the structures at the container's location
                target = this.room.getStructureAt(STRUCTURE_CONTAINER, this.memory.container_x, this.memory.container_y);
                // if a container is found there
                if (target != null) {
                    // save the container id in memory
                    this.memory.container = target.id;
                }else{
                    this.memory.container = null;
                }
            }

            if (target == null) {
                let resources = this.room.lookForAt(LOOK_ENERGY, this.memory.container_x, this.memory.container_y);
                // if any resources are found
                if (resources.length > 0) {
                    // pick them up
                    target = resources[0];
                }
            }

            if (target == null || (target,store != undefined && target.store[RESOURCE_ENERGY] == 0)) {
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
            }else{
                this.memory.task = Tasks.gather(target, RESOURCE_ENERGY);
            }
        }else{
            let target = this.getDumpTarget();
            if (target != null) {
                this.memory.task = Tasks.deposit(target, RESOURCE_ENERGY);
            }else{
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};