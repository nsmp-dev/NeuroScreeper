const RoomPlansFactory = require("factory.room_plans");
const RoomPlans = require("data.room_plans");
const PlantData = require("data.plant_data");

/**
 * RoomData class, an object that contains all the memory for a room
 * @class RoomData
 */
class RoomData {
    /**
     * creates a room data object, with an optional starter spawn for the first room
     * @param {Room} room - The room this data is for
     * @param {StructureSpawn|null} initial_spawn - The initial spawn, if this is the first room
     */
    constructor(room, initial_spawn = null) {
        hlog("Creating a new RoomData Object...");
        /**
         * type of the room
         * @type {number|null}
         */
        this.type = null;
        /**
         * timer for when to do construction
         * @type {number}
         */
        this.construction_timer = Math.floor(CONSTRUCTION_TIMER_LENGTH / 2);
        /**
         * timer for when to spawn creeps
         * @type {number}
         */
        this.population_timer = REQUEST_POPULATION_TIMER_LENGTH;
        /**
         * log of how satisfied the colony is
         * @type {Boolean[]}
         */
        this.satisfaction_log = [];
        /**
         * flag for whether the colony is satisfied
         * @type {Boolean}
         */
        this.satisfied = false;
        /**
         * flag for when this room has died
         * @type {Boolean}
         */
        this.dead = false;
        /**
         * list of creeps that need to be spawned for this colony
         * @type {CreepMemory[]}
         */
        this.requested_creeps = [];
        /**
         * plans for construction
         * @type {RoomPlans}
         */
        this.plans = new RoomPlans();
        /**
         * flag for if this room can be a colony
         * @type {Boolean}
         */
        this.possible_colony = null;
        /**
         * flag for if this room can be an expansion
         * @type {Boolean}
         */
        this.possible_expansion = null;
        /**
         * data for all the reactions and production for the plant
         * @type {PlantData|null}
         */
        this.plant_data = null;
        
        // if the initial spawn was provided
        if (initial_spawn != null) {
            // plan the first room
            RoomPlansFactory.planFirstRoom(room, this.plans, initial_spawn);
            // set it to be a colony
            this.type = COLONY;
        }else{
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
            }else{
                // set the type to a highway
                this.type = HIGHWAY;
            }
        }else{
            // check whether this room can be an expansion
            this.possible_expansion = (
                // if there's more than one source
                this.plans.sources.length > 1
            );
            // check whether this room can be a colony
            this.possible_colony = (
                // if there's more than one source
                this.plans.sources.length > 1 &&
                // and it has a base
                this.plans.base_location != null
            );
        }

        // if the plans include a plant
        if (this.plans.plant_location != null) {
            // initialize the plant data
            this.plant_data = new PlantData(this.plans);
        }
    }
}
// export the RoomData class
module.exports = RoomData;