/**
 * RoomPopulation class, an object that contains all the creep counts for a room
 * @class RoomPopulation
 */
class RoomPopulation {
    /**
     * creates an empty room population object
     * @param {RoomPlans} plans - The room plans this population is for
     */
    constructor(plans) {
        /**
         * total of all the creeps assigned to this room
         * @type {number}
         */
        this.total = 0;
        /**
         * hash of the population of each role
         * @type {Object}
         */
        this.roles = {};
        /**
         * hash of the sources in the room
         * @type {Object}
         */
        this.sources = {};
        /**
         * hash of the minerals in the room
         * @type {Object}
         */
        this.minerals = {};

        // loop through each role
        for (let role in ROLES) {
            // set the population to 0
            this.roles[role] = 0;
        }

        // loop through all the source plans in the room
        for (let source_plan of plans.sources) {
            // create a population entry for this source plan
            this.sources[source_plan.source_id] = {
                // location of the container to drop energy in
                container_location: source_plan.container_location,
                // null spot to record a driller
                driller: null,
                // null spot to record a transporter
                transporter: null,
            };
        }

        // loop through all the mineral plans in the room
        for (let mineral_plan of plans.minerals) {
            // create a population entry for this mineral plan
            this.minerals[mineral_plan.mineral_id] = {
                // location of the container to drop resources in
                container_location: mineral_plan.container_location,
                // location of the mineral itself
                mineral_location: mineral_plan.mineral_location,
                // type of resource the mineral produces
                resource_type: mineral_plan.resource_type,
                // null spot to record a mineral driller
                mineral_driller: null,
                // null spot to record a mineral transporter
                mineral_transporter: null,
            };
        }
    }
}
// export the RoomPopulation class
module.exports = RoomPopulation;