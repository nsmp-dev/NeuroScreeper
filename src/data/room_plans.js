/**
 * RoomPlans represents a comprehensive blueprint for room construction and structure placement.
 * It manages coordinates for the base structures, plant structures, roads, and ramparts.
 * @class RoomPlans
 */
class RoomPlans {
    /**
     * Initializes a new RoomPlans object with empty structure lists and 50x50 boolean grids for roads and ramparts.
     */
    constructor() {
        /**
         * Coordinates where creeps will wait when not assigned to tasks
         * @type {Point|null}
         */
        this.idle_location = null;
        /**
         * Top left coordinates for the main base structures
         * @type {Point|null}
         */
        this.base_location = null;
        /**
         * Top left coordinates for the power plant or energy generation facilities
         * @type {Point|null}
         */
        this.plant_location = null;
        /**
         * Collection of all planned structures with their types and positions
         * @type {ConstructionPlan[]}
         */
        this.structures = [];
        /**
         * Array of coordinate points used as reference for road construction from the base
         * @type {Point[]}
         */
        this.base_road_anchors = [];
        /**
         * Array of coordinate points used as reference for road construction from the plant
         * @type {Point[]}
         */
        this.plant_road_anchors = [];
        /**
         * Two-dimensional array representing a grid where true values indicate planned road placements and false values indicate no roads
         * @type {Boolean[][]}
         */
        this.roads = [];
        /**
         * Two-dimensional array representing a grid where true values indicate planned rampart placements for defensive structures and false values indicate no ramparts should be built
         * @type {Boolean[][]}
         */
        this.ramparts = [];

        // loop through all the room positions
        for (let x = 0; x < ROOM_SIZE; x++) {
            // push a new row onto the road grid
            this.roads.push([]);
            // push a new row onto the rampart grid
            this.ramparts.push([]);
            // loop through all positions on the row
            for (let y = 0; y < ROOM_SIZE; y++) {
                // push a false onto the road grid
                this.roads[x].push(false);
                // push a false onto the rampart grid
                this.ramparts[x].push(false);
            }
        }
        /**
         * Collection of energy source locations and their associated container structures
         * @type {SourcePlan[]}
         */
        this.source_plans = [];
        /**
         * Collection of mineral deposit locations and their associated container structures
         * @type {MineralPlan[]}
         */
        this.mineral_plans = [];
        /**
         * Position for the first input laboratory used in resource processing
         * @type {Point|null}
         */
        this.input_lab_1_location = null;
        /**
         * Position for the second input laboratory used in resource processing
         * @type {Point|null}
         */
        this.input_lab_2_location = null;
        /**
         * Position for the laboratory that receives processed materials
         * @type {Point|null}
         */
        this.output_lab_location = null;
        /**
         * Position for the factory structure used in advanced resource processing
         * @type {Point|null}
         */
        this.factory_location = null;
    }
}

// export the RoomPlans class
global.RoomPlans = RoomPlans;