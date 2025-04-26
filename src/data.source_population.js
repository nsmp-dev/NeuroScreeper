/**
 * SourcePopulation manages and tracks the assignment of creeps to an energy source.
 * It maintains information about the source location, associated container, and
 * keeps track of assigned worker creeps (driller and transporter).
 * @class SourcePopulation
 */
class SourcePopulation {
    /**
     * Creates a new SourcePopulation instance based on the provided source plan,
     * initializing tracking for worker creeps assigned to this energy source
     * @param {SourcePlan} source_plan - Configuration plan containing source and container placement information
     */
    constructor(source_plan) {
        /**
         * Unique identifier of the energy Source object this population tracks
         * @type {string}
         */
        this.source_id = source_plan.source_id;
        /**
         * Coordinate position where the energy container is or will be placed near the source
         * @type {Point}
         */
        this.container_location = source_plan.container_location;
        /**
         * Identifier of the assigned harvester creep that mines the energy source
         * @type {string|null}
         */
        this.driller = null;
        /**
         * Identifier of the assigned carrier creep that moves energy from the container to storage
         * @type {string|null}
         */
        this.transporter = null;
    }
}

// export the SourcePopulation class
global.SourcePopulation = SourcePopulation;