// set up the role constants
global.ScoutRole = new Role("scout", "🗺️🌐", [MOVE], 50, 1);

// add the role to the roles hash
global.ROLES[ScoutRole.name] = ScoutRole;

/**
 * ScoutMemory class that manages memory data for scout creeps. Scouts explore and gather
 * intelligence about rooms using breadth-first search traversal of the game world.
 * @class ScoutMemory
 */
class ScoutMemory extends CreepMemory {
    /**
     * Creates a new ScoutMemory instance for scout creeps that explore and gather
     * intelligence about rooms using breadth-first search traversal.
     * @param {string} room_name - The name of the room where this scout creep will begin its exploration
     */
    constructor(room_name) {
        super(ScoutRole.name, room_name);
        /**
         * Array of room names representing the queue of rooms to be explored by the scout.
         * Rooms are processed in breadth-first search order for systematic exploration.
         * @type {string[]}
         */
        this.room_queue = [room_name];
        /**
         * Array of room names representing the history of explored rooms. Used to prevent
         * re-visiting rooms and track exploration progress in breadth-first traversal.
         * @type {string[]}
         */
        this.room_log = [];

        // find the adjacent rooms
        let adjacent_rooms = Game.rooms[room_name].getAdjacentRooms();

        // loop through the adjacent rooms
        for (let room_name of adjacent_rooms) {
            // if the room name is not already in the old
            this.room_queue.push(room_name);
        }
    }
}

global.ScoutMemory = ScoutMemory;

/**
 * Implements a scout creep behavior that systematically explores adjacent rooms using
 * a Breadth-First Search (BFS) algorithm. The scout maintains a queue of rooms to visit
 * and logs explored rooms to optimize coverage and prevent revisiting rooms unnecessarily.
 * @memberOf Creep#
 * @member {function} runScout
 */
Creep.prototype.runScout = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {

        // shift the queue
        if (this.memory.room_queue[0] == this.room.name) {
            // grab the room name from the front of the queue
            let room_name = this.memory.room_queue.shift();
            // add the room to the log to prevent revisits
            this.memory.room_log.push(room_name);

            // if the room queue does not have any rooms in it
            if (this.memory.room_queue.length == 0) {
                // copy the room log to the queue
                this.memory.room_queue = this.memory.room_log.slice();
                // reset the room log
                this.memory.room_log = [];
            }

            // find the adjacent rooms
            let adjacent_rooms = this.room.getAdjacentRooms();

            // loop through the adjacent rooms
            for (let room_name of adjacent_rooms) {
                // if the room name is not already in the log or the queue
                if (!this.memory.room_log.includes(room_name) && !this.memory.room_queue.includes(room_name)) {
                    // add the room to the queue
                    this.memory.room_queue.push(room_name);
                }
            }
        }

        // if there are still rooms in the queue
        if (this.memory.room_queue.length > 0) {
            // assign a new MoveRoomTask
            this.memory.task = new MoveRoomTask(this.memory.room_queue[0]);
            // announce the MoveRoomTask
            this.announceTask();
        } else {
            // assign a new idle task
            this.memory.task = new IdleTask(this.room.name, 10);
            // announce the idle task
            this.announceTask();
        }
    }
    // run the task
    neuro_task.run(this);
};