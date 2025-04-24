// set up the role constants
global.MineralTransporterRole = new Role("mineral_transporter", "💎🚛", [CARRY, MOVE], 100, 25);

// add the role to the roles hash
global.ROLES[MineralTransporterRole.name] = MineralTransporterRole;

/**
 * MineralTransporterMemory class, storing data for a mineral transporter
 * @class MineralTransporterMemory
 */
class MineralTransporterMemory extends CreepMemory{
    /**
     * creates an MineralTransporterMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     * @param {string} mineral_id - The id of the assigned mineral
     * @param {Point} container_location - The location of the assigned container
     * @param {string} resource_type - The type of resource this mineral produces
     */
    constructor(room_name, mineral_id, container_location, resource_type){
        super(MineralTransporterRole.name, room_name);
        /**
         * The id of the assigned mineral
         * @type {string}
         */
        this.mineral = mineral_id;
        /**
         * The location of the assigned container
         * @type {Point}
         */
        this.container_location = container_location;
        /**
         * The type of resource this mineral produces
         * @type {string}
         */
        this.resource_type = resource_type;
        /**
         * cached id of the container
         * @type {string|null}
         */
        this.container_id = null;
    }
}
global.MineralTransporterMemory = MineralTransporterMemory;

/**
 * mineral transporter that moves minerals from the assigned container to storage
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
            }else{
                let target = this.getTransporterTarget();
                if (target != null) {
                    // assign a new gather task
                    this.memory.task = new GatherTask(target, this.memory.resource_type);
                    // announce the gather task
                    this.announceTask();
                }else{
                    // assign a new idle task
                    this.memory.task = new IdleTask(this.memory.room_name, 10);
                    // announce the idle task
                    this.announceTask();
                }
            }
        }else{
            // grab the storage
            let storage = this.room.storage;

            // if the storage is not built or full
            if (storage == undefined || storage.store.getFreeCapacity() == 0) {
                // assign a new idle task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the idle task
                this.announceTask();
            }else{
                // assign a new deposit task
                this.memory.task = new DepositTask(storage, this.memory.resource_type);
                // announce the deposit task
                this.announceTask();
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};