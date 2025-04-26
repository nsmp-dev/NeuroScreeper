/**
 * Power Squad class represents a specialized team of creeps designed to harvest power from Power Banks.
 * The squad consists of an attacker, healer, and transporter working together to efficiently collect power resources.
 * @class PowerSquad
 */
class PowerSquad {
    /**
     * Creates a new PowerSquad instance for coordinating power collection operations
     * @param {string} room_name - The name of the home room where this squad originates and returns resources to
     */
    constructor(room_name) {
        /**
         * ID of the assigned Power Attacker creep that deals damage to the Power Bank
         * @type {string|null}
         */
        this.power_attacker = null;
        /**
         * ID of the assigned Healer creep that keeps the Power Attacker alive
         * @type {string|null}
         */
        this.power_healer = null;
        /**
         * ID of the assigned Transporter creep that collects and carries power resources
         * @type {string|null}
         */
        this.power_transporter = null;
        /**
         * Name of the home room where the squad originates from
         * @type {string}
         */
        this.room_name = room_name;
        /**
         * Name of the target room where the squad should return to after mission completion
         * @type {string|null}
         */
        this.return_room_name = null;
        /**
         * Current operational state of the PowerSquad (e.g., IDLE, MOVING, ATTACKING)
         * @type {number}
         */
        this.state = STATES.IDLE;
        /**
         * Array of room names that the squad has already explored for power banks
         * @type {string[]}
         */
        this.highway_log = [];
        /**
         * Array of unexplored room names that potentially contain power banks
         * @type {string[]}
         */
        this.highway_queue = [];

        // get the MainMemory object
        let main_memory = Util.getMainMemory();
        // loop through the rooms we have discovered so far
        for (let room_name in main_memory.room_data) {
            // if the room is a highway
            if (main_memory.room_data[room_name].type == HIGHWAY) {
                // add the room name to the highway queue
                this.highway_queue.push(room_name);
            }
        }
    }
}

// export the PowerSquad class
global.PowerSquad = PowerSquad;