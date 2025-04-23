/**
 * username for comparing controllers
 * @constant {string} USERNAME
 */
global.USERNAME = "uhhyea";
/**
 * signature for signing controllers
 * @constant {string} SIGNATURE
 */
global.SIGNATURE = "hello";
/**
 * debug mode for logger
 * @constant {Boolean} DEBUG_MODE
 */
global.DEBUG_MODE = true;
/**
 * change the build number to trigger a memory wipe
 * @constant {number} BUILD
 */
global.BUILD = 7;
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
 * ticks between running the power squad
 * @constant {number} POWER_SQUAD_TIMER
 */
global.POWER_SQUAD_TIMER = 10;
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
 * ticks between caching plant structures
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
 * amount of energy to keep in the terminal
 * @constant {number} TERMINAL_ENERGY_CAP
 */
global.TERMINAL_ENERGY_CAP = 5000;
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
 * minimum amount of energy a tower needs to operate
 * @constant {number} TOWER_MINIMUM_ENERGY
 */
global.TOWER_MINIMUM_ENERGY = 100;
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
    FILLING: 8,
    DUMPING: 9,
};

/**
 * list of all final products in the game
 * @constant {string[]} FINAL_PRODUCTS
 */
global.FINAL_PRODUCTS = [
    RESOURCE_CATALYZED_UTRIUM_ACID,
    RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
    RESOURCE_CATALYZED_KEANIUM_ACID,
    RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
    RESOURCE_CATALYZED_LEMERGIUM_ACID,
    RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
    RESOURCE_CATALYZED_ZYNTHIUM_ACID,
    RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
    RESOURCE_CATALYZED_GHODIUM_ACID,
    RESOURCE_CATALYZED_GHODIUM_ALKALIDE,
    RESOURCE_ESSENCE,
    RESOURCE_MACHINE,
    RESOURCE_ORGANISM,
    RESOURCE_DEVICE,
];
/**
 * list of all ingredients in the game
 * @constant {string[]} INGREDIENTS
 */
global.INGREDIENTS = [
    RESOURCE_HYDROGEN,
    RESOURCE_OXYGEN,
    RESOURCE_UTRIUM,
    RESOURCE_LEMERGIUM,
    RESOURCE_KEANIUM,
    RESOURCE_ZYNTHIUM,
    RESOURCE_CATALYST,
    RESOURCE_GHODIUM,
    RESOURCE_SILICON,
    RESOURCE_METAL,
    RESOURCE_BIOMASS,
    RESOURCE_MIST,
    RESOURCE_HYDROXIDE,
    RESOURCE_ZYNTHIUM_KEANITE,
    RESOURCE_UTRIUM_LEMERGITE,
    RESOURCE_UTRIUM_HYDRIDE,
    RESOURCE_UTRIUM_OXIDE,
    RESOURCE_KEANIUM_HYDRIDE,
    RESOURCE_KEANIUM_OXIDE,
    RESOURCE_LEMERGIUM_HYDRIDE,
    RESOURCE_LEMERGIUM_OXIDE,
    RESOURCE_ZYNTHIUM_HYDRIDE,
    RESOURCE_ZYNTHIUM_OXIDE,
    RESOURCE_GHODIUM_HYDRIDE,
    RESOURCE_GHODIUM_OXIDE,
    RESOURCE_UTRIUM_ACID,
    RESOURCE_UTRIUM_ALKALIDE,
    RESOURCE_KEANIUM_ACID,
    RESOURCE_KEANIUM_ALKALIDE,
    RESOURCE_LEMERGIUM_ACID,
    RESOURCE_LEMERGIUM_ALKALIDE,
    RESOURCE_ZYNTHIUM_ACID,
    RESOURCE_ZYNTHIUM_ALKALIDE,
    RESOURCE_GHODIUM_ACID,
    RESOURCE_GHODIUM_ALKALIDE,
    RESOURCE_UTRIUM_BAR,
    RESOURCE_LEMERGIUM_BAR,
    RESOURCE_ZYNTHIUM_BAR,
    RESOURCE_KEANIUM_BAR,
    RESOURCE_GHODIUM_MELT,
    RESOURCE_OXIDANT,
    RESOURCE_REDUCTANT,
    RESOURCE_PURIFIER,
    RESOURCE_BATTERY,
    RESOURCE_COMPOSITE,
    RESOURCE_CRYSTAL,
    RESOURCE_LIQUID,
    RESOURCE_WIRE,
    RESOURCE_SWITCH,
    RESOURCE_TRANSISTOR,
    RESOURCE_MICROCHIP,
    RESOURCE_CIRCUIT,
    RESOURCE_CELL,
    RESOURCE_PHLEGM,
    RESOURCE_TISSUE,
    RESOURCE_MUSCLE,
    RESOURCE_ORGANOID,
    RESOURCE_ALLOY,
    RESOURCE_TUBE,
    RESOURCE_FIXTURES,
    RESOURCE_FRAME,
    RESOURCE_HYDRAULICS,
    RESOURCE_CONDENSATE,
    RESOURCE_CONCENTRATE,
    RESOURCE_EXTRACT,
    RESOURCE_SPIRIT,
    RESOURCE_EMANATION,
];