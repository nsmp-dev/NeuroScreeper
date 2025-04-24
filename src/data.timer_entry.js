/**
 * TimerEntry class, an object that contains data for timing a section of code
 * @class TimerEntry
 */
class TimerEntry {
    /**
     * Creates a TimerEntry Object
     * @param {number} start - the start time of the timer
     */
    constructor(start) {
        /**
         * the start time of the timer
         * @type {number}
         */
        this.start = start;
        /**
         * the end time of the timer
         * @type {number|null}
         */
        this.end = null;
    }
}

// export the TimerEntry class
global.TimerEntry = TimerEntry;