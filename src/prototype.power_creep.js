/**
 * The base game Creep class. Custom properties and functions are listed below.
 * @class PowerCreep
 */

/**
 * Directs the creep to move toward the designated idle location in its current room.
 * Only moves if the creep is more than 3 tiles away from the idle position.
 * @memberOf PowerCreep#
 * @member {function} idle
 */
PowerCreep.prototype.idle = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();
    // grab the room data
    let room_data = main_memory.room_data[this.room.name];

    // if we are more than 3 tiles away
    if (!this.pos.inRangeTo(room_data.plans.idle_location.x, room_data.plans.idle_location.y, 3)) {
        // move toward the idle location
        this.moveTo(room_data.plans.idle_location.x, room_data.plans.idle_location.y);
    }
};

/**
 * Finds the closest room designated as a colony using linear distance calculation.
 * Searches through all known rooms in memory to find the nearest colony type room.
 * @memberOf PowerCreep#
 * @member {function} moveToRoom
 * @return {string|null} The name of the nearest colony room, or null if none found
 */
PowerCreep.prototype.moveToRoom = function (room_name) {
    this.moveTo(new RoomPosition(ROOM_SIZE/2, ROOM_SIZE/2, room_name));
};