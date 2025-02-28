module.exports = {
	NAME: "colony",
	CONTRUCTION_TIMER_LENGTH: 10,
	POPULATION_TIMER_LENGTH: 10,
	initialize: function(room, room_data) {
		let source_plans = this.room.getSourcePlans(structures);
		let base_location = room.findBaseLocation(structures);
		let structures = room.getBasePlans(base_location);
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
		let base_location = room.findBaseLocation([]);

		return (sources.length > 1 && base_location != null);
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
		let pop = Memory.populations[room.name];
		let requested_creeps = [];

		// drillers and transporters
		for (let source_id in pop.sources) {
			let data = pop.sources[source_id];
			if (data.driller == null) {
				requested_creeps.push(Util.DRILLER.init(room.name, source_id, data.container_x, data.container_y));
			}
			if (data.transporter == null) {
				requested_creeps.push(Util.TRANSPORTER.init(room.name, source_id, data.container_x, data.container_y));
			}
		}

		// upgraders
		if (pop[Util.UPGRADER.NAME] === undefined || pop[Util.UPGRADER.NAME] < 1) {
			requested_creeps.push(Util.UPGRADER.init(room.name));
		}

		// builders
		// noinspection DuplicatedCode
		let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
		if (site_count > 0 && (pop[Util.BUILDER.NAME] === undefined || pop[Util.BUILDER.NAME] < 2)) {
			requested_creeps.push(Util.BUILDER.init(room.name));
		}

		// repairers
		let structure_count = room.find(FIND_STRUCTURES, {
			filter: function(structure){
				return (structure.hits < structure.hitsMax);
			},
		}).length;
		if (structure_count > 0 && (pop[Util.REPAIRER.NAME] === undefined || pop[Util.REPAIRER.NAME] < 1)) {
			requested_creeps.push(Util.REPAIRER.init(room.name));
		}

		// queen
		if (room.storage !== undefined && (pop[Util.QUEEN.NAME] === undefined || pop[Util.QUEEN.NAME] < 1)) {
			requested_creeps.push(Util.QUEEN.init(room.name));
		}

		// scout
		if (pop[Util.SCOUT.NAME] === undefined || pop[Util.SCOUT.NAME] < 1) {
			requested_creeps.push(Util.SCOUT.init(room.name));
		}
		// attackers
		if (pop[Util.ATTACKER.NAME] === undefined || pop[Util.ATTACKER.NAME] < 1) {
			requested_creeps.push(Util.ATTACKER.init(room.name));
		}
		// healers
		if (pop[Util.HEALER.NAME] === undefined || pop[Util.HEALER.NAME] < 1) {
			requested_creeps.push(Util.HEALER.init(room.name));
		}

		room_data.requested_creeps = requested_creeps;
	},
	runBootstrapPopulation: function(room, room_data) {
		let pop = Memory.populations[room.name];
		let requested_creeps = [];

		if (!room.controller.my && pop[Util.CLAIMER.NAME] < 1) {
			requested_creeps.push(Util.CLAIMER.init(room.name));
		}else{
			requested_creeps.push(Util.HARVESTER.init(room.name));
			if (pop[Util.HARVESTER.NAME] == undefined || pop[Util.HARVESTER.NAME] < 2) {
				requested_creeps.push(Util.HARVESTER.init(room.name));
			}
			let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
			if (site_count > 0 && (pop[Util.BUILDER.NAME] == undefined || pop[Util.BUILDER.NAME] < 1)) {
				requested_creeps.push(Util.BUILDER.init(room.name));
			}
		}

		room_data.requested_creeps = requested_creeps;
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
					if (result === OK) {
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
					if (result === OK) {
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