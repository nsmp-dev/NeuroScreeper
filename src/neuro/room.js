/**
 * Core module responsible for managing individual rooms within the colony network.
 * This class provides comprehensive room management functionality including
 * - Creep spawning and population control
 * - Room satisfaction level monitoring and tracking
 * - Construction site management and building coordination
 * - Resource gathering and processing plant operations
 * - Power squad coordination for room defense and power bank harvesting
 * @class NeuroRoom
 */
class NeuroRoom {
    constructor() {}
    /**
     * Attempts to spawn a new creep with specified memory configuration either in the local room or globally.
     * Will try to find available spawns and adjust body parts based on available energy and role requirements.
     * @param {string} room_name - Name of the room requesting the spawn
     * @param {CreepMemory} creep_memory - Memory configuration for the new creep, including role and task assignments
     * @param {Boolean} is_global - When true, allows spawning in any room. When false, only spawns in the requesting room
     * @returns {Boolean} True if spawning was successful, false otherwise
     */
    spawnRole (room_name, creep_memory, is_global = false) {
        // default success to false
        let success = false;
        /**
         * list of spawns that might work
         * @type {StructureSpawn[]}
         */
        let spawns = [];
        /**
         * grab the role object based on the name of the role
         * @type {Role}
         */
        let role = ROLES[creep_memory.role];

        // loop through the spawns we own
        for (let name in Game.spawns) {
            // if this spawn is in the room,
            if ((Game.spawns[name].room.name == room_name || is_global) &&
                // and not spawning anything
                Game.spawns[name].spawning == null &&
                // and has the minimum energy needed
                Game.spawns[name].room.energyAvailable > role.energy_cost) {
                // add the spawn to the list of spawns
                spawns.push(Game.spawns[name]);
            }
        }

        // if there are any usable spawns
        if (spawns.length > 0) {
            // if we are spawning globally
            if (global) {
                // sort the spawns by distance to this room, ascending
                spawns.sort(function (a, b) {
                    return (Game.map.getRoomLinearDistance(room_name, a.room.name) - Game.map.getRoomLinearDistance(room_name, b.room.name));
                });
            }
            // loop down from the max size to the min size
            for (let i = role.max_body_multiplier; i > 0; i--) {
                // do a test spawning
                let result = spawns[0].spawnCreep(util.multiArray(role.body, i), "test", {
                    // provide the given memory
                    memory: creep_memory,
                    // flag the spawn as a test run
                    dryRun: true,
                });

                // if the test run was a success
                if (result == OK) {
                    // actually spawn the creep
                    spawns[0].spawnCreep(util.multiArray(role.body, i), role.emoji + util.generateId(), {
                        // provide the given memory
                        memory: creep_memory,
                    });
                    visualizer.popup("Spawning a " + creep_memory.role);
                    // mark this as a success
                    success = true;
                    break;
                }
            }
        }

        // return the result
        return success;
    }
    /**
     * Analyzes current room conditions and population requirements to determine the necessary creeps.
     * Evaluates multiple factors including:
     * - Room ownership and control level
     * - Resource gathering needs (energy and minerals)
     * - Construction and repair requirements
     * - Defense and power harvesting capabilities
     * Updates the room_data.requested_creeps array with new spawn requests.
     * @param {RoomData} room_data - Contains current room state and configuration data
     * @param {Room|null} room - The Room object being evaluated, null if room is not visible
     */
    requestCreeps (room_data, room) {
        // get the MainMemory object
        let main_memory = util.getMainMemory();

        // grab the population for this room
        let pop = main_memory.populations[room_data.room_name];

        // if the population has not been calculated yet
        if (pop == undefined) {
            // exit the function early
            return;
        }
        // reset the list of requested creeps
        room_data.requested_creeps = [];

        // check if a claimer is needed
        if ((room == null || !room.controller.my) && pop.roles[ClaimerRole.name] < 1) {
            // request a claimer
            room_data.requested_creeps.push(new ClaimerMemory(room_data.room_name));
        }

        // loop through the source_plans
        for (let source_pop of pop.source_populations) {
            // check if a driller is needed for this source
            if (source_pop.driller == null) {
                // request a driller
                room_data.requested_creeps.push(new DrillerMemory(
                    room_data.room_name,
                    source_pop.source_id,
                    source_pop.container_location
                ));
            }
            // check if a transporter is needed for this source
            if (source_pop.transporter == null) {
                // request a transporter
                room_data.requested_creeps.push(new TransporterMemory(
                    room_data.room_name,
                    source_pop.source_id,
                    source_pop.container_location
                ));
            }
        }

        // check if an upgrader is needed
        if (room_data.type == COLONY && pop.roles[UpgraderRole.name] < 2) {
            // request an upgrader
            room_data.requested_creeps.push(new UpgraderMemory(room_data.room_name));
        }

        // assume there are no construction sites
        let site_count = 0;

        // if the room is visible
        if (room != null) {
            // count the construction sites
            site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
        }
        // check if a builder is needed
        if (site_count > 0 && pop.roles[BuilderRole.name] < 2) {
            // request a builder
            room_data.requested_creeps.push(new BuilderMemory(room_data.room_name));
        }

        // assume there are no structures
        let structure_count = 0;

        // if the room is visible
        if (room != null) {
            // count the structures
            structure_count = room.find(FIND_STRUCTURES, {
                // that are damaged
                filter: structure => structure.hits < structure.hitsMax,
            }).length;
        }

        // check if a repairer is needed
        if (structure_count > 0 && pop.roles[RepairerRole.name] < 1) {
            // request a repairer
            room_data.requested_creeps.push(new RepairerMemory(room_data.room_name));
        }

        // check if a queen is needed
        if (room != null && room.storage != undefined && pop.roles[QueenRole.name] < 1) {
            // request a queen
            room_data.requested_creeps.push(new QueenMemory(room_data.room_name));
        }

        // if the room is visible
        if (room != null) {
            // loop through the minerals
            for (let mineral_pop of pop.mineral_populations) {
                // if the extractor is not built
                if (!room.checkFor(STRUCTURE_EXTRACTOR, mineral_pop.mineral_location.x, mineral_pop.mineral_location.y)) {
                    // break the loop
                    break;
                }
                // check if a mineral driller is needed for this mineral
                if (mineral_pop.mineral_driller == null) {
                    // request a mineral driller
                    room_data.requested_creeps.push(new MineralDrillerMemory(
                        room.name,
                        mineral_pop.mineral_id,
                        mineral_pop.container_location
                    ));
                }
                // check if a mineral transporter is needed for this mineral
                if (mineral_pop.mineral_transporter == null) {
                    // request a mineral transporter
                    room_data.requested_creeps.push(new MineralTransporterMemory(
                        room.name,
                        mineral_pop.mineral_id,
                        mineral_pop.container_location,
                        mineral_pop.resource_type,
                    ));
                }
            }

            // assume there are no observers
            let observer_count = 0;

            // if the room is visible
            if (room != null) {
                // count the observers
                observer_count = room.find(FIND_STRUCTURES, {
                    filter: {structureType: STRUCTURE_OBSERVER},
                }).length;
            }
            // check if a scout is needed
            if (room_data.type == COLONY && observer_count == 0 && pop.roles[ScoutRole.name] < 1) {
                // request a scout
                room_data.requested_creeps.push(new ScoutMemory(room_data.room_name));
            }
        }

        if (room != null) {
            let hostile_creeps = room.find(FIND_HOSTILE_CREEPS).length;
            // check if an attacker is needed
            if (hostile_creeps > 0 && pop.roles[AttackerRole.name] < 1) {
                // request an attacker
                room_data.requested_creeps.push(new AttackerMemory(room_data.room_name));
            }

            // check if a healer is needed
            if (hostile_creeps > 0 && pop.roles[HealerRole.name] < 1) {
                // request a healer
                room_data.requested_creeps.push(new HealerMemory(room_data.room_name));
            }
        }

        // count the highways we have seen
        let highway_count = util.getHighwayRooms().length;

        // if we have seen at least one highway
        if (highway_count > 0) {
            // if a power attacker is needed
            if (pop.power_squad.power_attacker == null) {
                // request a power attacker
                room_data.requested_creeps.push(new PowerAttackerMemory(room_data.room_name));
            }

            // if a power healer is needed
            if (pop.power_squad.power_healer == null) {
                // request a power healer
                room_data.requested_creeps.push(new PowerHealerMemory(room_data.room_name));
            }

            // if a power transporter is needed
            if (pop.power_squad.power_transporter == null) {
                // request a power transporter
                room_data.requested_creeps.push(new PowerTransporterMemory(room_data.room_name));
            }

            // if a commodity collector is needed
            if (pop.roles[CommodityCollectorRole.name] < 1) {
                // request a commodity collector
                room_data.requested_creeps.push(new CommodityCollectorMemory(room_data.room_name));
            }
        }
    }
    /**
     * Attempts to spawn creeps from the room's requested_creeps array.
     * For colony rooms, spawning is attempted locally within the same room.
     * For non-colony rooms, spawning is attempted globally across all available rooms.
     * If spawning is successful, the spawned creep request is removed from the array.
     * @param {RoomData} room_data - The room data containing spawn requests and room configuration
     */
    spawnRequestedCreeps (room_data) {
        // declare a success variable
        let success;

        // if this room is a colony
        if (room_data.type == COLONY) {
            // attempt to spawn a creep locally
            success = this.spawnRole(room_data.room_name, room_data.requested_creeps[0]);
        } else {
            // attempt to spawn a creep globally
            success = this.spawnRole(room_data.room_name, room_data.requested_creeps[0], true);
        }
        // check if we successfully spawned the creep
        if (success) {
            // remove the creep that was successfully spawned
            room_data.requested_creeps.shift();
        }
    }
    /**
     * Evaluates the room's current state to determine if all creep needs are being met.
     * Tracks satisfaction over time using a rolling log to maintain historical performance.
     * Also monitors room ownership status and marks the room as dead if it has become unowned.
     * @param {RoomData} room_data - Contains room state data including satisfaction history
     * @param {Room|null} room - The Room object being evaluated, null if room is not visible
     */
    calculateSatisfaction (room_data, room) {
        // if no creeps are needed
        if (room_data.requested_creeps.length == 0) {
            // push true to the satisfaction log to show we were satisfied on this tick
            room_data.satisfaction_log.push(true);
        } else {
            // push false to the satisfaction log to show we were unsatisfied on this tick
            room_data.satisfaction_log.push(false);
        }

        // check if the satisfaction log is too big
        while (room_data.satisfaction_log.length > SATISFACTION_LOG_SIZE) {
            // remove the first element
            room_data.satisfaction_log.shift();
        }

        // calculate the average satisfaction and see if it meets the threshold of satisfaction
        room_data.satisfied = (util.getSatisfiedRatio(room_data) > SATISFACTION_THRESHOLD);

        // if the room is visible
        if (room != null) {
            // push a new progress amount onto the progress log
            room_data.progress_log.push(room.controller.progress);
            // check if the progress log is too big
            while (room_data.progress_log.length > PROGRESS_LOG_SIZE) {
                // remove the first element
                room_data.progress_log.shift();
            }
        }

        // if we have owned the room before
        if (room_data.has_been_owned) {
            // if the room is not visible or unowned
            if (room == null || !room.controller.my) {
                // mark the room as dead
                room_data.dead = true;
            }
        } else {
            // if the room is visible and owned
            if (room != null && room.controller.my) {
                // mark the room as owned
                room_data.has_been_owned = true;
            }
        }
    }
    /**
     * Executes the main room management cycle, coordinating all room-level operations.
     * Performs the following tasks on a scheduled basis:
     * - Population management and creep spawning
     * - Satisfaction level monitoring
     * - Construction site creation and management
     * - Plant operations for resource processing
     * - Power squad coordination and deployment
     * Each task runs on its own timer to optimize performance and CPU usage.
     * @param {RoomData} room_data - Contains all room-specific data and configuration
     * @param {Room|null} room - The Room object being managed, null if room is not visible
     */
    run (room_data, room = null) {
        hlog("running room " + room_data.room_name);
        // get the MainMemory object
        let main_memory = util.getMainMemory();
        // if the population timer has gone off
        if (room_data.population_timer > REQUEST_POPULATION_TIMER_LENGTH) {
            timer.start("requesting_creeps");
            // request a new set of creeps
            this.requestCreeps(room_data, room);
            timer.stop("requesting_creeps");
            // reset the population timer
            room_data.population_timer = 0;
        } else {
            // increment the population timer
            room_data.population_timer++;
        }

        // refresh the satisfaction calculation
        this.calculateSatisfaction(room_data, room);

        // if there are any creeps still requested
        if (room_data.requested_creeps.length > 0) {
            // attempt to spawn another creep
            this.spawnRequestedCreeps(room_data);
        }

        // check if the construction timer has gone off
        if (room_data.construction_timer > CONSTRUCTION_TIMER_LENGTH && room != null) {
            timer.start("constructing_plans");
            // try to create new construction sites
            room.createConstructionSites(room_data.plans);
            timer.stop("constructing_plans");
            // reset the construction timer
            room_data.construction_timer = 0;
        } else {
            // increment the construction timer
            room_data.construction_timer++;
        }

        // if the room has a plant
        if (room != null && room_data.plans.plant_location != null && room_data.room_name == main_memory.capitol_room_name) {
            timer.start("running_plant");
            // run the plant
            neuro_plant.run(room_data.plant_data, room);
            timer.stop("running_plant");
        }

        // if the power squad timer has gone off
        if (room_data.power_squad_timer > POWER_SQUAD_TIMER) {
            timer.start("running_power_spawn");
            // run the power squad
            neuro_power_squad.run(room_data.power_squad);
            timer.stop("running_power_spawn");
            // reset the power squad timer
            room_data.power_squad_timer = 0;
        } else {
            // increment the power squad timer
            room_data.power_squad_timer++;
        }
    }
}

// export the NeuroRoom class
global.NeuroRoom = NeuroRoom;

/**
 * Global singleton instance of NeuroRoom.
 * @constant {NeuroRoom} neuro_room
 */
global.neuro_room = new NeuroRoom();
