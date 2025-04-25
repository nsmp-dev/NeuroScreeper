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
         * hash of all the RoomData objects with the room name as the key
         * @type {Object.<string, RoomData>}
         */
        this.room_data = {};
        /**
         * timer for recounting the population
         * @type {number}
         */
        this.population_timer = COUNT_POPULATION_TIMER_LENGTH - 2;
        /**
         * The output product resource
         * @type {number}
         */
        this.new_room_timer = 0;
        /**
         * hash of the RoomPopulation objects with the room name as the key
         * @type {Object.<string, RoomPopulation>}
         */
        this.populations = {};
        /**
         * the name of the room that is the capitol, or null if there is not a capitol
         * @type {string|null}
         */
        this.capitol_room_name = null;
        /**
         * hash of all the TimerLog objects with the id as the key
         * @type {Object.<string, TimerLog>}
         */
        this.timers = {};
        /**
         * counter for ensuring no id collisions occur
         * @type {number}
         */
        this.id_counter = 0;
        /**
         * build number of this MainMemory object
         * @type {number}
         */
        this.build = BUILD;
        /**
         * hash of all the ObserverLog objects with the room name as the key
         * @type {Object.<string, ObserverLog>}
         */
        this.observer_log = {};
        /**
         * hash of all the Terminal timers with the room name as the key
         * @type {Object.<string, number>}
         */
        this.terminal_timers = {};
    }
}

// export the MainMemory class
global.MainMemory = MainMemory;