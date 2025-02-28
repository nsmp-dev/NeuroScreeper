const Util = require("my_util");
const RoomLog = require("my_room_log");



module.exports = {
	TIMER_LENGTH: 10,
	BOOTSTRAP_LENGTH: 500,

	count_population: function(){
		if (Game.time === Memory.population.last_counted) {
			return;
		}
		
		Memory.population.last_counted = Game.time;
		let pop = {};

		for (let name in Memory.room_log) {
			if (Memory.room_log[name].type === RoomLog.COLONY || Memory.room_log[name].type === RoomLog.EXPANSION) {
			    pop[name] = {};
				pop[name].sources = {};
				pop[name].total = 0;

				let sources = Memory.room_log[name].sources;

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
		Memory.population.populations = pop;
	},

	runColony: function(room){
	    if (Memory.population === undefined) {
        	Memory.population = {};
        	Memory.population.timers = {};
        	Memory.population.populations = {};
        }
		if (Memory.population.timers[room.name] === undefined) {
			Memory.population.timers[room.name] = this.TIMER_LENGTH;
		}

		if (Memory.population.timers[room.name] >= this.TIMER_LENGTH) {
			Memory.population.timers[room.name] = 0;
		}else{
			Memory.population.timers[room.name]++;
			if (Memory.room_log[room.name].boostrap_mode) {
			    Memory.room_log[room.name].boostrap_timer++;
			}
			return;
		}

		this.count_population();

		if (Memory.room_log[room.name].boostrap_mode === undefined) {
			Memory.room_log[room.name].boostrap_mode = true;
			Memory.room_log[room.name].boostrap_timer = 0;
		}

		let pop = Memory.population.populations[room.name];
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
				if (!room.controller.my && pop[Util.CLAIMER.NAME] < 1) {
					requested_creeps.push(Util.CLAIMER.init(room.name));
				}else{
					requested_creeps.push(Util.HARVESTER.init(room.name));
					if (pop[Util.HARVESTER.NAME] < 2) {
        				requested_creeps.push(Util.HARVESTER.init(room.name));
        			}
        			let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
        			if (site_count > 0 && pop[Util.BUILDER.NAME] < 1) {
        				requested_creeps.push(Util.BUILDER.init(room.name));
        			}
				}
			}
		}else{
		    console.log("gathering requests");
			// drillers and transporters
			// noinspection DuplicatedCode
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
		}

		this.spawnRequests(room, requested_creeps);
	},

	runExpansion: function(room){
	    if (Memory.population === undefined) {
        	Memory.population = {};
        	Memory.population.timers = {};
        }
		if (Memory.population.timers[room.name] === undefined) {
			Memory.population.timers[room.name] = this.TIMER_LENGTH;
		}

		if (Memory.population.timers[room.name] >= this.TIMER_LENGTH) {
			Memory.population.timers[room.name] = 0;
		}else{
			Memory.population.timers[room.name]++;
			return;
		}

		this.count_population();

		let pop = Memory.population.populations[room.name];
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

			for (let requested_creep of requested_creeps) {
			    console.log("trying to spawn a " + JSON.stringify(requested_creep));
			    if (!this.spawnRole(room, requested_creep)) {
			        return;
			    }else{
			        console.log("failed to spawn");
			    }
			}
		}
	},

	spawnRole: function(room, creep_data){
		let success = false;

		let spawns = [];
		let role = Util.getRole(creep_data.role);
		

		for(let name in Game.spawns) {
			if (Game.spawns[name].spawning == null && Game.spawns[name].room.energyAvailable > role.ENERGY_COST) {
				spawns.push(Game.spawns[name]);
			}
		}

		// sort by closest
		spawns.sort(function(a, b){
			return (Game.map.getRoomLinearDistance(room, a.room)) - (Game.map.getRoomLinearDistance(room, b.room));
		});
		
		if (spawns.length > 0) {
		    for (let i = 10; i > 0; i--) {
    			let result = spawns[0].spawnCreep(Util.multiArray(role.BODY, i), role.NAME + Util.generateId(), {
    				memory: creep_data,
    			});
    
    			if (result === OK) {
    				success = true;
    				break;
    			}
    		}
		}
		
		return success;
	},
};