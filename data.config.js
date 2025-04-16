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
global.BUILD = 4;
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
 * @constant {number} LABS_TIMER_LENGTH
 */
global.LABS_TIMER_LENGTH = 10;
/**
 * ticks between getting production requests
 * @constant {number} FACTORY_TIMER_LENGTH
 */
global.FACTORY_TIMER_LENGTH = 10;
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
 * hash table for grabbing role constants using their id strings
 * @constant {Object} ROLES
 */
global.ROLES = {};

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
    /** moving a resource from one structure to another */
    MOVE_RESOURCE: 13,
    /** harvesting from a source or deposit until full */
    HARVEST: 14,
};

/**
 * states enum for state machines
 * @constant {Object} STATES
 * @enum {number}
 */
global.STATES = {
    IDLE: 0,
    SEARCHING: 1,
    COLLECTING: 2,
    RETURNING: 3,
    LOADING: 4,
    RUNNING: 5,
    FINISHED: 6,
    CLEANING: 7,
};