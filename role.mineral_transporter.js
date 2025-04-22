/**
 * Mineral Transporter name, body, and initializers
 * @constant {Object} MINERAL_TRANSPORTER
 */
global.MINERAL_TRANSPORTER = {
    // identifying string
    NAME: "mineral_transporter",
    // emoji for shorthand visuals
    EMOJI: "💎🚛",
    // standard body build that can be multiplied arbitrarily to build larger creeps
    BODY: [CARRY, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[MINERAL_TRANSPORTER.NAME] = MINERAL_TRANSPORTER;

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
        super(MINERAL_TRANSPORTER.NAME, room_name);
        /**
         * type of task being created
         * @type {string}
         */
        this.mineral = mineral_id;
        /**
         * type of task being created
         * @type {Point}
         */
        this.container_location = container_location;
        /**
         * type of task being created
         * @type {string}
         */
        this.resource_type = resource_type;
        /**
         * type of task being created
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
        // assign a new task
        if (this.store.getUsedCapacity() == 0) {
            // grab the target
            let target = this.getTransporterTarget();

            // if the target is still null or empty
            if (target == null || (target.store != undefined && target.store.getUsedCapacity() == 0)) {
                // assign a new task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }else{
                // assign a new task
                this.memory.task = new GatherTask(target, this.memory.resource_type);
                // announce the new task
                this.announceTask();
            }
        }else{
            // if we are in the room of the nearest colony
            if (this.room.name == this.getNearestColony()) {
                // find a new dump target
                let storage = this.room.storage;
                // if a new target was found
                if (storage != null) {
                    // assign a new task
                    this.memory.task = new DepositTask(storage, RESOURCE_ENERGY);
                    // announce the new task
                    this.announceTask();
                }else{
                    // assign a new task
                    this.memory.task = new IdleTask(this.memory.room_name, 10);
                    // announce the new task
                    this.announceTask();
                }
            }else{
                // assign a new task
                this.memory.task = new MoveRoomTask(this.getNearestColony());
                // announce the new task
                this.announceTask();
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};