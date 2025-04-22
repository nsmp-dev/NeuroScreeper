/**
 * Power Squad class, an object that stores data for a group of creeps that collect power
 * @class PowerSquad
 */
class PowerSquad {
    /**
     * Creates a PowerSquad Object
     * @param {string} room_name - The name of the room this power squad is from
     */
    constructor(room_name) {
        /**
         * stores the assigned Power Attacker creep
         * @type {string|null}
         */
        this.power_attacker = null;
        /**
         * stores the assigned power healer creep
         * @type {string|null}
         */
        this.power_healer = null;
        /**
         * stores the assigned power transporter creep
         * @type {string|null}
         */
        this.power_transporter = null;
        /**
         * stores the room that owns this squad
         * @type {string}
         */
        this.room_name = room_name;
        /**
         * stores the room that we return to
         * @type {string|null}
         */
        this.return_room_name = null;
        /**
         * stores the room that owns this squad
         * @type {number}
         */
        this.state = STATES.IDLE;
        /**
         * stores the rooms that have already been visited
         * @type {string[]}
         */
        this.highway_log = [];
        /**
         * stores the rooms that need to be visited
         * @type {string[]}
         */
        this.highway_queue = [];

        // loop through the rooms we have discovered so far
        for (let room_name of Memory.room_data) {
            // if the room is a highway
            if (Memory.room_data[room_name].type == HIGHWAY) {
                // add the room name to the highway queue
                this.highway_queue.push(room_name);
            }
        }
    }
}

// export the PowerSquad class
global.PowerSquad = PowerSquad;