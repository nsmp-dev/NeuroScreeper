/**
 * MineralPlan class, an object that contains data for planning a mineral
 * @class MineralPlan
 */
class MineralPlan {
    /**
     * Creates a MineralPlan Object
     * @param {string} mineral_id - id of the Mineral object
     * @param {number} mineral_x - x coordinate of the mineral
     * @param {number} mineral_y - y coordinate of the mineral
     * @param {number} container_x - x coordinate of the container
     * @param {number} container_y - y coordinate of the container
     */
    constructor(mineral_id, mineral_x, mineral_y, container_x, container_y) {
        /**
         * id of the Mineral object
         * @type {string}
         */
        this.mineral_id = mineral_id;
        /**
         * x coordinate of the mineral
         * @type {number}
         */
        this.mineral_x = mineral_x;
        /**
         * y coordinate of the mineral
         * @type {number}
         */
        this.mineral_y = mineral_y;
        /**
         * x coordinate of the container
         * @type {number}
         */
        this.container_x = container_x;
        /**
         * y coordinate of the container
         * @type {number}
         */
        this.container_y = container_y;
    }
}

// export the MineralPlan class
module.exports = MineralPlan;