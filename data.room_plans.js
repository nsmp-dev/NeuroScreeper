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
        Timer.start("creating_room_plans");
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
         * base points from which we draw roads between
         * @type {Point[]}
         */
        this.base_road_anchors = [];
        /**
         * plant points from which we draw roads between
         * @type {Point[]}
         */
        this.plant_road_anchors = [];
        /**
         * 2D array of booleans for where to put roads
         * @type {Boolean[][]}
         */
        this.roads = [];
        /**
         * 2D array of booleans for where to put ramparts
         * @type {Boolean[][]}
         */
        this.ramparts = [];
        // loop through all the room positions
        for (let x = 0; x < 50; x++) {
            // push a new row onto the road grid
            this.roads.push([]);
            // push a new row onto the rampart grid
            this.ramparts.push([]);
            // loop through all positions on the row
            for (let y = 0; y < 50; y++) {
                // push a false onto the road grid
                this.roads[x].push(false);
                // push a false onto the rampart grid
                this.ramparts[x].push(false);
            }
        }
        /**
         * list of source_plans and their containers
         * @type {SourcePlan[]}
         */
        this.source_plans = [];
        /**
         * list of minerals and their containers
         * @type {MineralPlan[]}
         */
        this.mineral_plans = [];
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
         * coordinates for the output lab
         * @type {Point|null}
         */
        this.output_lab_location = null;
        /**
         * coordinates for factory
         * @type {Point|null}
         */
        this.factory_location = null;
        Timer.stop("creating_room_plans");
    }
}

// export the RoomPlans class
global.RoomPlans = RoomPlans;