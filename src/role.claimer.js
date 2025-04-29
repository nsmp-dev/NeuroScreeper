// set up the role constants
global.ClaimerRole = new Role("claimer", "🚩🏰", [CLAIM, MOVE], 650, 25);

// add the role to the roles hash
global.ROLES[ClaimerRole.name] = ClaimerRole;

/**
 * ClaimerMemory class represents memory storage for claimer creeps, which are responsible
 * for claiming or reserving room controllers. This class extends CreepMemory to store
 * specific data needed for claiming operations.
 * @class ClaimerMemory
 */
class ClaimerMemory extends CreepMemory {
    /**
     * Creates a new ClaimerMemory object that stores information for a claimer creep.
     * Claimer creeps are specialized units responsible for claiming or reserving room controllers.
     * @param {string} room_name - The identifier of the room where the claimer will operate
     */
    constructor(room_name) {
        super(ClaimerRole.name, room_name);
    }
}

global.ClaimerMemory = ClaimerMemory;

/**
 * Controls claimer creep behavior by directing it to travel to an assigned room
 * and interact with the controller, either reserving it temporarily or claiming full
 * ownership based on colony settings. This function handles the core claiming/reserving
 * logic for expansion and territory control.
 */
Creep.prototype.runClaimer = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if this room is a colony
        if (main_memory.room_data[this.memory.room_name].type == COLONY) {
            // assign a new claim task
            this.memory.task = new ClaimTask(this.memory.room_name);
            // announce the claim task
            this.announceTask();
        } else {
            // assign a new reserve task
            this.memory.task = new ReserveTask(this.memory.room_name);
            // announce the reserve task
            this.announceTask();
        }
    }
    // run the task
    neuro_task.run(this);
};