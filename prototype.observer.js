/**
 * run the observer, keeping a log of rooms to be scanned and scanning the next one
 */
StructureObserver.prototype.run = function () {
    // if the observer log has not been initialized
    if (Memory.observer_log == undefined) {
        // initialize it
        Memory.observer_log = {};
    }

    // if the log for this room has not been initialized
    if (Memory.observer_log[this.room.name] == undefined) {
        // get the coordinates of this room
        let room_coords = Util.roomNameToWorldXY(this.room.name);
        // initialize the log data
        Memory.observer_log[this.room.name] = {
            // the top left bounds of the observers range
            top_left: new Point(room_coords.x - 10, room_coords.y - 10),
            // the bottom right bounds of the observers range
            bottom_right: new Point(room_coords.x + 10, room_coords.y + 10),
            // the current room coordinate
            current_location: new Point(room_coords.x - 10, room_coords.y - 10),
        };
    }

    // grab this room's observer log
    let log = Memory.observer_log[this.room.name];
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