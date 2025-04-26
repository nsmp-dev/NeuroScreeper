/**
 * The unique username used for comparing ownership of room controllers with other player controllers
 * @constant {string} USERNAME
 */
global.USERNAME = "uhhyea";
/**
 * Signature message used to sign claimed room controllers, identifying ownership and intent to other players
 * @constant {string} SIGNATURE
 */
global.SIGNATURE = "Purely defensive, still debugging";
/**
 * Determines if detailed diagnostic log messages should be printed to the console during execution
 * @constant {Boolean} DEBUG_MODE
 */
global.DEBUG_MODE = true;
/**
 * Current software build version number. Incrementing this value will trigger a complete memory reset
 * and initiate a controlled termination of all existing creeps to start fresh with new code.
 * @constant {number} BUILD
 */
global.BUILD = 11;
/**
 * Specifies the number of recent game ticks to store in memory for calculating average CPU usage statistics.
 * @constant {number} LOG_SIZE
 */
global.LOG_SIZE = 50;
/**
 * Identifies and categorizes a room as a primary colony room where the controller is owned by the player and serves as
 * a central base of operations
 * @constant {string} COLONY
 */
global.COLONY = "colony";
/**
 * Used to identify and categorize rooms designated for controlled territorial expansion from main colony rooms - rooms lacking controller ownership but targeted for future control
 * @constant {string} EXPANSION
 */
global.EXPANSION = "expansion";
/**
 * Identifies and categorizes specialized source keeper lair rooms that contain hostile NPCs guarding valuable resources
 * @constant {string} KEEPER_LAIR
 */
global.KEEPER_LAIR = "keeper_lair";
/**
 * Identifies and categorizes highway rooms that have no controller and serve as pathways between sectors in the world grid system
 * @constant {string} HIGHWAY
 */
global.HIGHWAY = "highway";
/**
 * Delay interval in game ticks between creation of new construction sites to prevent overwhelming room building queues
 * @constant {number} CONSTRUCTION_TIMER_LENGTH
 */
global.CONSTRUCTION_TIMER_LENGTH = 50;
/**
 * Number of game ticks to wait between recalculating creep population requirements for each room.
 * Controls how frequently the AI evaluates and adjusts creep spawning needs.
 * @constant {number} REQUEST_POPULATION_TIMER_LENGTH
 */
global.REQUEST_POPULATION_TIMER_LENGTH = 10;
/**
 * Number of game ticks to wait between power squad activations - controls frequency of dispatching and managing groups of creeps for harvesting power banks
 * @constant {number} POWER_SQUAD_TIMER
 */
global.POWER_SQUAD_TIMER = 10;
/**
 * Number of game ticks to wait between population recounts. Controls how frequently the system updates the total count
 * of active creeps for population tracking and management purposes.
 * @constant {number} COUNT_POPULATION_TIMER_LENGTH
 */
global.COUNT_POPULATION_TIMER_LENGTH = 10;
/**
 * Number of game ticks that must pass between each check for expanding into a new room. Controls the frequency
 * at which the AI evaluates strategic room expansion opportunities to grow the colony network.
 * @constant {number} NEW_ROOM_TIMER_LENGTH
 */
global.NEW_ROOM_TIMER_LENGTH = 100;
/**
 * Number of game ticks between caching structural information for plant buildings in each room.
 * Controls how frequently structure data is refreshed to maintain performance and accuracy.
 * @constant {number} PLANT_STRUCTURES_TIMER_LENGTH
 */
global.PLANT_STRUCTURES_TIMER_LENGTH = 10;
/**
 * Number of game ticks between laboratory reaction requests.
 * Controls how frequently the AI checks and initiates new chemical reactions in lab structures.
 * @constant {number} LABS_TIMER_LENGTH
 */
global.LABS_TIMER_LENGTH = 10;
/**
 * Number of game ticks between checking and processing new factory production requests.
 * Controls frequency of automated commodity manufacturing checks in factory buildings.
 * @constant {number} FACTORY_TIMER_LENGTH
 */
global.FACTORY_TIMER_LENGTH = 10;
/**
 * Number of game ticks to wait between terminal operations.
 * Controls frequency of automated resource trading and transfer operations through terminal structures.
 * @constant {number} TERMINAL_TIMER_LENGTH
 */
global.TERMINAL_TIMER_LENGTH = 100;
/**
 * Amount of energy to maintain in the terminal structure at all times.
 * Acts as a reserve threshold for automated terminal operations and trading.
 * @constant {number} TERMINAL_ENERGY_CAP
 */
global.TERMINAL_ENERGY_CAP = 5000;
/**
 * Defines the maximum number of concurrent construction sites that can exist within a single room to prevent build queue overload and maintain performance
 * @constant {number} ROOM_CONSTRUCTION_SITE_LIMIT
 */
global.ROOM_CONSTRUCTION_SITE_LIMIT = 5;
/**
 * The minimum proportion of ticks where satisfaction criteria were met, used as a threshold to determine if overall game state requirements are being satisfied over time
 * @constant {number} SATISFACTION_THRESHOLD
 */
global.SATISFACTION_THRESHOLD = 0.9;
/**
 * Defines the number of historical entries to maintain in the satisfaction log, used for calculating average satisfaction metrics and trends over time
 * @constant {number} SATISFACTION_LOG_SIZE
 */
global.SATISFACTION_LOG_SIZE = 100;
/**
 * Specifies the minimum energy threshold required for a tower to perform defensive and maintenance operations such as attacking hostiles, healing creeps, or repairing structures
 * @constant {number} TOWER_MINIMUM_ENERGY
 */
global.TOWER_MINIMUM_ENERGY = 100;
/**
 * Number of game ticks a popup message remains visible in the UI before automatically disappearing
 * @constant {number} POPUP_TIMER_LIMIT
 */
global.POPUP_TIMER_LIMIT = 30;
/**
 * Object dictionary mapping role identifier strings to concrete Role implementations for dynamic role access, assignment, and interaction
 * @constant {Object.<string,Role>} ROLES
 */
global.ROLES = {};

/**
 * Utility function for debug output that provides formatted console logging with optional labels.
 * When DEBUG_MODE is enabled, this function handles various data types and formats them appropriately for console output.
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
        } else {
            // print the variable
            console.log(str);
        }
    }
};
global.hlog = hlog;

/**
 * Collection of enumerated task type identifiers used for categorizing and managing different action types that creeps can perform in the game. The task types help coordinate creep behavior and decision-making processes.
 * @constant {Object.<string,number>} TASK_TYPES
 * @enum {number}
 */
global.TASK_TYPES = {
    /** Instructs a creep to move to a designated idle position and wait for new tasks */
    IDLE: 0,
    /** Commands a creep to pick up resources from the ground or withdraw from structures with storage capacity */
    GATHER: 1,
    /** Directs a creep to transfer resources to a target structure or drop them on the ground */
    DEPOSIT: 2,
    /** Orders a creep to restore hit points to damaged structures using energy */
    REPAIR: 3,
    /** Assigns a creep to work on constructing new structures at construction sites */
    BUILD: 4,
    /** Commands a creep to deliver energy to and upgrade room controller level */
    UPGRADE: 5,
    /** Directs a creep to claim ownership of an unowned room controller */
    CLAIM: 6,
    /** Orders a creep to reserve a neutral room controller to prevent other players from claiming it */
    RESERVE: 7,
    /** Commands a creep to continuously harvest from an energy source until the target is depleted */
    DRILL: 8,
    /** Directs a creep to engage and damage enemy targets using attack parts */
    ATTACK: 9,
    /** Orders a creep to restore hit points to damaged friendly creeps using heal parts */
    HEAL: 10,
    /** Instructs a creep to navigate to a specific room through multiple room transitions */
    MOVE_ROOM: 11,
    /** Commands an operator creep to renew its lifespan at a Power Spawn structure */
    RENEW_OPERATOR: 12,
    /** Directs a creep to transfer resources between different structures within a room */
    MOVE_RESOURCE: 13,
    /** Orders a creep to harvest resources from either energy sources or mineral deposits until cargo is full */
    HARVEST: 14,
};

/**
 * Enumerated states used for managing state machines that control behavior transitions and workflow progression
 * in various game systems such as creep tasks, room operations, and process management
 * @constant {Object.<string,number>} STATES
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
 * Array containing all final-tier manufactured commodities and boosted compounds available in the game.
 * These products represent the highest level of resource processing and cannot be further refined.
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
 * Array containing all resource types that can be used as ingredients in various combinations to create compounds and manufactured goods through labs and factories in the game. Includes base minerals, intermediate compounds, and processed materials
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
