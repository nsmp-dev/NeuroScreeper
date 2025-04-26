/**
 * SourcePlan represents a planning configuration for a single energy source in the game.
 * It stores essential information needed to organize harvesting operations, including
 * the source's identifier and the designated location for its container structure.
 * @class SourcePlan
 */
class SourcePlan {
    /**
     * Creates a new SourcePlan instance to manage harvesting operations for a specific source
     * @param {string} source_id - Unique identifier of the energy Source object in the game
     * @param {Point} container_location - Coordinates where the energy container should be placed near the source
     */
    constructor(source_id, container_location) {
        /**
         * Unique identifier of the energy Source object that this plan is associated with
         * @type {string}
         */
        this.source_id = source_id;
        /**
         * Planned position coordinates for the container that will store harvested energy
         * @type {Point}
         */
        this.container_location = container_location;
    }
}

// export the SourcePlan class
global.SourcePlan = SourcePlan;