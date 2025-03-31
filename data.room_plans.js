/**
 * RoomPlans class, an object containing all the construction plans for a room data object
 * @class RoomPlans
 */
class RoomPlans {

    /**
     * creates a room plans object
     */
    constructor() {
        hlog("Creating a new RoomPlans Object...");
        /**
         * x coordinate of the idle location
         * @type {number|null}
         */
        this.idle_x = null;
        /**
         * y coordinate of the idle location
         * @type {number|null}
         */
        this.idle_y = null;
        /**
         * x coordinate of the base location
         * @type {number|null}
         */
        this.base_x = null;
        /**
         * y coordinate of the base location
         * @type {number|null}
         */
        this.base_y = null;
        /**
         * x coordinate of the plant location
         * @type {number|null}
         */
        this.plant_x = null;
        /**
         * y coordinate of the plant location
         * @type {number|null}
         */
        this.plant_y = null;
        /**
         * list of structures to place in the room
         * @type {{x: number, y: number, type: string}[]}
         */
        this.structures = [];
        /**
         * points from which we draw roads between
         * @type {{x: number, y: number}[]}
         */
        this.road_anchors = [];
        /**
         * list of roads to place in the room
         * @type {{x: number, y: number}[]}
         */
        this.roads = [];
        /**
         * list of ramparts to place in the room
         * @type {{x: number, y: number}[]}
         */
        this.ramparts = [];
        /**
         * list of sources and their containers
         * @type {Array}
         */
        this.sources = [];
        /**
         * list of minerals and their containers
         * @type {Array}
         */
        this.minerals = [];
        /**
         * x coordinate for input lab 1
         * @type {number|null}
         */
        this.input_lab_1_x = null;
        /**
         * y coordinate for input lab 1
         * @type {number|null}
         */
        this.input_lab_1_y = null;
        /**
         * x coordinate for input lab 2
         * @type {number|null}
         */
        this.input_lab_2_x = null;
        /**
         * y coordinate for input lab 2
         * @type {number|null}
         */
        this.input_lab_2_y = null;
        /**
         * x coordinate for output lab
         * @type {number|null}
         */
        this.output_lab_x = null;
        /**
         * y coordinate for output lab
         * @type {number|null}
         */
        this.output_lab_y = null;
        /**
         * y coordinate for output lab
         * @type {number|null}
         */
        this.factory_x = null;
        /**
         * y coordinate for output lab
         * @type {number|null}
         */
        this.factory_y = null;
        /**
         * y coordinate for output lab
         * @type {number|null}
         */
        this.power_spawn_x = null;
        /**
         * y coordinate for output lab
         * @type {number|null}
         */
        this.power_spawn_y = null;
    }
}

// export the RoomPlans class
module.exports = RoomPlans;
