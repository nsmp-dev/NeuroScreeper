module.exports = {
	refresh: function(){
		if (!Memory.initialized) {
			Memory.rooms = {};
			Memory.towers = [];
			Memory.terminals = [];
			Memory.refresh_counter = 100000;
			Memory.population_counter = 100000;
			Memory.construction_counter = 100000;
			Memory.terminal_counter = 100000;
		}


		if (Memory.refresh_counter > 2) {
			Memory.refresh_counter = 0;

			for (let [name, room] of Object.entries(Memory.rooms)) {
				room.ticks_since_seen++;
			}

			for (let [name, room] of Object.entries(Game.rooms)) {
				if (!Memory.rooms[room]) {
					Memory.rooms[room] = {};
					Memory.rooms[name].ticks_since_seen = 0;
					/*
						init room entry
						count sources
						decide type

						colony: room that is currently owned and got spawners
						outpost: expansion room to collect energy from
						hostile: had enemies last time we looked
						new_colony: room marked to be turned into a colony, needs claimers and builders
						potential_colony: room that meets the requirements for a colony, but we are not ready to expand
						none: room with no use or ememies
					*/
				}else{
					Memory.rooms[name].ticks_since_seen = 0;
					//refresh room info
					//refresh towers
					//refresh terminal
					//refresh enemies
				}
			}

			for (let [name, room] of Object.entries(Memory.rooms)) {
				if (room.ticks_since_seen > 1000) {
					delete Memory.rooms[name];
				}
			}
		}else{
			Memory.refresh_counter++;
		}
	},
};