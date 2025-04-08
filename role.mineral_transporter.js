const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

/**
 * mineral transporter that moves minerals from the assigned container to storage
 */
Creep.prototype.runMineralTransporter = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        if (this.store.getUsedCapacity() == 0) {
            // grab the container from memory
            let target = Game.getObjectById(this.memory.container_id);
            // if the container is null
            if (target == null) {
                // grab all the structures at the container's location
                target = this.room.getStructureAt(STRUCTURE_CONTAINER, this.memory.container_location.x, this.memory.container_location.y);
                // if a container is found there
                if (target != null) {
                    // save the container id in memory
                    this.memory.container_id = target.id;
                }else{
                    // remove the container id from memory
                    this.memory.container_id = null;
                }
            }

            // if the target is still null
            if (target == null) {
                // look for dropped energy at the container location
                let resources = this.room.lookForAt(LOOK_RESOURCES, this.memory.container_location.x, this.memory.container_location.y);
                // if any resources are found
                if (resources.length > 0) {
                    // set the resource as the target
                    target = resources[0];
                }
            }

            // if the target is still null or empty
            if (target == null || (target.store != undefined && target.store.getUsedCapacity() == 0)) {
                // assign a new task
                this.memory.task = Tasks.idle(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }else{
                // assign a new task
                this.memory.task = Tasks.gather(target, this.memory.resource_type);
                // announce the new task
                this.announceTask();
            }
        }else{
            // if we are in the room of the nearest colony
            if (this.room.name == this.memory.nearest_colony_room_name) {
                // find a new dump target
                let storage = this.room.storage;
                // if a new target was found
                if (storage != null) {
                    // assign a new task
                    this.memory.task = Tasks.deposit(storage, RESOURCE_ENERGY);
                    // announce the new task
                    this.announceTask();
                }else{
                    // assign a new task
                    this.memory.task = Tasks.idle(this.memory.room_name, 10);
                    // announce the new task
                    this.announceTask();
                }
            }else{
                // assign a new task
                this.memory.task = Tasks.moveRoom(this.memory.nearest_colony_room_name);
                // announce the new task
                this.announceTask();
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};