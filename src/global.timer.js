/**
 * Timer utility that manages CPU time tracking for different operations.
 * Provides functionality to start and stop timers, calculate average execution times,
 * and maintain logs of CPU usage for performance monitoring.
 * @class Timer
 */
class Timer {
    constructor() {
        /**
         * where we store the timers that we are working with this tick
         * @type {Object.<string, TimerEntry>}
         */
        this.timers = {};
    }
    /**
     * start a timer, defaults to the main timer
     * @param {string} id - the id of the timer
     */
    start (id = "main") {
        // set the start of the timer
        this.timers[id] = new TimerEntry(Game.cpu.getUsed());
    }
    /**
     * stop a timer, defaults to the main timer, logs the result to a TimerLog
     * @param {string} id - the id of the timer
     */
    stop (id = "main") {
        // get the MainMemory object
        let main_memory = util.getMainMemory();
        // set the end time of the timer
        this.timers[id].end = Game.cpu.getUsed();
        // if we have not initialized the id's log and average
        if (main_memory.timers[id] == undefined) {
            // initialize the id's buffer
            main_memory.timers[id] = new TimerLog();
        }
        // push the total time onto the timer log
        main_memory.timers[id].log.push(this.timers[id].end - this.timers[id].start);
        // if the timer log is too long
        if (main_memory.timers[id].log.length > LOG_SIZE) {
            // remove the first element
            main_memory.timers[id].log.shift();
        }

        // total time for the whole timer log
        let total = 0;

        // loop through each time in the timer log
        for (let time of main_memory.timers[id].log) {
            total += time;
        }
        // calculate and store the average time
        main_memory.timers[id].average_time = total / main_memory.timers[id].log.length;
    }
}

global.Timer = Timer;

global.timer = new Timer();