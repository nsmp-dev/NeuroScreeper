const Point = require("data.point");

/**
 * ConstructionPlan class, an object that contains data for planning a structure
 * @class ConstructionPlan
 */
class ConstructionPlan {
    /**
     * Creates a ConstructionPlan Object
     * @param {number} x - x coordinate to place the construction site
     * @param {number} y - y coordinate to place the construction site
     * @param {string} structure_type - type of structure that the construction site is for
     */
    constructor(x, y, structure_type) {
        /**
         * location of the construction site
         * @type {Point}
         */
        this.location = new Point(x, y);
        /**
         * type of structure that the construction site is for
         * @type {string}
         */
        this.structure_type = structure_type;
    }
}

// export the ConstructionPlan class
module.exports = ConstructionPlan;