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
    // if we are full
        // find nearest storage
        // deposit at the nearest storage
    // else we are low
        // pick a highway room
        // move to that room
        // look for any commodities
        // if there are any
            // grab them
        // else
            // pick another highway room to move to
};