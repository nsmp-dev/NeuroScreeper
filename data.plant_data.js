const Reaction = require("data.reaction.js");

// PlantData class, an object that contains all the memory for each plant
class PlantData {
    // creates a plant data object
    constructor(plans) {
        hlog("Creating a new PlantData Object...");
        // the current reaction in progress
        this.current_reaction = null;
        // the current production in progress
        this.current_production = null;
        // the timer for doing reactions
        this.reaction_timer = 0;
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
    }
}

// exports the plant data class
module.exports = PlantData;