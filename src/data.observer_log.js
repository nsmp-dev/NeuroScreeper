/**
 * ObserverLog class manages tracking and scanning data for a Room Observer structure.
 * It maintains coordinates for the observable area and current scan position within
 * the Observer's operational range (which is 10 rooms in each direction).
 * @class ObserverLog
 */
class ObserverLog {
    /**
     * Creates an ObserverLog object to track Observer scanning operations
     * @param {Point} room_coords - The coordinates of the room containing the Observer structure
     */
    constructor(room_coords) {
        /**
         * Coordinates of the top-left room within the Observer's scanning range (10 rooms from the Observer)
         * @type {Point}
         */
        this.top_left = new Point(room_coords.x - 10, room_coords.y - 10);
        /**
         * Coordinates of the bottom-right room within the Observer's scanning range (10 rooms from the Observer)
         * @type {Point}
         */
        this.bottom_right = new Point(room_coords.x + 10, room_coords.y + 10);
        /**
         * Coordinates of the room currently being scanned by the Observer, initially set to the top-left position
         * @type {Point}
         */
        this.current_location = new Point(room_coords.x - 10, room_coords.y - 10);
    }
}

// export the ObserverLog class
global.ObserverLog = ObserverLog;