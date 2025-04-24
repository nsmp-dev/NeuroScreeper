// set up the role constants
global.ClaimerRole = new Role("claimer", "🚩🏰", [CLAIM, MOVE], 650, 25);

// add the role to the roles hash
global.ROLES[ClaimerRole.name] = ClaimerRole;

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
        super(ClaimerRole.name, room_name);
    }
}
global.ClaimerMemory = ClaimerMemory;

/**
 * claimer that moves toward the assigned room and either reserves or claims the controller
 */
Creep.prototype.runClaimer = function () {
    // get the MainMemory object
    let main_memory = Util.getMainMemory();
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if this room is a colony
        if (main_memory.room_data[this.memory.room_name].type == COLONY) {
            // assign a new claim task
            this.memory.task = new ClaimTask(this.memory.room_name);
            // announce the claim task
            this.announceTask();
        }else{
            // assign a new reserve task
            this.memory.task = new ReserveTask(this.memory.room_name);
            // announce the reserve task
            this.announceTask();
        }
    }
    // run the task
    TaskRunner.run(this);
};