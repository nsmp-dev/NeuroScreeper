/**
 * TimerEntry class, an object that contains data for planning a source
 * @class TimerLog
 */
class TimerLog {
    /**
     * Creates a TimerLog Object
     */
    constructor() {
        /**
         * id of the Source object
         * @type {number[]}
         */
        this.log = [];
        /**
         * coordinates of the container
         * @type {number}
         */
        this.average_time = 0;
    }
}

// export the TimerEntry class
global.TimerLog = TimerLog;