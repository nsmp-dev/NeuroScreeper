module.exports = {
    getReactionRequest: function (room, plant_data) {
        let input_lab_1 = room.getStructureAt(STRUCTURE_LAB, plant_data.input_lab_1_x, plant_data.input_lab_1_y);
        let input_lab_2 = room.getStructureAt(STRUCTURE_LAB, plant_data.input_lab_2_x, plant_data.input_lab_2_y);
        let output_lab = room.getStructureAt(STRUCTURE_LAB, plant_data.output_lab_x, plant_data.output_lab_y);

        if (input_lab_1 == null || input_lab_2 == null || output_lab == null) {
            plant_data.input_lab_1_id = null;
            plant_data.input_lab_2_id = null;
            plant_data.output_lab_id = null;
        }

        plant_data.input_lab_1_id = input_lab_1.id;
        plant_data.input_lab_2_id = input_lab_2.id;
        plant_data.output_lab_id = output_lab.id;


        // if the current reaction is screwed up
            // change the current reaction to a cleanup job

        // see what is in the storage and what reaction in the chain we can make
    },
    getProductionRequest: function (room, plant_data) {
        // check that the factory is there and leveled up to match operator
        // check what is in the factory for incomplete productions
        // see what is in the storage and what we can produce with it
    },
    run: function (room, plant_data) {
        if (plant_data.reaction_timer > this.REACTION_TIMER_LENGTH) {
            plant_data.reaction_timer = 0;
            plant_data = this.getReactionRequest(room, plant_data);
        }else{
            plant_data.reaction_timer++;
        }

        if (plant_data.production_timer > this.PRODUCTION_TIMER_LENGTH) {
            plant_data.production_timer = 0;
            plant_data = this.getProductionRequest(room, plant_data);
        }else{
            plant_data.production_timer++;
        }

        return plant_data;
    },
};