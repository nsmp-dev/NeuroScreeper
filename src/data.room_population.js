/**
 * RoomPopulation manages and tracks the population of different creep types within a game room.
 * This class maintains counts for various creep roles, source workers, mineral workers, and power squad members.
 * @class RoomPopulation
 */
class RoomPopulation {
    /**
     * Initializes a new RoomPopulation instance with zero counts for all creep roles.
     * Creates population trackers for sources, minerals, and power squad based on the provided room plans.
     * @param {RoomPlans} plans - Room planning configuration containing source and mineral plans
     */
    constructor(plans) {
        /**
         * Tracks the total number of creeps currently assigned to this room across all roles
         * @type {number}
         */
        this.total = 0;
        /**
         * Maps role identifiers to their respective population counts in the room
         * @type {Object.<string,number>}
         */
        this.roles = {};
        /**
         * Tracks population details for each energy source harvesting operation in the room
         * @type {SourcePopulation[]}
         */
        this.source_populations = [];
        /**
         * Tracks population details for each mineral harvesting operation in the room
         * @type {MineralPopulation[]}
         */
        this.mineral_populations = [];
        /**
         * Manages the population of creeps assigned to power processing operations
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