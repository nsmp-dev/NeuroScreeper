/**
 * MineralPopulation class manages the active mining operations for a mineral deposit,
 * tracking assigned workers and maintaining location data inherited from a MineralPlan.
 * This class serves as a runtime representation of mineral extraction activities.
 * @class MineralPopulation
 */
class MineralPopulation {
    /**
     * Initializes a new MineralPopulation instance based on a MineralPlan,
     * setting up the necessary properties for managing mineral extraction operations.
     * @param {MineralPlan} mineral_plan - The planning structure containing mineral location and resource information
     */
    constructor(mineral_plan) {
        /**
         * Unique identifier for the mineral deposit in the game world
         * @type {string}
         */
        this.mineral_id = mineral_plan.mineral_id;
        /**
         * Coordinate position of the mineral deposit in the room
         * @type {Point}
         */
        this.mineral_location = mineral_plan.mineral_location;
        /**
         * Coordinate position of the container used for storing extracted minerals
         * @type {Point}
         */
        this.container_location = mineral_plan.container_location;
        /**
         * The type of mineral resource available at this deposit (e.g., 'H', 'O', 'K', etc.)
         * @type {string}
         */
        this.resource_type = mineral_plan.resource_type;
        /**
         * Unique identifier of the creep assigned to extract minerals from this deposit
         * @type {string|null}
         */
        this.mineral_driller = null;
        /**
         * Unique identifier of the creep assigned to transport minerals from the container
         * @type {string|null}
         */
        this.mineral_transporter = null;
    }
}

// export the MineralPopulation class
global.MineralPopulation = MineralPopulation;