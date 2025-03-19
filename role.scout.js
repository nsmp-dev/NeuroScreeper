hlog("Creating scout role...");
// scout that explores rooms via a BFS search algorithm
Creep.prototype.runScout = function () {
    // if the room queue is empty
    if (!this.memory.started) {
        // set the scout to started
        this.memory.started = true;
        // create an initial queue with the adjacent rooms
        this.memory.room_queue = this.room.getAdjacentRooms();
        // put the starting room in the room log
        this.memory.room_log = [this.room.name];
    }
    // if we are not in the next room in the queue
    if (this.room.name !== this.memory.room_queue[0]) {
        // move toward the next room
        let result = this.moveTo(new RoomPosition(25, 25, this.memory.room_queue[0]));
        // if no path is found
        if (result == ERR_NOT_FOUND) {
            // shift the queue
            let room_name = this.memory.room_queue.shift();
            // add the room to the log to prevent revisits
            this.memory.room_log.push(room_name);
        }
    } else {
        // find the adjacent rooms
        let adjacent_rooms = this.room.getAdjacentRooms();

        // loop through the adjacent rooms
        for (let room_name of adjacent_rooms) {
            // see if the room log includes this room
            let found = this.memory.room_log.includes(room_name);
            // if it is not found
            if (!found) {
                // see if the room queue includes this room
                found = this.memory.room_queue.includes(room_name);
            }
            // if we did not find it
            if (!found) {
                // add the room to the queue
                this.memory.room_queue.push(room_name);
            }
        }

        // shift the queue
        let room_name = this.memory.room_queue.shift();
        // add the room to the log to prevent revisits
        this.memory.room_log.push(room_name);
    }
};