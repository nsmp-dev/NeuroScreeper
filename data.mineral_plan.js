/**
 * MineralPlan class, an object that contains data for planning a mineral
 * @class MineralPlan
 */
class MineralPlan {
    /**
     * Creates a MineralPlan Object
     * @param {string} mineral_id - id of the Mineral object
     * @param {Point} mineral_location - location of the mineral
     * @param {Point} container_location - location of the container
     * @param {string} resource_type - type of resource this mineral has
     *
     */
    constructor(mineral_id, mineral_location, container_location, resource_type) {
        /**
         * id of the Mineral object
         * @type {string}
         */
        this.mineral_id = mineral_id;
        /**
         * location of the mineral
         * @type {Point}
         */
        this.mineral_location = mineral_location;
        /**
         * location of the container
         * @type {Point}
         */
        this.container_location = container_location;
        /**
         * type of resource this mineral contains
         * @type {string}
         */
        this.resource_type = resource_type;
    }
}

// export the MineralPlan class
global.MineralPlan = MineralPlan;