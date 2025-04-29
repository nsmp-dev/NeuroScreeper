/**
 * Executes operational tasks for a PowerCreep operator, including resource management, factory operations, and lab control.
 * Handles automated task assignment based on plant data state and ensures proper resource distribution between structures.
 * @param {PlantData} plant_data - Contains current state information and configuration for room facilities including factory and labs
 */
PowerCreep.prototype.runOperator = function (plant_data) {
    // if the operator is close to death and not already renewing
    if (this.ticksToLive < 50 && this.memory.task.type != TASK_TYPES.RENEW_OPERATOR) {
        // grab the power spawn in the room
        let power_spawn = this.room.getPowerSpawn();
        // if a PowerSpawn was found
        if (power_spawn != null) {
            // assign a new RenewOperatorTask
            this.memory.task = new RenewOperatorTask(power_spawn, this.memory.task);
            // announce the RenewOperatorTask
            this.announceTask();
        }
    }

    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if the factory is cleaning or finished
        if (plant_data.factory_state == STATES.CLEANING || plant_data.factory_state == STATES.FINISHED) {
            // grab the factory
            let factory = Game.getObjectById(plant_data.factory_id);
            // if the factory was found and the room has a storage
            if (factory != null && this.room.storage != undefined) {
                // loop through the resources in the factory
                for (let resource in factory.store) {
                    // if the factory has any of the resource
                    if (factory.store[resource] > 0) {
                        // assign a new MoveResourceTask
                        this.memory.task = new MoveResourceTask(this.room.name, factory, this.room.storage, resource, factory.store[resource]);
                        // announce the MoveResourceTask
                        this.announceTask();
                        // break the loop
                        break;
                    }
                }
            }
            // if the labs are cleaning or finished
        } else if (plant_data.labs_state == STATES.CLEANING || plant_data.labs_state == STATES.FINISHED) {
            // make an array of the lab ids
            let labs = [plant_data.input_lab_1_id, plant_data.input_lab_2_id, plant_data.output_lab_id];
            // loop through the labs
            for (let i = 0; i < labs.length; i++) {
                // grab the lab
                let lab = Game.getObjectById(labs[i]);
                // if the lab was found and the room has a storage
                if (lab != null && this.room.storage != undefined) {
                    // loop through the resources in the store
                    for (let resource in lab.store) {
                        // if the lab has any of the resource
                        if (lab.store[resource] > 0) {
                            // assign a MoveResourceTask
                            this.memory.task = new MoveResourceTask(this.room.name, lab, this.room.storage, resource, lab.store[resource]);
                            // announce the MoveResourceTask
                            this.announceTask();
                            // break the loop
                            break;
                        }
                    }
                    // if a task has been assigned
                    if (this.memory.task != null) {
                        // break the loop
                        break;
                    }
                }
            }
            // if the factory is loading
        } else if (plant_data.factory_state == STATES.LOADING) {
            // grab the current production
            let production = plant_data.current_production;
            // grab the factory
            let factory = Game.getObjectById(plant_data.factory_id);

            // if the factory was found and the room has a storage
            if (factory != null && this.room.storage != undefined) {
                // loop through the inputs of the production
                for (let resource in production.inputs) {
                    // if the factory does not have enough of the resource
                    if (factory.store[resource] == undefined || factory.store[resource] < production.inputs[resource]) {
                        // assign a MoveResourceTask
                        this.memory.task = new MoveResourceTask(this.room.name, this.room.storage, factory, resource, (production.inputs[resource] - factory.store[resource]));
                        // announce the MoveResourceTask
                        this.announceTask();
                        // break the loop
                        break;
                    }
                }
            }
            // if the labs are loading
        } else if (plant_data.labs_state == STATES.LOADING) {
            // grab the current reaction
            let reaction = plant_data.current_reaction;
            // grab the first input lab
            let input_lab_1 = Game.getObjectById(plant_data.input_lab_1_id);
            // grab the second input lab
            let input_lab_2 = Game.getObjectById(plant_data.input_lab_2_id);
            // if both labs are found and the room has a storage
            if (input_lab_1 != null && input_lab_2 != null && this.room.storage != undefined) {
                // if the first input lab does not have enough of the required resource
                if (input_lab_1.store[reaction.input_1] == undefined || input_lab_1.store[reaction.input_1] < reaction.amount) {
                    // assign a MoveResourceTask
                    this.memory.task = new MoveResourceTask(this.room.name, this.room.storage, input_lab_1, reaction.input_1, (reaction.amount - input_lab_1.store[reaction.input_1]));
                    // announce the MoveResourceTask
                    this.announceTask();
                    // if the second input lab does not have enough of the required resource
                } else if (input_lab_2.store[reaction.input_2] == undefined || input_lab_2.store[reaction.input_2] < reaction.amount) {
                    // assign a MoveResourceTask
                    this.memory.task = new MoveResourceTask(this.room.name, this.room.storage, input_lab_2, reaction.input_2, (reaction.amount - input_lab_2.store[reaction.input_2]));
                    // announce the MoveResourceTask
                    this.announceTask();
                }
            }
        } else {
            // assign a new IdleTask
            this.memory.task = new IdleTask(this.room.name);
            // announce the IdleTask
            this.announceTask();
        }
    }
    // run the task
    neuro_task.run(this);
};