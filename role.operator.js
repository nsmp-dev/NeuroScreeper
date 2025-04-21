/**
 * run the operator
 * @param {PlantData} plant_data - The name of the room this creep is assigned to
 */
PowerCreep.prototype.runOperator = function (plant_data) {
    // if the operator is close to death and not already renewing
    if (this.ticksToLive < 50 && this.memory.task.type != TASK_TYPES.RENEW_OPERATOR) {
        // grab the power spawn in the room
        let power_spawn = this.room.getPowerSpawn();
        // if a PowerSpawn was found
        if (power_spawn != null) {
            // assign a new task
            this.memory.task = new RenewOperatorTask(power_spawn, this.memory.task);
        }
    }

    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        if (plant_data.factory_state == STATES.CLEANING || plant_data.factory_state == STATES.FINISHED) {
            let factory = Game.getObjectById(plant_data.factory_id);
            if (factory != null && this.room.storage != undefined) {
                for (let resource in factory.store) {
                    if (factory.store[resource] > 0) {
                        this.memory.task = new MoveResourceTask(this.room.name, factory, this.room.storage, resource, factory.store[resource]);
                        break;
                    }
                }
            }
        }else if (plant_data.labs_state == STATES.CLEANING || plant_data.labs_state == STATES.FINISHED){
            let labs = [plant_data.input_lab_1_id, plant_data.input_lab_2_id, plant_data.output_lab_id];
            for (let i = 0; i < labs.length; i++) {
                let lab = Game.getObjectById(labs[i]);
                if (lab != null && this.room.storage != undefined) {
                    for (let resource in lab.store) {
                        if (lab.store[resource] > 0) {
                            this.memory.task = new MoveResourceTask(this.room.name, lab, this.room.storage, resource, lab.store[resource]);
                            break;
                        }
                    }
                    if (this.memory.task != null) {
                        break;
                    }
                }
            }
        }else if (plant_data.factory_state == STATES.LOADING){
            let production = plant_data.current_production;
            let factory = Game.getObjectById(plant_data.factory_id);

            if (factory != null && this.room.storage != undefined) {
                for (let resource in production.inputs) {
                    if (factory.store[resource] == undefined || factory.store[resource] < production.inputs[resource]) {
                        this.memory.task = new MoveResourceTask(this.room.name, this.room.storage, factory, resource, (production.inputs[resource] - factory.store[resource]));
                        break;
                    }
                }
            }
        }else if (plant_data.labs_state == STATES.LOADING){
            let reaction = plant_data.current_reaction;
            let input_lab_1 = Game.getObjectById(plant_data.input_lab_1_id);
            let input_lab_2 = Game.getObjectById(plant_data.input_lab_2_id);
            if (input_lab_1 != null && input_lab_2 != null && this.room.storage != undefined) {
                if (input_lab_1.store[reaction.input_1] == undefined || input_lab_1.store[reaction.input_1] < reaction.amount) {
                    this.memory.task = new MoveResourceTask(this.room.name, this.room.storage, input_lab_1, reaction.input_1, (reaction.amount - input_lab_1.store[reaction.input_1]));
                }else if (input_lab_2.store[reaction.input_2] == undefined || input_lab_2.store[reaction.input_2] < reaction.amount) {
                    this.memory.task = new MoveResourceTask(this.room.name, this.room.storage, input_lab_2, reaction.input_2, (reaction.amount - input_lab_2.store[reaction.input_2]));
                }
            }
        }else{
            this.memory.task = new IdleTask(this.room.name);
        }
    }
    // run the task
    TaskRunner.run(this);
};