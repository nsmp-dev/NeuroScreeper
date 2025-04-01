const Point = require("data.point");

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
         * location of the mineral
         * @type {Point}
         */
        this.mineral_location = new Point(mineral_x, mineral_y);
        /**
         * location of the container
         * @type {Point}
         */
        this.container_location = new Point(container_x, container_y);
    }
}

// export the MineralPlan class
module.exports = MineralPlan;