// set up the role constants
global.TransporterRole = new Role("transporter", "⚡🚛", [CARRY, MOVE], 100, 25);

// add the role to the roles hash
global.ROLES[TransporterRole.name] = TransporterRole;

/**
 * TransporterMemory class, storing data for transport creeps that move resources between containers
 * Extends CreepMemory to manage memory state specific to transport operations
 * @class TransporterMemory
 */
class TransporterMemory extends CreepMemory {
    /**
     * Creates a new TransporterMemory object to manage memory state for transport creeps
     * @param {string} room_name - The identifier of the room where this transporter will operate
     * @param {string} source_id - The unique ID of the energy source this transporter is assigned to
     * @param {Point} container_location - The coordinates of the container this transporter will gather from
     */
    constructor(room_name, source_id, container_location) {
        super(TransporterRole.name, room_name);
        /**
         * The ID of the energy source this transporter is assigned to collect from
         * @type {string}
         */
        this.source = source_id;
        /**
         * The coordinates for the container position where this transporter will pickup resources
         * @type {Point}
         */
        this.container_location = container_location;
        /**
         * Cached identifier of the container structure where resources are collected.
         * This ID is stored to avoid repeated lookups and improve performance.
         * @type {string|null}
         */
        this.container_id = null;
        /**
         * Stores the name of the nearest colony where this transporter should deliver resources.
         * When null, the transporter needs to determine a new destination colony.
         * Used for efficient pathfinding and resource distribution between rooms.
         * @type {string|null}
         */
        this.nearest_colony_name = null;
    }
}

global.TransporterMemory = TransporterMemory;

/**
 * Controls creep behavior for transporters, which are specialized units responsible for moving energy
 * from driller-adjacent containers to colony storage structures. These creeps form a crucial logistical
 * link in the resource supply chain, efficiently transferring gathered resources to where they're needed.
 */
Creep.prototype.runTransporter = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if the creep is out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // find the gather target for the transporter
            let target = this.getTransporterTarget();

            // if the target is still null or empty
            if (target == null || (target.store != undefined && target.store[RESOURCE_ENERGY] == 0)) {
                // assign a new task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            } else {
                // assign a new gather task
                this.memory.task = new GatherTask(target, RESOURCE_ENERGY);
                // announce the gather task
                this.announceTask();
            }
        } else {
            // if we are in the room of the nearest colony
            if (this.room.name == this.memory.nearest_colony_name) {
                // remove the nearest colony name
                this.memory.nearest_colony_name = null;
                // find a new dump target
                let target = this.getDumpTarget();
                // if a new target was found
                if (target != null) {
                    // assign a new deposit task
                    this.memory.task = new DepositTask(target, RESOURCE_ENERGY);
                    // announce the deposit task
                    this.announceTask();
                } else {
                    // assign a new idle task
                    this.memory.task = new IdleTask(this.memory.room_name, 10);
                    // announce the idle task
                    this.announceTask();
                }
            } else {
                // store the nearest colony name
                this.memory.nearest_colony_name = this.getNearestColony();
                // assign a new MoveRoomTask
                this.memory.task = new MoveRoomTask(this.memory.nearest_colony_name);
                // announce the MoveRoomTask
                this.announceTask();
            }
        }
    }
    // run the task
    NeuroTask.run(this);
};