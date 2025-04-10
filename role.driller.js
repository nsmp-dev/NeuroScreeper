/**
 * Driller name, body, and initializers
 * @constant {Object} DRILLER
 */
global.DRILLER = {
    // identifying string
    NAME: "driller",
    // emoji for shorthand visuals
    EMOJI: "⛏️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [WORK, MOVE],
    // energy cost of the body
    ENERGY_COST: 150,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[DRILLER.NAME] = DRILLER;

/**
 * DrillerMemory class, storing data for a driller
 * @class DrillerMemory
 */
class DrillerMemory extends CreepMemory{
    /**
     * creates an DrillerMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     * @param {string} source_id - The id of the assigned source
     * @param {Point} container_location - The location of the assigned container
     */
    constructor(room_name, source_id, container_location){
        super(DRILLER.NAME, room_name);
        /**
         * The id of the assigned source
         * @type {string}
         */
        this.source = source_id;
        /**
         * The location of the assigned container
         * @type {Point}
         */
        this.container_location = container_location;
    }
}
global.DrillerMemory = DrillerMemory;

/**
 * driller that harvests energy from the assigned source, dropping the energy on the container
 */
Creep.prototype.runDriller = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        this.memory.task = new DrillTask(this.memory.source, this.memory.container_location, this.memory.room_name);
        // announce the new task
        this.announceTask();
    }
    // run the task
    TaskRunner.run(this);
};