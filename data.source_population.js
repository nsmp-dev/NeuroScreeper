/**
 * SourcePopulation class, an object that contains data for populating a source
 * @class SourcePopulation
 */
class SourcePopulation {
    /**
     * Creates a SourcePopulation Object
     * @param {SourcePlan} source_plan - plans for the source
     *
     */
    constructor(source_plan) {
        /**
         * id of the Source object
         * @type {string}
         */
        this.source_id = source_plan.source_id;
        /**
         * location of the container
         * @type {Point}
         */
        this.container_location = source_plan.container_location;
        /**
         * type of resource this source contains
         * @type {string|null}
         */
        this.driller = null;
        /**
         * type of resource this source contains
         * @type {string|null}
         */
        this.transporter = null;
    }
}

// export the SourcePopulation class
global.SourcePopulation = SourcePopulation;