/**
 * Represents a plan for constructing structures in the game world. This class encapsulates
 * the necessary information needed to place a construction site at a specific location.
 * @class ConstructionPlan
 */
class ConstructionPlan {
    /**
     * Creates a new ConstructionPlan instance with specified coordinates and structure type
     * @param {number} x - The X coordinate in room where the construction site will be placed
     * @param {number} y - The Y coordinate in room where the construction site will be placed
     * @param {string} structure_type - The type of structure to be built
     */
    constructor(x, y, structure_type) {
        /**
         * The position in the room where the construction site will be placed
         * @type {Point}
         */
        this.location = new Point(x, y);
        /**
         * The type of structure that will be built at the construction site
         * @type {string}
         */
        this.type = structure_type;
    }
}

// export the ConstructionPlan class
global.ConstructionPlan = ConstructionPlan;