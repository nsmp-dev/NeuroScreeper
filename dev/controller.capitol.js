const Util = require('global.util');
const MyLogger = require('global.logger');
const Plant = require('controller.plant');

// this is a capitol: a type of room where we keep all minerals, power, and commodities
// has a special plant area that handles the labs, factory, and power spawn
// manages its own data by passing its memory object "room data" around, along with a reference to the room itself
module.exports = {
    // constant used to id a capitol
    NAME: "capitol",
    // ticks between making construction sites
    CONSTRUCTION_TIMER_LENGTH: 50,
    // ticks between calculating population needs
    POPULATION_TIMER_LENGTH: 10,
    // ratio of ticks that must be satisfied to count as overall satisfied
    SATISFACTION_THRESHOLD: 0.9,
    // size of the log to keep for satisfaction calculations
    SATISFACTION_LOG_SIZE: 100,
    // initialize the capitol, generating construction plans and idle location
    initialize: function (room, room_data) {
        MyLogger.log("initializing a capitol...");
        room_data.type = this.NAME;

        // set the population timer to go off in 2 ticks
        room_data.population_timer = 0;
        // set the construction timer to go off in 4 ticks
        room_data.construction_timer = Math.floor(this.CONSTRUCTION_TIMER_LENGTH / 2);
    },
    // tests the room for suitability of a capitol
    testRoom: function (plans) {
        // return if all requirements are met
        return (
            plans.sources.length > 1 &&
            plans.minerals.length > 0 &&
            plans.base_x != null &&
            plans.plant_x != null
        );
    },
    // recalculate the population needs and save the requested creeps to room_data
    planPopulationRequests: function (room, room_data) {
        // ease of access variables
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
            let data = pop.sources[source_id];
            // check if a driller is needed for this source
            if (data.driller == null) {
                // request a driller
                requested_creeps.push(Util.DRILLER.init(room.name, source_id, data.container_x, data.container_y));
            }
            // check if a transporter is needed for this source
            if (data.transporter == null) {
                // request a transporter
                requested_creeps.push(Util.TRANSPORTER.init(room.name, source_id, data.container_x, data.container_y));
            }
        }

        // check if an upgrader is needed
        if (pop[Util.UPGRADER.NAME] == undefined || pop[Util.UPGRADER.NAME] < 1) {
            // request a driller
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
        if (room.storage !== undefined && (pop[Util.QUEEN.NAME] == undefined || pop[Util.QUEEN.NAME] < 1)) {
            // request a queen
            requested_creeps.push(Util.QUEEN.init(room.name));
        }

        // check if a scout is needed
        if (pop[Util.SCOUT.NAME] == undefined || pop[Util.SCOUT.NAME] < 1) {
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
        // return the room data for saving
        return room_data;
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

        // return the room data for saving
        return room_data;
    },
    // do the running step where we execute the info from the planning phase
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

        // check if we have lost control of the controller
        if (!room.controller.my) {
            // mark ths room as dead
            room_data.dead = true;
        }

        // return the room data for saving
        return room_data;
    },
    // run the capitol, kicking off sub-functions for specific activities
    run: function (room, room_data) {
        // if the population timer has gone off
        if (room_data.population_timer > this.POPULATION_TIMER_LENGTH) {
            // recalculate population
            room_data = this.planPopulationRequests(room, room_data);
            // reset the population timer
            room_data.population_timer = 0;
        } else {
            // increment the population timer
            room_data.population_timer++;
        }

        // refresh the satisfaction calculation
        room_data = this.runSatisfaction(room, room_data);

        // if there are any creeps still needed
        if (room_data.requested_creeps.length > 0) {
            // try to spawn creeps if possible
            room_data = this.runPopulationRequests(room, room_data);
        }

        // check if the construction timer has gone off
        if (room_data.construction_timer > this.CONSTRUCTION_TIMER_LENGTH) {
            // place up to 5 structures from the structure plans
            room.createConstructionSites(room_data.structures, room_data.source_plans);
            // reset the construction timer
            room_data.construction_timer = 0;
        } else {
            // increment the construction timer
            room_data.construction_timer++;
        }

        room_data.plant_data = Plant.run(room, room_data.plant_data);

        // return the room data for saving
        return room_data;
    },
};