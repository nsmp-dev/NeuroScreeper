/**
 * PlantData class manages the memory and state for a plant structure in the game,
 * including labs, factories, and their associated reactions and productions.
 * This class coordinates the operations of resource processing facilities.
 * @class PlantData
 */
class PlantData {
    /**
     * Creates a PlantData Object
     * @param {RoomPlans} plans - The RoomPlans object for this room
     */
    constructor(plans) {
        /**
         * The currently active chemical reaction being processed in the labs.
         * When null, no reaction is in progress.
         * @type {Reaction|null}
         */
        this.current_reaction = null;
        /**
         * The currently active production task being processed in the factory.
         * When null, no production is in progress.
         * @type {Production|null}
         */
        this.current_production = null;
        /**
         * Timer controlling the frequency of structure ID validation and cache updates.
         * When zero, triggers a recheck of all structure IDs.
         * @type {number}
         */
        this.structure_timer = 0;
        /**
         * Timer controlling the interval between lab reaction processing cycles.
         * Initially set to 2 ticks.
         * @type {number}
         */
        this.labs_timer = 2;
        /**
         * Timer controlling the interval between factory production cycles.
         * Initially set to half of the standard factory timer length.
         * @type {number}
         */
        this.factory_timer = Math.floor(FACTORY_TIMER_LENGTH / 2);
        /**
         * Coordinate position of the first input lab used for reactions.
         * This location is defined in the room plans.
         * @type {Point}
         */
        this.input_lab_1_location = plans.input_lab_1_location;
        /**
         * Coordinate position of the second input lab used for reactions.
         * This location is defined in the room plans.
         * @type {Point}
         */
        this.input_lab_2_location = plans.input_lab_2_location;
        /**
         * Coordinate position of the output lab where reaction results are deposited.
         * This location is defined in the room plans.
         * @type {Point}
         */
        this.output_lab_location = plans.output_lab_location;
        /**
         * Coordinate position of the factory used for commodity production.
         * This location is defined in the room plans.
         * @type {Point}
         */
        this.factory_location = plans.factory_location;
        /**
         * Game ID of the first input lab structure.
         * Used to reference the lab in game operations.
         * @type {string|null}
         */
        this.input_lab_1_id = null;
        /**
         * Game ID of the second input lab structure.
         * Used to reference the lab in game operations.
         * @type {string|null}
         */
        this.input_lab_2_id = null;
        /**
         * Game ID of the output lab structure.
         * Used to reference the lab where reaction products are stored.
         * @type {string|null}
         */
        this.output_lab_id = null;
        /**
         * Game ID of the factory structure.
         * Used to reference the factory for production operations.
         * @type {string|null}
         */
        this.factory_id = null;
        /**
         * Current operational state of the lab system.
         * Indicates whether labs are idle, loading, running, finished, or cleaning.
         * @type {number}
         */
        this.labs_state = STATES.IDLE;
        /**
         * Current operational state of the factory.
         * Indicates whether the factory is idle, loading, running, finished, or cleaning.
         * @type {number}
         */
        this.factory_state = STATES.IDLE;
    }
}

// export the PlantData class
global.PlantData = PlantData;
