// PlantData class, an object that contains all the memory for each plant
class PlantData {
    // type of the room
    current_reaction = null;
    current_production = null;
    input_lab_1_x = null;
    input_lab_1_y = null;
    input_lab_2_x = null;
    input_lab_2_y = null;
    output_lab_x = null;
    output_lab_y = null;

    // creates a plant data object
    constructor(plans) {
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