/**
 * RoomData class represents a comprehensive data structure for managing and storing room-related information,
 * including room type, construction plans, creep population, and other essential room state data.
 * This class serves as the central memory management system for individual rooms in the game.
 * @class RoomData
 */
class RoomData {
    /**
     * Creates a RoomData object to manage and store room-related information and state.
     * The constructor can handle both initial room setup with a spawn and later room initialization.
     * @param {Room} room - The game room object this data instance will manage
     * @param {StructureSpawn|null} initial_spawn - Optional spawn structure for initializing the first colony room
     */
    constructor(room, initial_spawn = null) {
        Timer.start("creating_room_data");
        /**
         * Defines the category or classification of the room (e.g., COLONY, HIGHWAY, KEEPER_LAIR).
         * @type {number|null}
         */
        this.type = null;

        // if any spawns are found in the room
        if (room.find(FIND_MY_SPAWNS).length > 0) {
            // set the type to a colony
            this.type = COLONY;
        }

        /**
         * The unique room name identifier in the format 'W1N1' or similar coordinates
         * @type {string}
         */
        this.room_name = room.name;
        /**
         * Timer that controls the scheduling of construction activities in the room. When it reaches zero, new construction tasks can be initiated
         * @type {number}
         */
        this.construction_timer = Math.floor(CONSTRUCTION_TIMER_LENGTH / 2);
        /**
         * Timer that controls the frequency of creep spawning operations. When it reaches zero, new creep spawn requests can be processed
         * @type {number}
         */
        this.population_timer = REQUEST_POPULATION_TIMER_LENGTH;
        /**
         * Timer controlling when the power squad should be activated. When zero, the squad can begin operating
         * to gather power from the environment. Measured in game ticks
         * @type {number}
         */
        this.power_squad_timer = 0;
        /**
         * An array tracking colony satisfaction levels over time. Each boolean entry represents whether
         * the colony met its resource and operational requirements during that time period
         * @type {Boolean[]}
         */
        this.satisfaction_log = [];
        /**
         * Indicates whether the colony has met all its current resource and operational requirements,
         * including having sufficient energy, creeps, and structures to function optimally
         * @type {Boolean}
         */
        this.satisfied = false;
        /**
         * Indicates whether this room has become inactive or non-functional, typically due to loss of control or destruction of critical structures
         * @type {Boolean}
         */
        this.dead = false;
        /**
         * An array of pending creep spawn requests for this colony, containing individual CreepMemory
         * objects that define the attributes and roles for each creep waiting to be spawned
         * @type {CreepMemory[]}
         */
        this.requested_creeps = [];
        /**
         * Plans for all construction activities in the room, including positioning of buildings,
         * roads, and other structures. Contains layout templates and blueprints managed by RoomPlans
         * @type {RoomPlans}
         */
        this.plans = new RoomPlans();
        /**
         * Indicates whether the room meets the necessary criteria to be established as a colony.
         * A room is eligible for colony status when it contains multiple energy sources and suitable base locations.
         * @type {Boolean}
         */
        this.possible_colony = null;
        /**
         * Determines if the room can be considered for expansion. A room is viable for expansion
         * when it contains multiple energy sources and can sustain additional colony development.
         * @type {Boolean}
         */
        this.possible_expansion = null;
        /**
         * Data structure that manages chemical reactions and resource production facilities in the plant,
         * including recipes, production queues, and resource allocation for laboratory operations
         * @type {PlantData|null}
         */
        this.plant_data = null;
        /**
         * Data structure managing a squad that collects and harvests power resources from the environment.
         * This includes squad member assignments, collection strategies, and operational status.
         * @type {PowerSquad}
         */
        this.power_squad = new PowerSquad(room.name);
        /**
         * Tracks whether the player previously owned this room. Used to detect room loss/death scenarios
         * by comparing past ownership state with current control status. Essential for managing room lifecycle
         * and responding to territory changes.
         * @type {Boolean}
         */
        this.has_been_owned = false;

        // if the initial spawn was provided
        if (initial_spawn != null) {
            // plan the first room
            RoomPlansFactory.planFirstRoom(room, this.plans, initial_spawn);
            // set it to be a colony
            this.type = COLONY;
        } else {
            // plan the room normally
            RoomPlansFactory.planRoom(room, this.plans);
        }

        // if this room doesn't have a controller
        if (room.controller == undefined) {
            // set this room as not a possible expansion
            this.possible_expansion = false;
            // set this room as not a possible colony
            this.possible_colony = false;
            // find any source keeper lairs
            let source_keeper_lairs = room.find(FIND_STRUCTURES, {
                // that are source keeper lairs
                filter: (structure) => structure.structureType == STRUCTURE_KEEPER_LAIR
            });
            // if there are any source keeper lairs in the room
            if (source_keeper_lairs.length > 0) {
                // set the type to a keeper lair
                this.type = KEEPER_LAIR;
            } else {
                // set the type to a highway
                this.type = HIGHWAY;
            }
        } else {
            // if there's more than one source, the room can be an expansion
            this.possible_expansion = (
                // if there's more than one source
                this.plans.source_plans.length > 1
            );
            // if there's more than one source, and it has a base, the room can be a colony
            this.possible_colony = (this.plans.source_plans.length > 1 && this.plans.base_location != null);
        }

        // if the plans include a plant
        if (this.plans.plant_location != null) {
            // initialize the plant data
            this.plant_data = new PlantData(this.plans);
        }

        Timer.stop("creating_room_data");
    }
}

// export the RoomData class
global.RoomData = RoomData;