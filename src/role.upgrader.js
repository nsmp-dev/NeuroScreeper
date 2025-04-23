global.UpgraderRole = new Role("upgrader", "📈⬆️", [WORK, CARRY, MOVE, MOVE], 250, 12);

global.ROLES[UpgraderRole.name] = UpgraderRole;

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
        super(UpgraderRole.name, room_name);
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