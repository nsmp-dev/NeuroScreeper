module.exports = {
	render: function(room){
		let times = Memory.timer_log;

		for (let i = 0; i < times.length; i++) {
			let height = (times[i] / Game.cpu.limit) * 5;
			room.visual.rect(i, 49 - height, 1, height, { fill: '#ffffff' });
		}
	},
};