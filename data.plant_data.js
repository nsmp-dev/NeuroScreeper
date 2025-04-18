/**
 * PlantData class, an object that contains all the memory for a plant
 * @class PlantData
 */
class PlantData {
    /**
     * Creates a PlantData Object
     * @param {RoomPlans} plans - The RoomPlans object for this room
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
        this.labs_timer = 2;
        /**
         * the timer for doing productions
         * @type {number}
         */
        this.factory_timer = Math.floor(FACTORY_TIMER_LENGTH / 2);
        /**
         * input lab 1 location from the plans
         * @type {Point}
         */
        this.input_lab_1_location = plans.input_lab_1_location;
        /**
         * input lab 2 location from the plans
         * @type {Point}
         */
        this.input_lab_2_location = plans.input_lab_2_location;
        /**
         * output lab location from the plans
         * @type {Point}
         */
        this.output_lab_location = plans.output_lab_location;
        /**
         * factory location from the plans
         * @type {Point}
         */
        this.factory_location = plans.factory_location;
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
         * state of the labs
         * @type {number}
         */
        this.labs_state = STATES.IDLE;
        /**
         * state of the factory
         * @type {number}
         */
        this.factory_state = STATES.IDLE;
    }
}

// exports the PlantData class
global.PlantData = PlantData;
