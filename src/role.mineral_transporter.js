// set up the role constants
global.MineralTransporterRole = new Role("mineral_transporter", "💎🚛", [CARRY, MOVE], 100, 25);

// add the role to the roles hash
global.ROLES[MineralTransporterRole.name] = MineralTransporterRole;

/**
 * MineralTransporterMemory class represents the memory structure for creeps that transport minerals.
 * It stores data needed for mineral transportation including source mineral ID, container locations,
 * and resource types. This class extends CreepMemory to manage specialized mineral hauling creeps.
 * @class MineralTransporterMemory
 */
class MineralTransporterMemory extends CreepMemory {
    /**
     * Creates a new MineralTransporterMemory instance to manage transportation of minerals for a creep.
     * This constructor initializes the memory structure needed for mining operations.
     * @param {string} room_name - The identifier of the room where the transporter creep will operate
     * @param {string} mineral_id - The unique identifier of the mineral deposit this creep is assigned to transport from
     * @param {Point} container_location - The coordinates of the container where minerals are stored and collected from
     * @param {string} resource_type - The specific type of mineral resource (e.g., H, O, K, etc.) that will be transported
     */
    constructor(room_name, mineral_id, container_location, resource_type) {
        super(MineralTransporterRole.name, room_name);
        /**
         * The unique identifier (ID) of the assigned mineral deposit that this transporter creep will collect from.
         * This ID is used to locate and track the specific mineral resource in the game world.
         * @type {string}
         */
        this.mineral = mineral_id;
        /**
         * The coordinates (x, y) of the container designated for mineral collection and storage.
         * This point indicates the exact position where the transporter should pick up minerals.
         * @type {Point}
         */
        this.container_location = container_location;
        /**
         * The specific type of mineral resource this transporter is designated to collect and transport.
         * Valid values include game-defined mineral types such as 'H' (Hydrogen), 'O' (Oxygen), etc.
         * @type {string}
         */
        this.resource_type = resource_type;
        /**
         * Cached unique identifier for the container where minerals are stored. This ID is used
         * to quickly access the container structure without having to search through the game objects.
         * Container IDs remain stable until the structure is destroyed and rebuilt.
         * @type {string|null}
         */
        this.container_id = null;
    }
}

global.MineralTransporterMemory = MineralTransporterMemory;

/**
 * A specialized creep that manages the transportation of minerals between containers and storage facilities.
 * It monitors container levels at mining sites, collects minerals when containers have sufficient resources,
 * and efficiently transfers them to the room's main storage structure for long-term storage and future use.
 * @memberOf Creep#
 */
Creep.prototype.runMineralTransporter = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if the store is empty
        if (this.store.getUsedCapacity() == 0) {
            if (this.room.name != this.memory.room_name) {
                // assign a new move room task
                this.memory.task = new MoveRoomTask(this.memory.room_name);
                // announce the move room task
                this.announceTask();
            } else {
                let target = this.getTransporterTarget();
                if (target != null) {
                    // assign a new gather task
                    this.memory.task = new GatherTask(target, this.memory.resource_type);
                    // announce the gather task
                    this.announceTask();
                } else {
                    // assign a new idle task
                    this.memory.task = new IdleTask(this.memory.room_name, 10);
                    // announce the idle task
                    this.announceTask();
                }
            }
        } else {
            // grab the storage
            let storage = this.room.storage;

            // if the storage is not built or full
            if (storage == undefined || storage.store.getFreeCapacity() == 0) {
                // assign a new idle task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the idle task
                this.announceTask();
            } else {
                // assign a new deposit task
                this.memory.task = new DepositTask(storage, this.memory.resource_type);
                // announce the deposit task
                this.announceTask();
            }
        }
    }
    // run the task
    neuro_task.run(this);
};