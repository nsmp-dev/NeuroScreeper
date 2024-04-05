module.exports = {
	refresh: function(){
		if (!Memory.initialized) {
			Memory.finished_last_tick = false;
			Memory.finished_tick_count = 0;

			Memory.population_counter = 100000;
			Memory.construction_counter = 100000;
			Memory.terminal_counter = 100000;
			Memory.room_manager_counter = 100000;

			Memory.rooms = {};
		}

		if (Memory.finished_last_tick) {
			Memory.finished_tick_count++;
		}else{
			Memory.finished_last_tick = 0;
		}

		if (Memory.finished_tick_count > 100) {
			Memory.is_stable = true;
		}else{
			Memory.is_stable = false;
		}

		Memory.finished_last_tick = false;
		Memory.population_counter++;
		Memory.construction_counter++;
		Memory.terminal_counter++;
		Memory.room_manager_counter++;

		for (let [name, room] of Object.entries(Game.rooms)) {
			if (!room.memory.initialized) {
				room.memory.initialized = true;

				room.memory.sources = [];
				let sources = room.find(FIND_SOURCES);
				for (let i = 0; i < sources.length; i++) {
					room.memory.sources.push(sources[i].id);
				}

				for (let x = 5; x < 45; x++) {
					for (let y = 5; y < 45; y++) {
						let look_result = room.lookAtArea(x-1,y-1,x+1,y+1,true);
						let clear = true;
						look_result.forEach(function(item){
							if (OBSTACLE_OBJECT_TYPES.indexOf(item.type) > -1 || (item.type == "terrain" && item.terrain = "wall")) {
								clear = false;
							}
						});
						if (clear) {
							room.idle_x = x;
							room.idle_y = y;
						}
					}
				}

				if (!room.memory.idle_x) {
					room.memory.idle_x = 5;
					room.memory.idle_y = 5;
				}
			}
			room.memory.hostile_count = room.find(FIND_HOSTILE_CREEPS).length + room.find(FIND_HOSTILE_POWER_CREEPS).length;
		}
	},
};