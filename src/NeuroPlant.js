/**
 * This module controls the production facilities (labs and factory) in a room.
 * To optimize CPU usage, subsystems run on different ticks to spread out processing.
 * Structure IDs are cached and automatically updated if buildings are destroyed.
 * Labs and factory operate as independent state machines to enable parallel processing.
 * The operator can interact with either system independently without disrupting the other.
 * If structures are destroyed or wrong materials are detected, systems automatically reset to cleaning state.
 * @module NeuroPlant
 */
global.NeuroPlant = {
    /**
     * Checks if the required resources for a reaction are present and sets the requested reaction or cleanup reaction flag
     * @param {PlantData} plant_data - The plant data for storing in memory
     * @param {Room} room - The Room the plant is in
     */
    runLabs: function (plant_data, room) {
        // grab input lab 1
        let input_lab_1 = Game.getObjectById(plant_data.input_lab_1_id);
        // grab input lab 2
        let input_lab_2 = Game.getObjectById(plant_data.input_lab_2_id);
        // grab the output lab
        let output_lab = Game.getObjectById(plant_data.output_lab_id);
        // grab the storage
        let storage = room.storage;

        // if any of the labs or storage are not built
        if (input_lab_1 == null || input_lab_2 == null || output_lab == null || storage == undefined) {
            // clear the current reaction
            plant_data.current_reaction = null;

            // if any of the labs have anything in them,
            if ((input_lab_1 != null && input_lab_1.store.getUsedCapacity() > 0) || (input_lab_2 != null && input_lab_2.store.getUsedCapacity() > 0) || (output_lab != null && output_lab.store.getUsedCapacity() > 0)) {
                // set the plant to clean up the reaction
                plant_data.labs_state = STATES.CLEANING;
            } else {
                // set the plant to idle
                plant_data.labs_state = STATES.IDLE;
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
                plant_data.labs_state = STATES.CLEANING;
                // exit the function early
                return;
            }
        }
        // if the labs are idle
        if (plant_data.labs_state == STATES.IDLE) {
            // loop through all the reagents in all the reactions in the game
            for (let reagent_1 in REACTIONS) {
                // loop through all the other reagents for the current reagent
                for (let reagent_2 in REACTIONS[reagent_1]) {
                    // if the storage has both required ingredients
                    if (storage.store[reagent_1] != undefined && storage.store[reagent_1] > 5 && storage.store[reagent_2] != undefined && storage.store[reagent_2] > 5) {
                        // find which amount is lower to use it for the amount
                        let amount = storage.store[reagent_1] > storage.store[reagent_2] ? storage.store[reagent_2] : storage.store[reagent_1];
                        // round the amount down to the nearest 5
                        amount = Math.floor(amount / 5) * 5;
                        // if the amount is greater than the capacity of a lab
                        if (amount > (LAB_MINERAL_CAPACITY / 2)) {
                            // set the amount to the capacity of a lab
                            amount = (LAB_MINERAL_CAPACITY / 2);
                        }
                        // create and store the enw reaction
                        plant_data.current_reaction = new Reaction(reagent_1, reagent_2, REACTIONS[reagent_1][reagent_2], amount);
                        Visualizer.popup("Requested a reaction for " + plant_data.current_reaction.amount + " " + plant_data.current_reaction.output);
                        // set the state of the labs to loading
                        plant_data.labs_state = STATES.LOADING;
                    }
                }
            }
        }
        // if the labs are loading
        if (plant_data.labs_state == STATES.LOADING) {
            // grab the current reaction
            let reaction = plant_data.current_reaction;

            // if both input labs have the required resource amounts
            if (input_lab_1.store[reaction.input_1] == reaction.amount && input_lab_2.store[reaction.input_2] == reaction.amount) {
                // set the state of the labs to running
                plant_data.labs_state = STATES.RUNNING;
                // start the reaction
                output_lab.runReaction(input_lab_1, input_lab_2);
            }
        }
        // if the labs are running
        if (plant_data.labs_state == STATES.RUNNING) {
            // grab the current reaction
            let reaction = plant_data.current_reaction;
            // if the output lab is off cooldown
            if (output_lab.cooldown == 0) {
                // if the output lab has the amount requested in the reaction
                if (output_lab.store[reaction.output] == reaction.amount) {
                    Visualizer.popup("Finished a reaction for " + plant_data.current_reaction.amount + " " + plant_data.current_reaction.output);
                    // set the labs to finished
                    plant_data.labs_state = STATES.FINISHED;
                    // clear the current reaction
                    plant_data.current_reaction = null;
                } else {
                    // run the reaction
                    output_lab.runReaction(input_lab_1, input_lab_2);
                }
            }
        }
        // if the labs are finished
        if (plant_data.labs_state == STATES.FINISHED) {
            // if the output lab is empty
            if (output_lab.store.getUsedCapacity() == 0) {
                // set the labs to idle
                plant_data.labs_state = STATES.IDLE;
            }
        }
        // if the labs are cleaning
        if (plant_data.labs_state == STATES.CLEANING) {
            // if all the labs are empty
            if (input_lab_1.store.getUsedCapacity() == 0 && input_lab_2.store.getUsedCapacity() == 0 && output_lab.store.getUsedCapacity() == 0) {
                // set the labs to idle
                plant_data.labs_state = STATES.IDLE;
            }
        }
    },
    /**
     * Checks if the required resources for a production are present and sets the requested production or cleanup production flag
     * @param {PlantData} plant_data - The plant data for storing in memory
     * @param {Room} room - The Room the plant is in
     */
    runFactory: function (plant_data, room) {
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
                // set the factory to clean up the production
                plant_data.factory_state = STATES.CLEANING;
            } else {
                // set the factory to idle
                plant_data.factory_state = STATES.IDLE;
            }
        }

        // if there is not a production currently running
        if (plant_data.current_production != null) {
            // grab the current production
            let production = plant_data.current_production;
            // grab the store object of the factory
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
                plant_data.factory_state = STATES.CLEANING;
            }
        }

        // if there is no current production
        if (plant_data.factory_state == STATES.IDLE && storage != undefined) {
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
                    Visualizer.popup("Requested a production of " + plant_data.current_production.amount + " " + plant_data.current_reaction.output);
                    // set the factory to loading
                    plant_data.factory_state = STATES.LOADING;
                    // exit the loop
                    break;
                }
            }
        }

        // if the factory is loading
        if (plant_data.factory_state == STATES.LOADING) {
            // grab the current production
            let production = plant_data.current_production;
            // assume we are ready for the production
            let ready = true;
            // loop through the ingredients of the production
            for (let ingredient in production.inputs) {
                // if the factory does not have enough of that resource
                if (factory.store[ingredient] == undefined || factory.store[ingredient] < production.inputs[ingredient]) {
                    // mark the factory as not ready
                    ready = false;
                    // break the loop
                    break;
                }
            }

            // if the factory is ready
            if (ready) {
                // set the factory to running
                plant_data.factory_state = STATES.RUNNING;
                // start the production
                factory.produce(production.output);
            }
        }

        // if the factory is running
        if (plant_data.factory_state == STATES.RUNNING) {
            // if the factory is off of cooldown
            if (factory.cooldown == 0) {
                // set the factory to finished
                plant_data.factory_state = STATES.FINISHED;
                Visualizer.popup("Finished a production of " + plant_data.current_reaction.output);
                plant_data.current_production = null;
            }
        }

        // if the factory is finished or cleaning
        if (plant_data.factory_state == STATES.FINISHED || plant_data.factory_state == STATES.CLEANING) {
            // if the factory is empty
            if (factory.store.getUsedCapacity() == 0) {
                // set the factory to idle
                plant_data.labs_state = STATES.IDLE;
            }
        }
    },
    /**
     * caches the ids of the structures in the plant
     * @param {PlantData} plant_data - The plant data for storing in memory
     * @param {Room} room - The Room the plant is in
     */
    getStructures: function (plant_data, room) {
        // attempt to grab the first input lab
        let input_lab_1 = room.getStructureAt(STRUCTURE_LAB, plant_data.input_lab_1_location.x, plant_data.input_lab_1_location.y);
        // attempt to grab the second input lab
        let input_lab_2 = room.getStructureAt(STRUCTURE_LAB, plant_data.input_lab_2_location.x, plant_data.input_lab_2_location.y);
        // attempt to grab the output lab
        let output_lab = room.getStructureAt(STRUCTURE_LAB, plant_data.output_lab_location.x, plant_data.output_lab_location.y);
        // attempt to grab the factory
        let factory = room.getStructureAt(STRUCTURE_LAB, plant_data.factory_location.x, plant_data.factory_location.y);
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
        } else {
            // store the first input lab id
            plant_data.input_lab_1_id = input_lab_1.id;
            // store the second input lab id
            plant_data.input_lab_2_id = input_lab_2.id;
            // store the output lab id
            plant_data.output_lab_id = output_lab.id;
        }

        // if the factory or the storage are not built
        if (factory == null || storage == undefined) {
            // clear the factory id cache
            plant_data.factory_id = null;
        } else {
            // store the factory id
            plant_data.factory_id = factory.id;
        }
    },
    /**
     * runs the plant, occasionally caching ids and requesting reactions and productions
     * @param {PlantData} plant_data - The plant data for storing in memory
     * @param {Room|null} room - The Room the plant is in
     */
    run: function (plant_data, room) {
        // if the room is not visible
        if (room == null) {
            // exit the function
            return;
        }

        // if the structure timer has gone off
        if (plant_data.structure_timer > this.PLANT_STRUCTURES_TIMER_LENGTH) {
            // reset the structure timer
            plant_data.structure_timer = 0;
            // cache the structure ids
            this.getStructures(plant_data, room);
        } else {
            // increment the structure timer
            plant_data.structure_timer++;
        }

        // if the reaction timer has gone off
        if (plant_data.labs_timer > LABS_TIMER_LENGTH) {
            // reset the reaction timer
            plant_data.labs_timer = 0;
            // request a reaction
            this.runLabs(plant_data, room);
        } else {
            // increment the reaction timer
            plant_data.labs_timer++;
        }

        // if the production timer has gone off
        if (plant_data.factory_timer > FACTORY_TIMER_LENGTH) {
            // reset the production timer
            plant_data.factory_timer = 0;
            // request a production
            this.runFactory(plant_data, room);
        } else {
            // increment the production timer
            plant_data.factory_timer++;
        }
    },
};