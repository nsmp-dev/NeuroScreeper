const Util = require('global.util');
const MyLogger = require('global.logger');

// this is a colony: a type of room where we have a standard base with spawns, towers, storage, etc.
// manages its own data by passing its memory object "room data" around, along with a reference to the room itself
module.exports = {
    // constant used to id a colony
    NAME: "colony",
    // ticks between making construction sites
    CONSTRUCTION_TIMER_LENGTH: 50,
    // ticks between calculating population needs
    POPULATION_TIMER_LENGTH: 10,
    // ratio of ticks that must be satisfied to count as overall satisfied
    SATISFACTION_THRESHOLD: 0.9,
    // size of the log to keep for satisfaction calculations
    SATISFACTION_LOG_SIZE: 100,
    // initialize the colony, setting the timers
    initialize: function (room, room_data) {
        MyLogger.log("initializing a colony...");
        // set the type to a colony
        room_data.type = this.NAME;
        // set the population timer to go off immediately
        room_data.population_timer = this.POPULATION_TIMER_LENGTH;
        // set the construction timer to go off offset from the population timer
        room_data.construction_timer = Math.floor(this.CONSTRUCTION_TIMER_LENGTH / 2);
    },
    // tests the room for suitability of a colony
    testRoom: function (plans) {
        // return whether the room meets the conditions
        return (
            // more than 1 source and
            plans.sources.length > 1 &&
            // we were able to find a spot for a base
            plans.base_x != null
        );
    },
    // recalculate the population needs and save the requested creeps to room_data
    planPopulationRequests: function (room, room_data) {
        // grab the population for this room
        let pop = Memory.populations[room.name];
        // create a list of requested creeps
        let requested_creeps = [];

        // check if a claimer is needed
        if (!room.controller.my && (pop[Util.CLAIMER.NAME] == undefined || pop[Util.CLAIMER.NAME] < 1)) {
            // request a claimer
            requested_creeps.push(Util.CLAIMER.init(room.name));
        }

        // loop through the sources
        for (let source_id in pop.sources) {
            // grab the source data
            let source_data = pop.sources[source_id];
            // check if a driller is needed for this source
            if (source_data.driller == null) {
                // request a driller
                requested_creeps.push(Util.DRILLER.init(
                    room.name,
                    source_id,
                    source_data.container_x,
                    source_data.container_y
                ));
            }
            // check if a transporter is needed for this source
            if (source_data.transporter == null) {
                // request a transporter
                requested_creeps.push(Util.TRANSPORTER.init(
                    room.name,
                    source_id,
                    source_data.container_x,
                    source_data.container_y
                ));
            }
        }

        // check if an upgrader is needed
        if (pop[Util.UPGRADER.NAME] == undefined || pop[Util.UPGRADER.NAME] < 1) {
            // request an upgrader
            requested_creeps.push(Util.UPGRADER.init(room.name));
        }

        // count the construction sites
        let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
        // check if a builder is needed
        if (site_count > 0 && (pop[Util.BUILDER.NAME] == undefined || pop[Util.BUILDER.NAME] < 2)) {
            // request a builder
            requested_creeps.push(Util.BUILDER.init(room.name));
        }

        // count the damaged structures
        let structure_count = room.find(FIND_STRUCTURES, {
            filter: structure => structure.hits < structure.hitsMax,
        }).length;
        // check if a repairer is needed
        if (structure_count > 0 && (pop[Util.REPAIRER.NAME] == undefined || pop[Util.REPAIRER.NAME] < 1)) {
            // request a repairer
            requested_creeps.push(Util.REPAIRER.init(room.name));
        }

        // check if a queen is needed
        if (room.storage != undefined && (pop[Util.QUEEN.NAME] == undefined || pop[Util.QUEEN.NAME] < 1)) {
            // request a queen
            requested_creeps.push(Util.QUEEN.init(room.name));
        }

        // count the observers in the room
        let observer_count = room.find(FIND_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_OBSERVER,
        }).length;
        // check if a scout is needed
        if (observer_count == 0 && (pop[Util.SCOUT.NAME] == undefined || pop[Util.SCOUT.NAME] < 1)) {
            // request a scout
            requested_creeps.push(Util.SCOUT.init(room.name));
        }

        // check if an attacker is needed
        if (pop[Util.ATTACKER.NAME] == undefined || pop[Util.ATTACKER.NAME] < 1) {
            // request an attacker
            requested_creeps.push(Util.ATTACKER.init(room.name));
        }

        // check if a healer is needed
        if (pop[Util.HEALER.NAME] == undefined || pop[Util.HEALER.NAME] < 1) {
            // request a healer
            requested_creeps.push(Util.HEALER.init(room.name));
        }

        // set the requested creeps on the room_data
        room_data.requested_creeps = requested_creeps;
    },
    // attempt to spawn any creeps that are requested
    runPopulationRequests: function (room, room_data) {
        let success;
        // check if the creep is a claimer
        if (room_data.requested_creeps[0].role == Util.CLAIMER.NAME) {
            // spawn the claimer globally
            success = room.spawnRole(room_data.requested_creeps[0], true);
        } else {
            // spawn the creep locally
            success = room.spawnRole(room_data.requested_creeps[0]);
        }
        // check if we successfully spawned the creep
        if (success) {
            // remove the creep that was successfully spawned
            room_data.requested_creeps.shift();
        }
    },
    // calculate to see if the room is satisfied
    runSatisfaction: function (room, room_data) {
        // if no creeps are needed
        if (room_data.requested_creeps.length == 0) {
            // push a 1 to the satisfaction log to show we were satisfied for this tick
            room_data.satisfaction_log.push(1);
        } else {
            // push a 0 to the satisfaction log to show we were unsatisfied for this tick
            room_data.satisfaction_log.push(0);
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
    // run the colony, kicking off sub-functions for specific activities
    run: function (room, room_data) {
        // if the population timer has gone off
        if (room_data.population_timer > this.POPULATION_TIMER_LENGTH) {
            // recalculate population
            this.planPopulationRequests(room, room_data);
            // reset the population timer
            room_data.population_timer = 0;
        } else {
            // increment the population timer
            room_data.population_timer++;
        }

        // refresh the satisfaction calculation
        this.runSatisfaction(room, room_data);

        // if there are any creeps still needed
        if (room_data.requested_creeps.length > 0) {
            // try to spawn creeps if possible
            this.runPopulationRequests(room, room_data);
        }

        // check if the construction timer has gone off
        if (room_data.construction_timer > this.CONSTRUCTION_TIMER_LENGTH) {
            // place up to 5 structures from the structure plans
            room.createConstructionSites(room_data.plans);
            // reset the construction timer
            room_data.construction_timer = 0;
        } else {
            // increment the construction timer
            room_data.construction_timer++;
        }
    },
};