/**
 * this is the timer module, it is able to time arbitrary things
 * it also maintains a log of previous tick lengths to calculate average cpu usage
 * @module Timer
 * */
module.exports = {
    // where we store the timers we are working with
    timers: {},
    /**
     * initialize this global object, setting up memory
     */
    initialize: function () {
        Memory.timer_log = [];
    },
    /**
     * start a timer, defaults to the main timer
     * @param {string} id - The Creep being ran
     */
    start: function (id = "main") {
        // set the start of the timer
        this.timers[id] = {
            // the time used at the start of the timer
            start: Game.cpu.getUsed(),
            // where the end time will go later
            end: null,
        };
    },
    /**
     * stop a timer, defaults to the main timer
     * if stopping the main timer, advance the log and recalculate the average
     * @param {string} id - The Creep being ran
     */
    stop: function (id = "main") {
        // set the end time of the timer
        this.timers[id].end = Game.cpu.getUsed();

        // if this was the main timer
        if (id == "main") {
            // push the total time onto the timer log
            Memory.timer_log.push(this.timers[id].end - this.timers[id].start);
            // if the timer log is too long
            if (Memory.timer_log.length > this.LOG_SIZE) {
                // remove the first element
                Memory.timer_log.shift();
            }
            // total time for the whole timer log
            let total = 0;

            // loop through each time in the timer log
            Memory.timer_log.forEach(function (time) {
                // increment the total time
                total += time;
            });
            // calculate and store the average time
            Memory.average_time = total / Memory.timer_log.length;
        }
    },
};