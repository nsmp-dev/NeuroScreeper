/**
 * claimer that moves toward the assigned room and either reserves or claims the controller
 */
Creep.prototype.runClaimer = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        if (Memory.room_data[this.memory.room_name].type == COLONY) {
            // assign a new task
            this.memory.task = new ClaimTask(this.memory.room_name);
            // announce the new task
            this.announceTask();
        }else{
            // assign a new task
            this.memory.task = new ReserveTask(this.memory.room_name);
            // announce the new task
            this.announceTask();
        }
    }
    // run the task
    TaskRunner.run(this);
};