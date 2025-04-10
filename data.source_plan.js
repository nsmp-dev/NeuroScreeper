/**
 * SourcePlan class, an object that contains data for planning a source
 * @class SourcePlan
 */
class SourcePlan {
    /**
     * Creates a SourcePlan Object
     * @param {string} source_id - id of the Source object
     * @param {Point} container_location - location of the container
     */
    constructor(source_id, container_location) {
        /**
         * id of the Source object
         * @type {string}
         */
        this.source_id = source_id;
        /**
         * x coordinate of the container
         * @type {Point}
         */
        this.container_location = container_location;
    }
}

// export the SourcePlan class
global.SourcePlan = SourcePlan;