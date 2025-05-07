// set up the role constants
global.DrillerRole = new Role("driller", "⚡⛏️", [WORK, MOVE], 150, 25);

// add the role to the roles hash
global.ROLES[DrillerRole.name] = DrillerRole;

/**
 * DrillerMemory class represents the memory structure for a specialized creep that harvests energy from sources.
 * It stores essential data like source ID and container location needed for efficient resource gathering operations.
 * @class DrillerMemory
 */
class DrillerMemory extends CreepMemory {
    /**
     * Creates a new DrillerMemory instance to manage memory for a specialized harvesting creep
     * @param {string} room_name - The identifier of the room where the driller will operate
     * @param {string} source_id - The unique identifier of the energy source this driller is assigned to harvest
     * @param {Point} container_location - The coordinates where the container is placed for energy storage
     */
    constructor(room_name, source_id, container_location) {
        super(DrillerRole.name, room_name);
        /**
         * The unique identifier of the energy source assigned to this driller for harvesting.
         * This ID corresponds to a specific source object in the game world.
         * @type {string}
         */
        this.source = source_id;
        /**
         * The coordinates representing the position of the assigned container where harvested energy will be stored.
         * This Point object contains both x and y coordinates in the game world's coordinate system.
         * @type {Point}
         */
        this.container_location = container_location;
    }
}

global.DrillerMemory = DrillerMemory;

/**
 * Specialized creep role responsible for continuous energy harvesting from a designated source.
 * Operates by positioning itself at a fixed location next to the source and automatically
 * depositing harvested energy into an assigned container for efficient resource collection.
 * @memberOf Creep#
 * @member {function} runDriller
 */
Creep.prototype.runDriller = function () {
    // if we don't have a task currently assigned
    if (this.task == null) {
        // assign a new drill task
        this.task = new DrillTask(this.memory.source, this.memory.container_location, this.memory.room_name);
    }
    // run the task
    neuro_task.run(this);
};