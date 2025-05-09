/**
 * Holds references to the creeps in a PowerSquad for passing between functions
 * @class PowerSquadCreeps
 */
class PowerSquadCreeps {
    /**
     * creates a PowerSquadCreeps object
     * @param {Creep} power_attacker - the power attacker
     * @param {Creep} power_healer - the power healer
     * @param {Creep} power_transporter - the power transporter
     */
    constructor(power_attacker, power_healer, power_transporter) {
        /**
         * the power attacker
         * @type {Creep}
         */
        this.power_attacker = power_attacker;
        /**
         * the power healer
         * @type {Creep}
         */
        this.power_healer = power_healer;
        /**
         * the power transporter
         * @type {Creep}
         */
        this.power_transporter = power_transporter;
    }
}

// export the PowerSquadCreeps class
global.PowerSquadCreeps = PowerSquadCreeps;