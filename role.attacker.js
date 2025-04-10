/**
 * Attacker name, body, and initializer
 * @constant {Object} ATTACKER
 */
global.ATTACKER = {
    // identifying string
    NAME: "attacker",
    // emoji for shorthand visuals
    EMOJI: "⚔️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [ATTACK, TOUGH, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 12,
};
global.ROLES[ATTACKER.NAME] = ATTACKER;

/**
 * AttackerMemory class, storing data for an attacker
 * @class AttackerMemory
 */
class AttackerMemory extends CreepMemory{
    /**
     * creates an AttackerMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(ATTACKER.NAME, room_name);
    }
}
global.AttackerMemory = AttackerMemory;

/**
 * attacker that attacks hostile creeps in the room
 */
Creep.prototype.runAttacker = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // find all hostile creeps in the room
        let creeps = this.room.find(FIND_HOSTILE_CREEPS);
        // if any hostile creeps are found
        if (creeps.length > 0) {
            // find the closest hostile creep
            let target = this.pos.findClosestByPath(creeps);
            // assign a new task
            this.memory.task = new AttackTask(target);
            // announce the new task
            this.announceTask();
        }else{
            // assign a new task
            this.memory.task = new IdleTask(this.memory.room_name, 10);
            // announce the new task
            this.announceTask();
        }
    }

    // run the task
    TaskRunner.run(this);
};