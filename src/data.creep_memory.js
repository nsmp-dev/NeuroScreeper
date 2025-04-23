/**
 * CreepMemory class, an object that contains all the memory for a creep
 * @class CreepMemory
 */
class CreepMemory {
    /**
     * Creates a CreepMemory Object
     * @param {string} role - The role of the creep being created
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(role, room_name) {
        /**
         * stores the role assigned to this creep
         * @type {string}
         */
        this.role = role;
        /**
         * stores the room that requested this creep
         * @type {string}
         */
        this.room_name = room_name;
        /**
         * empty spot where the task for running the creep will go
         * @type {Task|null}
         */
        this.task = null;
    }
}

// export the CreepMemory class
global.CreepMemory = CreepMemory;