/**
 * PlantData class, an object that contains all the memory for a plant
 * @class PlantData
 */
class PlantData {
    /**
     * Creates a PlantData Object
     * @param {RoomPlans} plans - The room's plans object
     */
    constructor(plans) {
        hlog("Creating a new PlantData Object...");
        /**
         * the current reaction in progress
         * @type {Reaction|null}
         */
        this.current_reaction = null;
        /**
         * the current production in progress
         * @type {Production|null}
         */
        this.current_production = null;
        /**
         * the timer for re-checking cached structure ids
         * @type {number}
         */
        this.structure_timer = 0;
        /**
         * the timer for doing reactions
         * @type {number}
         */
        this.reaction_timer = 2;
        /**
         * the timer for doing productions
         * @type {number}
         */
        this.production_timer = Math.floor(PRODUCTION_TIMER_LENGTH / 2);
        /**
         * input lab 1 x coordinate from the plans
         * @type {number}
         */
        this.input_lab_1_x = plans.input_lab_1_x;
        /**
         * input lab 1 y coordinate from the plans
         * @type {number}
         */
        this.input_lab_1_y = plans.input_lab_1_y;
        /**
         * input lab 2 x coordinate from the plans
         * @type {number}
         */
        this.input_lab_2_x = plans.input_lab_2_x;
        /**
         * input lab 2 y coordinate from the plans
         * @type {number}
         */
        this.input_lab_2_y = plans.input_lab_2_y;
        /**
         * output lab x coordinate from the plans
         * @type {number}
         */
        this.output_lab_x = plans.output_lab_x;
        /**
         * output lab y coordinate from the plans
         * @type {number}
         */
        this.output_lab_y = plans.output_lab_y;
        /**
         * factory x coordinate from the plans
         * @type {number}
         */
        this.factory_x = plans.factory_x;
        /**
         * factory y coordinate from the plans
         * @type {number}
         */
        this.factory_y = plans.factory_y;
        /**
         * power spawn x coordinate from the plans
         * @type {number}
         */
        this.power_spawn_x = plans.power_spawn_x;
        /**
         * power spawn y coordinate from the plans
         * @type {number}
         */
        this.power_spawn_y = plans.power_spawn_y;
        /**
         * input lab 1 id
         * @type {string|null}
         */
        this.input_lab_1_id = null;
        /**
         * input lab 2 id
         * @type {string|null}
         */
        this.input_lab_2_id = null;
        /**
         * output lab id
         * @type {string|null}
         */
        this.output_lab_id = null;
        /**
         * factory id
         * @type {string|null}
         */
        this.factory_id = null;
        /**
         * power spawn id
         * @type {string|null}
         */
        this.power_spawn_id = null;
        /**
         * state of the plant
         * @type {number}
         */
        this.plant_state = STATES.IDLE;
    }
}

// exports the PlantData class
module.exports = PlantData;
