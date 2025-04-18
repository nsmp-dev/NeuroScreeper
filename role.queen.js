/**
 * Queen name, body, and initializers
 * @constant {Object} QUEEN
 */
global.QUEEN = {
    // identifying string
    NAME: "queen",
    // emoji for shorthand visuals
    EMOJI: "👑",
    // standard body build that can be multiplied arbitrarily to build larger creeps
    BODY: [CARRY, MOVE],
    // energy cost of the body
    ENERGY_COST: 150,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[QUEEN.NAME] = QUEEN;

/**
 * QueenMemory class, storing data for an attacker
 * @class QueenMemory
 */
class QueenMemory extends CreepMemory{
    /**
     * creates an QueenMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(QUEEN.NAME, room_name);
    }
}
global.QueenMemory = QueenMemory;

/**
 * queen that takes energy from the storage and dumps it into the towers, terminal, and extensions
 */
Creep.prototype.runQueen = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if we are out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // grab the storage in the room
            let target = this.room.storage;

            // TODO: if the storage has any ingredients in it and this isn't a capitol
                // TODO: assign a task to move ingredients from the storage to the terminal
            // TODO: if the terminal has any ingredients in it and this is a capitol
                // TODO: assign a task to move ingredients from the terminal to the storage

            // if the storage isn't built or is empty
            if (target == undefined || target.store[RESOURCE_ENERGY] == 0) {
                // assign a new task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }else{
                // assign a new task
                this.memory.task = new GatherTask(target, RESOURCE_ENERGY);
                // announce the new task
                this.announceTask();
            }
        }else{
            // find a new dump target fit for a queen
            let target = this.getQueenDumpTarget();
            // if a new target was found
            if (target != null) {
                // assign a new task
                this.memory.task = new DepositTask(target, RESOURCE_ENERGY);
                // announce the new task
                this.announceTask();
            }else{
                // assign a new task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};