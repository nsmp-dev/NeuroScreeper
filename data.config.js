// username for comparing controllers
global.USERNAME = "uhhyea";
// debug mode for logger
global.DEBUG_MODE = true;
// how many previous ticks to maintain for average cpu time
global.LOG_SIZE = 50;
// used to id a colony
global.COLONY = "colony";
// used to id an expansion
global.EXPANSION = "expansion";
// used to id a keeper lair
global.KEEPER_LAIR = "keeper_lair";
// used to id a highway
global.HIGHWAY = "highway";
// ticks between making construction sites
global.CONSTRUCTION_TIMER_LENGTH = 50;
// ticks between calculating population needs
global.REQUEST_POPULATION_TIMER_LENGTH = 10;
// ticks between recounting the populations
global.COUNT_POPULATION_TIMER_LENGTH = 10;
// ticks between  considering adding a new room
global.NEW_ROOM_TIMER_LENGTH = 100;
// ratio of ticks that must be satisfied to count as overall satisfied
global.SATISFACTION_THRESHOLD = 0.9;
// size of the log to keep for satisfaction calculations
global.SATISFACTION_LOG_SIZE = 100;

// constants for creep role usage
global.ATTACKER = {
    // identifying string
    NAME: "attacker",
        // standard body build, can be multiplied arbitrarily to build larger creeps
        BODY: [ATTACK, TOUGH, MOVE, MOVE],
        // energy cost of the body
        ENERGY_COST: 100,
        // initializer that assembles the initial creep memory
        init: function (room_name) {
        // return the memory object
        return {
            // role of the creep
            role: this.NAME,
            // the current target for the creep
            target: null,
            // the room the creep is assigned to
            room_name: room_name,
        };
    },
};
global.BUILDER = {
    NAME: "builder",
        BODY: [WORK, CARRY, MOVE, MOVE],
        ENERGY_COST: 250,
        BUILDING: 0,
        FILLING: 1,
        init: function (room_name) {
        return {
            role: this.NAME,
            state: this.FILLING,
            filling_target: null,
            building_target: null,
            room_name: room_name,
        };
    },
};
global.CLAIMER = {
    NAME: "claimer",
        BODY: [CLAIM, MOVE],
        ENERGY_COST: 650,
        init: function (room_name) {
        return {
            role: this.NAME,
            room_name: room_name,
        };
    },
};
global.DRILLER = {
    NAME: "driller",
        BODY: [WORK, MOVE],
        ENERGY_COST: 150,
        init: function (room_name, source_id, container_x, container_y) {
        return {
            role: this.NAME,
            room_name: room_name,
            source: source_id,
            container_x: container_x,
            container_y: container_y,
        };
    },
};
global.HEALER = {
    NAME: "healer",
        BODY: [HEAL, TOUGH, MOVE, MOVE],
        ENERGY_COST: 360,
        init: function (room_name) {
        return {
            role: this.NAME,
            room_name: room_name,
        };
    },
};
global.QUEEN = {
    NAME: "queen",
        BODY: [CARRY, MOVE],
        ENERGY_COST: 150,
        DUMPING: 0,
        FILLING: 1,
        init: function (room_name) {
        return {
            role: this.NAME,
            room_name: room_name,
            state: this.FILLING,
            dumping_target: null,
        };
    },
};
global.REPAIRER = {
    NAME: "repairer",
        BODY: [WORK, CARRY, MOVE, MOVE],
        ENERGY_COST: 250,
        REPAIRING: 0,
        FILLING: 1,
        init: function (room_name) {
        return {
            role: this.NAME,
            state: this.FILLING,
            filling_target: null,
            repairing_target: null,
            room_name: room_name,
        };
    },
};
global.SCOUT = {
    NAME: "scout",
        BODY: [MOVE],
        ENERGY_COST: 50,
        init: function (room_name) {
        return {
            role: this.NAME,
            room_name: room_name,
            room_queue: [],
            room_log: [],
            started: false,
        };
    },
};
global.TRANSPORTER = {
    NAME: "transporter",
        BODY: [CARRY, MOVE],
        ENERGY_COST: 100,
        DUMPING: 0,
        FILLING: 1,
        init: function (room_name, source_id, container_x, container_y) {
        // TODO: find the nearest colony room name
        let nearest_colony_room_name = null;
        return {
            role: this.NAME,
            room_name: room_name,
            nearest_colony_room_name: nearest_colony_room_name,
            source: source_id,
            container_x: container_x,
            container_y: container_y,
            container_id: null,
            dumping_target: null,
            state: this.FILLING,
        };
    },
};
global.UPGRADER = {
    NAME: "upgrader",
        BODY: [WORK, CARRY, MOVE, MOVE],
        ENERGY_COST: 250,
        UPGRADING: 0,
        FILLING: 1,
        init: function (room_name) {
        return {
            role: this.NAME,
            room_name: room_name,
            state: this.FILLING,
        };
    },
};