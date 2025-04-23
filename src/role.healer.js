global.HealerRole = new Role("healer", "⚕️🌡️", [HEAL, TOUGH, MOVE, MOVE], 360, 12);

global.ROLES[HealerRole.name] = HealerRole;

/**
 * HealerMemory class, storing data for a healer
 * @class HealerMemory
 */
class HealerMemory extends CreepMemory{
    /**
     * creates an HealerMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(HealerRole.name, room_name);
    }
}
global.HealerMemory = HealerMemory;

/**
 * healer that heals any damaged creeps in the room
 */
Creep.prototype.runHealer = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // find my creeps
        let creeps = this.room.find(FIND_MY_CREEPS, {
            // that are damaged
            filter: creep => creep.hits < creep.hitsMax,
        });
        // if we found any
        if (creeps.length > 0) {
            // find the closest one
            let target = this.pos.findClosestByPath(creeps);
            // assign a new task
            this.memory.task = new HealTask(target);
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