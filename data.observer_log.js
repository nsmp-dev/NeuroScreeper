/**
 * ObserverLog class, an object that contains all the data stored on the Memory object
 * @class ObserverLog
 */
class ObserverLog {
    /**
     * creates an ObserverLog object
     */
    constructor(room_coords) {
        /**
         * hash of all the room data objects
         * @type {Point}
         */
        this.top_left = new Point(room_coords.x - 10, room_coords.y - 10);
        /**
         * hash of all the room data objects
         * @type {Point}
         */
        this.bottom_right = new Point(room_coords.x + 10, room_coords.y + 10);
        /**
         * hash of all the room data objects
         * @type {Point}
         */
        this.current_location = new Point(room_coords.x - 10, room_coords.y - 10);
    }
}

// exports the ObserverLog class
global.ObserverLog = ObserverLog;