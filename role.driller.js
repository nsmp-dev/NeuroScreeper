/**
 * driller that harvests energy from the assigned source, dropping the energy on the container
 */
Creep.prototype.runDriller = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        this.memory.task = new DrillTask(this.memory.source, this.memory.container_location, this.memory.room_name);
        // announce the new task
        this.announceTask();
    }
    // run the task
    TaskRunner.run(this);
};