/**
 * The base game Room class. Custom properties and functions are listed below.
 * @class Room
 */

/**
 * accessor for the room data to easily shortcut grabbing it
 * @memberOf Room#
 * @member {RoomData} room_data
 */
Object.defineProperty(Room.prototype, 'room_data', {
    get: function() {
        let main_memory = util.getMainMemory();
        return main_memory.room_data[this.name];
    },
    set: function(new_room_data) {
        let main_memory = util.getMainMemory();
        main_memory.room_data[this.name] = new_room_data;
    },
    enumerable: false,
    configurable: true,
});

/**
 * Searches for a rectangular area in the room that is free of both terrain walls and planned structures.
 * The search prioritizes locations closer to the room center.
 * @memberOf Room#
 * @member {function} findClearArea
 * @param {number} width - The width of the rectangular area to search for
 * @param {number} height - The height of the rectangular area to search for
 * @param {RoomPlans} plans - Room planning data containing locations of existing and planned structures to avoid
 * @returns {Point|null} The coordinates of the top-left corner of the found area, or null if no suitable area exists
 */
Room.prototype.findClearArea = function (width, height, plans) {
    // grab the terrain for the room
    let terrain_grid = this.getTerrain();
    // create a structure grid to reference
    let structure_grid = util.getStructureGrid(plans);
    // create a list of clear spots that pass the check
    let clear_spots = [];

    // loop through all the X coordinates
    for (let x = 0; x < ROOM_SIZE - width; x++) {
        // loop through all the y coordinates
        for (let y = 0; y < ROOM_SIZE - height; y++) {

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
                let tx = (x + Math.floor(width / 2)) - (ROOM_SIZE/2);
                // get the center Y coordinate
                let ty = (y + Math.floor(height / 2)) - (ROOM_SIZE/2);
                // add the location to the list of clear spots
                clear_spots.push({
                    // the X coordinate of the area
                    x: x,
                    // the Y coordinate of the area
                    y: y,
                    // the distance from the center of the room to the center of the base
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
 * Finds an unobstructed position adjacent to the specified coordinates.
 * Checks all 8 surrounding tiles for a valid position that is free of both terrain walls and planned structures.
 * @memberOf Room#
 * @member {function} findClearAdjacentLocation
 * @param {number} x - The x coordinate of the center position to check around
 * @param {number} y - The y coordinate of the center position to check around
 * @param {RoomPlans} plans - Room planning data containing existing and planned structure locations to avoid
 * @returns {Point|null} The coordinates of a valid adjacent position if found, null if all surrounding tiles are blocked
 */
Room.prototype.findClearAdjacentLocation = function (x, y, plans) {
    // grab the terrain for the room
    let terrain_grid = this.getTerrain();
    // create a structure grid to reference
    let structure_grid = util.getStructureGrid(plans);

    // if the top left adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x - 1, y - 1) !== TERRAIN_MASK_WALL && !structure_grid[x - 1][y - 1]) {
        // return the clear spot
        return new Point(x - 1,y - 1);
    }
    // if the top adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x, y - 1) !== TERRAIN_MASK_WALL && !structure_grid[x][y - 1]) {
        // return the clear spot
        return new Point(x,y - 1);
    }
    // if the top right adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x + 1, y - 1) !== TERRAIN_MASK_WALL && !structure_grid[x + 1][y - 1]) {
        // return the clear spot
        return new Point(x + 1,y - 1);
    }
    // if the left adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x - 1, y) !== TERRAIN_MASK_WALL && !structure_grid[x - 1][y]) {
        // return the clear spot
        return new Point(x - 1,y);
    }
    // if the right adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x + 1, y) !== TERRAIN_MASK_WALL && !structure_grid[x + 1][y]) {
        // return the clear spot
        return new Point(x + 1,y);
    }
    // if the bottom left adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x - 1, y + 1) !== TERRAIN_MASK_WALL && !structure_grid[x - 1][y + 1]) {
        // return the clear spot
        return new Point(x - 1,y + 1);
    }
    // if the bottom adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x, y + 1) !== TERRAIN_MASK_WALL && !structure_grid[x][y + 1]) {
        // return the clear spot
        return new Point(x,y + 1);
    }
    // if the bottom right adjacent tile is not a wall or a planned structure
    if (terrain_grid.get(x + 1, y + 1) !== TERRAIN_MASK_WALL && !structure_grid[x + 1][y + 1]) {
        // return the clear spot
        return new Point(x + 1,y + 1);
    }
    return null;
};
/**
 * Creates construction sites based on provided room plans, with a limit of 5 active construction sites per room.
 * Construction sites are created in priority order: source containers first, followed by mineral structures,
 * then planned structures, roads, and finally ramparts.
 * @memberOf Room#
 * @member {function} createConstructionSites
 * @param {RoomPlans} plans - Room planning data containing coordinates and types of all structures to be built
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
    for (let source_plan of plans.source_plans) {
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
    for (let mineral_plan of plans.mineral_plans) {
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
        // if the container is not built
        if (!this.checkFor(STRUCTURE_EXTRACTOR, mineral_plan.mineral_location.x, mineral_plan.mineral_location.y)) {
            // try to place the container
            let result = this.createConstructionSite(mineral_plan.mineral_location.x, mineral_plan.mineral_location.y, STRUCTURE_EXTRACTOR);
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
 * Checks if a specific type of structure exists at the given coordinates in the room.
 * @memberOf Room#
 * @member {function} checkFor
 * @param {string} structure_type - The STRUCTURE_* constant defining which structure type to check for
 * @param {number} x - The X coordinate in the room (0-49)
 * @param {number} y - The Y coordinate in the room (0-49)
 * @returns {boolean} Returns true if a structure of the specified type exists at the coordinates, false otherwise
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
 * Searches the room for all tower structures with available energy capacity
 * @memberOf Room#
 * @member {function} findLowTowers
 * @returns {StructureTower[]} An array containing all towers that have space for more energy
 */
Room.prototype.findLowTowers = function () {
    // return all the structures
    return this.find(FIND_MY_STRUCTURES, {
        // that are a tower and not full
        filter: structure => (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0),
    });
};
/**
 * Finds and returns all extensions in the room that have available energy capacity.
 * @memberOf Room#
 * @member {function} findLowExtensions
 * @returns {StructureExtension[]} Array of extensions that are not at full energy capacity
 */
Room.prototype.findLowExtensions = function () {
    // return all the structures
    return this.find(FIND_MY_STRUCTURES, {
        // that are an extension and not full
        filter: structure => (structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0),
    });
};
/**
 * Finds all spawn structures that have available energy capacity.
 * @memberOf Room#
 * @member {function} findLowSpawns
 * @returns {StructureSpawn[]} Array of owned spawn structures that can receive additional energy
 */
Room.prototype.findLowSpawns = function () {
    // return all the structures
    return this.find(FIND_MY_STRUCTURES, {
        // that are a spawn and not full
        filter: structure => (structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0),
    });
};
/**
 * Finds and returns all containers in the room that contain energy resources
 * @memberOf Room#
 * @member {function} findFilledContainers
 * @returns {StructureContainer[]} Array of containers that have energy stored in them
 */
Room.prototype.findFilledContainers = function () {
    // return all the structures
    return this.find(FIND_STRUCTURES, {
        // that are a container and not full
        filter: structure => (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0),
    });
};
/**
 * Gets an array of room names that share a border with the current room.
 * @memberOf Room#
 * @member {function} getAdjacentRooms
 * @returns {string[]} Array containing the names of all adjacent rooms
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
 * Retrieves a specific structure type at the specified coordinates in the room.
 * @memberOf Room#
 * @member {function} getStructureAt
 * @param {string} structure_type - The STRUCTURE_* constant defining which structure type to find
 * @param {number} x - The X coordinate in the room (0-49)
 * @param {number} y - The Y coordinate in the room (0-49)
 * @returns {Structure|null} Returns the matching structure if found, null if no structure of a specified type exists at coordinates
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
 * Locates and returns the room's power spawn structure if one exists.
 * Each room can have at most one power spawn structure.
 * @memberOf Room#
 * @member {function} getPowerSpawn
 * @returns {StructurePowerSpawn|null} Returns the room's power spawn structure, or null if no power spawn exists in the room
 */
Room.prototype.getPowerSpawn = function () {
    // find all the structures
    /** @type {StructurePowerSpawn[]} */
    let power_spawns = this.find(FIND_MY_STRUCTURES, {
        // filter out the power spawns
        filter: structure => structure.structureType == STRUCTURE_POWER_SPAWN,
    });
    // if any power spawns were found
    if (power_spawns.length > 0) {
        // return the first power spawn
        return power_spawns[0];
    } else {
        // return null since we didn't find any power spawns
        return null;
    }
};
