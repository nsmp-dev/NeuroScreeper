const Util = require("my_util");
const RoomLog = require("room_log");

if (Memory.population === undefined) {
	Memory.population = {};
	Memory.population.timers = {};
}

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
		let pop = this.populations;

		for (let [room_name, room_data] of Object.entries(Memory.room_log)) {
			if (room_data.type === RoomLog.COLONY || room_data.type === RoomLog.EXPANSION) {
				pop[room_name].sources = {};
				pop[room_name].total = 0;

				let sources = Memory.room_log[room_name].sources;

				sources.forEach(function(source){
					pop[room_name].sources[source.source_id] = {
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
	},

	runColony: function(room){
		if (Memory.population_timers[room.name] === undefined) {
			Memory.population_timers[room.name] = this.TIMER_LENGTH;
		}

		if (Memory.population_timers[room.name] >= this.TIMER_LENGTH) {
			Memory.population_timers[room.name] = 0;
		}else{
			Memory.population_timers[room.name]++;
			return;
		}

		this.count_population();

		if (Memory.room_log[room.name].boostrap_mode === undefined) {
			Memory.room_log[room.name].boostrap_mode = true;
			Memory.room_log[room.name].boostrap_timer = 0;
		}

		let pop = this.populations[room.name];
		if (pop.total === 0 && !Memory.room_log[room.name].boostrap_mode) {
			Memory.room_log[room.name].boostrap_mode = true;
			Memory.room_log[room.name].boostrap_timer = 0;
		}

		// make a list of needed roles
		let requested_creeps = [];

		// handle bootstrap
		if (Memory.room_log[room.name].boostrap_mode) {
			if (Memory.room_log[room.name].boostrap_timer > this.BOOTSTRAP_LENGTH) {
				Memory.room_log[room.name].boostrap_mode = false;
			}else{
				Memory.room_log[room.name].boostrap_timer++;
				if (!room.controller.my && pop[Util.CLAIMER.NAME] < 1) {
					requested_creeps.push(Util.CLAIMER.init(room.name));
				}else{
					requested_creeps.push(room, Util.HARVESTER.init(room.name));
				}				
			}
		}else{
			// drillers and transporters
			// noinspection DuplicatedCode
			pop.sources.forEach(function(data, source_id){
				if (data.driller == null) {
					requested_creeps.push(Util.DRILLER.init(room.name, source_id, data.container_x, data.container_y));
				}
				if (data.transporter == null) {
					requested_creeps.push(Util.TRANSPORTER.init(room.name, source_id, data.container_x, data.container_y));
				}
			});

			// upgraders
			if (pop[Util.UPGRADER.NAME] < 1) {
				requested_creeps.push(Util.UPGRADER.init(room.name));
			}

			// builders
			// noinspection DuplicatedCode
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
			if (room.controller !== undefined && pop[Util.QUEEN.NAME] < 1) {
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
		}

		this.spawnRequests(room, requested_creeps);
	},

	runExpansion: function(room){
		if (Memory.population_timers === undefined) {
			Memory.population_timers = {};
		}

		if (Memory.population_timers[room.name] === undefined) {
			Memory.population_timers[room.name] = this.TIMER_LENGTH;
		}

		Memory.population_timers[room.name]--;

		if (Memory.population_timers[room.name] === 0) {
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
		// noinspection DuplicatedCode
		pop.sources.forEach(function(data, source_id){
			if (data.driller == null) {
				requested_creeps.push(Util.DRILLER.init(room.name, source_id, data.container_x, data.container_y));
			}
			if (data.transporter == null) {
				requested_creeps.push(Util.TRANSPORTER.init(room.name, source_id, data.container_x, data.container_y));
			}
		});

		// builders
		// noinspection DuplicatedCode
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
		if (requested_creeps.length === 0) {
			Memory.room_log[room.name].satisfied = true;
			Memory.room_log[room.name].satisfied_counter++;
			Memory.room_log[room.name].unsatisfied_counter = 0;
		}else{
			Memory.room_log[room.name].unsatisfied_counter++;
			if (Memory.room_log[room.name].unsatisfied_counter > 50) {
				Memory.room_log[room.name].satisfied = false;
				Memory.room_log[room.name].satisfied_counter = 0;
			}

			requested_creeps.forEach(function(creep){
				this.spawnRole(room, creep);
			});
		}
	},

	spawnRole: function(room, creep_data){
		let success = false;

		let spawns = [];
		let role = Util.getRole(creep_data.role);

		for(let name in Game.spawns) {
			if (Game.spawns[name].spawning == null && room.energyAvailable > role.ENERGY_COST) {
				spawns.push(Game.spawns[name]);
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

			if (result === OK) {
				success = true;
			}
		}
		return success;
	},
};