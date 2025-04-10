/**
 * Handles scanning and adding new rooms
 * @constant {Object} RoomManager
 */
global.RoomManager = {
    /**
     * create all the starter data needed to run the system
     */
    initialize: function () {
        // create the room data object
        Memory.room_data = {};
        // set the population timer to 2 ticks from now
        Memory.population_timer = COUNT_POPULATION_TIMER_LENGTH - 2;
        // start the new room timer
        Memory.new_room_timer = 0;
        // create the population
        Memory.populations = {};
        // grab one of the names of the spawns
        let spawn_name = Object.keys(Game.spawns)[0];
        // grab the room that spawn is in
        let room = Game.spawns[spawn_name].room;
        // initialize the room data entry
        Memory.room_data[room.name] = new RoomData(room, Game.spawns[spawn_name]);
        // save the capitol room name
        Memory.capitol_room_name = null;
    },
    /**
     * scan for any new rooms and add their data if found
     */
    scanNewRooms: function () {
        // loop through all the rooms
        for (let name in Game.rooms) {
            // if we have not scanned this room yet
            if (Memory.room_data[name] == undefined) {
                hlog("Found a new room!");
                // create a new RoomData object for the new room
                Memory.room_data[name] = new RoomData(Game.rooms[name]);
            }
        }
    },
    /**
     * attempt to spawn a new colony
     */
    spawnNewColony: function () {
        // loop through all the room data
        for (let name in Memory.room_data) {
            // if this room is not used and is a possible colony
            if (Memory.room_data[name].type == null && Memory.room_data[name].possible_colony && Util.isRoomAvailable(name)) {
                // set the room type to a colony
                Memory.room_data[name].type = COLONY;
                // return true for success
                return true;
            }
        }
        // no rooms were found, return false for failure
        return false;
    },
    /**
     * attempt to spawn a new expansion
     */
    spawnNewExpansion: function () {
        // loop through all the room data
        for (let name in Memory.room_data) {
            // if this room is not used and is a possible expansion
            if (Memory.room_data[name].type == null && Memory.room_data[name].possible_expansion && Util.isRoomAvailable(name)) {
                // set the room type to a colony
                Memory.room_data[name].type = EXPANSION;
                // return true for success
                return true;
            }
        }
        // no rooms were found, return false for failure
        return false;
    },
    /**
     * count up all the creeps in the game
     */
    countPopulation: function () {
        // create our population object
        let pop = {};

        // loop through each room in the room data
        for (let name in Memory.room_data) {
            // if this room is a colony or expansion
            if (Memory.room_data[name].type == COLONY ||
                Memory.room_data[name].type == EXPANSION) {

                // create the room's population object
                pop[name] = new RoomPopulation(Memory.room_data[name].plans);
            }
        }

        // loop through all the creeps
        for (let name in Game.creeps) {
            // grab the creep
            let creep = Game.creeps[name];
            /** @type {RoomPopulation} */
            let room_pop = pop[creep.memory.room_name];

            // increment the count of the creep's role
            room_pop.roles[creep.memory.role]++;
            // increment the total
            room_pop.total++;

            // if this creep is a driller
            if (creep.memory.role == DRILLER.NAME) {
                // set the entry for the driller to the id of the creep
                for (let source_pop of room_pop.sources) {
                    if (source_pop.source_id == creep.memory.source) {
                        source_pop.driller = creep.id;
                    }
                }
            }
            // if this creep is a transporter
            if (creep.memory.role == TRANSPORTER.NAME) {
                // set the entry for the transporter to the id of the creep
                for (let source_pop of room_pop.sources) {
                    if (source_pop.source_id == creep.memory.source) {
                        source_pop.transporter = creep.id;
                    }
                }
            }
            // if this creep is a mineral driller
            if (creep.memory.role == MINERAL_DRILLER.NAME) {
                // set the entry for the driller to the id of the creep
                for (let mineral_pop of room_pop.minerals) {
                    if (mineral_pop.mineral_id == creep.memory.mineral) {
                        mineral_pop.mineral_driller = creep.id;
                    }
                }
            }
            // if this creep is a transporter
            if (creep.memory.role == MINERAL_TRANSPORTER.NAME) {
                // set the entry for the transporter to the id of the creep
                for (let mineral_pop of room_pop.minerals) {
                    if (mineral_pop.mineral_id == creep.memory.mineral) {
                        mineral_pop.mineral_transporter = creep.id;
                    }
                }
            }
        }
        // store the populations
        Memory.populations = pop;
    },
    /**
     * rescan the population occasionally, add colonies/expansions if stable, and scan nrw rooms
     */
    run: function () {
        // if the population timer has gone off
        if (Memory.population_timer > COUNT_POPULATION_TIMER_LENGTH) {
            hlog("Recounting the population...");
            // recount the population
            this.countPopulation();
            // reset the population timer
            Memory.population_timer = 0;
        } else {
            // increment the population timer
            Memory.population_timer++;
        }

        // if the new room timer has gone off
        if (Memory.new_room_timer > NEW_ROOM_TIMER_LENGTH) {
            hlog("Checking if we can add a new room...");
            // default to satisfied
            let satisfied = true;
            // current count of colonies
            let colony_count = 0;
            // current count of expansions
            let expansion_count = 0;

            // loop through all the room data
            for (let name in Memory.room_data) {
                // if the room is a colony or expansion and is not satisfied
                if ((Memory.room_data[name].type == COLONY || Memory.room_data[name].type == EXPANSION) && !Memory.room_data[name].satisfied) {
                    // set satisfied to false since one of the rooms is not satisfied
                    satisfied = false;
                }
                // if the room is a colony
                if (Memory.room_data[name].type == COLONY) {
                    // increment the colony count
                    colony_count++;
                }
                // if the room is an expansion
                if (Memory.room_data[name].type == EXPANSION) {
                    // increment the expansion count
                    expansion_count++;
                }
            }

            // if all the rooms are satisfied
            if (satisfied) {
                // if we have more expansions than colonies
                if (expansion_count > colony_count) {
                    // if we can control more rooms
                    if (colony_count < Game.gcl.level) {
                        hlog("Attempting to add a colony...");
                        // spawn a new colony
                        this.spawnNewColony();
                    }
                } else {
                    hlog("Attempting to add an expansion...");
                    // spawn a new expansion
                    this.spawnNewExpansion();
                }
            }

            // if we currently don't have a capitol
            if (Memory.capitol_room_name == null) {
                // loop through all the rooms
                for (let name in Memory.room_data) {
                    // if the room is a colony and has a plant
                    if (Memory.room_data[name].type == COLONY && Memory.room_data[name].plans.plant_location != null) {
                        hlog("Designating a new Capitol...");
                        // store the new capitol room name
                        Memory.capitol_room_name = name;
                        // break out of the loop
                        break;
                    }
                }
            }

            // reset the new room timer
            Memory.new_room_timer = 0;
        } else {
            // increment the new room timer
            Memory.new_room_timer++;
        }

        // scan for new rooms
        this.scanNewRooms();
    },
};