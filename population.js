const Util = require("util");

module.exports = {
	TIMER_LENGTH: 10,
	BOOTSTRAP_LENGTH: 500,
	initialized: false,
	populations: {},

	count_population: function(){
		if (this.initialized) {
			return;
		}

		this.initialized = true;
		let pop - this.populations;

		for (let [room_name, room_data] of Object.entries(Memory.rooms)) {
			if (room_data.type == RoomLog.COLONY || room_data.type == RoomLog.EXPANSION) {
				pop[room_name].sources = {};
				pop[room_name].total = 0;

				let room = Game.rooms[room_name];
				let sources = room.find(FIND_SOURCES);
				let containers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });

				sources.forEach(function(source){
					pop[room_name].sources[source.id] = {
						driller: null,
						container: null,
						driller: null,
					};
					containers.forEach(function(container){
						if (container.pos.isNearTo(source.pos)) {
							pop[room_name].sources[source.id].container = container.id;
						}
					});
				});
			}
		}

		for(let [name, creep] in Object.entries(Game.creeps)) {
			if (data[creep.memory.room_name] == undefined) {
				data[creep.memory.room_name] = {};
			}

			if (data[creep.memory.room_name][creep.memory.role] == undefined) {
				data[creep.memory.room_name][creep.memory.role] = 0;
			}

			data[creep.memory.room_name][creep.memory.role]++;
			data[creep.memory.room_name].total++;

			if (creep.memory.role == Util.DRILLER.NAME) {
				data[creep.memory.room_name].sources[creep.memory.source].driller = creep.id;
			}
			if (creep.memory.role == Util.TRANSPORTER.NAME) {
				data[creep.memory.room_name].containers[creep.memory.source].transporter = creep.id;
			}
		}
	},

	runColony: function(room){
		if (Memory.population_timers == undefined) {
			Memory.population_timers = {};
		}

		if (Memory.population_timers[room.name] == undefined) {
			Memory.population_timers[room.name] = this.TIMER_LENGTH;
		}

		

		if (Memory.population_timers[room.name] >= this.TIMER_LENGTH) {
			Memory.population_timers[room.name] = 0;
		}else{
			Memory.population_timers[room.name]++;
			return;
		}

		this.count_population();

		if (Memory.rooms[room.name].boostrap_mode == undefined) {
			Memory.rooms[room.name].boostrap_mode = true;
			Memory.rooms[room.name].boostrap_timer = this.BOOTSTRAP_LENGTH;
		}

		let pop = this.populations[room.name];
		if (pop.total == 0 && !Memory.rooms[room.name].boostrap_mode) {
			Memory.rooms[room.name].boostrap_mode = true;
			Memory.rooms[room.name].boostrap_timer = this.BOOTSTRAP_LENGTH;
		}

		if (Memory.rooms[room.name].boostrap_mode) {
			if (Memory.rooms[room.name].boostrap_timer == 0) {
				Memory.rooms[room.name].boostrap_mode = false;
			}else{
				Memory.rooms[room.name].boostrap_timer--;
			}
			this.spawnRole(room, Util.HARVESTER.init(room.name));
			return;
		}

		// make a list of needed roles
		let requested_creeps = [];

		// drillers and transporters
		pop.sources.forEach(function(data, source_id){
			if (data.driller == null) {
				requested_creeps.push(Util.DRILLER.init(room.name, source_id, data.container));
			}
			if (data.transporter == null) {
				requested_creeps.push(Util.TRANSPORTER.init(room.name, source_id, data.container));
			}
		});

		// upgraders
		if (pop[Util.UPGRADER.NAME] < 1) {
			requested_creeps.push(Util.UPGRADER.init(room.name));
		}

		// builders
		let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
		if (site_count > 0 && pop[Util.BUILDER.NAME] < 1) {
			requested_creeps.push(Util.BUILDER.init(room.name));
		}

		// repairers
		let structure_count = room.find(FIND_MY_STRUCTURES, {
			filter: function(structure){
				return structure.hits < structure.hitsMax;
			},
		}).length;
		if (structure_count > 0 && pop[Util.REPAIRER.NAME] < 1) {
			requested_creeps.push(Util.REPAIRER.init(room.name));
		}

		// queen
		if (room.controller != undefined && pop[Util.QUEEN.NAME] < 1) {
			requested_creeps.push(Util.QUEEN.init(room.name));
		}

		// scout
		if (pop[Util.SCOUT.NAME] < 1) {
			requested_creeps.push(Util.SCOUT.init(room.name));
		}
		// attackers
		if (pop[Util.ATTACKER.NAME] < 1) {
			requested_creeps.push(Util.ATTACKER.init(room.name));
		}
		// healers
		if (pop[Util.HEALER.NAME] < 1) {
			requested_creeps.push(Util.HEALER.init(room.name));
		}

		this.spawnRequests(room, requested_creeps);
	},

	runExpansion: function(room){
		if (Memory.population_timers == undefined) {
			Memory.population_timers = {};
		}

		if (Memory.population_timers[room.name] == undefined) {
			Memory.population_timers[room.name] = this.TIMER_LENGTH;
		}

		Memory.population_timers[room.name]--;

		if (Memory.population_timers[room.name] == 0) {
			Memory.population_timers[room.name] = this.TIMER_LENGTH;
		}else{
			return;
		}

		this.count_population();

		let pop = this.populations[room.name];
		let requested_creeps = [];

		// claimer
		if (pop[Util.CLAIMER.NAME] < 1) {
			requested_creeps.push(Util.CLAIMER.init(room.name));
		}


		// drillers and transporters
		pop.sources.forEach(function(data, source_id){
			if (data.driller == null) {
				requested_creeps.push(Util.DRILLER.init(room.name, source_id, data.container));
			}
			if (data.transporter == null && data.container != null) {
				requested_creeps.push(Util.TRANSPORTER.init(room.name, source_id, data.container));
			}
		});

		// builders
		let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
		if (site_count > 0 && pop[Util.BUILDER.NAME] < 1) {
			requested_creeps.push(Util.BUILDER.init(room.name));
		}

		// repairers
		let structure_count = room.find(FIND_MY_STRUCTURES, {
			filter: function(structure){
				return structure.hits < structure.hitsMax;
			},
		}).length;
		if (structure_count > 0 && pop[Util.REPAIRER.NAME] < 1) {
			requested_creeps.push(Util.REPAIRER.init(room.name));
		}

		// attackers
		if (pop[Util.ATTACKER.NAME] < 1) {
			requested_creeps.push(Util.ATTACKER.init(room.name));
		}
		
		// healers
		if (pop[Util.HEALER.NAME] < 1) {
			requested_creeps.push(Util.HEALER.init(room.name));
		}
		this.spawnRequests(room, requested_creeps);
	},

	spawnRequests: function(room, requested_creeps){
		if (requested_creeps.length == 0) {
			Memory.rooms[room.name].satisfied = true;
			Memory.rooms[room.name].satisfied_counter++;
		}else{
			Memory.rooms[room.name].satisfied = false;
			Memory.rooms[room.name].satisfied_counter = 0;
			requested_creeps.forEach(function(creep){
				this.spawnRole(room, creep);
			});
		}
	},

	spawnRole: function(room, creep_data){
		let success = false;

		let spawns = [];
		let role = Util.getRole(creep_data.role);

		for(let [name, spawn] in Object.entries(Game.spawns)) {
			if (spawn.spawning == null && room.energyAvailable > role.energy_cost) {
				spawns.push(spawn);
			}
		}

		// sort by closest
		spawns.sort(function(a, b){
			return (Game.map.getRoomLinearDistance(room, a.room)) - (Game.map.getRoomLinearDistance(room, b.room));
		});

		for (let i = 10; i > 0; i--) {
			let result = spawns[0].spawnCreep(Util.multiArray(role.body, i), role.name + Util.generateId(), {
				memory: creep_data,
			});

			if (result == OK) {
				success = true;
			}
		}
		return success;
	},
};