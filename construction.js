module.exports = {
	TIMER_LENGTH: 10,

	run: function(room){
		if (Memory.construction_timers == undefined) {
			Memory.construction_timers = {};
		}

		if (Memory.construction_timers[room.name] == undefined) {
			Memory.construction_timers[room.name] = this.TIMER_LENGTH;
		}

		

		if (Memory.construction_timers[room.name] >= this.TIMER_LENGTH) {
			Memory.construction_timers[room.name] = 0;
		}else{
			Memory.construction_timers[room.name]++;
			return;
		}

		let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
		if (site_count >= 5) {
			return;
		}

		let structures = Memory.rooms[room.name].plans.structures;

		structures.forEach(function(structure){
			if (site_count >= 5) {
				return;
			}
			if (!Util.checkFor(room, structure.x, structure.y, structure.type)) {
				let result = room.createConstructionSite(structure.x, structure.y, structure.type);
				if (result == OK) {
					site_count++;
				}
			}
		});
	},

	findBase: function(room){
		let result = {
			x: null,
			y: null,
		}

		let terrain = new Room.Terrain(room.name);
		let clear_spots = [];
		// calculates if a base can be made in this room
		// returns it's top left corner coordinates

		for (let x = 0; x < 50; x++) {
			for (let y = 0; y < 50; y++) {

				let clear = true;

				for (let i = 0; i < 14; i++) {
					for (let j = 0; j < 14; j++) {

						if (terrain.get(x+i,y+j) == TERRAIN_MASK_WALL) {
							clear = false;
						}
					}
				}
				if (clear) {
					let tx = (x + 7) - 25;
					let ty = (y + 7) - 25;
					clear_spots.append({
						x:x,
						y:y,
						dist: Math.sqrt((tx*tx) + (ty*ty)),
					});
				}
			}
		}

		if (clear_spots.length == 0) {
			return null;
		}

		let min = clear_spots[0];
		clear_spots.forEach(function(spot){
			if (spot.dist < min.dist) {
				min = spot;
			}
		});

		return min;
	},

	createExpansion: function(room){
		let structures = [];

		let sources = room.find(FIND_SOURCES);
		let terrain = new Room.Terrain(room.name);

		sources.forEach(function(source){
			let clear_spots = [];
			let x = source.pos.x;
			let y = source.pos.y;

			if (terrain.get(x-1, y-1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x-1, y: y-1});
			}
			if (terrain.get(x, y-1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x, y: y-1});
			}
			if (terrain.get(x+1, y-1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x+1, y: y-1});
			}
			if (terrain.get(x-1, y) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x-1, y: y});
			}
			if (terrain.get(x+1, y) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x+1, y: y});
			}
			if (terrain.get(x-1, y+1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x-1, y: y+1});
			}
			if (terrain.get(x, y+1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x, y: y+1});
			}
			if (terrain.get(x+1, y+1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x+1, y: y+1});
			}

			structures.push({x: clear_spots[0].x, y: clear_spots[0].y, type: STRUCTURE_CONTAINER});
		});

		return structures;
	},

	findIdle: function(room, structures){
		let result = {
			x: null,
			y: null,
		};

		//find idle spot...
		let terrain = new Room.Terrain(room.name);
		let clear_spots = [];
		// calculates if a base can be made in this room
		// returns it's top left corner coordinates

		for (let x = 0; x < 50; x++) {
			for (let y = 0; y < 50; y++) {

				let clear = true;

				for (let i = 0; i < 14; i++) {
					for (let j = 0; j < 14; j++) {

						if (terrain.get(x+i,y+j) == TERRAIN_MASK_WALL) {
							clear = false;
						}
					}
				}
				if (clear) {
					let tx = (x + 7) - 25;
					let ty = (y + 7) - 25;
					clear_spots.append({
						x:x,
						y:y,
						dist: Math.sqrt((tx*tx) + (ty*ty)),
					});
				}
			}
		}

		if (clear_spots.length == 0) {
			return null;
		}

		let min = clear_spots[0];
		clear_spots.forEach(function(spot){
			if (spot.dist < min.dist) {
				min = spot;
			}
		});

		return min;
		// idle spot needs to be a 5x5 area that is clear of all walla and base


		return result;
	},

	createBase: function(room, x, y){
		// base
		let structures = [
			{x: x + 1, y: y, type: STRUCTURE_EXTENSION},
			{x: x + 5, y: y, type: STRUCTURE_EXTENSION},
			{x: x + 7, y: y, type: STRUCTURE_EXTENSION},
			{x: x + 11, y: y, type: STRUCTURE_EXTENSION},
			{x: x, y: y + 1, type: STRUCTURE_EXTENSION},
			{x: x + 2, y: y + 1, type: STRUCTURE_EXTENSION},
			{x: x + 3, y: y + 1, type: STRUCTURE_EXTENSION},
			{x: x + 5, y: y + 1, type: STRUCTURE_EXTENSION},
			{x: x + 7, y: y + 1, type: STRUCTURE_EXTENSION},
			{x: x + 9, y: y + 1, type: STRUCTURE_EXTENSION},
			{x: x + 10, y: y + 1, type: STRUCTURE_EXTENSION},
			{x: x + 12, y: y + 1, type: STRUCTURE_EXTENSION},
			{x: x + 1, y: y + 2, type: STRUCTURE_EXTENSION},
			{x: x + 3, y: y + 2, type: STRUCTURE_EXTENSION},
			{x: x + 4, y: y + 2, type: STRUCTURE_EXTENSION},
			{x: x + 5, y: y + 2, type: STRUCTURE_EXTENSION},
			{x: x + 7, y: y + 2, type: STRUCTURE_EXTENSION},
			{x: x + 8, y: y + 2, type: STRUCTURE_EXTENSION},
			{x: x + 9, y: y + 2, type: STRUCTURE_EXTENSION},
			{x: x + 11, y: y + 2, type: STRUCTURE_EXTENSION},
			{x: x + 1, y: y + 3, type: STRUCTURE_EXTENSION},
			{x: x + 2, y: y + 3, type: STRUCTURE_EXTENSION},
			{x: x + 4, y: y + 3, type: STRUCTURE_EXTENSION},
			{x: x + 5, y: y + 3, type: STRUCTURE_EXTENSION},
			{x: x + 7, y: y + 3, type: STRUCTURE_EXTENSION},
			{x: x + 8, y: y + 3, type: STRUCTURE_EXTENSION},
			{x: x + 10, y: y + 3, type: STRUCTURE_EXTENSION},
			{x: x + 11, y: y + 3, type: STRUCTURE_EXTENSION},
			{x: x + 2, y: y + 4, type: STRUCTURE_EXTENSION},
			{x: x + 3, y: y + 4, type: STRUCTURE_EXTENSION},
			{x: x + 9, y: y + 4, type: STRUCTURE_EXTENSION},
			{x: x + 10, y: y + 4, type: STRUCTURE_EXTENSION},
			{x: x, y: y + 5, type: STRUCTURE_EXTENSION},
			{x: x + 1, y: y + 5, type: STRUCTURE_EXTENSION},
			{x: x + 2, y: y + 5, type: STRUCTURE_EXTENSION},
			{x: x + 3, y: y + 5, type: STRUCTURE_EXTENSION},
			{x: x + 9, y: y + 5, type: STRUCTURE_EXTENSION},
			{x: x + 10, y: y + 5, type: STRUCTURE_EXTENSION},
			{x: x + 11, y: y + 5, type: STRUCTURE_EXTENSION},
			{x: x + 12, y: y + 5, type: STRUCTURE_EXTENSION},
			{x: x, y: y + 7, type: STRUCTURE_EXTENSION},
			{x: x + 1, y: y + 7, type: STRUCTURE_EXTENSION},
			{x: x + 2, y: y + 7, type: STRUCTURE_EXTENSION},
			{x: x + 3, y: y + 7, type: STRUCTURE_EXTENSION},
			{x: x + 9, y: y + 7, type: STRUCTURE_EXTENSION},
			{x: x + 10, y: y + 7, type: STRUCTURE_EXTENSION},
			{x: x + 11, y: y + 7, type: STRUCTURE_EXTENSION},
			{x: x + 12, y: y + 7, type: STRUCTURE_EXTENSION},
			{x: x + 2, y: y + 8, type: STRUCTURE_EXTENSION},
			{x: x + 3, y: y + 8, type: STRUCTURE_EXTENSION},
			{x: x + 9, y: y + 8, type: STRUCTURE_EXTENSION},
			{x: x + 10, y: y + 8, type: STRUCTURE_EXTENSION},
			{x: x + 1, y: y + 9, type: STRUCTURE_EXTENSION},
			{x: x + 2, y: y + 9, type: STRUCTURE_EXTENSION},
			{x: x + 4, y: y + 9, type: STRUCTURE_EXTENSION},
			{x: x + 5, y: y + 9, type: STRUCTURE_EXTENSION},
			{x: x + 7, y: y + 9, type: STRUCTURE_EXTENSION},
			{x: x + 8, y: y + 9, type: STRUCTURE_EXTENSION},
			{x: x + 10, y: y + 9, type: STRUCTURE_EXTENSION},
			{x: x + 11, y: y + 9, type: STRUCTURE_EXTENSION},
			{x: x + 1, y: y + 10, type: STRUCTURE_EXTENSION},
			{x: x + 3, y: y + 10, type: STRUCTURE_EXTENSION},
			{x: x + 4, y: y + 10, type: STRUCTURE_EXTENSION},
			{x: x + 5, y: y + 10, type: STRUCTURE_EXTENSION},
			{x: x + 7, y: y + 10, type: STRUCTURE_EXTENSION},
			{x: x + 8, y: y + 10, type: STRUCTURE_EXTENSION},
			{x: x + 9, y: y + 10, type: STRUCTURE_EXTENSION},
			{x: x + 11, y: y + 10, type: STRUCTURE_EXTENSION},
			{x: x, y: y + 11, type: STRUCTURE_EXTENSION},
			{x: x + 2, y: y + 11, type: STRUCTURE_EXTENSION},
			{x: x + 3, y: y + 11, type: STRUCTURE_EXTENSION},
			{x: x + 5, y: y + 11, type: STRUCTURE_EXTENSION},
			{x: x + 7, y: y + 11, type: STRUCTURE_EXTENSION},
			{x: x + 9, y: y + 11, type: STRUCTURE_EXTENSION},
			{x: x + 10, y: y + 11, type: STRUCTURE_EXTENSION},
			{x: x + 12, y: y + 11, type: STRUCTURE_EXTENSION},
			{x: x + 1, y: y + 12, type: STRUCTURE_EXTENSION},
			{x: x + 5, y: y + 12, type: STRUCTURE_EXTENSION},
			{x: x + 7, y: y + 12, type: STRUCTURE_EXTENSION},
			{x: x + 11, y: y + 12, type: STRUCTURE_EXTENSION},
			{x: x + 7, y: y + 6, type: STRUCTURE_TOWER},
			{x: x + 4, y: y + 7, type: STRUCTURE_TOWER},
			{x: x + 8, y: y + 7, type: STRUCTURE_TOWER},
			{x: x + 4, y: y + 9, type: STRUCTURE_TOWER},
			{x: x + 8, y: y + 9, type: STRUCTURE_TOWER},
			{x: x + 5, y: y + 10, type: STRUCTURE_TOWER},
			{x: x + 5, y: y + 8, type: STRUCTURE_SPAWN},
			{x: x + 7, y: y + 8, type: STRUCTURE_SPAWN},
			{x: x + 6, y: y + 9, type: STRUCTURE_SPAWN},
			{x: x + 6, y: y + 7, type: STRUCTURE_STORAGE},
			{x: x + 5, y: y + 6, type: STRUCTURE_OBSERVER},
			{x: x + 7, y: y + 10, type: STRUCTURE_TERMINAL},
			{x: x, y: y, type: STRUCTURE_ROAD},
			{x: x + 6, y: y, type: STRUCTURE_ROAD},
			{x: x + 12, y: y, type: STRUCTURE_ROAD},
			{x: x + 1, y: y + 1, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 1, type: STRUCTURE_ROAD},
			{x: x + 11, y: y + 1, type: STRUCTURE_ROAD},
			{x: x + 2, y: y + 2, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 2, type: STRUCTURE_ROAD},
			{x: x + 10, y: y + 2, type: STRUCTURE_ROAD},
			{x: x + 3, y: y + 3, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 3, type: STRUCTURE_ROAD},
			{x: x + 9, y: y + 3, type: STRUCTURE_ROAD},
			{x: x + 4, y: y + 4, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 4, type: STRUCTURE_ROAD},
			{x: x + 8, y: y + 4, type: STRUCTURE_ROAD},
			{x: x + 5, y: y + 5, type: STRUCTURE_ROAD},
			{x: x + 7, y: y + 5, type: STRUCTURE_ROAD},
			{x: x, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 1, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 2, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 3, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 4, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 8, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 9, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 10, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 11, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 12, y: y + 6, type: STRUCTURE_ROAD},
			{x: x + 5, y: y + 7, type: STRUCTURE_ROAD},
			{x: x + 7, y: y + 7, type: STRUCTURE_ROAD},
			{x: x + 4, y: y + 8, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 8, type: STRUCTURE_ROAD},
			{x: x + 8, y: y + 8, type: STRUCTURE_ROAD},
			{x: x + 3, y: y + 9, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 9, type: STRUCTURE_ROAD},
			{x: x + 9, y: y + 9, type: STRUCTURE_ROAD},
			{x: x + 2, y: y + 10, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 10, type: STRUCTURE_ROAD},
			{x: x + 10, y: y + 10, type: STRUCTURE_ROAD},
			{x: x + 1, y: y + 11, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 11, type: STRUCTURE_ROAD},
			{x: x + 11, y: y + 11, type: STRUCTURE_ROAD},
			{x: x, y: y + 12, type: STRUCTURE_ROAD},
			{x: x + 6, y: y + 12, type: STRUCTURE_ROAD},
			{x: x + 12, y: y + 12, type: STRUCTURE_ROAD},
			{x: x + 1, y: y, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y, type: STRUCTURE_RAMPART},
			{x: x, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 12, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 4, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 8, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 4, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 8, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 4, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 4, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 4, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 4, type: STRUCTURE_RAMPART},
			{x: x, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x + 12, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 12, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 8, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 8, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 8, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 8, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 4, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 8, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 4, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 8, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 12, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 12, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 12, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 12, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 12, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 4, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 8, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 4, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 8, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 8, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 8, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x, y: y, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y, type: STRUCTURE_RAMPART},
			{x: x + 12, y: y, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 1, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 2, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 3, type: STRUCTURE_RAMPART},
			{x: x + 4, y: y + 4, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 4, type: STRUCTURE_RAMPART},
			{x: x + 8, y: y + 4, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 5, type: STRUCTURE_RAMPART},
			{x: x, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 4, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 8, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 12, y: y + 6, type: STRUCTURE_RAMPART},
			{x: x + 5, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 7, y: y + 7, type: STRUCTURE_RAMPART},
			{x: x + 4, y: y + 8, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 8, type: STRUCTURE_RAMPART},
			{x: x + 8, y: y + 8, type: STRUCTURE_RAMPART},
			{x: x + 3, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 9, y: y + 9, type: STRUCTURE_RAMPART},
			{x: x + 2, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 10, y: y + 10, type: STRUCTURE_RAMPART},
			{x: x + 1, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x + 11, y: y + 11, type: STRUCTURE_RAMPART},
			{x: x, y: y + 12, type: STRUCTURE_RAMPART},
			{x: x + 6, y: y + 12, type: STRUCTURE_RAMPART},
			{x: x + 12, y: y + 12, type: STRUCTURE_RAMPART},
		];

		// containers
		let sources = room.find(FIND_SOURCES);
		let terrain = new Room.Terrain(room.name);

		sources.forEach(function(source){
			let clear_spots = [];
			let x = source.pos.x;
			let y = source.pos.y;

			if (terrain.get(x-1, y-1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x-1, y: y-1});
			}
			if (terrain.get(x, y-1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x, y: y-1});
			}
			if (terrain.get(x+1, y-1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x+1, y: y-1});
			}
			if (terrain.get(x-1, y) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x-1, y: y});
			}
			if (terrain.get(x+1, y) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x+1, y: y});
			}
			if (terrain.get(x-1, y+1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x-1, y: y+1});
			}
			if (terrain.get(x, y+1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x, y: y+1});
			}
			if (terrain.get(x+1, y+1) != TERRAIN_MASK_WALL){
				clear_spots.push({x: x+1, y: y+1});
			}

			structures.push({x: clear_spots[0].x, y: clear_spots[0].y, type: STRUCTURE_CONTAINER});
		});

		return structures;
	},
};