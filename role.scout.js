const Tasks = require("factory.task");
const TaskRunner = require("runner.task");

hlog("Creating scout role...");

/**
 * scout that explores rooms via a BFS search algorithm
 */
Creep.prototype.runScout = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // shift the queue
        let room_name = this.memory.room_queue.shift();
        // add the room to the log to prevent revisits
        this.memory.room_log.push(room_name);
        // find the adjacent rooms
        let adjacent_rooms = this.room.getAdjacentRooms();

        // loop through the adjacent rooms
        for (let room_name of adjacent_rooms) {
            // if the room name is not already in the old
            if (!this.memory.room_log.includes(room_name) && !this.memory.room_queue.includes(room_name)) {
                // add the room to the queue
                this.memory.room_queue.push(room_name);
            }
        }

        // if there are still rooms in the queue
        if (this.memory.room_queue.length > 0) {
            // assign a new task
            this.memory.task = Tasks.moveRoom(this.memory.room_queue[0]);
            // announce the new task
            this.announceTask();
        }else{
            // assign a new task
            this.memory.task = Tasks.idle(this.room.name, 10);
            // announce the new task
            this.announceTask();
        }
    }
    // run the task
    TaskRunner.run(this);
};