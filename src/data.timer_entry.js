/**
 * A class representing a timing entry used to measure and track the execution duration of code sections.
 * This class stores the start and end timestamps, allowing for precise timing measurements.
 * @class TimerEntry
 */
class TimerEntry {
    /**
     * Creates a new TimerEntry instance with the specified start time
     * @param {number} start - The initial timestamp (in milliseconds) marking the beginning of the timing period
     */
    constructor(start) {
        /**
         * The timestamp marking the start of the timing period (in milliseconds)
         * @type {number}
         */
        this.start = start;
        /**
         * The timestamp marking the end of the timing period (in milliseconds). Null if timing hasn't completed
         * @type {number|null}
         */
        this.end = null;
    }
}

// export the TimerEntry class
global.TimerEntry = TimerEntry;