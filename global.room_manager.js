const Util = require("global.util");
const RoomData = require("data.room_data");

/**
 * handles scanning/adding new rooms
 * @module RoomManager
 * */
module.exports = {
    /**
     * create all the starter data needed to run the system
     */
    initialize: function () {
        // create the room data object
        Memory.room_data = {};
        // set the population timer to 2 ticks from now
        Memory.population_timer = this.POPULATION_TIMER_LENGTH - 2;
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
        hlog("counting the population...");
        // create our population object
        let pop = {};

        // loop through each room in the room data
        for (let name in Memory.room_data) {
            // if this room is a colony or expansion
            if (Memory.room_data[name].type == COLONY ||
                Memory.room_data[name].type == EXPANSION) {

                // create the room's population object
                pop[name] = {};
                // create the sources array for counting drillers and transporters
                pop[name].sources = {};
                // create the minerals array for counting drillers and transporters
                pop[name].minerals = {};
                // create the total amount of creeps
                pop[name].total = 0;

                // loop through the source plans
                for (let source_plan of Memory.room_data[name].plans.sources) {
                    // create the source entry on the population object
                    pop[name].sources[source_plan.source_id] = {
                        // empty slot to record a driller if found
                        driller: null,
                        // empty slot to record a transporter if found
                        transporter: null,
                        // x coordinate of the container assigned to this source
                        container_location: source_plan.container_location,
                    };
                }

                // loop through the mineral plans
                for (let mineral_plan of Memory.room_data[name].plans.minerals) {
                    // create the source entry on the population object
                    pop[name].sources[mineral_plan.mineral_id] = {
                        // empty slot to record a driller if found
                        driller: null,
                        // empty slot to record a transporter if found
                        transporter: null,
                        // x coordinate of the container assigned to this source
                        container_location: mineral_plan.container_location,
                    };
                }
            }
        }

        // loop through all the creeps
        for (let name in Game.creeps) {
            // grab the creep
            let creep = Game.creeps[name];

            // if this room is not initialized yet
            if (pop[creep.memory.room_name] == undefined) {
                // initialize it
                pop[creep.memory.room_name] = {};
            }

            // if the count for this role is not set
            if (pop[creep.memory.room_name][creep.memory.role] == undefined) {
                // set it to 0
                pop[creep.memory.room_name][creep.memory.role] = 0;
            }

            // increment the count of the creep's role
            pop[creep.memory.room_name][creep.memory.role]++;
            // increment the total
            pop[creep.memory.room_name].total++;

            // if this creep is a driller
            if (creep.memory.role == DRILLER.NAME) {
                // set the entry for the driller to the id of the creep
                pop[creep.memory.room_name].sources[creep.memory.source].driller = creep.id;
            }
            // if this creep is a transporter
            if (creep.memory.role == TRANSPORTER.NAME) {
                // set the entry for the transporter to the id of the creep
                pop[creep.memory.room_name].sources[creep.memory.source].transporter = creep.id;
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
        if (Memory.population_timer > this.POPULATION_TIMER_LENGTH) {
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
        if (Memory.new_room_timer > this.NEW_ROOM_TIMER_LENGTH) {
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