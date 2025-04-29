/**
 * Executes the scanning routine for the Observer structure. The Observer systematically
 * scans rooms in a rectangular grid pattern defined by its range. It maintains its
 * scanning position in memory and advances through the grid one room at a time,
 * moving from left to right and top to bottom. When it reaches the end of a row,
 * it moves to the start of the next row. When it reaches the bottom-right corner,
 * it resets to the top-left corner to start the cycle again.
 */
StructureObserver.prototype.run = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();

    // if the log for this room has not been initialized
    if (main_memory.observer_log[this.room.name] == undefined) {
        // get the coordinates of this room
        let room_coords = util.roomNameToWorldXY(this.room.name);
        // initialize the log data
        main_memory.observer_log[this.room.name] = new ObserverLog(room_coords);
    }

    // grab this room's observer log
    let log = main_memory.observer_log[this.room.name];
    // scan the current target room
    this.observeRoom(util.worldXYToRoomName(log.current_location.x, log.current_location.y));
    // increment the current X
    log.current_location.x++;
    // if the current room is outside the bounds
    if (log.current_location.x >= log.bottom_right.x) {
        // reset the x coordinate to the left bound
        log.current_location.x = log.top_left.x;
        // increment the current Y
        log.current_location.y++;
    }
    // if the current room is outside the bounds
    if (log.current_location.y >= log.bottom_right.y) {
        // reset the y coordinate to the top bound
        log.current_location.y = log.top_left.y;
    }
};