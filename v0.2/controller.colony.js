const Util = require('global.util');

// this is a colony: a type of room where we have a standard base with spawns, towers, storage, etc.
// manages its own data by passing its memory object "room data" around, along with a reference to the room itself
module.exports = {
	// constant used to id a colony
	NAME: "colony",
	// ticks between making construction sites
	CONSTRUCTION_TIMER_LENGTH: 10,
	// ticks between calculating population needs
	POPULATION_TIMER_LENGTH: 10,
	// ratio of ticks that must be satisfied to count as overall satisfied
	SATISFACTION_THRESHOLD: 0.9,
	// size of the log to keep for satisfaction calculations
	SATISFACTION_LOG_SIZE: 100,
	// initialize the colony, generating construction plans and idle location
	initialize: function(room, room_data) {
		// the list of structures this colony will have
		let structures = [];
		// these are the locations of containers and source ids that go with them
		let source_plans = room.getSourcePlans(structures);
		// get the location to place the base
		let base_location = room.findBaseLocation(structures);
		// generate the base structures from the location
		structures = room.getBasePlans(base_location, structures);
		// get the location to send idle creeps
		let idle_location = room.getIdleLocation(structures);

		// setting all the data on the room_data object
		room_data.idle_x = idle_location.x;
		room_data.idle_y = idle_location.y;
		room_data.base_x = base_location.x;
		room_data.base_y = base_location.y;
		room_data.source_plans = source_plans;
		room_data.structures = structures;
		room_data.bootstrap = true;
		room_data.population_timer = 0;
		room_data.construction_timer = 0;
		room_data.satisfaction_log = [];
		room_data.satisfied = false;
		room_data.dead = false;
		room_data.requested_creeps = [];

		return room_data;
	},
	// tests the room for suitability of a colony
	testRoom: function(room) {
		// count all the sources
		let sources = room.find(FIND_SOURCES);
		// see if we can fit a base in the room
		let base_location = room.findBaseLocation([]);
		// return if both requirements are met
		return (sources.length > 1 && base_location != null);
	},
	// do the planning step where we gather data to update
	plan: function(room, room_data) {
		if (room_data.population_timer > this.POPULATION_TIMER_LENGTH) {
			room_data = this.runPopulation(room, room_data);
			room_data.population_timer = 0;
		}else{
			room_data.population_timer++;
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
	// handle the population needs and save the requested creeps to room_data
	runPopulation: function(room, room_data) {
		let pop = Memory.populations[room.name];
		let requested_creeps = [];

		// claimer
		if (!room.controller.my && (pop[Util.CLAIMER.NAME] == undefined || pop[Util.CLAIMER.NAME] < 1)) {
			requested_creeps.push(Util.CLAIMER.init(room.name));
		}

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
		if (pop[Util.UPGRADER.NAME] == undefined || pop[Util.UPGRADER.NAME] < 1) {
			requested_creeps.push(Util.UPGRADER.init(room.name));
		}

		// builders
		let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
		if (site_count > 0 && (pop[Util.BUILDER.NAME] == undefined || pop[Util.BUILDER.NAME] < 2)) {
			requested_creeps.push(Util.BUILDER.init(room.name));
		}

		// repairers
		let structure_count = room.find(FIND_STRUCTURES, {
			filter: function(structure){
				return (structure.hits < structure.hitsMax);
			},
		}).length;
		if (structure_count > 0 && (pop[Util.REPAIRER.NAME] == undefined || pop[Util.REPAIRER.NAME] < 1)) {
			requested_creeps.push(Util.REPAIRER.init(room.name));
		}

		// queen
		if (room.storage !== undefined && (pop[Util.QUEEN.NAME] == undefined || pop[Util.QUEEN.NAME] < 1)) {
			requested_creeps.push(Util.QUEEN.init(room.name));
		}

		// scout
		if (pop[Util.SCOUT.NAME] == undefined || pop[Util.SCOUT.NAME] < 1) {
			requested_creeps.push(Util.SCOUT.init(room.name));
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
	// do the running step where we execute the info from the planning phase
	run: function(room, room_data) {
		if (room_data.construction_timer > this.CONSTRUCTION_TIMER_LENGTH) {
			room.createConstructionSites(room_data.structures, room_data.source_plans);
			room_data.construction_timer = 0;
		}else{
			room_data.construction_timer++;
		}

		if (room_data.requested_creeps.length > 0) {
			let success;
			if (room_data.requested_creeps[0].role == Util.CLAIMER.NAME) {
				success = room.spawnRoleGlobal(room_data.requested_creeps[0]);
			}else{
				success = room.spawnRole(room_data.requested_creeps[0]);
			}
			if (success) {
				room_data.requested_creeps.shift();
			}
		}
		
		return room_data;
	},
};