if (Memory.timer_log === undefined) {
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
		this.timers[id].end = Game.cpu.getUsed();

		if (id === "main") {
			Memory.timer_log.push(this.timers[id].end - this.timers[id].start);
			if (Memory.timer_log.length > this.LOG_SIZE) {
				Memory.timer_log.pop();
			}
			let total = 0;

			Memory.timer_log.forEach(function(time){
				total += time;
			});
			Memory.average_time = total / Memory.timer_log.length;
		}
	},
};