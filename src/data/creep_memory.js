/**
 * CreepMemory class represents the memory structure for individual creeps in the game.
 * It stores essential information such as the creep's role, assigned room, and current task.
 * @class CreepMemory
 */
class CreepMemory {
    /**
     * Creates a new CreepMemory instance to manage a creep's memory state
     * @param {string} role - The behavioral role that defines the creep's functions and responsibilities
     * @param {string} room_name - The identifier of the room where the creep was requested from
     */
    constructor(role, room_name) {
        /**
         * The role that determines the creep's behavior and responsibilities in the game
         * @type {string}
         */
        this.role = role;
        /**
         * The identifier of the room where this creep was requested from
         * @type {string}
         */
        this.room_name = room_name;
        /**
         * Reference to the current task object that defines the creep's immediate goals
         * @type {Task|null}
         */
        this.task = null;
    }
}

// export the CreepMemory class
global.CreepMemory = CreepMemory;