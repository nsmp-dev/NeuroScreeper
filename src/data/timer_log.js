/**
 * A class for managing and analyzing timing data through a collection of recorded time measurements.
 * It maintains a history of timing entries and calculates running averages to track performance metrics.
 * @class TimerLog
 */
class TimerLog {
    /**
     * Initializes a new TimerLog instance with and empty log array and zero average time.
     * This constructor sets up the basic structure for tracking timing measurements.
     */
    constructor() {
        /**
         * An array storing historical timing measurements in milliseconds.
         * Used to maintain a record of previous execution times for statistical analysis.
         * @type {number[]}
         */
        this.log = [];
        /**
         * The calculated running average of all timing measurements in milliseconds.
         * This value is updated as new timing entries are added to the log.
         * @type {number}
         */
        this.average_time = 0;
    }
}

// export the TimerEntry class
global.TimerLog = TimerLog;