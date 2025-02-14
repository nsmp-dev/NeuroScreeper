const Population = require('population');

module.exports = {
	render: function(room){
		let times = Memory.timer_log;

		for (let i = 0; i < times.length; i++) {
			let height = (times[i] / Game.cpu.limit) * 5;
			room.visual.rect(i, 49 - height, 1, height, { fill: '#ffffff' });
		}


		if (Memory.pop_viz_cache == undefined) {
			Memory.pop_viz_cache = { room.name: {}};
		}

		if (Population.initialized) {
			Memory.pop_viz_cache = Population.populations;
		}

		let pop = Memory.pop_viz_cache[room.name];
		let offset_y = 0;

		for(let [role, count] in Object.entries(pop)) {
			room.visual.text(role + ": " + count, 10, 10+offset_y);
			offset_y++;
		}
	},
};