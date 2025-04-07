const Util = require('global.util');
const Point = require("data.point");

hlog("Creating room prototypes...");

/**
 * renders the stats in the given room
 * @param {RoomPlans} plans - The plans of the room
 * @return {Boolean[][]} the 2D grid describing the taken and open spots as booleans
 */
Room.prototype.getStructureGrid = function (plans) {
    // 2d array of all the spots in the room
    let structure_grid = [];
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
    for (let structure of plans.structures) {
        // set this spot to taken
        structure_grid[structure.location.x][structure.location.y] = true;
    }

    // loop through the source plans
    for (let source_plan of plans.sources) {
        // set this spot to taken
        structure_grid[source_plan.container_location.x][source_plan.container_location.y] = true;
    }

    // loop through the mineral plans
    for (let mineral_plan of plans.minerals) {
        // set this spot to taken
        structure_grid[mineral_plan.container_location.x][mineral_plan.container_location.y] = true;
    }

    // return the final structure grid
    return structure_grid;
};
/**
 * finds a clear area of width and height, avoiding any planned structures
 * @param {number} width - width of the area to find
 * @param {number} height - height of the area to find
 * @param {RoomPlans} plans - the plans so far so we can avoid structures
 * @return {Point|null} the top left of the area found or null if none is found
 */
Room.prototype.getClearArea = function (width, height, plans) {
    // grab the terrain for the room
    let terrain_grid = this.getTerrain();
    // create a structure grid to reference
    let structure_grid = this.getStructureGrid(plans);
    // create a list of clear spots that pass the check
    let clear_spots = [];

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
                let tx = (x + Math.floor(width/2)) - 25;
                // get the center Y coordinate
                let ty = (y + Math.floor(height/2)) - 25;
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
    return new Point(min.x, min.y);
};
/**
 * finds a clear spot that is adjacent to the given x/y coordinate, avoiding any planned structures
 * @param {number} x - The x coordinate of the location around which we are checking
 * @param {number} y - The y coordinate of the location around which we are checking
 * @param {RoomPlans} plans - the plans so far so we can avoid structures
 * @return {Point|null} The Point that is clear around the given location
 */
Room.prototype.getClearAdjacentLocation = function (x, y, plans) {
    // grab the terrain for the room
    let terrain_grid = this.getTerrain();
    // create a structure grid to reference
    let structure_grid = this.getStructureGrid(plans);
    // create a list of clear spots that pass the check
    let clear_spots = [];

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
    return new Point(clear_spots[0].x, clear_spots[0].y);
};
/**
 * spawns the largest version of the given creep in this room
 * @param {Object} memory - The memory for the new creep
 * @param {Boolean} is_global - flag for spawning this creep locally or globally
 * @return {Boolean} the result of the spawn, true if successful
 */
Room.prototype.spawnRole = function (memory, is_global = false) {
    // default success to false
    let success = false;
    // list of spawns that might work
    let spawns = [];
    // role object fetched from the given memory
    let role = ROLES[memory.role];

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
        // if we are spawning globally
        if (global) {
            // grab the room name for comparisons
            let room_name = this.name;
            // sort the spawns by distance to this room, ascending
            spawns.sort(function (a, b) {
                return (Game.map.getRoomLinearDistance(room_name, a.room.name) - Game.map.getRoomLinearDistance(room_name, a.room.name));
            });
        }
        // loop down from the max size to the min size
        for (let i = role.MAX_BODY_MULTIPLIER; i > 0; i--) {
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
/**
 * creates structures from the given list of planned structures and source plans, capping at 5 per room
 * @param {RoomPlans} plans - the room plans containing the construction plans
 */
Room.prototype.createConstructionSites = function (plans) {
    // count all the sites in the room
    let site_count = this.find(FIND_MY_CONSTRUCTION_SITES).length;
    // if we have less than 5 construction sites
    if (site_count > ROOM_CONSTRUCTION_SITE_LIMIT) {
        // exit function early
        return;
    }
    // loop through the source plans for this room
    for (let source_plan of plans.sources) {
        // if the container is not built
        if (!this.checkFor(STRUCTURE_CONTAINER, source_plan.container_location.x, source_plan.container_location.y)) {
            // try to place the container
            let result = this.createConstructionSite(source_plan.container_location.x, source_plan.container_location.y, STRUCTURE_CONTAINER);
            // if creating the site was successful
            if (result == OK) {
                // increment the site_count
                site_count++;
                // if we have reached 5 or more sites
                if (site_count >= ROOM_CONSTRUCTION_SITE_LIMIT) {
                    // break the loop
                    break;
                }
            }
        }
    }
    // if we have less than 5 construction sites
    if (site_count > ROOM_CONSTRUCTION_SITE_LIMIT) {
        // exit function early
        return;
    }
    // loop through the mineral plans for this room
    for (let mineral_plan of plans.minerals) {
        // if the container is not built
        if (!this.checkFor(STRUCTURE_CONTAINER, mineral_plan.container_location.x, mineral_plan.container_location.y)) {
            // try to place the container
            let result = this.createConstructionSite(mineral_plan.container_location.x, mineral_plan.container_location.y, STRUCTURE_CONTAINER);
            // if creating the site was successful
            if (result == OK) {
                // increment the site_count
                site_count++;
                // if we have reached 5 or more sites
                if (site_count >= ROOM_CONSTRUCTION_SITE_LIMIT) {
                    // break the loop
                    break;
                }
            }
        }
    }
    // if we have less than 5 construction sites
    if (site_count > ROOM_CONSTRUCTION_SITE_LIMIT) {
        // exit function early
        return;
    }
    // loop through the planned structures for this room
    for (let structure of plans.structures) {
        // if the structure is not built
        if (!this.checkFor(structure.type, structure.location.x, structure.location.y)) {
            // try to place the structure
            let result = this.createConstructionSite(structure.location.x, structure.location.y, structure.type);
            // if creating the site was successful
            if (result == OK) {
                // increment the site_count
                site_count++;
                // if we have reached 5 or more sites
                if (site_count >= ROOM_CONSTRUCTION_SITE_LIMIT) {
                    // break the loop
                    break;
                }
            }
        }
    }
    // if we have less than 5 construction sites
    if (site_count > ROOM_CONSTRUCTION_SITE_LIMIT) {
        // exit function early
        return;
    }

    // loop through the planned structures for this room
    for (let x in plans.roads) {
        for (let y in plans.roads[x]) {
            // if the structure is not built
            if (plans.roads[x][y] && !this.checkFor(STRUCTURE_ROAD, x, y)) {
                // try to place the structure
                let result = this.createConstructionSite(x, y, STRUCTURE_ROAD);
                // if creating the site was successful
                if (result == OK) {
                    // increment the site_count
                    site_count++;
                    // if we have reached 5 or more sites
                    if (site_count >= ROOM_CONSTRUCTION_SITE_LIMIT) {
                        // break the loop
                        break;
                    }
                }
            }
        }
        // if we have less than 5 construction sites
        if (site_count >= ROOM_CONSTRUCTION_SITE_LIMIT) {
            // break the loop
            break;
        }
    }

    // if we have less than 5 construction sites
    if (site_count > ROOM_CONSTRUCTION_SITE_LIMIT) {
        // exit function early
        return;
    }

    // loop through the planned structures for this room
    for (let x in plans.ramparts) {
        for (let y in plans.ramparts[x]) {
            // if the structure is not built
            if (plans.ramparts[x][y] && !this.checkFor(STRUCTURE_RAMPART, x, y)) {
                // try to place the structure
                let result = this.createConstructionSite(x, y, STRUCTURE_RAMPART);
                // if creating the site was successful
                if (result == OK) {
                    // increment the site_count
                    site_count++;
                    // if we have reached 5 or more sites
                    if (site_count >= ROOM_CONSTRUCTION_SITE_LIMIT) {
                        // break the loop
                        break;
                    }
                }
            }
        }
        // if we have less than 5 construction sites
        if (site_count >= ROOM_CONSTRUCTION_SITE_LIMIT) {
            // break the loop
            break;
        }
    }
};
/**
 * returns whether the given structure has been built at the given x/y coordinate
 * @param {string} structure_type - The type of structure we are looking for
 * @param {number} x - the x coordinate of the location we are checking
 * @param {number} y - the y coordinate of the location we are checking
 * @return {Boolean} whether the structure was found or not
 */
Room.prototype.checkFor = function (structure_type, x, y) {
    // grab the structures at this location
    let structures = this.lookForAt(LOOK_STRUCTURES, x, y);
    // loop through the structures
    for (let structure of structures) {
        // if the structure is the type we are looking for
        if (structure.structureType == structure_type) {
            // return true because we found the structure type
            return true;
        }
    }
    // return false because we did not find the structure type
    return false;
};
/**
 * finds all towers that are not full
 * @return {StructureTower[]} array of the towers found
 */
Room.prototype.findLowTowers = function () {
    // return all the structures
    return this.find(FIND_MY_STRUCTURES, {
        // that are a tower and not full
        filter: structure => (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0),
    });
};
/**
 * finds all extensions that are not full
 * @return {StructureExtension[]} array of the extensions found
 */
Room.prototype.findLowExtensions = function () {
    // return all the structures
    return this.find(FIND_MY_STRUCTURES, {
        // that are an extension and not full
        filter: structure => (structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0),
    });
};
/**
 * finds all spawns that are not full
 * @return {StructureSpawn[]} array of the spawns found
 */
Room.prototype.findLowSpawns = function () {
    // return all the structures
    return this.find(FIND_MY_STRUCTURES, {
        // that are a spawn and not full
        filter: structure => (structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0),
    });
};
/**
 * finds all non-empty containers
 * @return {StructureContainer[]} array of the spawns found
 */
Room.prototype.findFilledContainers = function () {
    // return all the structures
    return this.find(FIND_STRUCTURES, {
        // that are a container and not full
        filter: structure => (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0),
    });
};
/**
 * get all names of adjacent rooms
 * @return {string[]} array of the adjacent room names
 */
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
/**
 * gets the structure of the specified type at the given location
 * @param {string} structure_type - The type of structure we are looking for
 * @param {number} x - the x coordinate of the location we are checking
 * @param {number} y - the y coordinate of the location we are checking
 * @return {Structure|null} The structure if found, null otherwise
 */
Room.prototype.getStructureAt = function (structure_type, x, y) {
    // find all structures
    let structures = this.lookForAt(LOOK_STRUCTURES, x, y);
    // loop through the structures
    for (let structure of structures) {
        // if the structure is the type we are looking for
        if (structure.structureType == structure_type) {
            // return the structure
            return structure;
        }
    }
    // return null since we did not find the structure
    return null;
};
/**
 * gets the power spawn in the room, or null if not found
 * @return {StructurePowerSpawn|null} The power spawn or null if not found
 */
Room.prototype.getPowerSpawn = function () {
    // find all the structures
    let power_spawns = this.find(FIND_MY_STRUCTURES, {
        // filter out the power spawns
        filter: structure => structure.structureType == STRUCTURE_POWER_SPAWN,
    });
    // if any power spawns were found
    if (power_spawns.length > 0) {
        // return the first power spawn
        return power_spawns[0];
    }else{
        // return null since we didn't find any power spawns
        return null;
    }
};
