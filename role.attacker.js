/**
 * attacker that attacks hostile creeps in the room
 */
Creep.prototype.runAttacker = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // find all hostile creeps in the room
        let creeps = this.room.find(FIND_HOSTILE_CREEPS);
        // if any hostile creeps are found
        if (creeps.length > 0) {
            // find the closest hostile creep
            let target = this.pos.findClosestByPath(creeps);
            // assign a new task
            this.memory.task = new AttackTask(target);
            // announce the new task
            this.announceTask();
        }else{
            // assign a new task
            this.memory.task = new IdleTask(this.memory.room_name, 10);
            // announce the new task
            this.announceTask();
        }
    }

    // run the task
    TaskRunner.run(this);
};