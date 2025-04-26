/**
 * Manages room population tracking and colony/expansion growth across the empire.
 * Key responsibilities:
 * - Scans and initializes data for newly discovered rooms
 * - Tracks creep populations efficiently through periodic counting
 * - Expands the empire by creating new colonies when existing rooms are stable
 * - Balances growth between colonies and remote mining expansions
 * @namepace NeuroScreeper
 */
global.NeuroScreeper = {
    /**
     * scan for any new rooms and create RoomData for them if found
     */
    scanNewRooms: function () {
        // get the MainMemory object
        let main_memory = Util.getMainMemory();
        // loop through all the rooms
        for (let name in Game.rooms) {
            // if we have not scanned this room yet
            if (main_memory.room_data[name] == undefined) {
                Visualizer.popup("Found a new room!");
                // create a new RoomData object for the new room
                main_memory.room_data[name] = new RoomData(Game.rooms[name]);
            }
        }
    },
    /**
     * attempt to spawn a new colony
     */
    spawnNewColony: function () {
        // get the MainMemory object
        let main_memory = Util.getMainMemory();
        // loop through all the room data
        for (let name in main_memory.room_data) {
            // if this room is not used and is a possible colony
            if (main_memory.room_data[name].type == null && main_memory.room_data[name].possible_colony && Util.isRoomAvailable(name)) {
                // set the room type to a colony
                main_memory.room_data[name].type = COLONY;
                Visualizer.popup("Created a new colony!");
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
        // get the MainMemory object
        let main_memory = Util.getMainMemory();
        // loop through all the room data
        for (let name in main_memory.room_data) {
            // if this room is not used and is a possible expansion
            if (main_memory.room_data[name].type == null && main_memory.room_data[name].possible_expansion && Util.isRoomAvailable(name)) {
                // set the room type to a colony
                main_memory.room_data[name].type = EXPANSION;
                Visualizer.popup("Created a new expansion!");
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
        // get the MainMemory object
        let main_memory = Util.getMainMemory();
        // create our population object
        /** @type {Object.<string,RoomPopulation>} */
        let pop = {};

        // loop through each room in the room data
        for (let name in main_memory.room_data) {
            // if this room is a colony or expansion
            if (main_memory.room_data[name].type == COLONY || main_memory.room_data[name].type == EXPANSION) {
                // create the room's population object
                pop[name] = new RoomPopulation(main_memory.room_data[name].plans);
            }
        }

        // loop through all the creeps
        for (let name in Game.creeps) {
            // grab the creep
            let creep = Game.creeps[name];
            // grab the RoomPopulation object
            /** @type {RoomPopulation} */
            let room_pop = pop[creep.memory.room_name];

            // increment the count of the creep's role
            room_pop.roles[creep.memory.role]++;
            // increment the total
            room_pop.total++;

            // if this creep is a driller
            if (creep.memory.role == DrillerRole.name) {
                // loop through the source populations
                for (let source_pop of room_pop.source_populations) {
                    // if the source population's source id matches the creep's source id
                    if (source_pop.source_id == creep.memory.source) {
                        // mark this source population's driller as spawned
                        source_pop.driller = creep.id;
                    }
                }
            }
            // if this creep is a transporter
            if (creep.memory.role == TransporterRole.name) {
                // loop through the source populations
                for (let source_pop of room_pop.source_populations) {
                    // if the source population's source id matches the creep's source id
                    if (source_pop.source_id == creep.memory.source) {
                        // mark this source population's transporter as spawned
                        source_pop.transporter = creep.id;
                    }
                }
            }
            // if this creep is a mineral driller
            if (creep.memory.role == MineralDrillerRole.name) {
                // loop through the mineral populations
                for (let mineral_pop of room_pop.mineral_populations) {
                    // if the mineral population's mineral id matches the creep's mineral id
                    if (mineral_pop.mineral_id == creep.memory.mineral) {
                        // mark this mineral population's mineral transporter as spawned
                        mineral_pop.mineral_driller = creep.id;
                    }
                }
            }
            // if this creep is a transporter
            if (creep.memory.role == MineralTransporterRole.name) {
                // loop through the mineral populations
                for (let mineral_pop of room_pop.mineral_populations) {
                    // if the mineral population's mineral id matches the creep's mineral id
                    if (mineral_pop.mineral_id == creep.memory.mineral) {
                        // mark this mineral population's mineral driller as spawned
                        mineral_pop.mineral_transporter = creep.id;
                    }
                }
            }
            // if the creep is a power attacker
            if (creep.memory.role == PowerAttackerRole.name) {
                // mark the power squad's power attacker as spawned
                room_pop.power_squad.power_attacker = creep.id;
            }
            // if the creep is a power healer
            if (creep.memory.role == PowerHealerRole.name) {
                // mark the power squad's power healer as spawned
                room_pop.power_squad.power_healer = creep.id;
            }
            // if the creep is a power transporter
            if (creep.memory.role == PowerTransporterRole.name) {
                // mark the power squad's power transporter as spawned
                room_pop.power_squad.power_transporter = creep.id;
            }
        }
        // store the populations
        main_memory.populations = pop;
    },
    /**
     * rescan the population occasionally and adds colonies/expansions if stable, and scans new rooms
     * @param {MainMemory} main_memory - The plans of the room
     */
    run: function (main_memory) {
        // if the population timer has gone off
        if (main_memory.population_timer > COUNT_POPULATION_TIMER_LENGTH) {
            // recount the population
            this.countPopulation();
            // reset the population timer
            main_memory.population_timer = 0;
        } else {
            // increment the population timer
            main_memory.population_timer++;
        }

        // if the new room timer has gone off
        if (main_memory.new_room_timer > NEW_ROOM_TIMER_LENGTH) {
            // default to satisfied
            let satisfied = true;
            // current count of colonies
            let colony_count = 0;
            // current count of expansions
            let expansion_count = 0;

            // loop through all the room data
            for (let name in main_memory.room_data) {
                // if the room is a colony or expansion and is not satisfied
                if ((main_memory.room_data[name].type == COLONY || main_memory.room_data[name].type == EXPANSION) && !main_memory.room_data[name].satisfied) {
                    // set satisfied to false since one of the rooms is not satisfied
                    satisfied = false;
                }
                // if the room is a colony
                if (main_memory.room_data[name].type == COLONY) {
                    // increment the colony count
                    colony_count++;
                }
                // if the room is an expansion
                if (main_memory.room_data[name].type == EXPANSION) {
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

            // if we currently don't have a capitol
            if (main_memory.capitol_room_name == null) {
                // loop through all the rooms
                for (let name in main_memory.room_data) {
                    // if the room is a colony and has a plant
                    if (main_memory.room_data[name].type == COLONY && main_memory.room_data[name].plans.plant_location != null) {
                        // store the new capitol room name
                        main_memory.capitol_room_name = name;
                        // break out of the loop
                        break;
                    }
                }
            }

            // reset the new room timer
            main_memory.new_room_timer = 0;
        } else {
            // increment the new room timer
            main_memory.new_room_timer++;
        }

        // scan for new rooms
        this.scanNewRooms();
    },
};