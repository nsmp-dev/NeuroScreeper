module.exports = {
    // ticks between getting reaction requests
    REACTION_TIMER_LENGTH: 10,
    // ticks between getting production requests
    PRODUCTION_TIMER_LENGTH: 10,
    // create the initial data for the plant
    initialize: function (room) {
        return {
            reaction_requests: [],
            production_requests: [],
            reaction_timer: 0,
            production_timer: Math.floor(this.PRODUCTION_TIMER_LENGTH / 2),
        };
    },
    getReactionRequests: function (room, plant_data) {
        let plans = Memory.rooms[room.name].plans;
        let in_progress_reaction = null;

        if (plant_data.reaction_requests.length > 0 && plant_data.reaction_requests[0].started) {
            in_progress_reaction = plant_data.reaction_requests[0];
        }
        plant_data.reaction_requests = [];

        let input_lab_1 = room.getStructureAt(STRUCTURE_LAB, plans.input_lab_1_x, plans.input_lab_1_y);
        let input_lab_2 = room.getStructureAt(STRUCTURE_LAB, plans.input_lab_2_x, plans.input_lab_2_y);
        let output_lab = room.getStructureAt(STRUCTURE_LAB, plans.output_lab_x, plans.output_lab_y);

        if (input_lab_1 == null || input_lab_2 == null || output_lab == null) {
            plant_data.input_lab_1_id = null;
            plant_data.input_lab_2_id = null;
            plant_data.output_lab_id = null;
            return plant_data;
        }

        plant_data.input_lab_1_id = input_lab_1.id;
        plant_data.input_lab_2_id = input_lab_2.id;
        plant_data.output_lab_id = output_lab.id;


        // check if the labs are marked properly in the plant_data
        // check what is in the labs for incomplete reactions
        // see what is in the storage and what reactions in the chain we can make
    },
    getProductionRequests: function (room, plant_data) {
        // check that the factory is there and leveled up to match operator
        // check what is in the factory for incomplete productions
        // see what is in the storage and what we can produce with it
    },
    run: function (room, plant_data) {
        if (plant_data.reaction_timer > this.REACTION_TIMER_LENGTH) {
            plant_data.reaction_timer = 0;
            plant_data = this.getReactionRequests(room, plant_data);
        }else{
            plant_data.reaction_timer++;
        }

        if (plant_data.production_timer > this.PRODUCTION_TIMER_LENGTH) {
            plant_data.production_timer = 0;
            plant_data = this.getProductionRequests(room, plant_data);
        }else{
            plant_data.production_timer++;
        }

        return plant_data;
    },
};