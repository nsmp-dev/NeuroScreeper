const Plans = require("data.plans");
// TODO: uncomment for capitol in v0.3
//const Plant = require("controller.plant");
const RoomDataFactory = require("data.plans_factory");
require('global.config');

// RoomData class, an object that contains all the memory for each room
class RoomData {
    // type of the room
    type = null;
    // timer for when to do construction
    construction_timer = 0;
    // timer for when to spawn creeps
    population_timer = 0;
    // log of how satisfied the colony is
    satisfaction_log = [];
    satisfied = false;
    dead = false;
    requested_creeps = [];
    plans = new Plans();
    possible_colony = null;
    possible_expansion = null;
    possible_capitol = null;
    plant_data = null;

    constructor(room) {
        RoomDataFactory.planRoom(room, this.plans);

        this.possible_expansion = (
            this.plans.sources.length > 1
        );
        this.possible_colony = (
            this.plans.sources.length > 1 &&
            this.plans.base_x != null
        );
        this.possible_capitol = (
            this.plans.sources.length > 1 &&
            this.plans.minerals.length > 0 &&
            this.plans.base_x != null &&
            this.plans.plant_x != null
        );

        if (this.possible_capitol) {
            // TODO: uncomment for capitol in v0.3
            //this.plant_data = Plant.initialize(room);
        }

        // set the population timer to go off immediately
        this.population_timer = REQUEST_POPULATION_TIMER_LENGTH;
        // set the construction timer to go off offset from the population timer
        this.construction_timer = Math.floor(CONSTRUCTION_TIMER_LENGTH / 2);
    }
}

module.exports = RoomData;