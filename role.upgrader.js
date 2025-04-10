/**
 * Upgrader name, body, and initializers
 * @constant {Object} UPGRADER
 */
global.UPGRADER = {
    // identifying string
    NAME: "upgrader",
    // emoji for shorthand visuals
    EMOJI: "⬆️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [WORK, CARRY, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 250,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[UPGRADER.NAME] = UPGRADER;

/**
 * UpgraderMemory class, storing data for an attacker
 * @class UpgraderMemory
 */
class UpgraderMemory extends CreepMemory{
    /**
     * creates an UpgraderMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(UPGRADER.NAME, room_name);
    }
}
global.UpgraderMemory = UpgraderMemory;

/**
 * upgrader that upgrades the room's controller
 */
Creep.prototype.runUpgrader = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            this.gatherEnergy();
        }else{
            // assign a new task
            this.memory.task = new UpgradeTask(this.room.name);
            // announce the new task
            this.announceTask();
        }
    }
    // run the task
    TaskRunner.run(this);
};