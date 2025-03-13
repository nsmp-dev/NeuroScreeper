const Util = require('global.util');

// finds a good idle location, avoiding any planned structures
Room.prototype.planIdleLocation = function (plans) {
    // return a clear area of size 5 x 5
    let idle_location = this.getClearArea(5, 5, plans);
    plans.idle_x = idle_location.x;
    plans.idle_y = idle_location.y;
    return plans;
};

// gets the source plans for this room, avoiding any planned structures
Room.prototype.planSources = function (plans) {
    // create the list of source plans
    plans.source_plans = [];
    // find all the sources in the room
    let sources = this.find(FIND_SOURCES);

    // loop through the sources
    for (let source of sources) {
        // find an adjacent space to put the container
        let container_location = this.getClearAdjacentLocation(source.pos.x, source.pos.y, structures);

        // add the plans to the plans list
        plans.source_plans.push({
            // id of the source
            source_id: source.id,
            // x coordinate of the container
            container_x: container_location.x,
            // y coordinate of the container
            container_y: container_location.y,
        });
    }

    // return the source plans
    return plans;
};

// finds a good base location, avoiding any planned structures
Room.prototype.planBaseLocation = function (plans) {
    // find a clear area of size 14 x 14
    let base_location = this.getClearArea(14, 14, plans);
    plans.base_x = base_location.x;
    plans.base_y = base_location.y;
    return plans;
};

// gets the base plans for this room, avoiding any planned structures
Room.prototype.planBase = function (plans) {
    // get the base x coordinate
    let x = plans.base_x;
    // get the base y coordinate
    let y = plans.base_y;
    // create the list of structures
    plans.structures = plans.structures.concat([
        // coordinates and type of the structure
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
    ]);
    plans.ramparts = plans.ramparts.concat([
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
    ]);
    plans.roads = plans.roads.concat([
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
    ]);
    // concat the structure lists together
    return plans;
};

// finds a clear area of width and height, avoiding any planned structures
Room.prototype.getClearArea = function (width, height, structures) {
    // grab the terrain for the room
    let terrain_grid = this.getTerrain();
    // create a structure grid to reference
    let structure_grid = [];
    // create a list of clear spots that pass the check
    let clear_spots = [];

    // loop through the X coordinates
    for (let x = 0; x < 50; x++) {
        // add a column to the structure grid
        structure_grid.push([]);
        // loop through the Y coordinates
        for (let y = 0; y < 50; y++) {
            // place a false for that position
            structure_grid[x].push(false);
        }
    }

    // loop through the planned structures
    structures.forEach(function (structure) {
        // set this spot to taken
        structure_grid[structure.x][structure.y] = true;
    });

    // loop through all the X coordinates
    for (let x = 0; x < 50 - width; x++) {
        // loop through all the y coordinates
        for (let y = 0; y < 50 - height; y++) {

            // default to clear
            let clear = true;

            // loop through the i offset for the area
            for (let i = 0; i < width; i++) {
                // loop through the j offset for the area
                for (let j = 0; j < height; j++) {
                    // if that position is a wall or a planned structure
                    if (terrain_grid.get(x + i, y + j) == TERRAIN_MASK_WALL || structure_grid[x + i][y + j]) {
                        // mark the location as not clear
                        clear = false;
                    }
                }
            }
            // if the entire area is clear
            if (clear) {
                // get the center X coordinate
                let tx = (x + 7) - 25;
                // get the center Y coordinate
                let ty = (y + 7) - 25;
                // add the location to the list of clear spots
                clear_spots.push({
                    // the X coordinate of the area
                    x: x,
                    // the Y coordinate of the area
                    y: y,
                    // the distance from center of room to center of base
                    dist: Math.sqrt((tx * tx) + (ty * ty)),
                });
            }
        }
    }

    // if no clear spot was found
    if (clear_spots.length == 0) {
        // return null to show we couldn't find a spot
        return null;
    }

    // default the minimum distance winner
    let min = clear_spots[0];
    // loop through all the clear spots
    clear_spots.forEach(function (spot) {
        // if this spot has a lower distance than the minimum
        if (spot.dist < min.dist) {
            // store the new minimum
            min = spot;
        }
    });

    // return the clear spot that is closest to the center
    return min;
};

// finds a clear spot that is adjacent to the given x/y coordinate, avoiding any planned structures
Room.prototype.getClearAdjacentLocation = function (x, y, structures) {
    // grab the terrain for the room
    let terrain_grid = this.getTerrain();
    // create a structure grid to reference
    let structure_grid = [];
    // create a list of clear spots that pass the check
    let clear_spots = [];

    // loop through the X coordinates
    for (let x = 0; x < 50; x++) {
        // add a column to the structure grid
        structure_grid.push([]);
        // loop through the Y coordinates
        for (let y = 0; y < 50; y++) {
            // place a false for that position
            structure_grid[x].push(false);
        }
    }

    // loop through the planned structures
    structures.forEach(function (structure) {
        // set this spot to taken
        structure_grid[structure.x][structure.y] = true;
    });

    // if the top left adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x - 1, y - 1) !== TERRAIN_MASK_WALL && !structure_grid[x - 1][y - 1]) {
        // add the top left adjacent tile to the list of clear spots
        clear_spots.push({x: x - 1, y: y - 1});
    }
    // if the top adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x, y - 1) !== TERRAIN_MASK_WALL && !structure_grid[x][y - 1]) {
        // add the top adjacent tile to the list of clear spots
        clear_spots.push({x: x, y: y - 1});
    }
    // if the top right adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x + 1, y - 1) !== TERRAIN_MASK_WALL && !structure_grid[x + 1][y - 1]) {
        // add the top right adjacent tile to the list of clear spots
        clear_spots.push({x: x + 1, y: y - 1});
    }
    // if the left adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x - 1, y) !== TERRAIN_MASK_WALL && !structure_grid[x - 1][y]) {
        // add the left adjacent tile to the list of clear spots
        clear_spots.push({x: x - 1, y: y});
    }
    // if the right adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x + 1, y) !== TERRAIN_MASK_WALL && !structure_grid[x + 1][y]) {
        // add the right adjacent tile to the list of clear spots
        clear_spots.push({x: x + 1, y: y});
    }
    // if the bottom left adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x - 1, y + 1) !== TERRAIN_MASK_WALL && !structure_grid[x - 1][y + 1]) {
        // add the bottom left adjacent tile to the list of clear spots
        clear_spots.push({x: x - 1, y: y + 1});
    }
    // if the bottom adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x, y + 1) !== TERRAIN_MASK_WALL && !structure_grid[x][y + 1]) {
        // add the bottom adjacent tile to the list of clear spots
        clear_spots.push({x: x, y: y + 1});
    }
    // if the bottom right adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x + 1, y + 1) !== TERRAIN_MASK_WALL && !structure_grid[x + 1][y + 1]) {
        // add the bottom right adjacent tile to the list of clear spots
        clear_spots.push({x: x + 1, y: y + 1});
    }

    // if no clear spot was found
    if (clear_spots.length == 0) {
        // return null to show we couldn't find a spot
        return null;
    }

    // return one of the clear spots
    return clear_spots[0];
};

// spawns the largest version of the given creep in this room
Room.prototype.spawnRole = function (memory, global = false) {
    // default success to false
    let success = false;
    // list of spawns that might work
    let spawns = [];
    // role object fetched from the given memory
    let role = Util.getRole(memory.role);

    // loop through the spawns we own
    for (let name in Game.spawns) {
        // if this spawn is in the room,
        if ((Game.spawns[name].room.name == this.name || global) &&
            // not spawning anything
            Game.spawns[name].spawning == null &&
            // and has the minimum energy needed
            Game.spawns[name].room.energyAvailable > role.ENERGY_COST) {
            // add the spawn to the list of spawns
            spawns.push(Game.spawns[name]);
        }
    }

    // if there are any usable spawns
    if (spawns.length > 0) {
        // loop down from the max size to the min size
        for (let i = 10; i > 0; i--) {
            // do a test spawning
            let result = spawns[0].spawnCreep(Util.multiArray(role.BODY, i), "test", {
                // provide the given memory
                memory: memory,
                // flag the spawn as a test run
                dryRun: true,
            });

            // if the test run was a success
            if (result == OK) {
                // actually spawn the creep
                spawns[0].spawnCreep(Util.multiArray(role.BODY, i), role.NAME + Util.generateId(), {
                    // provide the given memory
                    memory: memory,
                });
                // mark this as a success
                success = true;
            }
        }
    }

    // return the result
    return success;
};

// creates structures from the given list of planned structures and source plans, capping at 5 per room
Room.prototype.createConstructionSites = function (plans) {
    // count all the sites in the room
    let site_count = this.find(FIND_MY_CONSTRUCTION_SITES).length;
    // if we have less than 5 construction sites
    if (site_count < 5) {
        // loop through the source plans for this room
        for (let source_plan of source_plans) {
            // if the container is not built
            if (!this.checkFor(source_plan.container_x, source_plan.container_y, STRUCTURE_CONTAINER)) {
                // try to place the container
                let result = this.createConstructionSite(source_plan.container_x, source_plan.container_y, STRUCTURE_CONTAINER);
                // if creating the site was successful
                if (result == OK) {
                    // increment the site_count
                    site_count++;
                    // if we have reached 5 or more sites
                    if (site_count >= 5) {
                        // break the loop
                        break;
                    }
                }
            }
        }
    }
    // if we have less than 5 construction sites
    if (site_count < 5) {
        // loop through the planned structures for this room
        for (let structure of structures) {
            // if the structure is not built
            if (!this.checkFor(structure.x, structure.y, structure.type)) {
                // try to place the structure
                let result = this.createConstructionSite(structure.x, structure.y, structure.type);
                // if creating the site was successful
                if (result == OK) {
                    // increment the site_count
                    site_count++;
                    // if we have reached 5 or more sites
                    if (site_count >= 5) {
                        // break the loop
                        break;
                    }
                }
            }
        }
    }
};

// returns whether the given structure has been built at the given x/y coordinate
Room.prototype.checkFor = function (x, y, structure_type) {
    // assume we have not found the structure
    let found = false;
    // grab the structures at this location
    let structures = this.lookForAt(LOOK_STRUCTURES, x, y);
    // loop through the structures
    for (let structure of structures) {
        // if the structure is the type we are looking for
        if (structure.structureType == structure_type) {
            // set found to true
            found = true;
            // break out of the loop
            break;
        }
    }
    // return the result of the search
    return found;
};

// finds all towers that are not full
Room.prototype.findLowTowers = function () {
    // return all the towers that are not full
    return this.find(FIND_MY_STRUCTURES, {
        // declare the filter function to use
        filter: structure => (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0),
    });
};

// finds all extensions that are not full
Room.prototype.findLowExtensions = function () {
    // find any extensions that are not full
    return this.find(FIND_MY_STRUCTURES, {
        // declare the filter function to use
        filter: structure => (structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0),
    });
};

// finds all spawns that are not full
Room.prototype.findLowSpawns = function () {
    // find all the spawns that are not full
    return this.find(FIND_MY_STRUCTURES, {
        // declare the filter function to use
        filter: structure => (structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0),
    });
};

// finds all non-empty containers
Room.prototype.findFilledContainers = function () {
    // find all the containers that are not empty
    return this.find(FIND_STRUCTURES, {
        // declare the filter function to use
        filter: structure => (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0),
    });
};

// get all names of adjacent rooms
Room.prototype.getAdjacentRooms = function () {
    // grab all the exits in the room
    let exits = Game.map.describeExits(this.name);
    // make a list of all the room names we find
    let room_names = [];

    // if the left exit is not null
    if (exits[LEFT] != null) {
        // add it to the list
        room_names.push(exits[LEFT]);
    }
    // if the top exit is not null
    if (exits[TOP] != null) {
        // add it to the list
        room_names.push(exits[TOP]);
    }
    // if the right exit is not null
    if (exits[RIGHT] != null) {
        // add it to the list
        room_names.push(exits[RIGHT]);
    }
    // if the bottom exit is not null
    if (exits[BOTTOM] != null) {
        // add it to the list
        room_names.push(exits[BOTTOM]);
    }

    // return the list of room names found
    return room_names;
};