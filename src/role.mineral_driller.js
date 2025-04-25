// set up the role constants
global.MineralDrillerRole = new Role("mineral_driller", "💎⛏️", [WORK, MOVE], 150, 25);

// add the role to the roles hash
global.ROLES[MineralDrillerRole.name] = MineralDrillerRole;

/**
 * MineralDrillerMemory class, storing data for a mineral driller
 * @class MineralDrillerMemory
 */
class MineralDrillerMemory extends CreepMemory{
    /**
     * creates an MineralDrillerMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     * @param {string} mineral_id - The id of the assigned mineral
     * @param {Point} container_location - The location of the assigned container
     */
    constructor(room_name, mineral_id, container_location){
        super(MineralDrillerRole.name, room_name);
        /**
         * The id of the assigned mineral
         * @type {string}
         */
        this.mineral = mineral_id;
        /**
         * The location of the assigned container
         * @type {Point}
         */
        this.container_location = container_location;
    }
}
global.MineralDrillerMemory = MineralDrillerMemory;

/**
 * mineral driller that drills a mineral deposit for resources
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
    NeuroTask.run(this);
};