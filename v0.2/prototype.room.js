Room.prototype.getIdleLocation = function(structures){
	return this.getClearArea(5,5,structures);
};

Room.prototype.getSourcePlans = function(structures){
	let source_plans = [];
	let sources = this.find(FIND_SOURCES);

	sources.forEach(function(source){
		let container_location = this.getClearAdjacentLocation(source.pos.x, source.pos.y, structures);

		source_plans.push({
			source_id: source.id,
			container_x: container_location.x,
			container_y: container_location.y,
		});
	});

	return source_plans;
};

Room.prototype.findBaseLocation = function(structures){
	return this.getClearArea(14, 14, structures);
};

Room.prototype.getBasePlans = function(base_location, structures){
	let x = base_location.x;
	let y = base_location.y;
	let new_structures = [
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

	return structures.concat(new_structures);
};

Room.prototype.getClearArea = function(width, height, structures){
	// returns the top left point of the area closest to center of the room that is clear of terrain and structures
	// returns null if no area can be found

	let terrain_grid = this.getTerrain();
	let structure_grid = [];
	
	let clear_spots = [];
	// calculates if a base can be made in this room
	// returns it's top left corner coordinates

	for (let x = 0; x < 50; x++) {
		structure_grid.push([]);
		for (let y = 0; y < 50; y++) {
			structure_grid[x].push(false);
		}
	}

	structures.forEach(function(structure){
		structure_grid[structure.x][structure.y] = true;
	});

	for (let x = 0; x < 50; x++) {
		for (let y = 0; y < 50; y++) {

			let clear = true;

			for (let i = 0; i < width; i++) {
				for (let j = 0; j < height; j++) {
					if (terrain_grid.get(x+i,y+j) == TERRAIN_MASK_WALL || structure_grid[x+i][y+j]) {
						clear = false;
					}
				}
			}
			if (clear) {
				let tx = (x + 7) - 25;
				let ty = (y + 7) - 25;
				clear_spots.push({
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
};

Room.prototype.getClearAdjacentLocation = function(x, y, structures){
	// returns the top left point of the area closest to center of the room that is clear of terrain and structures
	// returns null if no area can be found

	let terrain_grid = this.getTerrain();
	let structure_grid = [];
	
	let clear_spots = [];
	// calculates if a base can be made in this room
	// returns it's top left corner coordinates

	for (let x = 0; x < 50; x++) {
		structure_grid.push([]);
		for (let y = 0; y < 50; y++) {
			structure_grid[x].push(false);
		}
	}

	structures.forEach(function(structure){
		structure_grid[structure.x][structure.y] = true;
	});

	if (terrain_grid.get(x-1, y-1) !== TERRAIN_MASK_WALL && !structure_grid[x-1][y-1]){
		clear_spots.push({x: x-1, y: y-1});
	}
	if (terrain_grid.get(x, y-1) !== TERRAIN_MASK_WALL && !structure_grid[x][y-1]){
		clear_spots.push({x: x, y: y-1});
	}
	if (terrain_grid.get(x+1, y-1) !== TERRAIN_MASK_WALL && !structure_grid[x+1][y-1]){
		clear_spots.push({x: x+1, y: y-1});
	}
	if (terrain_grid.get(x-1, y) !== TERRAIN_MASK_WALL && !structure_grid[x-1][y]){
		clear_spots.push({x: x-1, y: y});
	}
	if (terrain_grid.get(x+1, y) !== TERRAIN_MASK_WALL && !structure_grid[x+1][y]){
		clear_spots.push({x: x+1, y: y});
	}
	if (terrain_grid.get(x-1, y+1) !== TERRAIN_MASK_WALL && !structure_grid[x-1][y+1]){
		clear_spots.push({x: x-1, y: y+1});
	}
	if (terrain_grid.get(x, y+1) !== TERRAIN_MASK_WALL && !structure_grid[x][y+1]){
		clear_spots.push({x: x, y: y+1});
	}
	if (terrain_grid.get(x+1, y+1) !== TERRAIN_MASK_WALL && !structure_grid[x+1][y+1]){
		clear_spots.push({x: x+1, y: y+1});
	}

	if (clear_spots.length == 0) {
		return null;
	}

	return clear_spots[0];
};

Room.prototype.spawnRole = function(memory){
	let success = false;
	let spawns = [];
	let role = Util.getRole(memory.role);
	

	for(let name in Game.spawns) {
		if (Game.spawns[name].room.name == this.name && Game.spawns[name].spawning == null && Game.spawns[name].room.energyAvailable > role.ENERGY_COST) {
			spawns.push(Game.spawns[name]);
		}
	}
	
	if (spawns.length > 0) {
		for (let i = 10; i > 0; i--) {
			let result = spawns[0].spawnCreep(Util.multiArray(role.BODY, i), "test", {
				memory: memory,
				dryRun: true,
			});

			if (result == OK) {
				spawns[0].spawnCreep(Util.multiArray(role.BODY, i), role.NAME + Util.generateId(), {
					memory: memory,
				});
				success = true;
			}
		}
	}
	
	return success;
};