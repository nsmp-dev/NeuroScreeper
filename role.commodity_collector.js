/**
 * Commodity Collector name, body, and initializer
 * @constant {Object} COMMODITY_COLLECTOR
 */
global.COMMODITY_COLLECTOR = {
    // identifying string
    NAME: "commodity_collector",
    // emoji for shorthand visuals
    EMOJI: "⚖️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [WORK, CARRY, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 250,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 12,
};
global.ROLES[COMMODITY_COLLECTOR.NAME] = COMMODITY_COLLECTOR;

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
        super(COMMODITY_COLLECTOR.NAME, room_name);
    }
}
global.CommodityCollectorMemory = CommodityCollectorMemory;

Creep.prototype.runCommodityCollector = function () {
    if (this.memory.task == null) {
        // if we are full
        if (this.store.getFreeCapacity() == 0) {
            // TODO: find nearest storage
            // TODO: deposit at the nearest storage
        }else{
            // TODO: look for any deposits
            // TODO: if there are any
                // TODO: harvest them
            // else
                // TODO: pick a highway room
                // TODO: move to that room
        }
    }
    // run the task
    TaskRunner.run(this);

};