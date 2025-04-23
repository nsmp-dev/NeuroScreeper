/**
 * MainMemory class, an object that contains all the data stored on the Memory object
 * @class MainMemory
 */
class MainMemory {
    /**
     * creates a MainMemory object
     */
    constructor() {
        /**
         * hash of all the room data objects
         * @type {Object.<string, RoomData>}
         */
        this.room_data = {};
        /**
         * The second reagent resource
         * @type {number}
         */
        this.population_timer = COUNT_POPULATION_TIMER_LENGTH - 2;
        /**
         * The output product resource
         * @type {number}
         */
        this.new_room_timer = 0;
        /**
         * The amount of resource the production will use and make
         * @type {Object.<string, RoomPopulation>}
         */
        this.populations = {};
        /**
         * hash of all the room data objects
         * @type {string|null}
         */
        this.capitol_room_name = null;
        /**
         * hash of all the timers
         * @type {Object}
         */
        this.timers = {};
        /**
         * hash of all the timers
         * @type {number}
         */
        this.id_counter = 0;
        /**
         * hash of all the timers
         * @type {number}
         */
        this.build = BUILD;
        /**
         * hash of all the timers
         * @type {Object.<string, ObserverLog>}
         */
        this.observer_log = {};
        /**
         * hash of all the timers
         * @type {Object<string, number>}
         */
        this.terminal_timers = {};
    }
}

// exports the MainMemory class
global.MainMemory = MainMemory;