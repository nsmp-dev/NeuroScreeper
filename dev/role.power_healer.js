/**
 * Power Healer name, body, and initializer
 * @constant {Object} POWER_HEALER
 */
global.POWER_HEALER = {
    // identifying string
    NAME: "power_healer",
    // emoji for shorthand visuals
    EMOJI: "⚖️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [HEAL, TOUGH, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 360,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 12,
};
global.ROLES[POWER_HEALER.NAME] = POWER_HEALER;

/**
 * PowerHealerMemory class, storing data for an attacker
 * @class PowerHealerMemory
 */
class PowerHealerMemory extends CreepMemory{
    /**
     * creates an PowerHealerMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(POWER_HEALER.NAME, room_name);
    }
}
global.PowerHealerMemory = PowerHealerMemory;

Creep.prototype.runPowerHealer = function () {
    // if the squad is full
        // follow the squad's power attacker
        // heal the attacker
    // else
        // idle
};