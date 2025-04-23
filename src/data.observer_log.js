/**
 * ObserverLog class, an object that contains all the data for running an Observer
 * @class ObserverLog
 */
class ObserverLog {
    /**
     * creates an ObserverLog object
     */
    constructor(room_coords) {
        /**
         * top left room of the Observer's max range
         * @type {Point}
         */
        this.top_left = new Point(room_coords.x - 10, room_coords.y - 10);
        /**
         * bottom right room of the Observer's max range
         * @type {Point}
         */
        this.bottom_right = new Point(room_coords.x + 10, room_coords.y + 10);
        /**
         * the current room the Observer is looking at
         * @type {Point}
         */
        this.current_location = new Point(room_coords.x - 10, room_coords.y - 10);
    }
}

// exports the ObserverLog class
global.ObserverLog = ObserverLog;