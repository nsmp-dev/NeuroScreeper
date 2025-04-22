/**
 * Claimer name, body, and initializers
 * @constant {Object} CLAIMER
 */
global.CLAIMER = {
    // identifying string
    NAME: "claimer",
    // emoji for shorthand visuals
    EMOJI: "🚩🏰",
    // standard body build that can be multiplied arbitrarily to build larger creeps
    BODY: [CLAIM, MOVE],
    // energy cost of the body
    ENERGY_COST: 650,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[CLAIMER.NAME] = CLAIMER;

/**
 * ClaimerMemory class, storing data for a claimer
 * @class ClaimerMemory
 */
class ClaimerMemory extends CreepMemory{
    /**
     * creates an ClaimerMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(CLAIMER.NAME, room_name);
    }
}
global.ClaimerMemory = ClaimerMemory;

/**
 * claimer that moves toward the assigned room and either reserves or claims the controller
 */
Creep.prototype.runClaimer = function () {
    let main_memory = Util.getMainMemory();
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        if (main_memory.room_data[this.memory.room_name].type == COLONY) {
            // assign a new task
            this.memory.task = new ClaimTask(this.memory.room_name);
            // announce the new task
            this.announceTask();
        }else{
            // assign a new task
            this.memory.task = new ReserveTask(this.memory.room_name);
            // announce the new task
            this.announceTask();
        }
    }
    // run the task
    TaskRunner.run(this);
};