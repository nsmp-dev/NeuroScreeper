/**
 * run the observer, keeping a log of rooms to be scanned and scanning the next one
 */
StructureObserver.prototype.run = function () {
    // get the MainMemory object
    let main_memory = Util.getMainMemory();

    // if the log for this room has not been initialized
    if (main_memory.observer_log[this.room.name] == undefined) {
        // get the coordinates of this room
        let room_coords = Util.roomNameToWorldXY(this.room.name);
        // initialize the log data
        main_memory.observer_log[this.room.name] = new ObserverLog(room_coords);
    }

    // grab this room's observer log
    let log = main_memory.observer_log[this.room.name];
    // scan the current target room
    this.observeRoom(Util.worldXYToRoomName(log.current_location.x, log.current_location.y));
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