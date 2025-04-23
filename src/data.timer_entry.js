/**
 * TimerEntry class, an object that contains data for planning a source
 * @class TimerEntry
 */
class TimerEntry {
    /**
     * Creates a TimerEntry Object
     * @param {number} start - id of the Source object
     */
    constructor(start) {
        /**
         * id of the Source object
         * @type {number}
         */
        this.start = start;
        /**
         * coordinates of the container
         * @type {number|null}
         */
        this.end = null;
    }
}

// export the TimerEntry class
global.TimerEntry = TimerEntry;