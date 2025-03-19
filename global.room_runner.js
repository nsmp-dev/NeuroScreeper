const Util = require('global.util');

// this is a room runner: it contains logic for running each kind of room
// manages its own data by passing its memory via a RoomData object, along with a reference to the room itself
module.exports = {
    // recalculate the population needs and save the requested creeps to room_data
    requestCreeps: function (room, room_data) {
        // grab the population for this room
        let pop = Memory.populations[room.name];
        // create a list of requested creeps
        let requested_creeps = [];

        // check if a claimer is needed
        if (!room.controller.my && (pop[CLAIMER.NAME] == undefined || pop[CLAIMER.NAME] < 1)) {
            // request a claimer
            requested_creeps.push(CLAIMER.init(room.name));
        }

        // loop through the sources
        for (let source_id in pop.sources) {
            // grab the source data
            let source_data = pop.sources[source_id];
            // check if a driller is needed for this source
            if (source_data.driller == null) {
                // request a driller
                requested_creeps.push(DRILLER.init(
                    room.name,
                    source_id,
                    source_data.container_x,
                    source_data.container_y
                ));
            }
            // check if a transporter is needed for this source
            if (source_data.transporter == null) {
                // request a transporter
                requested_creeps.push(TRANSPORTER.init(
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
            requested_creeps.push(UPGRADER.init(room.name));
        }

        // count the construction sites
        let site_count = room.find(FIND_MY_CONSTRUCTION_SITES).length;
        // check if a builder is needed
        if (site_count > 0 && (pop[BUILDER.NAME] == undefined || pop[BUILDER.NAME] < 2)) {
            // request a builder
            requested_creeps.push(BUILDER.init(room.name));
        }

        // count the damaged structures
        let structure_count = room.find(FIND_STRUCTURES, {
            filter: structure => structure.hits < structure.hitsMax,
        }).length;
        // check if a repairer is needed
        if (structure_count > 0 && (pop[REPAIRER.NAME] == undefined || pop[REPAIRER.NAME] < 1)) {
            // request a repairer
            requested_creeps.push(REPAIRER.init(room.name));
        }

        // check if a queen is needed
        if (room.storage != undefined && (pop[QUEEN.NAME] == undefined || pop[QUEEN.NAME] < 1)) {
            // request a queen
            requested_creeps.push(QUEEN.init(room.name));
        }

        // loop through the minerals
        for (let mineral_id in pop.minerals) {
            // grab the source data
            let mineral_data = pop.minerals[mineral_id];
            // check if a driller is needed for this source
            if (mineral_data.driller == null) {
                // request a driller
                requested_creeps.push(DRILLER.init(
                    room.name,
                    mineral_data,
                    mineral_data.container_x,
                    mineral_data.container_y
                ));
            }
            // check if a transporter is needed for this source
            if (mineral_data.transporter == null) {
                // request a transporter
                requested_creeps.push(TRANSPORTER.init(
                    room.name,
                    mineral_data,
                    mineral_data.container_x,
                    mineral_data.container_y
                ));
            }
        }

        // count the observers in the room
        let observer_count = room.find(FIND_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_OBSERVER,
        }).length;
        // check if a scout is needed
        if (room_data.type == COLONY && observer_count == 0 && (pop[SCOUT.NAME] == undefined || pop[SCOUT.NAME] < 1)) {
            // request a scout
            requested_creeps.push(SCOUT.init(room.name));
        }

        // check if an attacker is needed
        if (pop[ATTACKER.NAME] == undefined || pop[ATTACKER.NAME] < 1) {
            // request an attacker
            requested_creeps.push(ATTACKER.init(room.name));
        }

        // check if a healer is needed
        if (pop[HEALER.NAME] == undefined || pop[HEALER.NAME] < 1) {
            // request a healer
            requested_creeps.push(HEALER.init(room.name));
        }

        // set the requested creeps on the room_data
        room_data.requested_creeps = requested_creeps;
    },
    // attempt to spawn any creeps that are requested
    spawnRequestedCreeps: function (room, room_data) {
        let success;

        if (room_data.type == COLONY) {
            success = room.spawnRole(room_data.requested_creeps[0]);
        }else{
            success = room.spawnRole(room_data.requested_creeps[0], true);
        }
        // check if we successfully spawned the creep
        if (success) {
            // remove the creep that was successfully spawned
            room_data.requested_creeps.shift();
        }
    },
    // calculate to see if the room is satisfied
    calculateSatisfaction: function (room, room_data) {
        // if no creeps are needed
        if (room_data.requested_creeps.length == 0) {
            // push a 1 to the satisfaction log to show we were satisfied for this tick
            room_data.satisfaction_log.push(true);
        } else {
            // push a 0 to the satisfaction log to show we were unsatisfied for this tick
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
    // run the colony, kicking off sub-functions for specific activities
    run: function (room, room_data) {
        hlog("Running " + room_data.type + " room: '" + room.name + "'...");
        // if the population timer has gone off
        if (room_data.population_timer > this.POPULATION_TIMER_LENGTH) {
            hlog("Requesting creeps...");
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
            this.spawnRequestedCreeps(room, room_data);
        }

        // check if the construction timer has gone off
        if (room_data.construction_timer > this.CONSTRUCTION_TIMER_LENGTH) {
            hlog("Building construction sites...");
            room.createConstructionSites(room_data.plans);
            // reset the construction timer
            room_data.construction_timer = 0;
        } else {
            // increment the construction timer
            room_data.construction_timer++;
        }
    },
};