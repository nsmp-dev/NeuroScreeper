// this is the timer module, it is able to time arbitrary things
// it also maintains a log of previous tick lengths to calculate average cpu usage
module.exports = {
    // where we store the timers we are working with
    timers: {},
    // how many previous ticks to maintain for average cpu time
    LOG_SIZE: 50,
    // start a timer, defaults to the main timer
    start: function (id = "main") {
        // if the timer log has not been initialized
        if (Memory.timer_log == undefined) {
            // create the timer log
            Memory.timer_log = [];
        }
        // set the start of the timer
        this.timers[id] = {
            // the time used at the start of the timer
            start: Game.cpu.getUsed(),
            // where the end time will go later
            end: null,
        };
    },
    // stop a timer, defaults to the main timer
    // if stopping the main timer, advance the log and recalculate the average
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