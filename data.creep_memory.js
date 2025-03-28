/**
 * CreepMemory class, an object that contains all the memory for each plant
 * @class CreepMemory
 */
class CreepMemory {
    /**
     * Creates a CreepMemory Object
     * @param {string} role - The room's plans object
     * @param {string} room_name - The room's plans object
     */
    constructor(role, room_name) {
        this.role = role;
        this.room_name = room_name;
        this.task = null;
    }
}

module.exports = CreepMemory;