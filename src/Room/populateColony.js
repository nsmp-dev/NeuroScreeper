const util = require('./src/util.js');

const POP_GOALS = {
	//only if enemies are present
	attacker: function(enemies){
		return enemies + 2;
	},
	//only if in bootstrap mode
	bootstrapper: 5,
	builder: 1,
	driller: function(sources){
		return sources;
	},
	queen: 1,
	repair: function(structures){
		return Math.ceil(structures / 25);
	},
	transporter: function(sources){
		return sources + 2;
	},
	upgrader: 1,
};

Room.prototype.populateColony = function () {
	let energy = this.energyAvailable;
	let spawns = this.find(FIND_MY_SPAWNS, (s) => !s.spawning);
	let spawn_i = 0;

	if (energy < 100 || spawns.length == 0) {
		return;
	}

	let pop = {
		attacker: 0,
		bootstrapper: 0,
		builder: 0,
		driller: 0,
		queen: 0,
		repair: 0,
		transporter: 0,
		upgrader: 0,
	};
	for (let [name, creep] of Object.entries(Game.creeps)) {
		if (creep.memory.room_name == this.name) {
			pop[creep.memory.role]++;
		}
	}

	let getNeededCreep = function(){
		if (Memory.rooms[this.name].mode == "bootstrap") {
			if (pop.bootstrapper < POP_GOALS.bootstrapper) {
				return {
					role: "bootstrapper",
					room_name: this.room.name,
				};
			}
		}

		if (Memory.rooms[this.name].mode == "under_attack") {
			if (pop.attack < POP_GOALS.attack) {
				return {
					role: "attack",
					room_name: this.room.name,
				};
			}
		}

		Memory.rooms[this.name].driller_spots.forEach(function(driller_spot){
			if (!driller_spot.creep) {
				driller_spot.creep = "temp";
				return {
					role: "driller",
					room_name: this.room.name,
					source: driller_spot.source,
					container: driller_spot.container,
				};
			}
		});

		if (pop.transporter < POP_GOALS.transporter(Memory.rooms[this.name].driller_spots.length)) {
			return {
				role: "transporter",
				room_name: this.room.name,
			};
		}

		if (pop.upgrader < POP_GOALS.upgrader) {
			return {
				role: "upgrader",
				room_name: this.room.name,
			};
		}

		if (this.room.controller.storage && pop.queen < POP_GOALS.queen) {
			return {
				role: "queen",
				room_name: this.room.name,
			};
		}

		if (pop.repair < POP_GOALS.repair(this.room.find(FIND_MY_STRUCTURES).length)) {
			return {
				role: "upgrader",
				room_name: this.room.name,
			};
		}

		if (pop.builder < POP_GOALS.builder) {
			return {
				role: "builder",
				room_name: this.room.name,
			};
		}
		
		return null;
	};

	let needed_creep = getNeededCreep();

	while (needed_creep) {
		let result = spawns[spawn_i].spawnRole(needed_creep);
		if (!result) {
			return;
		}
		energy -= result;
		Memory.currentPopulation[this.room.name][needed_creep.role]++;
		spawn_i++;
		needed_creep = getNeededCreep();
	}
};