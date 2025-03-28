const CreepMemory = require("data.creep_memory");

/**
 * username for comparing controllers
 * @constant {string} USERNAME
 */
global.USERNAME = "uhhyea";
/**
 * debug mode for logger
 * @constant {Boolean} DEBUG_MODE
 */
global.DEBUG_MODE = true;
/**
 * change the build number to trigger a memory wipe
 * @constant {number} BUILD
 */
global.BUILD = 6;
/**
 * how many previous ticks to maintain for average cpu time
 * @constant {number} LOG_SIZE
 */
global.LOG_SIZE = 50;
/**
 * used to id a colony
 * @constant {string} COLONY
 */
global.COLONY = "colony";
/**
 * used to id an expansion
 * @constant {string} EXPANSION
 */
global.EXPANSION = "expansion";
/**
 * used to id a keeper lair
 * @constant {string} KEEPER_LAIR
 */
global.KEEPER_LAIR = "keeper_lair";
/**
 * used to id a highway
 * @constant {string} HIGHWAY
 */
global.HIGHWAY = "highway";
/**
 * ticks between making construction sites
 * @constant {number} CONSTRUCTION_TIMER_LENGTH
 */
global.CONSTRUCTION_TIMER_LENGTH = 50;
/**
 * ticks between calculating population needs
 * @constant {number} REQUEST_POPULATION_TIMER_LENGTH
 */
global.REQUEST_POPULATION_TIMER_LENGTH = 10;
/**
 * ticks between recounting the populations
 * @constant {number} COUNT_POPULATION_TIMER_LENGTH
 */
global.COUNT_POPULATION_TIMER_LENGTH = 10;
/**
 * ticks between considering adding a new room
 * @constant {number} NEW_ROOM_TIMER_LENGTH
 */
global.NEW_ROOM_TIMER_LENGTH = 100;
/**
 * ticks between getting plant structures
 * @constant {number} PLANT_STRUCTURES_TIMER_LENGTH
 */
global.PLANT_STRUCTURES_TIMER_LENGTH = 10;
/**
 * ticks between getting reaction requests
 * @constant {number} REACTION_TIMER_LENGTH
 */
global.REACTION_TIMER_LENGTH = 10;
/**
 * ticks between getting production requests
 * @constant {number} PRODUCTION_TIMER_LENGTH
 */
global.PRODUCTION_TIMER_LENGTH = 10;
/**
 * ticks between running the terminal
 * @constant {number} TERMINAL_TIMER_LENGTH
 */
global.TERMINAL_TIMER_LENGTH = 100;
/**
 * ratio of ticks that must be satisfied to count as overall satisfied
 * @constant {number} SATISFACTION_THRESHOLD
 */
global.SATISFACTION_THRESHOLD = 0.9;
/**
 * size of the log to keep for satisfaction calculations
 * @constant {number} SATISFACTION_LOG_SIZE
 */
global.SATISFACTION_LOG_SIZE = 100;

let localTestFunc = function () {}
global.testFunc = localTestFunc
/**
 * logger function for debugging
 * @global
 * @function hlog
 * @param {string} str
 */
let hlog = function (str) {
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
global.hlog = hlog;

/**
 * List of states that can be used for state machines
 * @constant {Object} STATES
 * @enum {number}
 */
global.STATES = {
    IDLE: 0,
    FILLING: 1,
    DUMPING: 2,
    PRODUCING: 3,
    REACTING: 4,
};

/**
 * List of task types that are used to identify tasks
 * @constant {Object} TASK_TYPES
 * @enum {number}
 */
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
    RENEW_OPERATOR: 10,
};

/**
 * Attacker name, body, and initializer
 * @constant {Object} ATTACKER
 */
global.ATTACKER = {
    // identifying string
    NAME: "attacker",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [ATTACK, TOUGH, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    AttackerMemory: class AttackerMemory extends CreepMemory{
        constructor(room_name){
            super(ATTACKER.NAME, room_name);
        }
    },
};

/**
 * Builder name, body, and initializer
 * @constant {Object} BUILDER
 */
global.BUILDER = {
    NAME: "builder",
    BODY: [WORK, CARRY, MOVE, MOVE],
    ENERGY_COST: 250,
    BuilderMemory: class BuilderMemory extends CreepMemory{
        constructor(room_name){
            super(BUILDER.NAME, room_name);
        }
    },
};

/**
 * Claimer name, body, and initializers
 * @constant {Object} CLAIMER
 */
global.CLAIMER = {
    NAME: "claimer",
    BODY: [CLAIM, MOVE],
    ENERGY_COST: 650,
    ClaimerMemory: class ClaimerMemory extends CreepMemory{
        constructor(room_name){
            super(CLAIMER.NAME, room_name);
        }
    },
};

/**
 * Driller name, body, and initializers
 * @constant {Object} DRILLER
 */
global.DRILLER = {
    NAME: "driller",
    BODY: [WORK, MOVE],
    ENERGY_COST: 150,
    DrillerMemory: class DrillerMemory extends CreepMemory{
        constructor(room_name, source_id, container_x, container_y){
            super(DRILLER.NAME, room_name);
            this.source = source_id;
            this.container_x = container_x;
            this.container_y = container_y;
        }
    },
};

/**
 * Healer name, body, and initializers
 * @constant {Object} HEALER
 */
global.HEALER = {
    NAME: "healer",
    BODY: [HEAL, TOUGH, MOVE, MOVE],
    ENERGY_COST: 360,
    HealerMemory: class HealerMemory extends CreepMemory{
        constructor(room_name){
            super(HEALER.NAME, room_name);
        }
    },
};

/**
 * Queen name, body, and initializers
 * @constant {Object} QUEEN
 */
global.QUEEN = {
    NAME: "queen",
    BODY: [CARRY, MOVE],
    ENERGY_COST: 150,
    QueenMemory: class QueenMemory extends CreepMemory{
        constructor(room_name){
            super(QUEEN.NAME, room_name);
        }
    },
};

/**
 * Repairer name, body, and initializers
 * @constant {Object} REPAIRER
 */
global.REPAIRER = {
    NAME: "repairer",
    BODY: [WORK, CARRY, MOVE, MOVE],
    ENERGY_COST: 250,
    RepairerMemory: class RepairerMemory extends CreepMemory{
        constructor(room_name){
            super(REPAIRER.NAME, room_name);
        }
    },
};

/**
 * Scout name, body, and initializers
 * @constant {Object} SCOUT
 */
global.SCOUT = {
    NAME: "scout",
    BODY: [MOVE],
    ENERGY_COST: 50,
    ScoutMemory: class ScoutMemory extends CreepMemory{
        constructor(room_name){
            super(SCOUT.NAME, room_name);
            this.room_queue = [];
            this.room_log = [];
            this.started = false;
        }
    },
};

/**
 * Transporter name, body, and initializers
 * @constant {Object} TRANSPORTER
 */
global.TRANSPORTER = {
    NAME: "transporter",
    BODY: [CARRY, MOVE],
    ENERGY_COST: 100,
    TransporterMemory: class TransporterMemory extends CreepMemory{
        constructor(room_name, source_id, container_x, container_y){
            super(TRANSPORTER.NAME, room_name);

            let nearest_colony_room_name = null;
            let lowest_distance = null;

            for (let test_room_name of Memory.room_data) {
                let test_room_data = Memory.room_data[test_room_name];
                if (test_room_data.type == COLONY) {
                    let distance = Game.map.getRoomLinearDistance(room_name, test_room_data);

                    if (nearest_colony_room_name == null || distance < lowest_distance) {
                        nearest_colony_room_name = test_room_name;
                        lowest_distance = distance;
                    }
                }
            }

            this.nearest_colony_room_name = nearest_colony_room_name;
            this.source = source_id;
            this.container_x = container_x;
            this.container_y = container_y;
            this.container = null;
        }
    },
};

/**
 * Upgrader name, body, and initializers
 * @constant {Object} UPGRADER
 */
global.UPGRADER = {
    NAME: "upgrader",
    BODY: [WORK, CARRY, MOVE, MOVE],
    ENERGY_COST: 250,
    UpgraderMemory: class UpgraderMemory extends CreepMemory{
        constructor(room_name){
            super(UPGRADER.NAME, room_name);
        }
    },
};


global.ROLES = {};
global.ROLES[ATTACKER.NAME] = ATTACKER;
global.ROLES[BUILDER.NAME] = BUILDER;
global.ROLES[CLAIMER.NAME] = CLAIMER;
global.ROLES[DRILLER.NAME] = DRILLER;
global.ROLES[HEALER.NAME] = HEALER;
global.ROLES[QUEEN.NAME] = QUEEN;
global.ROLES[SCOUT.NAME] = SCOUT;
global.ROLES[TRANSPORTER.NAME] = TRANSPORTER;
global.ROLES[UPGRADER.NAME] = UPGRADER;