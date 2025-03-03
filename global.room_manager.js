const Colony = require("controller.colony");
const Expansion = require("controller.expansion");
const Util = require("global.util");

// room manager module that handles scanning/adding new rooms
module.exports = {
    // how often to recalculate the populations
    POPULATION_TIMER_LENGTH: 10,
    // how often to consider adding a new room
    NEW_ROOM_TIMER_LENGTH: 100,
    // create all the starter data needed to run the system
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
        Memory.room_data[room.name] = {
            // force the type to a colony
            type: Colony.NAME,
            // check if this room can be a colony
            possible_colony: Colony.testRoom(room),
            // check if this room can be an expansion
            possible_expansion: Expansion.testRoom(room),
        };
		// initialize the colony and store the room data
        Memory.room_data[room.name] = Colony.initialize(room, Memory.room_data[room.name]);
    },
    // scan for any new rooms and add their data if found
    scanNewRooms: function () {
        // loop through all the rooms
        for (let name in Game.rooms) {
            // if we have not scanned this room yet
            if (Memory.room_data[name] == undefined) {
                // initialize the room data for this room
                Memory.room_data[name] = {
                    // the type is not set yet so it is set to null
                    type: null,
                    // check whether the room can be a colony
                    possible_colony: Colony.testRoom(Game.rooms[name]),
                    // check whether the room can be an expansion
                    possible_expansion: Expansion.testRoom(Game.rooms[name]),
                };
            }
        }
    },
    // attempt to spawn a new colony
    spawnNewColony: function () {
        // loop through all the room data
        for (let name in Memory.room_data) {
            // if this room is not used and is a possible colony
            if (Memory.room_data[name].type == null && Memory.room_data[name].possible_colony) {
                // set the room's type to colony
                Memory.room_data[name].type = Colony.NAME;
                // initialize the room data
                Memory.room_data[name] = Colony.initialize(Game.rooms[name], Memory.room_data[name]);
                // return true for success
                return true;
            }
        }
        // no rooms were found, return false for failure
        return false;
    },
    // attempt to spawn a new expansion
    spawnNewExpansion: function () {
        // loop through all the room data
        for (let name in Memory.room_data) {
            // if this room is not used and is a possible expansion
            if (Memory.room_data[name].type == null && Memory.room_data[name].possible_expansion) {
                // set the room's type to expansion
                Memory.room_data[name].type = Expansion.NAME;
                // initialize the room data
                Memory.room_data[name] = Expansion.initialize(Game.rooms[name], Memory.room_data[name]);
                // return true for success
                return true;
            }
        }
        // no rooms were found, return false for failure
        return false;
    },
    // count up all the creeps in the game
    countPopulation: function () {
        // create our population object
        let pop = {};

        // loop through each room in the room data
        for (let name in Memory.room_data) {
            // if this room is a colony or expansion
            if (Memory.room_data[name].type == Colony.NAME ||
                Memory.room_data[name].type == Expansion.NAME) {

                // create the room's population object
                pop[name] = {};
                // create the sources array for counting drillers and transporters
                pop[name].sources = {};
                // create the total amount of creeps
                pop[name].total = 0;

                // grab the source plans from the room data
                let source_plans = Memory.room_data[name].source_plans;

                // loop through the source plans
                for (let source_plan of source_plans) {
                    // create the source entry on the population object
                    pop[name].sources[source_plan.source_id] = {
                        // empty slot to record a driller if found
                        driller: null,
                        // empty slot to record a transporter if found
                        transporter: null,
                        // x coordinate of the container assigned to this source
                        container_x: source_plan.container_x,
                        // y coordinate of the container assigned to this source
                        container_y: source_plan.container_y,
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
            if (creep.memory.role == Util.DRILLER.NAME) {
                // set the entry for the driller to the id of the creep
                pop[creep.memory.room_name].sources[creep.memory.source].driller = creep.id;
            }
            // if this creep is a transporter
            if (creep.memory.role == Util.TRANSPORTER.NAME) {
                // set the entry for the transporter to the id of the creep
                pop[creep.memory.room_name].sources[creep.memory.source].transporter = creep.id;
            }
        }
        // store the populations
        Memory.populations = pop;
    },
    // rescan the population occasionally, add colonies/expansions if stable, and scan nrw rooms
    run: function () {
        // if the population timer has gone off
        if (Memory.population_timer > this.POPULATION_TIMER_LENGTH) {
            // recalculate the populations
            this.countPopulation();
            // reset the population timer
            Memory.population_timer = 0;
        }else{
            // increment the population timer
            Memory.population_timer++;
        }

        // if the new room timer has gone off
        if (Memory.new_room_timer > this.NEW_ROOM_TIMER_LENGTH) {
            // default to satisfied
            let satisfied = true;
            // current count of colonies
            let colony_count = 0;
            // current count of expansions
            let expansion_count = 0;

            // loop through all the room data
            for (let name in Memory.room_data) {
                // if the room is a colony or expansion and is not satisfied
                if ((Memory.room_data[name].type == Colony.NAME || Memory.room_data[name].type == Expansion.NAME) && !Memory.room_data[name].satisfied) {
                    // set satisfied to false since one of the rooms is not satisfied
                    satisfied = false;
                }
                // if the room is a colony
                if (Memory.room_data[name].type == Colony.NAME) {
                    // increment the colony count
                    colony_count++;
                }
                // if the room is an expansion
                if (Memory.room_data[name].type == Expansion.NAME) {
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
                        // spawn a new colony
                        this.spawnNewColony();
                    }
                } else {
                    // spawn a new expansion
                    this.spawnNewExpansion();
                }
            }
            // reset the new room timer
            Memory.new_room_timer = 0;
        }else{
            // increment the new room timer
            Memory.new_room_timer++;
        }

        // scan for new rooms
        this.scanNewRooms();
    },
};