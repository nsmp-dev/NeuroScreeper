/**
 * SourcePlan class, an object that contains data for planning a source
 * @class SourcePlan
 */
class SourcePlan {
    /**
     * Creates a SourcePlan Object
     * @param {string} source_id - id of the Source object
     * @param {number} container_x - x coordinate of the container
     * @param {number} container_y - y coordinate of the container
     */
    constructor(source_id, container_x, container_y) {
        /**
         * id of the Source object
         * @type {string}
         */
        this.source_id = source_id;
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

// export the SourcePlan class
module.exports = SourcePlan;