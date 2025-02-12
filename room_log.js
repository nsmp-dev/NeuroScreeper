const Construction = require("construction");

module.exports = {
	TIMER_LENGTH: 10,
	NONE: 0,
	COLONY: 1,
	EXPANSION: 2,
	POTENTIAL_COLONY: 3,
	POTENTIAL_EXPANSION: 4,
	ENEMY_COLONY: 5,

	run: function(){
		if(!Memory.rooms){
			Memory.rooms = {};
			let spawn = Game.spawns["Spawn1"];
			Memory.rooms[spawn.room.name] = this.scanRoom(spawn.room);
			Memory.rooms[spawn.room.name].base_x = spawn.pos.x - 6;
			Memory.rooms[spawn.room.name].base_y = spawn.pos.y - 7;

			let structures = Construction.createBase(spawn.room, Memory.rooms[spawn.room.name].base_x, Memory.rooms[spawn.room.name].base_y);
			let idle_spot = Construction.findIdle(spawn.room);
		}

		for (let [name, room] of Object.entries(Game.rooms)) {
			if(Memory.rooms[name] == undefined){
				Memory.rooms[name] = this.scanRoom(room);
			}else{
				Memory.rooms[name].timer--;
				if(Memory.rooms[name].timer == 0){
					Memory.rooms[name].timer = this.TIMER_LENGTH;
					Memory.rooms[name] = this.rescanRoom(room);
				}
			}
		}
	},

	scanRoom: function(room){
		let data = {
			sources: [],
			hostile_creeps: room.find(FIND_HOSTILE_CREEPS).length,
			type: this.NONE,
			timer: this.TIMER_LENGTH,
			satisfied: false,
			satisfied_counter: 0,
		};

		let spawns = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
		let sources = room.find(FIND_SOURCES);

		if (spawns.length > 0) {
			data.type = this.COLONY;
			let base = Construction.findBase(room);
			let structures = Construction.createBase(room, base.x, base.y);
			let idle_spot = Construction.findIdle(room);
			data.plans = {
				base_x: base.x,
				base_y: base.y,
				structures: structures,
				idle_x: idle_spot.x,
				idle_y: idle_spot.y,
			};
		}else{
			if (sources.length > 0) {
				let base = Construction.findBase(room);
				if (sources.length > 2 && base != null) {
					data.type = this.POTENTIAL_COLONY;
					let idle_spot = Construction.findIdle(room);
					if (base != null) {
						let structures = Construction.createBase(room, base.x, base.y);
						let idle_spot = Construction.findIdle(room);
						data.plans = {
							base_x: base.x,
							base_y: base.y,
							structures: structures,
							idle_x: idle_spot.x,
							idle_y: idle_spot.y,
						};
					}
				}
				if (data.type == this.NONE) {
					data.type = this.POTENTIAL_EXPANSION;
					let structures = Construction.createExpansion(room);
					let idle_spot = Construction.findIdle(room);
					data.plans = {
						structures: structures,
						idle_x: idle_spot.x,
						idle_y: idle_spot.y,
					};
				}
			}
		}

		sources.forEach(function(source){
			data.sources.push(source.id);
		});

		return data;
	},

	rescanRoom: function(room){
		let data = Memory.rooms[room.name];
		
		data.hostile_creeps = room.find(FIND_HOSTILE_CREEPS).length;

		return data;
	},
};