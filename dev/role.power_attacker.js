/**
 * Power Attacker name, body, and initializer
 * @constant {Object} POWER_ATTACKER
 */
global.POWER_ATTACKER = {
    // identifying string
    NAME: "power_attacker",
    // emoji for shorthand visuals
    EMOJI: "⚖️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [ATTACK, TOUGH, MOVE, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 12,
};
global.ROLES[POWER_ATTACKER.NAME] = POWER_ATTACKER;

/**
 * PowerAttackerMemory class, storing data for an attacker
 * @class PowerAttackerMemory
 */
class PowerAttackerMemory extends CreepMemory{
    /**
     * creates an PowerAttackerMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(POWER_ATTACKER.NAME, room_name);
    }
}
global.PowerAttackerMemory = PowerAttackerMemory;

Creep.prototype.runPowerAttacker = function () {
    // if the squad is not full, idle at home room
    // if the squad is full
        // go to the squad's next room
};