/**
 * MineralPlan class represents a planning structure for mineral extraction and storage.
 * It contains essential information about a mineral's location, associated container,
 * and resource characteristics needed for mining operations.
 * @class MineralPlan
 */
class MineralPlan {
    /**
     * Creates a new MineralPlan instance for managing mineral extraction operations
     * @param {string} mineral_id - Unique identifier of the Mineral object in the game world
     * @param {Point} mineral_location - Coordinates of the mineral deposit in the room
     * @param {Point} container_location - Coordinates where the container should be placed for mineral storage
     * @param {string} resource_type - Type of resource contained in this mineral deposit
     */
    constructor(mineral_id, mineral_location, container_location, resource_type) {
        /**
         * Unique identifier for the Mineral object in the game world
         * @type {string}
         */
        this.mineral_id = mineral_id;
        /**
         * Coordinates of the Mineral in the room
         * @type {Point}
         */
        this.mineral_location = mineral_location;
        /**
         * Coordinates where the storage container should be placed
         * @type {Point}
         */
        this.container_location = container_location;
        /**
         * The type of mineral resource produced by this Mineral
         * @type {string}
         */
        this.resource_type = resource_type;
    }
}

// export the MineralPlan class
global.MineralPlan = MineralPlan;