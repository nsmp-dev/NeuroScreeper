const Construction = require("my_construction");

module.exports = {
	TIMER_LENGTH: 10,
	NONE: 0,
	COLONY: 1,
	EXPANSION: 2,
	POTENTIAL_COLONY: 3,
	POTENTIAL_EXPANSION: 4,
	ENEMY_COLONY: 5,

	run: function(){
	    
	    if(!Memory.room_log){
        	Memory.room_log = {};
        	let spawn = Game.spawns["Spawn1"];
        	Memory.room_log[spawn.room.name] = this.scanRoom(spawn.room);
        	Memory.room_log[spawn.room.name].type = this.COLONY;
        	Memory.room_log[spawn.room.name].base_x = spawn.pos.x - 6;
        	Memory.room_log[spawn.room.name].base_y = spawn.pos.y - 7;
        
        	let structures = Construction.createBase(spawn.room, Memory.room_log[spawn.room.name].base_x, Memory.room_log[spawn.room.name].base_y);
        	let idle_spot = Construction.findIdle(spawn.room, structures);
        
        	Memory.room_log[spawn.room.name].structures = structures;
        	Memory.room_log[spawn.room.name].idle_x = idle_spot.x;
        	Memory.room_log[spawn.room.name].idle_y = idle_spot.y;
        }
		for (let name in Game.rooms) {
			if(Memory.room_log[name] === undefined){
				Memory.room_log[name] = this.scanRoom(Game.rooms[name]);
			}else{
				Memory.room_log[name].timer++;
				if(Memory.room_log[name].timer > this.TIMER_LENGTH){
					Memory.room_log[name].timer = 0;
					Memory.room_log[name] = this.rescanRoom(Game.rooms[name]);
				}
			}
		}
	},

	scanRoom: function(room){
		let data = {
			sources: [],
			hostile_creeps: room.find(FIND_HOSTILE_CREEPS).length,
			type: this.NONE,
			timer: 0,
			satisfied: false,
			satisfied_counter: 0,
		};

		let sources = room.find(FIND_SOURCES);

		if (sources.length > 0) {
			data.sources = Construction.createSources(room);
		}

		if (sources.length > 0) {
			let base = Construction.findBase(room);
			if (sources.length > 2 && base != null) {
				data.type = this.POTENTIAL_COLONY;
				// noinspection PointlessBooleanExpressionJS
				if (base != null) {
					let structures = Construction.createBase(room, base.x, base.y);
					let idle_spot = Construction.findIdle(room);
					data.base_x = base.x;
					data.base_y = base.y;
					data.structures = structures;
					data.idle_x = idle_spot.x;
					data.idle_y = idle_spot.y;
				}
			}else{
				data.type = this.POTENTIAL_EXPANSION;
				let idle_spot = Construction.findIdle(room);
				data.structures = [];
				if (idle_spot == null) {
				    data.idle_x = 5;
				    data.idle_y = 5;
				}else{
				    data.idle_x = idle_spot.x;
				    data.idle_y = idle_spot.y;
				}
			}
		}

		return data;
	},

	rescanRoom: function(room){
		let data = Memory.room_log[room.name];
		
		data.hostile_creeps = room.find(FIND_HOSTILE_CREEPS).length;

		return data;
	},
};