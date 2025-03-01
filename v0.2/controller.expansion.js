const Util = require("global.util");

module.exports = {
	NAME: "expansion",
	CONSTRUCTION_TIMER_LENGTH: 10,
	POPULATION_TIMER_LENGTH: 10,
	SATISFACTION_THRESHOLD: 0.9,
	SATISFACTION_LOG_SIZE: 100,
	initialize: function(room, room_data) {
		let structures = [];
		let source_plans = room.getSourcePlans(structures);
		let idle_location = room.getIdleLocation(structures);

		room_data.idle_x = idle_location.x;
		room_data.idle_y = idle_location.y;
		room_data.source_plans = source_plans;
		room_data.structures = structures;
		room_data.population_timer = 0;
		room_data.construction_timer = 0;
		room_data.satisfaction_log = [];
		room_data.satisfied = false;
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
			room_data = this.runPopulation(room, room_data);
			room_data.population_timer = 0;
		}else{
			room_data.population_timer++;
		}
		
		if (!room.controller.my) {
			room_data.dead = true;
		}

		if (room_data.requested_creeps.length == 0) {
			room_data.satisfaction_log.push(0);
		}else{
			room_data.satisfaction_log.push(1);
		}

		if (room_data.satisfaction_log.length > this.SATISFACTION_LOG_SIZE) {
			room_data.satisfaction_log.shift();
		}

		room_data.satisfied = (Util.getSatisfiedRatio(room_data) > this.SATISFACTION_THRESHOLD);

		return room_data;
	},
	runPopulation: function(room, room_data) {
		let pop = Memory.populations[room.name];
		let requested_creeps = [];

		// claimer
		if (pop[Util.CLAIMER.NAME] == undefined || pop[Util.CLAIMER.NAME] < 1) {
			requested_creeps.push(Util.CLAIMER.init(room.name));
		}

		// drillers and transporters
		pop.sources.forEach(function(data, source_id){
			if (data.driller == null) {
				requested_creeps.push(Util.DRILLER.init(room.name, source_id, data.container_x, data.container_y));
			}
			if (data.transporter == null) {
				requested_creeps.push(Util.TRANSPORTER.init(room.name, source_id, data.container_x, data.container_y));
			}
		});

		// builders
		let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
		if (site_count > 0 && (pop[Util.BUILDER.NAME] == undefined || pop[Util.BUILDER.NAME] < 1)) {
			requested_creeps.push(Util.BUILDER.init(room.name));
		}

		// repairers
		let structure_count = room.find(FIND_STRUCTURES, {
			filter: function(structure){
				return structure.hits < structure.hitsMax;
			},
		}).length;
		if (structure_count > 0 && (pop[Util.REPAIRER.NAME] == undefined || pop[Util.REPAIRER.NAME] < 1)) {
			requested_creeps.push(Util.REPAIRER.init(room.name));
		}

		// attackers
		if (pop[Util.ATTACKER.NAME] == undefined || pop[Util.ATTACKER.NAME] < 1) {
			requested_creeps.push(Util.ATTACKER.init(room.name));
		}

		// healers
		if (pop[Util.HEALER.NAME] == undefined || pop[Util.HEALER.NAME] < 1) {
			requested_creeps.push(Util.HEALER.init(room.name));
		}

		room_data.requested_creeps = requested_creeps;
		return room_data;
	},
	run: function(room, room_data) {
		if (room_data.construction_timer > this.CONSTRUCTION_TIMER_LENGTH) {
			let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
			if (site_count < 5) {
				let sources = room_data.sources;
				let structures = room_data.structures;

				sources.forEach(function(source_data){
					if (site_count >= 5) {
						return;
					}
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
			}
		}else{
			room_data.construction_timer++;
		}

		if (room_data.requested_creeps.length > 0) {
			let success = room.spawnRoleGlobal(room_data.requested_creeps[0]);
			if (success) {
				room_data.requested_creeps.shift();
			}
		}

		return room_data;
	},
};