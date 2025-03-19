const Util = require('global.util');

hlog("Creating observer prototype...");

// run the observer, keeping a log of rooms to be scanned and scanning the next one
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
            // the left bounds of the observers range
            min_x: room_coords.x - 10,
            // the top bounds of the observers range
            min_y: room_coords.y - 10,
            // the right bounds of the observers range
            max_x: room_coords.x + 10,
            // the bottom bounds of the observers range
            max_y: room_coords.y + 10,
            // the current room X coordinate
            current_x: room_coords.x - 10,
            // the current room Y coordinate
            current_y: room_coords.y - 10,
        };
    }

    // grab this room's observer log
    let log = Memory.observer_log[this.room.name];
    // scan the current target room
    this.observeRoom(Util.worldXYToRoomName(log.current_x, log.current_y));
    // increment the current X
    log.current_x++;
    // if the current room is outside the bounds
    if (log.current_x >= log.max_x) {
        // reset the x coordinate to the left bound
        log.current_x = log.min_x;
        // increment the current Y
        log.current_y++;
    }
    // if the current room is outside the bounds
    if (log.current_y >= log.max_y) {
        // reset the y coordinate to the top bound
        log.current_y = log.min_y;
    }
};