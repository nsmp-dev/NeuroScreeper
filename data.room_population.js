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
         * @type {SourcePopulation[]}
         */
        this.sources = [];
        /**
         * hash of the minerals in the room
         * @type {MineralPopulation[]}
         */
        this.minerals = [];

        // loop through each role
        for (let role in ROLES) {
            // set the population to 0
            this.roles[role] = 0;
        }

        // loop through all the source plans in the room
        for (let source_plan of plans.sources) {
            // create a population entry for this source plan
            this.sources.push(new SourcePopulation(source_plan));
        }

        // loop through all the mineral plans in the room
        for (let mineral_plan of plans.minerals) {
            // create a population entry for this mineral plan
            this.minerals.push(new MineralPopulation(mineral_plan));
        }
    }
}
// export the RoomPopulation class
global.RoomPopulation = RoomPopulation;