const CreepMemory = require("data.creep_memory");
const Point = require("data.point");

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
        constructor(room_name, source_id, container_location){
            super(DRILLER.NAME, room_name);
            this.source = source_id;
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
    // memory class used for this creep
    HealerMemory: class HealerMemory extends CreepMemory{
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
    // memory class used for this creep
    MineralDrillerMemory: class MineralDrillerMemory extends CreepMemory{
        constructor(room_name, mineral_id, container_location, mineral_location){
            super(DRILLER.NAME, room_name);
            this.mineral = mineral_id;
            this.container_location = container_location;
            this.mineral_location = mineral_location;
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
    // memory class used for this creep
    MineralTransporterMemory: class MineralTransporterMemory extends CreepMemory{
        constructor(room_name, source_id, container_location, mineral_location, resource_type){
            super(TRANSPORTER.NAME, room_name);

            let nearest_colony_room_name = null;
            let lowest_distance = null;

            for (let test_room_name in Memory.room_data) {
                let test_room_data = Memory.room_data[test_room_name];
                if (test_room_data.type == COLONY) {
                    let distance = 0;
                    if (room_name != test_room_name) {
                        distance = Game.map.getRoomLinearDistance(room_name, test_room_data);
                    }


                    if (nearest_colony_room_name == null || distance < lowest_distance) {
                        nearest_colony_room_name = test_room_name;
                        lowest_distance = distance;
                    }
                }
            }

            this.nearest_colony_room_name = nearest_colony_room_name;
            this.source = source_id;
            this.container_location = container_location;
            this.mineral_location = mineral_location;
            this.resource_type = resource_type;
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
            this.room_queue = [room.name];
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
    // memory class used for this creep
    TransporterMemory: class TransporterMemory extends CreepMemory{
        constructor(room_name, source_id, container_x, container_y){
            super(TRANSPORTER.NAME, room_name);

            let nearest_colony_room_name = null;
            let lowest_distance = null;

            for (let test_room_name in Memory.room_data) {
                let test_room_data = Memory.room_data[test_room_name];
                if (test_room_data.type == COLONY) {
                    let distance = 0;
                    if (room_name != test_room_name) {
                        distance = Game.map.getRoomLinearDistance(room_name, test_room_data);
                    }


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
global.ROLES[MINERAL_DRILLER.NAME] = MINERAL_DRILLER;
global.ROLES[MINERAL_TRANSPORTER.NAME] = MINERAL_TRANSPORTER;
global.ROLES[QUEEN.NAME] = QUEEN;
global.ROLES[SCOUT.NAME] = SCOUT;
global.ROLES[TRANSPORTER.NAME] = TRANSPORTER;
global.ROLES[UPGRADER.NAME] = UPGRADER;