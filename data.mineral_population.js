/**
 * MineralPopulation class, an object that contains data for populating a mineral
 * @class MineralPopulation
 */
class MineralPopulation {
    /**
     * Creates a MineralPopulation Object
     * @param {MineralPlan} mineral_plan - the mineral plans this mineral population is for
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
         * the type of resource this mineral contains
         * @type {string}
         */
        this.resource_type = mineral_plan.resource_type;
        /**
         * the id of the mineral driller assigned to this mineral
         * @type {string|null}
         */
        this.mineral_driller = null;
        /**
         * the id of the mineral transporter assigned to this mineral
         * @type {string|null}
         */
        this.mineral_transporter = null;
    }
}

// export the MineralPopulation class
global.MineralPopulation = MineralPopulation;