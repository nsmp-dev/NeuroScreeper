module.exports = {
    TEXT_STYLE: {
	    font: 0.8,
	    align: "left",
	},
	render: function(room){
		let times = Memory.timer_log;

		for (let i = 0; i < times.length; i++) {
			let height = (times[i] / Game.cpu.limit) * 5;
			room.visual.rect(i, 49 - height, 1, height, { fill: '#ffffff' });
		}


		if (Memory.pop_viz_cache === undefined) {
		}

		let pop = Memory.population.populations[room.name];
		let offset_y = 0;

		for(let role in pop) {
		    if (role == "sources") {
		        for(let source_id in pop.sources) {
    		        room.visual.text("source:" + source_id, 1, 1 + offset_y, this.TEXT_STYLE);
        			offset_y++;
        			room.visual.text("driller: " + pop.sources[source_id].driller, 2, 1 + offset_y, this.TEXT_STYLE);
        			offset_y++;
        			room.visual.text("transporter: " + pop.sources[source_id].transporter, 2, 1 + offset_y, this.TEXT_STYLE);
        			offset_y++;
		        }
		    }else{
		        room.visual.text(role + ": " + pop[role], 1, 1 + offset_y, this.TEXT_STYLE);
		        offset_y++;
		    }
		}
	},
};