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
         * flag for cleaning up a screwed up reaction
         * @type {Boolean}
         */
        this.cleanup_reaction = false;
        /**
         * flag for cleaning up a screwed up production
         * @type {Boolean}
         */
        this.cleanup_production = false;
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
         * power spawn location from the plans
         * @type {Point}
         */
        this.power_spawn_location = plans.power_spawn_location;
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
global.PlantData = PlantData;
