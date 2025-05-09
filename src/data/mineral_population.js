/**
 * MineralPopulation class manages the population of a MineralPlan,
 * tracking assigned workers and maintaining location data inherited from a MineralPlan.
 * @class MineralPopulation
 */
class MineralPopulation {
    /**
     * Initializes a new MineralPopulation instance based on a MineralPlan,
     * setting up the necessary properties for logging MineralPlan population.
     * @param {MineralPlan} mineral_plan - The plans for the Mineral this population is for
     */
    constructor(mineral_plan) {
        /**
         * Unique identifier for the Mineral in the game world
         * @type {string}
         */
        this.mineral_id = mineral_plan.mineral_id;
        /**
         * Coordinates of the Mineral in the room
         * @type {Point}
         */
        this.mineral_location = mineral_plan.mineral_location;
        /**
         * Coordinates of the container used for storing extracted resource
         * @type {Point}
         */
        this.container_location = mineral_plan.container_location;
        /**
         * The type of mineral resource available at this Mineral
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