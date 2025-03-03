// this is the timer module, it is able to time arbitrary things
// it also maintains a log of previous tick lengths to calculate average cpu usage
module.exports = {
	// where we store the timers we are working with
	timers: {},
	// how many previous ticks to maintain for average cpu time
	LOG_SIZE: 50,
	// start a timer, defaults to the main timer
	start: function(id = "main"){
	    if (Memory.timer_log == undefined) {
        	Memory.timer_log = [];
        }
		this.timers[id] = {
			start: Game.cpu.getUsed(),
			end: null,
		};
	},
	// stop a timer, defaults to the main timer
	// if stopping the main timer, advance the log and recalculate the average
	stop: function(id = "main"){
		this.timers[id].end = Game.cpu.getUsed();

		if (id == "main") {
			Memory.timer_log.push(this.timers[id].end - this.timers[id].start);
			if (Memory.timer_log.length > this.LOG_SIZE) {
				Memory.timer_log.shift();
			}
			let total = 0;

			Memory.timer_log.forEach(function(time){
				total += time;
			});
			Memory.average_time = total / Memory.timer_log.length;
		}
	},
};