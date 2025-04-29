// set up the role constants
global.CommodityCollectorRole = new Role("commodity_collector", "💰⚖️", [WORK, CARRY, MOVE, MOVE], 250, 12);

// add the role to the roles hash
global.ROLES[CommodityCollectorRole.name] = CommodityCollectorRole;

/**
 * CommodityCollectorMemory class represents memory storage for creeps that collect commodities from deposits in highways.
 * These creeps search for and harvest valuable resources found in highway rooms between sectors.
 * @class CommodityCollectorMemory
 */
class CommodityCollectorMemory extends CreepMemory {
    /**
     * Creates a CommodityCollectorMemory object that manages memory for commodity collector creeps.
     * These creeps specialize in harvesting deposits from highway rooms between sectors.
     * @param {string} room_name - The identifier of the room where this collector will be based
     */
    constructor(room_name) {
        super(CommodityCollectorRole.name, room_name);
        /**
         * Array of visited room names that the collector has previously scouted for deposits.
         * Used to track exploration history and prevent revisiting rooms until a full cycle is completed.
         * @type {string[]}
         */
        this.highway_log = [];
        /**
         * Queue of room names that have not yet been explored for deposits.
         * This array serves as a list of highway rooms awaiting inspection.
         * Once a room is visited, it is removed from this queue and added to the highway_log.
         * @type {string[]}
         */
        this.highway_queue = [];
    }
}

global.CommodityCollectorMemory = CommodityCollectorMemory;

/**
 * Controls behavior of a Commodity Collector creep that systematically explores highway rooms between sectors
 * to find and harvest valuable deposits. When inventory is full, the creep automatically locates and travels
 * to the nearest colony storage to deposit collected resources before resuming exploration and harvesting.
 * @memberOf Creep#
 */
Creep.prototype.runCommodityCollector = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if we are full
        if (this.store.getFreeCapacity() == 0) {
            // find the nearest storage
            let nearest_storage = this.getNearestStorage();
            // if a storage is found
            if (nearest_storage != null) {
                // grab the first resource in the store
                let resource = Object.keys(this.store)[0];
                // assign a new deposit task
                this.memory.task = new DepositTask(nearest_storage, resource, this.store[resource]);
                // announce the deposit task
                this.announceTask();
            } else {
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            }
        } else {
            // grab the deposit in the room
            let deposit = this.pos.findClosestByPath(FIND_DEPOSITS);
            // if a deposit was found
            if (deposit != null) {
                // assign a new harvest task
                this.memory.task = new HarvestTask(this.room.name, deposit);
                // announce the harvest task
                this.announceTask();
            } else {
                // if the highway queue is empty
                if (this.memory.highway_queue.length == 0) {
                    // get all the highways in the game
                    this.memory.highway_queue = util.getHighwayRooms();
                    // clear the highway log
                    this.memory.highway_log = [];
                }
                // if the highway queue is empty
                if (this.memory.highway_queue.length == 0) {
                    // assign a new idle task
                    this.memory.task = new IdleTask(this.room.name);
                    // announce the idle task
                    this.announceTask();
                } else {
                    // shift the highway queue, storing the room name
                    let room_name = this.memory.highway_queue.shift();
                    // push the room onto the highway log
                    this.memory.highway_log.push(room_name);
                    // assign a new move room task
                    this.memory.task = new MoveRoomTask(room_name);
                    // announce the move room task
                    this.announceTask();
                }
            }
        }
    }
    // run the task
    neuro_task.run(this);
};