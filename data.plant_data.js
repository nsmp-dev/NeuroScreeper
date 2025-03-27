const Reaction = require("data.reaction.js");

/**
 * PlantData class, an object that contains all the memory for each plant
 * @class PlantData
 * @classDesc Holds the stored data for a plant.
 */
class PlantData {
    /**
     * Creates a PlantData Object
     * @param {RoomPlans} plans - The room's plans object
     */
    constructor(plans) {
        hlog("Creating a new PlantData Object...");
        // the current reaction in progress
        this.current_reaction = null;
        // the current production in progress
        this.current_production = null;
        // the timer for doing reactions
        this.structure_timer = 0;
        // the timer for doing reactions
        this.reaction_timer = 2;
        // the timer for doing productions
        this.production_timer = Math.floor(PRODUCTION_TIMER_LENGTH / 2);
        // save the lab data needed from the plans
        this.input_lab_1_x = plans.input_lab_1_x;
        this.input_lab_1_y = plans.input_lab_1_y;
        this.input_lab_2_x = plans.input_lab_2_x;
        this.input_lab_2_y = plans.input_lab_2_y;
        this.output_lab_x = plans.output_lab_x;
        this.output_lab_y = plans.output_lab_y;
        this.factory_x = plans.factory_x;
        this.factory_y = plans.factory_y;
        this.power_spawn_x = plans.power_spawn_x;
        this.power_spawn_y = plans.power_spawn_y;
        this.input_lab_1_id = null;
        this.input_lab_2_id = null;
        this.output_lab_id = null;
        this.factory_id = null;
        this.power_spawn_id = null;
        this.plant_state = STATES.IDLE;
    }
}

// exports the plant data class
module.exports = PlantData;