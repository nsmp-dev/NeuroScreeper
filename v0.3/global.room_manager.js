module.exports = {
	POPULATION_TIMER_LENGTH: 10,
	initialize: function() {
		Memory.room_data = {};
		Memory.population_timer = this.POPULATION_TIMER_LENGTH;
		Memory.population = {};

		// setup the starting room as a capitol/colony
	},
	countPopulation: function() {
		let pop = {};
		
		for (let name in Memory.room_data) {
			if (Memory.room_data[name].type === Capitol.NAME ||
				Memory.room_data[name].type === Colony.NAME ||
				Memory.room_data[name].type === Expansion.NAME) {

				pop[name] = {};
				pop[name].sources = {};
				pop[name].total = 0;

				let sources = Memory.room_data[name].sources;

				sources.forEach(function(source){
					pop[name].sources[source.source_id] = {
						driller: null,
						transporter: null,
						container_x: source.container_x,
						container_y: source.container_y,
					};
				});
			}
		}

		for(let name in Game.creeps) {
			let creep = Game.creeps[name];
			if (pop[creep.memory.room_name] === undefined) {
				pop[creep.memory.room_name] = {};
			}

			if (pop[creep.memory.room_name][creep.memory.role] === undefined) {
				pop[creep.memory.room_name][creep.memory.role] = 0;
			}

			pop[creep.memory.room_name][creep.memory.role]++;
			pop[creep.memory.room_name].total++;

			if (creep.memory.role === Util.DRILLER.NAME) {
				pop[creep.memory.room_name].sources[creep.memory.source].driller = creep.id;
			}
			if (creep.memory.role === Util.TRANSPORTER.NAME) {
				pop[creep.memory.room_name].sources[creep.memory.source].transporter = creep.id;
			}
		}
		Memory.population = pop;
	},
	run: function() {
		Memory.population_timer++;

		if (Memory.population_timer > this.POPULATION_TIMER_LENGTH) {
			this.countPopulation();
			Memory.population_timer = 0;
		}

		// check for new rooms
			// set their type possibilities
		
		// decide if any rooms have changed status

		// decide if we are stable
			// if stable, add a room
	},
};