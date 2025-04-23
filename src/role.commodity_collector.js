global.CommodityCollectorRole = new Role("commodity_collector", "💰⚖️", [WORK, CARRY, MOVE, MOVE], 250, 12);

global.ROLES[CommodityCollectorRole.name] = CommodityCollectorRole;

/**
 * CommodityCollectorMemory class, storing data for an attacker
 * @class CommodityCollectorMemory
 */
class CommodityCollectorMemory extends CreepMemory{
    /**
     * creates an CommodityCollectorMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(CommodityCollectorRole.name, room_name);
        /**
         * stores the rooms that have already been visited
         * @type {string[]}
         */
        this.highway_log = [];
        /**
         * stores the rooms that need to be visited
         * @type {string[]}
         */
        this.highway_queue = [];
    }
}
global.CommodityCollectorMemory = CommodityCollectorMemory;

Creep.prototype.runCommodityCollector = function () {
    if (this.memory.task == null) {
        // if we are full
        if (this.store.getFreeCapacity() == 0) {
            let nearest_storage = this.getNearestStorage();
            if (nearest_storage != null) {
                let resource = Object.keys(this.store)[0];
                this.memory.task = new DepositTask(nearest_storage, resource, this.store[resource]);
            }else{
                this.memory.task = new IdleTask(this.room.name);
            }
        }else{
            let deposit = this.pos.findClosestByPath(FIND_DEPOSITS);
            if (deposit != null) {
                this.memory.task = new HarvestTask(this.room.name, deposit);
            }else{
                if (this.memory.highway_queue.length == 0) {
                    this.memory.highway_queue = Util.getHighwayRooms();
                    this.memory.highway_log = [];
                }
                if (this.memory.highway_queue.length == 0) {
                    this.memory.task = new IdleTask(this.room.name);
                }else{
                    let room_name = this.memory.highway_queue.shift();
                    this.memory.highway_log.push(room_name);
                    this.memory.task = new MoveRoomTask(room_name);
                }
            }
        }
    }
    // run the task
    TaskRunner.run(this);

};