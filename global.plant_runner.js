const Reaction = require("data.reaction");
const Production = require("data.production");
module.exports = {
    getReactionRequest: function (room, plant_data) {
        let input_lab_1 = room.getStructureAt(STRUCTURE_LAB, plant_data.input_lab_1_x, plant_data.input_lab_1_y);
        let input_lab_2 = room.getStructureAt(STRUCTURE_LAB, plant_data.input_lab_2_x, plant_data.input_lab_2_y);
        let output_lab = room.getStructureAt(STRUCTURE_LAB, plant_data.output_lab_x, plant_data.output_lab_y);
        let storage = room.storage;

        if (input_lab_1 == null ||
            input_lab_2 == null ||
            output_lab == null ||
            storage == undefined) {
            plant_data.input_lab_1_id = null;
            plant_data.input_lab_2_id = null;
            plant_data.output_lab_id = null;
            return;
        }

        plant_data.input_lab_1_id = input_lab_1.id;
        plant_data.input_lab_2_id = input_lab_2.id;
        plant_data.output_lab_id = output_lab.id;

        if (plant_data.current_reaction != null) {
            let reaction = plant_data.current_reaction;
            if ((input_lab_1.mineralType != undefined && input_lab_1.mineralType != reaction.input_1) ||
                (input_lab_2.mineralType != undefined && input_lab_2.mineralType != reaction.input_2) ||
                (output_lab.mineralType != undefined && output_lab.mineralType != reaction.output)) {
                plant_data.current_reaction = new Reaction();
                return;
            }
        }

        if (plant_data.current_reaction == null) {
            for (let reagent_1 in REACTIONS) {
                for (let reagent_2 in REACTIONS[reagent_1]) {
                    if (storage.store[reagent_1] != undefined &&
                        storage.store[reagent_1] > 5 &&
                        storage.store[reagent_2] != undefined &&
                        storage.store[reagent_2] > 5) {
                        let amount = storage.store[reagent_1] > storage.store[reagent_2] ? storage.store[reagent_2] : storage.store[reagent_1];
                        amount = Math.floor(amount / 5) * 5;
                        plant_data.current_reaction = new Reaction(reagent_1, reagent_2, REACTIONS[reagent_1][reagent_2], amount);
                        return;
                    }
                }
            }
        }
    },
    getProductionRequest: function (room, plant_data) {
        let factory = room.getStructureAt(STRUCTURE_LAB, plant_data.input_lab_1_x, plant_data.input_lab_1_y);
        let storage = room.storage;

        if (factory == null || storage == undefined) {
            plant_data.factory_id = null;
            return;
        }

        plant_data.factory_id = factory.id;

        if (plant_data.current_production != null) {
            let production = plant_data.current_production;
            let store = factory.store;
            let correct_contents = true;

            for (let resource in store) {
                if (!production.inputs.includes(resource)) {
                    correct_contents = false;
                }
            }

            if (!correct_contents) {
                plant_data.current_production = new Production();
            }
        }

        if (plant_data.current_production == null) {
            let store = storage.store;
            for (let commodity in COMMODITIES) {
                let has_components = true;
                let production = COMMODITIES[commodity];
                for (let component in production.components) {
                    if (store[component] == undefined || store[component] < production.components[component]) {
                        has_components = false;
                        break;
                    }
                }
                if (has_components) {
                    plant_data.current_production = new Production(production.components, commodity, production.amount);
                    return;
                }
            }
        }
    },
    run: function (room, plant_data) {
        hlog("Running Plant '" + room.name + "'...");
        if (plant_data.reaction_timer > this.REACTION_TIMER_LENGTH) {
            plant_data.reaction_timer = 0;
            hlog("Recalculating Reaction...");
            this.getReactionRequest(room, plant_data);
        }else{
            plant_data.reaction_timer++;
        }

        if (plant_data.production_timer > this.PRODUCTION_TIMER_LENGTH) {
            plant_data.production_timer = 0;
            hlog("Recalculating Production...");
            this.getProductionRequest(room, plant_data);
        }else{
            plant_data.production_timer++;
        }

        return plant_data;
    },
};