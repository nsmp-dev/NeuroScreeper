/**
 * TimerEntry class, an object that contains data for logging the times of a timer to calculate running averages
 * @class TimerLog
 */
class TimerLog {
    /**
     * Creates a TimerLog Object
     */
    constructor() {
        /**
         * list of previous times
         * @type {number[]}
         */
        this.log = [];
        /**
         * average of the times in the log
         * @type {number}
         */
        this.average_time = 0;
    }
}

// export the TimerEntry class
global.TimerLog = TimerLog;