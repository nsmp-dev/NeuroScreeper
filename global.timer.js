/**
 * this is the timer module, it is able to time arbitrary things
 * it also maintains a log of previous tick lengths to calculate average cpu usage
 * @constant {Object} Timer
 * */
global.Timer = {
    // where we store the timers we are working with
    timers: {},
    /**
     * initialize this global object, setting up memory
     */
    initialize: function () {
        // create the timers object where we store the buffers and averages
        Memory.timers = {};
    },
    /**
     * start a timer, defaults to the main timer
     * @param {string} id - the id of the timer
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
     * @param {string} id - the id of the timer
     */
    stop: function (id = "main") {
        // set the end time of the timer
        this.timers[id].end = Game.cpu.getUsed();
        // if we have not initialized this id's log and average
        if (Memory.timers[id] == undefined) {
            // initialize this id's buffer
            Memory.timers[id] = {
                // the log of the past times
                log: [],
                // the average of the times
                average_time: 0,
            };
        }
        // push the total time onto the timer log
        Memory.timers[id].log.push(this.timers[id].end - this.timers[id].start);
        // if the timer log is too long
        if (Memory.timers[id].log.length > LOG_SIZE) {
            // remove the first element
            Memory.timers[id].log.shift();
        }

        // total time for the whole timer log
        let total = 0;

        // loop through each time in the timer log
        Memory.timers[id].log.forEach(function (time) {
            // increment the total time
            total += time;
        });
        // calculate and store the average time
        Memory.timers[id].average_time = total / Memory.timers[id].log.length;
    },
};