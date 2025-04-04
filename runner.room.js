const Util = require('global.util');
const PlantRunner = require('runner.plant');

/**
 * this is a room runner: it contains logic for running each kind of room
 * manages its own data by passing its memory via a RoomData object
 * @module RoomRunner
 * */
module.exports = {
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Room} room - The Room we are running
     * @param {RoomData} room_data - The room data for the room.
     */
    requestCreeps: function (room, room_data) {
        // grab the population for this room
        let pop = Memory.populations[room.name];
        // create a list of requested creeps
        let requested_creeps = [];

        // check if a claimer is needed
        if (!room.controller.my && (pop[CLAIMER.NAME] == undefined || pop[CLAIMER.NAME] < 1)) {
            // request a claimer
            requested_creeps.push(new CLAIMER.ClaimerMemory(room.name));
        }

        // loop through the sources
        for (let source_id in pop.sources) {
            // grab the source data
            let source_data = pop.sources[source_id];
            // check if a driller is needed for this source
            if (source_data.driller == null) {
                // request a driller
                requested_creeps.push(new DRILLER.DrillerMemory(
                    room.name,
                    source_id,
                    source_data.container_x,
                    source_data.container_y
                ));
            }
            // check if a transporter is needed for this source
            if (source_data.transporter == null) {
                // request a transporter
                requested_creeps.push(new TRANSPORTER.TransporterMemory(
                    room.name,
                    source_id,
                    source_data.container_x,
                    source_data.container_y
                ));
            }
        }

        // check if an upgrader is needed
        if (room_data.type == COLONY && [UPGRADER.NAME] == undefined || pop[UPGRADER.NAME] < 1) {
            // request an upgrader
            requested_creeps.push(new UPGRADER.UpgraderMemory(room.name));
        }

        // count the construction sites
        let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
        // check if a builder is needed
        if (site_count > 0 && (pop[BUILDER.NAME] == undefined || pop[BUILDER.NAME] < 2)) {
            // request a builder
            requested_creeps.push(new BUILDER.BuilderMemory(room.name));
        }

        // find all the structures
        let structure_count = room.find(FIND_STRUCTURES, {
            // that are damaged
            filter: structure => structure.hits < structure.hitsMax,
        }).length;
        // check if a repairer is needed
        if (structure_count > 0 && (pop[REPAIRER.NAME] == undefined || pop[REPAIRER.NAME] < 1)) {
            // request a repairer
            requested_creeps.push(new REPAIRER.RepairerMemory(room.name));
        }

        // check if a queen is needed
        if (room.storage != undefined && (pop[QUEEN.NAME] == undefined || pop[QUEEN.NAME] < 1)) {
            // request a queen
            requested_creeps.push(new QUEEN.QueenMemory(room.name));
        }

        // loop through the minerals
        for (let mineral_id in pop.minerals) {
            // grab the mineral data
            let mineral_data = pop.minerals[mineral_id];
            // check if a driller is needed for this mineral
            if (mineral_data.driller == null) {
                // request a driller
                requested_creeps.push(new DRILLER.DrillerMemory(
                    room.name,
                    mineral_data,
                    mineral_data.container_x,
                    mineral_data.container_y
                ));
            }
            // check if a transporter is needed for this mineral
            if (mineral_data.transporter == null) {
                // request a transporter
                requested_creeps.push(new TRANSPORTER.TransporterMemory(
                    room.name,
                    mineral_data,
                    mineral_data.container_x,
                    mineral_data.container_y
                ));
            }
        }

        // find all the structures
        let observer_count = room.find(FIND_STRUCTURES, {
            // that are observers
            filter: structure => structure.structureType == STRUCTURE_OBSERVER,
        }).length;
        // check if a scout is needed
        if (room_data.type == COLONY && observer_count == 0 && (pop[SCOUT.NAME] == undefined || pop[SCOUT.NAME] < 1)) {
            // request a scout
            requested_creeps.push(new SCOUT.ScoutMemory(room));
        }

        // check if an attacker is needed
        if (pop[ATTACKER.NAME] == undefined || pop[ATTACKER.NAME] < 1) {
            // request an attacker
            requested_creeps.push(new ATTACKER.AttackerMemory(room.name));
        }

        // check if a healer is needed
        if (pop[HEALER.NAME] == undefined || pop[HEALER.NAME] < 1) {
            // request a healer
            requested_creeps.push(new HEALER.HealerMemory(room.name));
        }

        // set the requested creeps on the room_data
        room_data.requested_creeps = requested_creeps;
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
            // push true to the satisfaction log to show we were satisfied for this tick
            room_data.satisfaction_log.push(true);
        } else {
            // push false to the satisfaction log to show we were unsatisfied for this tick
            room_data.satisfaction_log.push(false);
        }

        // check if the satisfaction log is too big
        if (room_data.satisfaction_log.length > this.SATISFACTION_LOG_SIZE) {
            // remove the first element
            room_data.satisfaction_log.shift();
        }

        // calculate the average satisfaction and see if it meets the threshold of satisfaction
        room_data.satisfied = (Util.getSatisfiedRatio(room_data) > this.SATISFACTION_THRESHOLD);

        /* TODO: uncomment this and setup detection for room death
        // check if we have lost control of the controller
        if (!room.controller.my) {
            // mark ths room as dead
            room_data.dead = true;
        }
         */
    },
    /**
     * run the colony, kicking off sub-functions for specific activities
     * @param {Room} room - The Room we are running
     * @param {RoomData} room_data - The room data for the room.
     */
    run: function (room, room_data) {
        hlog("Running " + room_data.type + " room: '" + room.name + "'...");
        // if the population timer has gone off
        if (room_data.population_timer > this.POPULATION_TIMER_LENGTH) {
            hlog("Requesting creeps...");
            // request a new set of creeps
            this.requestCreeps(room, room_data);
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
        if (room_data.construction_timer > this.CONSTRUCTION_TIMER_LENGTH) {
            hlog("Building construction sites...");
            // try to create new construction sites
            room.createConstructionSites(room_data.plans);
            // reset the construction timer
            room_data.construction_timer = 0;
        } else {
            // increment the construction timer
            room_data.construction_timer++;
        }

        // if the room has a plant
        if (room_data.plans.plant_location != null) {
            // run the plant
            PlantRunner.run(room, room_data.plant_data);
        }
    },
};