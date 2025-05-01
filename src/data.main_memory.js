/**
 * MainMemory class represents the main memory storage structure for the game.
 * It maintains all essential game data, including room data objects, population statistics,
 * timers, and system messages stored in the Memory object.
 * @class MainMemory
 */
class MainMemory {
    /**
     * Initializes a new MainMemory instance with default values for all game-related data storage.
     * This constructor sets up the core data structures needed for game state management.
     */
    constructor() {
        /**
         * Collection of RoomData objects indexed by room name, storing detailed information about each game room
         * @type {Object.<string, RoomData>}
         */
        this.room_data = {};
        /**
         * Countdown timer that triggers periodic population recounts, initialized with an offset from the standard count length
         * @type {number}
         */
        this.population_timer = COUNT_POPULATION_TIMER_LENGTH - 1;
        /**
         * Timer for tracking new room-related operations or expansions
         * @type {number}
         */
        this.new_room_timer = 0;
        /**
         * Collection of RoomPopulation objects indexed by room name, tracking population statistics for each room
         * @type {Object.<string, RoomPopulation>}
         */
        this.populations = {};
        /**
         * Identifier for the main capitol room. Stores the room name or null if no capitol is designated
         * @type {string|null}
         */
        this.capitol_room_name = null;
        /**
         * Collection of TimerLog objects indexed by unique IDs, used for tracking how long certain sections of code take
         * @type {Object.<string, TimerLog>}
         */
        this.timers = {};
        /**
         * Incremental counter used to generate unique IDs for various game objects and prevent identifier conflicts
         * @type {number}
         */
        this.id_counter = 0;
        /**
         * Current build version number of the MainMemory system, used for version control and compatibility
         * @type {number}
         */
        this.build = BUILD;
        /**
         * Collection of ObserverLog objects indexed by room name, storing room observation history and data
         * @type {Object.<string, ObserverLog>}
         */
        this.observer_log = {};
        /**
         * Collection of terminal cooldown timers indexed by room name, managing terminal operation delays
         * @type {Object.<string, number>}
         */
        this.terminal_timers = {};
        /**
         * Array of PopupMessage objects for displaying in-game notifications and alerts to the user
         * @type {PopupMessage[]}
         */
        this.popup_messages = [];
    }
}

// export the MainMemory class
global.MainMemory = MainMemory;