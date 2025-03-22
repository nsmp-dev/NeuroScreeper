// username for comparing controllers
global.USERNAME = "uhhyea";
// debug mode for logger
global.DEBUG_MODE = true;
// change the build number to trigger a memory wipe
global.BUILD = 6;
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
// ticks between getting plant structures
global.PLANT_STRUCTURES_TIMER_LENGTH = 10;
// ticks between getting reaction requests
global.REACTION_TIMER_LENGTH = 10;
// ticks between getting production requests
global.PRODUCTION_TIMER_LENGTH = 10;
// ticks between running the terminal
global.TERMINAL_TIMER_LENGTH = 100;
// ratio of ticks that must be satisfied to count as overall satisfied
global.SATISFACTION_THRESHOLD = 0.9;
// size of the log to keep for satisfaction calculations
global.SATISFACTION_LOG_SIZE = 100;

// logger function for debugging
global.hlog = function (str) {
    // if we have debug mode turned on
    if (DEBUG_MODE) {
        // if the variable is a non-object
        if (typeof str === "string" || typeof str === "number" || typeof str === "boolean") {
            // print the variable
            console.log(str);
        }else {
            // stringify then print the variable
            console.log(JSON.stringify(str));
        }
    }
};

global.STATES = {
    FILLING: 0,
    DUMPING: 1,
};

global.TASK_TYPES = {
    GATHER: 0,
    DEPOSIT: 1,
    REPAIR: 2,
    BUILD: 2,
    UPGRADE: 3,
    CLAIM: 4,
    RESERVE: 5,
    DRILL: 6,
    ATTACK: 7,
    HEAL: 8,
    MOVE_ROOM: 9,
    IDLE: 9,
};

global.OPERATOR = {
    IDLE: 0,
    RENEWING: 1,
    LOADING: 2,
    UNLOADING: 3,
};

global.PLANT = {
    IDLE: 0,
    PRODUCING: 1,
    REACTING: 2,
};

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
