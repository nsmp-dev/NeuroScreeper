const RoomDataFactory = require("data.plans_factory");
const RoomPlans = require("data.room_plans");
const PlantData = require("data.plant_data");
// RoomData class, an object that contains all the memory for each room
class RoomData {

    // creates a room data object, with an optional starter spawn for the first room
    constructor(room, initial_spawn = null) {
        hlog("Creating a new RoomData Object...");
        // type of the room
        this.type = null;
        // timer for when to do construction
        this.construction_timer = Math.floor(CONSTRUCTION_TIMER_LENGTH / 2);
        // timer for when to spawn creeps
        this.population_timer = REQUEST_POPULATION_TIMER_LENGTH;
        // log of how satisfied the colony is
        this.satisfaction_log = [];
        // flag for whether the colony is satisfied
        this.satisfied = false;
        // flag for when this room has died
        this.dead = false;
        // list of creeps that need to be spawned for this colony
        this.requested_creeps = [];
        // plans for construction
        this.plans = new RoomPlans();
        // flag for if this room can be a colony
        this.possible_colony = null;
        // flag for if this room can be an expansion
        this.possible_expansion = null;
        // data for all the reactions and production for the plant
        this.plant_data = null;
        
        // if the initial spawn was provided
        if (initial_spawn != null) {
            // plan the first room
            RoomDataFactory.planFirstRoom(room, this.plans, initial_spawn);
            // set it to be a colony
            this.type = COLONY;
        }else{
            // plan the room normally
            RoomDataFactory.planRoom(room, this.plans);
        }

        // if this room doesn't have a controller
        if (room.controller == undefined) {
            // set this room as not a possible expansion
            this.possible_expansion = false;
            // set this room as not a possible colony
            this.possible_colony = false;
            // find any structures
            let source_keepers = room.find(FIND_STRUCTURES, {
                // that are source keeper lairs
                filter: (structure) => structure.structureType == STRUCTURE_KEEPER_LAIR
            });
            // if there are any source keepers in the room
            if (source_keepers.length > 0) {
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
                this.plans.base_x != null
            );
        }

        // if the plans include a plant
        if (this.plans.plant_x != null) {
            // initialize the plant data
            this.plant_data = new PlantData(this.plans);
        }
    }
}
// export the RoomData class
module.exports = RoomData;