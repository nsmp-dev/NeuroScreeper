const CreepMemory = require("data.creep_memory");
const Point = require("data.point");

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
 * used to id a colony room
 * @constant {string} COLONY
 */
global.COLONY = "colony";
/**
 * used to id an expansion room
 * @constant {string} EXPANSION
 */
global.EXPANSION = "expansion";
/**
 * used to id a keeper lair room
 * @constant {string} KEEPER_LAIR
 */
global.KEEPER_LAIR = "keeper_lair";
/**
 * used to id a highway room
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
 * limit of how many construction sites are allowed in a single room
 * @constant {number} ROOM_CONSTRUCTION_SITE_LIMIT
 */
global.ROOM_CONSTRUCTION_SITE_LIMIT = 5;
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
/**
 * logger function for debugging
 * @global
 * @function hlog
 * @param {string} value
 * @param {string|null} label
 */
let hlog = function (value, label = null) {
    // if we have debug mode turned on
    if (DEBUG_MODE) {
        // create a variable for the string we will be printing
        let str = value;
        // if the value is a non-object
        if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
            // stringify it for printing
            str = JSON.stringify(value);
        }
        // if a label was provided
        if (label != null) {
            // print the variable with a label
            console.log(label + ": " + str);
        }else{
            // print the variable
            console.log(str);
        }
    }
};
// setting the hlog function to the global scope, fixes a JSDoc parsing issue with global functions
global.hlog = hlog;

/**
 * Enum of states that can be used for state machines
 * @constant {Object} STATES
 * @enum {number}
 */
global.STATES = {
    /** idle state for defaulting to, usually means doing nothing */
    IDLE: 0,
    /** means acquiring a resource, the first step in most processes */
    FILLING: 1,
    /** means using or dropping off a resource, the second half of most processes */
    DUMPING: 2,
    /** signifies a plant is in the middle of producing */
    PRODUCING: 3,
    /** signifies a plant is in the middle of reacting */
    REACTING: 4,
};

/**
 * List of task types that are used to identify tasks
 * @constant {Object} TASK_TYPES
 * @enum {number}
 */
global.TASK_TYPES = {
    /** moving to the idle location and waiting */
    IDLE: 0,
    /** acquiring a resource on the ground or in a structure with a store */
    GATHER: 1,
    /** acquiring a resource on the ground or in a structure with a store */
    DEPOSIT: 2,
    /** repairing a structure */
    REPAIR: 3,
    /** building a structure */
    BUILD: 4,
    /** upgrading the controller */
    UPGRADE: 5,
    /** claiming the controller */
    CLAIM: 6,
    /** reserving the controller */
    RESERVE: 7,
    /** drilling a source */
    DRILL: 8,
    /** attacking a target */
    ATTACK: 9,
    /** healing a creep */
    HEAL: 10,
    /** moving to a room */
    MOVE_ROOM: 11,
    /** renewing the operator at the power spawn */
    RENEW_OPERATOR: 12,
};

/**
 * Attacker name, body, and initializer
 * @constant {Object} ATTACKER
 */
global.ATTACKER = {
    // identifying string
    NAME: "attacker",
    // emoji for shorthand visuals
    EMOJI: "⚔️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [ATTACK, TOUGH, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 12,
    // memory class used for this creep
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
    // identifying string
    NAME: "builder",
    // emoji for shorthand visuals
    EMOJI: "🔨",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [WORK, CARRY, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 250,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 12,
    // memory class used for this creep
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
    // identifying string
    NAME: "claimer",
    // emoji for shorthand visuals
    EMOJI: "🏰",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [CLAIM, MOVE],
    // energy cost of the body
    ENERGY_COST: 650,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
    // memory class used for this creep
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
    // identifying string
    NAME: "driller",
    // emoji for shorthand visuals
    EMOJI: "⛏️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [WORK, MOVE],
    // energy cost of the body
    ENERGY_COST: 150,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
    // memory class used for this creep
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
    // identifying string
    NAME: "healer",
    // emoji for shorthand visuals
    EMOJI: "⚕️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [HEAL, TOUGH, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 360,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 12,
    // memory class used for this creep
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
    // identifying string
    NAME: "queen",
    // emoji for shorthand visuals
    EMOJI: "👑",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [CARRY, MOVE],
    // energy cost of the body
    ENERGY_COST: 150,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
    // memory class used for this creep
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
    // identifying string
    NAME: "repairer",
    // emoji for shorthand visuals
    EMOJI: "🪛",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [WORK, CARRY, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 250,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 12,
    // memory class used for this creep
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
    // identifying string
    NAME: "scout",
    // emoji for shorthand visuals
    EMOJI: "🔭",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [MOVE],
    // energy cost of the body
    ENERGY_COST: 50,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 1,
    // memory class used for this creep
    ScoutMemory: class ScoutMemory extends CreepMemory{
        constructor(room){
            super(SCOUT.NAME, room.name);
            this.room_queue = room.getAdjacentRooms();
            this.room_log = [room.name];
        }
    },
};

/**
 * Transporter name, body, and initializers
 * @constant {Object} TRANSPORTER
 */
global.TRANSPORTER = {
    // identifying string
    NAME: "transporter",
    // emoji for shorthand visuals
    EMOJI: "🚛",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [CARRY, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
    // memory class used for this creep
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
            this.container_location = new Point(container_x, container_y);
            this.container_id = null;
        }
    },
};

/**
 * Upgrader name, body, and initializers
 * @constant {Object} UPGRADER
 */
global.UPGRADER = {
    // identifying string
    NAME: "upgrader",
    // emoji for shorthand visuals
    EMOJI: "⬆️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [WORK, CARRY, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 250,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
    // memory class used for this creep
    UpgraderMemory: class UpgraderMemory extends CreepMemory{
        constructor(room_name){
            super(UPGRADER.NAME, room_name);
        }
    },
};
/**
 * hash table for grabbing role constants using their id strings
 * @constant {Object} ROLES
 */
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
