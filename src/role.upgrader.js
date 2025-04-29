// set up the role constants
global.UpgraderRole = new Role("upgrader", "📈⬆️", [WORK, CARRY, MOVE, MOVE], 250, 12);

// add the role to the roles hash
global.ROLES[UpgraderRole.name] = UpgraderRole;

/**
 * UpgraderMemory class, storing data for creeps that specialize in upgrading room controllers
 * Extends CreepMemory to manage memory state specific to controller upgrading operations
 * @class UpgraderMemory
 */
class UpgraderMemory extends CreepMemory {
    /**
     * Creates a new UpgraderMemory instance to manage the memory state for creeps focused on upgrading room controllers
     * @param {string} room_name - The identifier of the room where this upgrader creep will perform its controller upgrade tasks
     */
    constructor(room_name) {
        super(UpgraderRole.name, room_name);
    }
}

global.UpgraderMemory = UpgraderMemory;

/**
 * Manages the behavior of upgrader creeps that are responsible for delivering energy to and upgrading
 * room controllers. Controller upgrades increase room level, unlocking new building capabilities and
 * maintaining territory control. Upgraders gather energy when depleted and consistently upgrade their
 * assigned room's controller.
 */
Creep.prototype.runUpgrader = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if the creep is out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // gather some energy
            this.gatherEnergy();
        } else {
            // assign a new upgrade task
            this.memory.task = new UpgradeTask(this.room.name);
            // announce the upgrade task
            this.announceTask();
        }
    }
    // run the task
    neuro_task.run(this);
};