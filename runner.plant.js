/** @constant {Object} PlantRunner */
global.PlantRunner = {
    /**
     * Checks if the required resources for a reaction are present and sets the requested reaction or cleanup reaction flag
     * @param {Room} room - The Room the plant is in
     * @param {PlantData} plant_data - The plant data for storing in memory
     */
    getReactionRequest: function (room, plant_data) {
        // if we are still cleaning up
        if (plant_data.cleanup_reaction) {
            // exit the function early
            return
        }

        // grab the input lab 1
        let input_lab_1 = Game.getObjectById(plant_data.input_lab_1_id);
        // grab the input lab 2
        let input_lab_2 = Game.getObjectById(plant_data.input_lab_2_id);
        // grab the output lab
        let output_lab = Game.getObjectById(plant_data.output_lab_id);
        // grab the storage
        let storage = room.storage;

        // if any of the labs or storage are not built
        if (input_lab_1 == null || input_lab_2 == null || output_lab == null || storage == undefined) {
            // clear the current reaction
            plant_data.current_reaction = null;

            // if any of the labs have anything in them
            if ((input_lab_1 != null && input_lab_1.store.getUsedCapacity() > 0) || (input_lab_2 != null && input_lab_2.store.getUsedCapacity() > 0) || (output_lab != null && output_lab.store.getUsedCapacity() > 0)) {
                // set the plant to clean up the reaction
                plant_data.cleanup_reaction = true;
            }
            // exit the function early
            return;
        }

        // if we have a reaction in progress
        if (plant_data.current_reaction != null) {
            // grab the current reaction
            let reaction = plant_data.current_reaction;

            // if any of the labs have incorrect resources
            if ((input_lab_1.mineralType != undefined && input_lab_1.mineralType != reaction.input_1) || (input_lab_2.mineralType != undefined && input_lab_2.mineralType != reaction.input_2) || (output_lab.mineralType != undefined && output_lab.mineralType != reaction.output)) {
                // clear the current reaction
                plant_data.current_reaction = null;
                // set the plant to clean up the reaction
                plant_data.cleanup_reaction = true;
                return;
            }
        }

        // if there is no current reaction
        if (plant_data.current_reaction == null) {
            // loop through all the reagents in all the reactions in the game
            for (let reagent_1 in REACTIONS) {
                // loop through all the other reagents for the current reagent
                for (let reagent_2 in REACTIONS[reagent_1]) {
                    // if the storage has both required ingredients
                    if (storage.store[reagent_1] != undefined && storage.store[reagent_1] > 5 && storage.store[reagent_2] != undefined && storage.store[reagent_2] > 5) {
                        // find which amount is lower to use it for the amount
                        let amount = storage.store[reagent_1] > storage.store[reagent_2] ? storage.store[reagent_2] : storage.store[reagent_1];
                        // round the amount down to nearest 5
                        amount = Math.floor(amount / 5) * 5;
                        // create and store the enw reaction
                        plant_data.current_reaction = new Reaction(reagent_1, reagent_2, REACTIONS[reagent_1][reagent_2], amount);
                        // exit the function
                        return;
                    }
                }
            }
        }
    },
    /**
     * Checks if the required resources for a production are present and sets the requested production or cleanup production flag
     * @param {Room} room - The Room the plant is in
     * @param {PlantData} plant_data - The plant data for storing in memory
     */
    getProductionRequest: function (room, plant_data) {
        // if we are still cleaning up
        if (plant_data.cleanup_production) {
            // exit the function early
            return
        }

        // grab the factory
        let factory = Game.getObjectById(plant_data.factory_id);
        // grab the storage
        let storage = room.storage;

        // if the factory or storage are not built
        if (factory == null || storage == undefined) {
            // clear the current production
            plant_data.current_production = null;
            // if the factory is built, and it has resources in it
            if (factory != null && factory.store.getUsedCapacity() > 0) {
                // set the plant to clean up the production
                plant_data.cleanup_production = true;
            }
            // exit the function early
            return;
        }

        // if there is not a production currently running
        if (plant_data.current_production != null) {
            // grab the current production
            let production = plant_data.current_production;
            // grab the store object
            let store = factory.store;
            // assume the contents are correct
            let correct_contents = true;

            // loop through the resources in the store
            for (let resource in store) {
                // if the resource is not within the inputs of the production
                if (store[resource] > 0 && !(resource in production.inputs)) {
                    // mark the contents as incorrect
                    correct_contents = false;
                }
            }

            // if the contents are incorrect
            if (!correct_contents) {
                // clear the current production
                plant_data.current_production = null;
                // set the plant to clean up the production
                plant_data.cleanup_production = true;
            }
        }

        // if there is no current production
        if (plant_data.current_production == null) {
            // grab the store of the storage
            let store = storage.store;
            // loop through all the producible commodities
            for (let commodity in COMMODITIES) {
                // assume we have the components
                let has_components = true;
                // grab the production recipe
                let recipe = COMMODITIES[commodity];
                // loop through the recipe's components
                for (let component in recipe.components) {
                    // if the store doesn't have enough of the components needed
                    if (store[component] == undefined || store[component] < recipe.components[component]) {
                        // mark the recipe as not doable
                        has_components = false;
                        // break the loop
                        break;
                    }
                }
                // if we have enough components for this recipe
                if (has_components) {
                    // create and store the new production
                    plant_data.current_production = new Production(recipe.components, commodity, recipe.amount);
                    // exit the function
                    return;
                }
            }
        }
    },
    /**
     * caches the ids of the structures in the plant
     * @param {Room} room - The Room the plant is in
     * @param {PlantData} plant_data - The plant data for storing in memory
     */
    getStructures: function (room, plant_data) {
        // attempt to grab the input lab 1
        let input_lab_1 = room.getStructureAt(STRUCTURE_LAB, plant_data.input_lab_1_location.x, plant_data.input_lab_1_location.y);
        // attempt to grab the input lab 2
        let input_lab_2 = room.getStructureAt(STRUCTURE_LAB, plant_data.input_lab_2_location.x, plant_data.input_lab_2_location.y);
        // attempt to grab the output lab
        let output_lab = room.getStructureAt(STRUCTURE_LAB, plant_data.output_lab_location.x, plant_data.output_lab_location.y);
        // attempt to grab the factory
        let factory = room.getStructureAt(STRUCTURE_LAB, plant_data.factory_location.x, plant_data.factory_location.y);
        // attempt to grab the power spawn
        let power_spawn = room.getStructureAt(STRUCTURE_POWER_SPAWN, plant_data.power_spawn_location.x, plant_data.power_spawn_location.y);
        // attempt to grab the storage
        let storage = room.storage;

        // if any of the labs or storage are not built
        if (input_lab_1 == null || input_lab_2 == null || output_lab == null || storage == undefined) {
            // clear the input lab 1 id cache
            plant_data.input_lab_1_id = null;
            // clear the input lab 2 id cache
            plant_data.input_lab_2_id = null;
            // clear the output lab id cache
            plant_data.output_lab_id = null;
        }else{
            // store the input lab 1 id
            plant_data.input_lab_1_id = input_lab_1.id;
            // store the input lab 2 id
            plant_data.input_lab_2_id = input_lab_2.id;
            // store the output lab id
            plant_data.output_lab_id = output_lab.id;
        }

        // if the factory or the storage are not built
        if (factory == null || storage == undefined) {
            // clear the factory id cache
            plant_data.factory_id = null;
        }else{
            // store the factory id
            plant_data.factory_id = factory.id;
        }

        // if the power spawn is not built
        if (power_spawn == null) {
            // clear the power spawn id cache
            plant_data.power_spawn_id = null;
        }else{
            // store the power spawn id
            plant_data.power_spawn_id = power_spawn.id;
        }
    },
    /**
     * runs the plant, occasionally caching ids and requesting reactions and productions
     * @param {Room} room - The Room the plant is in
     * @param {PlantData} plant_data - The plant data for storing in memory
     */
    run: function (room, plant_data) {
        hlog("Running Plant '" + room.name + "'...");

        // if the structure timer has gone off
        if (plant_data.structure_timer > this.PLANT_STRUCTURES_TIMER_LENGTH) {
            // reset the structure timer
            plant_data.structure_timer = 0;
            hlog("Grabbing Plant Structures...");
            // cache the structure ids
            this.getStructures(room, plant_data);
        }else{
            // increment the structure timer
            plant_data.structure_timer++;
        }

        // if the reaction timer has gone off
        if (plant_data.reaction_timer > this.REACTION_TIMER_LENGTH) {
            // reset the reaction timer
            plant_data.reaction_timer = 0;
            hlog("Recalculating Reaction...");
            // request a reaction
            this.getReactionRequest(room, plant_data);
        }else{
            // increment the reaction timer
            plant_data.reaction_timer++;
        }

        // if the production timer has gone off
        if (plant_data.production_timer > this.PRODUCTION_TIMER_LENGTH) {
            // reset the production timer
            plant_data.production_timer = 0;
            hlog("Recalculating Production...");
            // request a production
            this.getProductionRequest(room, plant_data);
        }else{
            // increment the production timer
            plant_data.production_timer++;
        }
    },
};