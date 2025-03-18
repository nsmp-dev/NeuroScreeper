// PlantData class, an object that contains all the memory for each plant
class PlantData {
    // the current reaction being ran
    current_reaction = null;
    // the current production being ran
    current_production = null;
    // the timer for doing reactions
    reaction_timer = 0;
    // the timer for doing productions
    production_timer = Math.floor(PRODUCTION_TIMER_LENGTH / 2);
    // x coordinate of the first input lab
    input_lab_1_x = null;
    // y coordinate of the first input lab
    input_lab_1_y = null;
    // x coordinate of the second input lab
    input_lab_2_x = null;
    // y coordinate of the second input lab
    input_lab_2_y = null;
    // x coordinate of the output lab
    output_lab_x = null;
    // y coordinate of the output lab
    output_lab_y = null;

    // creates a plant data object
    constructor(plans) {
        // set the data needed from the plans
        this.input_lab_1_x = plans.input_lab_1_x;
        this.input_lab_1_y = plans.input_lab_1_y;
        this.input_lab_2_x = plans.input_lab_2_x;
        this.input_lab_2_y = plans.input_lab_2_y;
        this.output_lab_x = plans.output_lab_x;
        this.output_lab_y = plans.output_lab_y;
    }
}

// exports the plant data class
module.exports = PlantData;