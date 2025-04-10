/**
 * queen that takes energy from the storage and dumps it into the towers, terminal, and extensions
 */
Creep.prototype.runQueen = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if we are out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // grab the storage in the room
            let target = this.room.storage;

            // if the storage has any ingredients in it and this isn't a capitol
                // assign a task to gather the ingredient from the storage
            // if the terminal has any ingredients in it and this is a capitol
                // assign a task to gather the ingredient from the terminal

            // if the storage isn't built or is empty
            if (target == undefined || target.store[RESOURCE_ENERGY] == 0) {
                // assign a new task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }else{
                // assign a new task
                this.memory.task = new GatherTask(target, RESOURCE_ENERGY);
                // announce the new task
                this.announceTask();
            }
        }else{

            // if the creep has non-energy and the room is not a capitol
                // assign a task to drop it off at the terminal
            // if the creep has non-energy and the room is a capitol
                // assign a task to drop it off at the storage

            // find a new dump target fit for a queen
            let target = this.getQueenDumpTarget();
            // if a new target was found
            if (target != null) {
                // assign a new task
                this.memory.task = new DepositTask(target, RESOURCE_ENERGY);
                // announce the new task
                this.announceTask();
            }else{
                // assign a new task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};