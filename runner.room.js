/**
 * contains logic for running a room, using a room data object for storage
 * @module RoomRunner
 */
global.RoomRunner = {
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Room} room - The Room we are running
     * @param {RoomData} room_data - The room data for the room.
     */
    requestCreeps: function (room, room_data) {
        let main_memory = Util.getMainMemory();
        // grab the population for this room
        /** @type {RoomPopulation} */
        let pop = main_memory.populations[room.name];
        // create a list of requested creeps
        room_data.requested_creeps = [];

        // check if a claimer is needed
        if (!room.controller.my && pop[CLAIMER.NAME] < 1) {
            // request a claimer
            room_data.requested_creeps.push(new ClaimerMemory(room.name));
        }

        // loop through the source_plans
        for (let source_pop of pop.source_populations) {
            // check if a driller is needed for this source
            if (source_pop.driller == null) {
                // request a driller
                room_data.requested_creeps.push(new DrillerMemory(
                    room.name,
                    source_pop.source_id,
                    source_pop.container_location
                ));
            }
            // check if a transporter is needed for this source
            if (source_pop.transporter == null) {
                // request a transporter
                room_data.requested_creeps.push(new TransporterMemory(
                    room.name,
                    source_pop.source_id,
                    source_pop.container_location
                ));
            }
        }

        // check if an upgrader is needed
        if (room_data.type == COLONY && pop[UPGRADER.NAME] < 1) {
            // request an upgrader
            room_data.requested_creeps.push(new UpgraderMemory(room.name));
        }

        // count the construction sites
        let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
        // check if a builder is needed
        if (site_count > 0 && pop[BUILDER.NAME] < 2) {
            // request a builder
            room_data.requested_creeps.push(new BuilderMemory(room.name));
        }

        // find all the structures
        let structure_count = room.find(FIND_STRUCTURES, {
            // that are damaged
            filter: structure => structure.hits < structure.hitsMax,
        }).length;
        // check if a repairer is needed
        if (structure_count > 0 && pop[REPAIRER.NAME] < 1) {
            // request a repairer
            room_data.requested_creeps.push(new RepairerMemory(room.name));
        }

        // check if a queen is needed
        if (room.storage != undefined && pop[QUEEN.NAME] < 1) {
            // request a queen
            room_data.requested_creeps.push(new QueenMemory(room.name));
        }

        // loop through the minerals
        for (let mineral_pop of pop.mineral_populations) {
            // check if a driller is needed for this mineral
            if (mineral_pop.mineral_driller == null) {
                // request a driller
                room_data.requested_creeps.push(new MineralDrillerMemory(
                    room.name,
                    mineral_pop.mineral_id,
                    mineral_pop.container_location
                ));
            }
            // check if a transporter is needed for this mineral
            if (mineral_pop.mineral_transporter == null) {
                // request a transporter
                room_data.requested_creeps.push(new MineralTransporterMemory(
                    room.name,
                    mineral_pop.mineral_id,
                    mineral_pop.container_location,
                    mineral_pop.resource_type,
                ));
            }
        }

        // find all the structures
        let observer_count = room.find(FIND_STRUCTURES, {
            // that are observers
            filter: structure => structure.structureType == STRUCTURE_OBSERVER,
        }).length;
        // check if a scout is needed
        if (room_data.type == COLONY && observer_count == 0 && pop[SCOUT.NAME] < 1) {
            // request a scout
            room_data.requested_creeps.push(new ScoutMemory(room.name));
        }

        // check if an attacker is needed
        if (pop[ATTACKER.NAME] < 1) {
            // request an attacker
            room_data.requested_creeps.push(new AttackerMemory(room.name));
        }

        // check if a healer is needed
        if (pop[HEALER.NAME] < 1) {
            // request a healer
            room_data.requested_creeps.push(new HealerMemory(room.name));
        }

        if (pop.power_squad.power_attacker == null) {
            room_data.requested_creeps.push(new PowerAttackerMemory(room.name));
        }
        if (pop.power_squad.power_healer == null) {
            room_data.requested_creeps.push(new PowerHealerMemory(room.name));
        }
        if (pop.power_squad.power_transporter == null) {
            room_data.requested_creeps.push(new PowerTransporterMemory(room.name));
        }

        if (pop[COMMODITY_COLLECTOR.NAME] < 1) {
            room_data.requested_creeps.push(new CommodityCollectorMemory(room.name));
        }
    },
    /**
     * attempt to spawn any creeps that are requested
     * @param {Room} room - The Room we are running
     * @param {RoomData} room_data - The room data for the room.
     */
    spawnRequestedCreeps: function (room, room_data) {
        // declare a success variable
        let success;

        // if this room is a colony
        if (room_data.type == COLONY) {
            // attempt to spawn a creep locally
            success = room.spawnRole(room_data.requested_creeps[0]);
        }else{
            // attempt to spawn a creep globally
            success = room.spawnRole(room_data.requested_creeps[0], true);
        }
        // check if we successfully spawned the creep
        if (success) {
            // remove the creep that was successfully spawned
            room_data.requested_creeps.shift();
        }
    },
    /**
     * calculate to see if the room is satisfied
     * @param {Room} room - The Room we are running
     * @param {RoomData} room_data - The room data for the room.
     */
    calculateSatisfaction: function (room, room_data) {
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
        room_data.satisfied = (Util.getSatisfiedRatio(room_data) > SATISFACTION_THRESHOLD);

        if (room_data.has_been_owned) {
            if (!room.controller.my) {
                room_data.dead = true;
            }
        }else{
            if (room.controller.my) {
                room_data.has_been_owned = true;
            }
        }
    },
    /**
     * run the colony, kicking off sub-functions for specific activities
     * @param {Room} room - The Room we are running
     * @param {RoomData} room_data - The room data for the room.
     */
    run: function (room, room_data) {
        let main_memory = Util.getMainMemory();
        hlog("Running " + room_data.type + " room: '" + room.name + "'...");
        // if the population timer has gone off
        if (room_data.population_timer > REQUEST_POPULATION_TIMER_LENGTH) {
            hlog("Requesting creeps...");
            // request a new set of creeps
            Timer.start("requesting_creeps");
            this.requestCreeps(room, room_data);
            Timer.stop("requesting_creeps");
            // reset the population timer
            room_data.population_timer = 0;
        } else {
            // increment the population timer
            room_data.population_timer++;
        }

        // refresh the satisfaction calculation
        this.calculateSatisfaction(room, room_data);

        // if there are any creeps still requested
        if (room_data.requested_creeps.length > 0) {
            hlog("Trying to spawn creeps...");
            // attempt to spawn another creep
            this.spawnRequestedCreeps(room, room_data);
        }

        // check if the construction timer has gone off
        if (room_data.construction_timer > CONSTRUCTION_TIMER_LENGTH) {
            hlog("Building construction sites...");
            Timer.start("constructing_plans");
            // try to create new construction sites
            room.createConstructionSites(room_data.plans);
            Timer.stop("constructing_plans");
            // reset the construction timer
            room_data.construction_timer = 0;
        } else {
            // increment the construction timer
            room_data.construction_timer++;
        }

        // if the room has a plant
        if (room_data.plans.plant_location != null && room.name == main_memory.capitol_room_name) {
            // run the plant
            Timer.start("running_plant");
            PlantRunner.run(room, room_data.plant_data);
            Timer.stop("running_plant");
        }

        if (room_data.power_squad_timer > POWER_SQUAD_TIMER) {
            PowerSquadRunner.run(room_data.power_squad);
            room_data.power_squad_timer = 0;
        } else {
            room_data.power_squad_timer++;
        }
    },
};