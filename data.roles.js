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
    /**
     * AttackerMemory class, storing data for an attacker
     * @class AttackerMemory
     */
    AttackerMemory: class AttackerMemory extends CreepMemory{
        /**
         * creates an AttackerMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         */
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
    /**
     * BuilderMemory class, storing data for a builder
     * @class BuilderMemory
     */
    BuilderMemory: class BuilderMemory extends CreepMemory{
        /**
         * creates an BuilderMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         */
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
    /**
     * ClaimerMemory class, storing data for a claimer
     * @class ClaimerMemory
     */
    ClaimerMemory: class ClaimerMemory extends CreepMemory{
        /**
         * creates an ClaimerMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         */
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
    /**
     * DrillerMemory class, storing data for a driller
     * @class DrillerMemory
     */
    DrillerMemory: class DrillerMemory extends CreepMemory{
        /**
         * creates an DrillerMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         * @param {string} source_id - The id of the assigned source
         * @param {Point} container_location - The location of the assigned container
         */
        constructor(room_name, source_id, container_location){
            super(DRILLER.NAME, room_name);
            /**
             * The id of the assigned source
             * @type {string}
             */
            this.source = source_id;
            /**
             * The location of the assigned container
             * @type {Point}
             */
            this.container_location = container_location;
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
    /**
     * HealerMemory class, storing data for a healer
     * @class HealerMemory
     */
    HealerMemory: class HealerMemory extends CreepMemory{
        /**
         * creates an HealerMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         */
        constructor(room_name){
            super(HEALER.NAME, room_name);
        }
    },
};

/**
 * Mineral Driller name, body, and initializers
 * @constant {Object} MINERAL_DRILLER
 */
global.MINERAL_DRILLER = {
    // identifying string
    NAME: "mineral_driller",
    // emoji for shorthand visuals
    EMOJI: "⛏️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [WORK, MOVE],
    // energy cost of the body
    ENERGY_COST: 150,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
    /**
     * MineralDrillerMemory class, storing data for a mineral driller
     * @class MineralDrillerMemory
     */
    MineralDrillerMemory: class MineralDrillerMemory extends CreepMemory{
        /**
         * creates an MineralDrillerMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         * @param {string} mineral_id - The id of the assigned mineral
         * @param {Point} container_location - The location of the assigned container
         */
        constructor(room_name, mineral_id, container_location){
            super(DRILLER.NAME, room_name);
            /**
             * The id of the assigned mineral
             * @type {string}
             */
            this.mineral = mineral_id;
            /**
             * The location of the assigned container
             * @type {Point}
             */
            this.container_location = container_location;
        }
    },
};

/**
 * Mineral Transporter name, body, and initializers
 * @constant {Object} MINERAL_TRANSPORTER
 */
global.MINERAL_TRANSPORTER = {
    // identifying string
    NAME: "mineral_transporter",
    // emoji for shorthand visuals
    EMOJI: "🚛",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [CARRY, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
    /**
     * MineralTransporterMemory class, storing data for a mineral transporter
     * @class MineralTransporterMemory
     */
    MineralTransporterMemory: class MineralTransporterMemory extends CreepMemory{
        /**
         * creates an MineralTransporterMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         * @param {string} mineral_id - The id of the assigned mineral
         * @param {Point} container_location - The location of the assigned container
         * @param {string} resource_type - The type of resource this mineral produces
         */
        constructor(room_name, mineral_id, container_location, resource_type){
            super(MINERAL_TRANSPORTER.NAME, room_name);
            /**
             * type of task being created
             * @type {string}
             */
            this.nearest_colony_room_name = Util.getNearestColony(room_name);
            /**
             * type of task being created
             * @type {string}
             */
            this.mineral = mineral_id;
            /**
             * type of task being created
             * @type {Point}
             */
            this.container_location = container_location;
            /**
             * type of task being created
             * @type {string}
             */
            this.resource_type = resource_type;
            /**
             * type of task being created
             * @type {string|null}
             */
            this.container_id = null;
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
    /**
     * QueenMemory class, storing data for an attacker
     * @class QueenMemory
     */
    QueenMemory: class QueenMemory extends CreepMemory{
        /**
         * creates an QueenMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         */
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
    /**
     * RepairerMemory class, storing data for an attacker
     * @class RepairerMemory
     */
    RepairerMemory: class RepairerMemory extends CreepMemory{
        /**
         * creates an RepairerMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         */
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
    /**
     * ScoutMemory class, storing data for an attacker
     * @class ScoutMemory
     */
    ScoutMemory: class ScoutMemory extends CreepMemory{
        /**
         * creates an ScoutMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         */
        constructor(room_name){
            super(SCOUT.NAME, room_name);
            /**
             * type of task being created
             * @type {string[]}
             */
            this.room_queue = [room_name];
            /**
             * type of task being created
             * @type {string[]}
             */
            this.room_log = [];
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
    /**
     * TransporterMemory class, storing data for an attacker
     * @class TransporterMemory
     */
    TransporterMemory: class TransporterMemory extends CreepMemory{
        /**
         * creates an TransporterMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         * @param {string} source_id - The name of the room this creep is assigned to
         * @param {Point} container_location - The name of the room this creep is assigned to
         */
        constructor(room_name, source_id, container_location){
            super(TRANSPORTER.NAME, room_name);
            /**
             * type of task being created
             * @type {string}
             */
            this.nearest_colony_room_name = Util.getNearestColony(room_name);
            /**
             * type of task being created
             * @type {string}
             */
            this.source = source_id;
            /**
             * type of task being created
             * @type {Point}
             */
            this.container_location = container_location;
            /**
             * type of task being created
             * @type {string|null}
             */
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
    /**
     * UpgraderMemory class, storing data for an attacker
     * @class UpgraderMemory
     */
    UpgraderMemory: class UpgraderMemory extends CreepMemory{
        /**
         * creates an UpgraderMemory object
         * @param {string} room_name - The name of the room this creep is assigned to
         */
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
global.ROLES[MINERAL_DRILLER.NAME] = MINERAL_DRILLER;
global.ROLES[MINERAL_TRANSPORTER.NAME] = MINERAL_TRANSPORTER;
global.ROLES[QUEEN.NAME] = QUEEN;
global.ROLES[SCOUT.NAME] = SCOUT;
global.ROLES[TRANSPORTER.NAME] = TRANSPORTER;
global.ROLES[UPGRADER.NAME] = UPGRADER;