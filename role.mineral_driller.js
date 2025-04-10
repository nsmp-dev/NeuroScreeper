/**
 * Mineral Driller name, body, and initializers
 * @constant {Object} MINERAL_DRILLER
 */
global.MINERAL_DRILLER = {
    // identifying string
    NAME: "mineral_driller",
    // emoji for shorthand visuals
    EMOJI: "⛏️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [WORK, MOVE],
    // energy cost of the body
    ENERGY_COST: 150,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[MINERAL_DRILLER.NAME] = MINERAL_DRILLER;

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
        super(DRILLER.NAME, room_name);
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
        // assign a new task
        this.memory.task = new DrillTask(this.memory.mineral, this.memory.container_location, this.memory.room_name);
        // announce the new task
        this.announceTask();
    }
    // run the task
    TaskRunner.run(this);
};