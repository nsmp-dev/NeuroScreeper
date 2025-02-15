if (Memory.timer_log == undefined) {
	Memory.timer_log = [];
}

module.exports = {
	timers: {},
	LOG_SIZE: 50,

	start: function(id = "main"){
		this.timers[id] = {
			start: Game.cpu.getUsed(),
			end: null,
		};
	},

	stop: function(id = "main"){
		Timer.timers[id].end = Game.cpu.getUsed();

		if (id == "main") {
			Memory.timer_log.push(Timer.timers[id].end - Timer.timers[id].start);
			if (Memory.timer_log.length > Timer.LOG_SIZE) {
				Memory.timer_log.pop();
			}
			let total = 0;

			Memory.timer_log.forEach(function(time){
				total += time;
			})
			Memory.average_time = total / Memory.timer_log.length;
		}
	},
};