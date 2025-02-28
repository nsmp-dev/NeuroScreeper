module.exports = {
	NAME: "expansion",
	CONTRUCTION_TIMER_LENGTH: 10,
	POPULATION_TIMER_LENGTH: 10,
	initialize: function(room, room_data) {
		let structures = [];
		let source_plans = room.getSourcePlans(structures);
		let idle_location = room.getIdleLocation(structures);

		room_data.idle_x = idle_location.x;
		room_data.idle_y = idle_location.y;
		room_data.source_plans = source_plans;
		room_data.structures = structures;
		room_data.bootstrap = true;
		room_data.population_timer = 0;
		room_data.construction_timer = 0;
		room_data.sastisfied = false;
		room_data.sastisfied_counter = 0;
		room_data.unsastisfied_counter = 0;
		room_data.dead = false;
		room_data.requested_creeps = [];

		return room_data;
	},
	testRoom: function(room) {
		let sources = room.find(FIND_SOURCES);
		return (sources.length > 0);
	},
	plan: function(room, room_data) {
		if (room_data.population_timer > this.POPULATION_TIMER_LENGTH) {
			if (room_data.bootstrap) {
				// check for bootstrap ending
				room_data = this.runBootstrapPopulation(room, room_data);
			}else{
				// check for bootstrap starting
				room_data = this.runPopulation(room, room_data);
			}
			room_data.population_timer = 0;
		}else{
			room_data.population_timer++;
		}
		
		if (!room.controller.my) {
			room_data.dead = true;
		}

		return room_data;
	},
	runPopulation: function(room, room_data) {
		
	},
	runBootstrapPopulation: function(room, room_data) {
		
	},
	run: function(room, room_data) {
		if (room_data.construction_timer > this.CONTRUCTION_TIMER_LENGTH) {
			let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
			if (site_count >= 5) {
				return;
			}

			let sources = room_data.sources;
			let structures = room_data.structures;

			sources.forEach(function(source_data){
				if (!Util.checkFor(room, source_data.container_x, source_data.container_y, STRUCTURE_CONTAINER)) {
					let result = room.createConstructionSite(source_data.container_x, source_data.container_y, STRUCTURE_CONTAINER);
					if (result == OK) {
						site_count++;
					}
				}
			});

			structures.forEach(function(structure){
				if (site_count >= 5) {
					return;
				}
				if (!Util.checkFor(room, structure.x, structure.y, structure.type)) {
					let result = room.createConstructionSite(structure.x, structure.y, structure.type);
					if (result == OK) {
						site_count++;
					}
				}
			});
			room_data.construction_timer = 0;
		}else{
			room_data.construction_timer++;
		}

		if (room_data.requested_creeps.length > 0) {
			let success = room.spawnRole(room_data.requested_creeps[0]);
			if (success) {
				room_data.requested_creeps.shift();
			}
		}
		
		return room_data;
	},
};