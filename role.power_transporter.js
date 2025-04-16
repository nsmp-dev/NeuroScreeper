/**
 * Power Transporter name, body, and initializer
 * @constant {Object} POWER_TRANSPORTER
 */
global.POWER_TRANSPORTER = {
    // identifying string
    NAME: "power_transporter",
    // emoji for shorthand visuals
    EMOJI: "⚖️",
    // standard body build, can be multiplied arbitrarily to build larger creeps
    BODY: [CARRY, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[POWER_TRANSPORTER.NAME] = POWER_TRANSPORTER;

/**
 * PowerTransporterMemory class, storing data for an attacker
 * @class PowerTransporterMemory
 */
class PowerTransporterMemory extends CreepMemory{
    /**
     * creates an PowerTransporterMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(POWER_TRANSPORTER.NAME, room_name);
    }
}
global.PowerTransporterMemory = PowerTransporterMemory;

Creep.prototype.runPowerTransporter = function () {
    // TODO: if the squad is full
};