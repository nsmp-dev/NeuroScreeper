// set up the role constants
global.MineralDrillerRole = new Role("mineral_driller", "💎⛏️", [WORK, MOVE], 150, 25);

// add the role to the roles hash
global.ROLES[MineralDrillerRole.name] = MineralDrillerRole;

/**
 * MineralDrillerMemory class represents memory storage for creeps assigned to mine minerals.
 * It maintains essential data for mineral mining operations, including mineral ID and container location.
 * @class MineralDrillerMemory
 */
class MineralDrillerMemory extends CreepMemory {
    /**
     * Creates a new MineralDrillerMemory instance for managing creep-specific memory related to mineral harvesting.
     * @param {string} room_name - The identifier of the room where the mineral driller creep will operate
     * @param {string} mineral_id - The unique identifier of the mineral deposit this creep is assigned to harvest
     * @param {Point} container_location - The coordinates of the container where harvested minerals will be stored
     */
    constructor(room_name, mineral_id, container_location) {
        super(MineralDrillerRole.name, room_name);
        /**
         * The unique identifier (ID) of the assigned mineral deposit that this creep will harvest.
         * This ID is used to locate and interact with the specific mineral resource in the game world.
         * @type {string}
         */
        this.mineral = mineral_id;
        /**
         * The coordinates specifying the location of the container where harvested minerals are stored.
         * This container serves as the collection point for resources extracted by the mineral driller.
         * @type {Point}
         */
        this.container_location = container_location;
    }
}

global.MineralDrillerMemory = MineralDrillerMemory;

/**
 * MineralDriller role handles specialized creeps designed to continuously harvest
 * mineral deposits. These creeps position themselves at mineral sources and
 * systematically extract resources, depositing them into nearby containers for
 * collection and processing.
 * @memberOf Creep#
 */
Creep.prototype.runMineralDriller = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new drill task
        this.memory.task = new DrillTask(this.memory.mineral, this.memory.container_location, this.memory.room_name);
        // announce the drill task
        this.announceTask();
    }
    // run the task
    neuro_task.run(this);
};