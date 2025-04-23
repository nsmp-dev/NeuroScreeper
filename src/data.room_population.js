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
         * hash with the population of each role
         * @type {Object<string,number>}
         */
        this.roles = {};
        /**
         * list of the source populations in the room
         * @type {SourcePopulation[]}
         */
        this.source_populations = [];
        /**
         * list of the mineral populations in the room
         * @type {MineralPopulation[]}
         */
        this.mineral_populations = [];
        /**
         * power squad population for counting the power spawn creeps
         * @type {PowerSquadPopulation}
         */
        this.power_squad = new PowerSquadPopulation();

        // loop through each role
        for (let role in ROLES) {
            // set the population to 0
            this.roles[role] = 0;
        }

        // loop through all the source plans in the room
        for (let source_plan of plans.source_plans) {
            // create a population entry for this source plan
            this.source_populations.push(new SourcePopulation(source_plan));
        }

        // loop through all the mineral plans in the room
        for (let mineral_plan of plans.mineral_plans) {
            // create a population entry for this mineral plan
            this.mineral_populations.push(new MineralPopulation(mineral_plan));
        }
    }
}
// export the RoomPopulation class
global.RoomPopulation = RoomPopulation;