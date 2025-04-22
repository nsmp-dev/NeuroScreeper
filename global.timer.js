/**
 * handles timing parts of code and logging the averages over time
 * @module Timer
 */
global.Timer = {
    // where we store the timers we are working with
    timers: {},
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
        let main_memory = Util.getMainMemory();
        // set the end time of the timer
        this.timers[id].end = Game.cpu.getUsed();
        // if we have not initialized the id's log and average
        if (main_memory.timers[id] == undefined) {
            // initialize the id's buffer
            main_memory.timers[id] = {
                // the log of the past times
                log: [],
                // the average of the times
                average_time: 0,
            };
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
        main_memory.timers[id].log.forEach(function (time) {
            // increment the total time
            total += time;
        });
        // calculate and store the average time
        main_memory.timers[id].average_time = total / main_memory.timers[id].log.length;
    },
};