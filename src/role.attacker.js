// set up the role constants
global.AttackerRole = new Role("attacker", "🗡️⚔️", [ATTACK, TOUGH, MOVE, MOVE], 100, 12);

// add the role to the roles hash
global.ROLES[AttackerRole.name] = AttackerRole;

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
        super(AttackerRole.name, room_name);
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
            // assign a new attack task
            this.memory.task = new AttackTask(target);
            // announce the attack task
            this.announceTask();
        }else{
            // assign a new idle task
            this.memory.task = new IdleTask(this.memory.room_name, 10);
            // announce the idle task
            this.announceTask();
        }
    }

    // run the task
    TaskRunner.run(this);
};