/**
 * RoomPlans class, an object containing all the construction plans for a room data object
 * @class RoomPlans
 */
class RoomPlans {

    /**
     * creates a RoomPlans object
     */
    constructor() {
        hlog("Creating a new RoomPlans Object...");
        /**
         * coordinates of the idle location
         * @type {Point|null}
         */
        this.idle_location = null;
        /**
         * coordinates of the base location
         * @type {Point|null}
         */
        this.base_location = null;
        /**
         * coordinates of the plant location
         * @type {Point|null}
         */
        this.plant_location = null;
        /**
         * list of structures to place in the room
         * @type {ConstructionPlan[]}
         */
        this.structures = [];
        /**
         * points from which we draw roads between
         * @type {Point[]}
         */
        this.road_anchors = [];
        /**
         * list of roads to place in the room
         * @type {Point[]}
         */
        this.roads = [];
        /**
         * list of ramparts to place in the room
         * @type {Point[]}
         */
        this.ramparts = [];
        /**
         * list of sources and their containers
         * @type {SourcePlan[]}
         */
        this.sources = [];
        /**
         * list of minerals and their containers
         * @type {MineralPlan[]}
         */
        this.minerals = [];
        /**
         * coordinates for input lab 1
         * @type {Point|null}
         */
        this.input_lab_1_location = null;
        /**
         * coordinates for input lab 2
         * @type {Point|null}
         */
        this.input_lab_2_location = null;
        /**
         * coordinates for output lab
         * @type {Point|null}
         */
        this.output_lab_location = null;
        /**
         * coordinates for factory
         * @type {Point|null}
         */
        this.factory_location = null;
        /**
         * coordinates for power spawn
         * @type {Point|null}
         */
        this.power_spawn_location = null;
    }
}

// export the RoomPlans class
module.exports = RoomPlans;
