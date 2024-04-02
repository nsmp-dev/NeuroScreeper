module.exports = {
	refresh: function(){
		if (!Memory.initialized) {
			Memory.rooms = [];
			Memory.towers = [];
			Memory.terminals = [];
			Memory.refresh_counter = 100000;
			Memory.population_counter = 100000;
			Memory.construction_counter = 100000;
			Memory.terminal_counter = 100000;
		}

		if (Memory.refresh_counter < 2) {
			Memory.refresh_counter++;
			return;
		}else{
			Memory.refresh_counter = 0;
		}
		
/*
		increment all ticks_since_seen

		refresh room list in memory
			id: Game.rooms[id] has the room object
			ticks_since_seen: reset on each visit
			type: details the overal type of this room and what properties
				colony: room that is currently owned and got spawners
				outpost: expansion room to collect energy from
				hostile: had enemies last time we looked
				new_colony: room marked to be turned into a colony, needs claimers and builders
				potential_colony: room that meets the requirements for a colony, but we are not ready to expand
				none: room with no use or ememies


		refresh tower list
			id: Game.getObjectById(id) has the tower object
*/
		
	},
};