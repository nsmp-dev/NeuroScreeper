/**
 * MineralPopulation class, an object that contains data for populating a mineral
 * @class MineralPopulation
 */
class MineralPopulation {
    /**
     * Creates a MineralPopulation Object
     * @param {MineralPlan} mineral_plan - id of the Mineral object
     *
     */
    constructor(mineral_plan) {
        /**
         * id of the Mineral object
         * @type {string}
         */
        this.mineral_id = mineral_plan.mineral_id;
        /**
         * location of the container
         * @type {Point}
         */
        this.container_location = mineral_plan.container_location;
        /**
         * type of resource this mineral contains
         * @type {string}
         */
        this.resource_type = mineral_plan.resource_type;
        /**
         * type of resource this mineral contains
         * @type {string|null}
         */
        this.mineral_driller = null;
        /**
         * type of resource this mineral contains
         * @type {string|null}
         */
        this.mineral_transporter = null;
    }
}

// export the MineralPopulation class
global.MineralPopulation = MineralPopulation;