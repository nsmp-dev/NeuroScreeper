/**
 * PowerSquadPopulation class manages the assignment of specialized creeps to a power squad.
 * It tracks which creeps are currently assigned to specific roles within the squad,
 * serving as a data structure for power squad organization and management.
 * @class PowerSquadPopulation
 */
class PowerSquadPopulation {
    /**
     * Creates a new PowerSquadPopulation instance to track creep assignments for a power squad.
     * Initially, all role assignments are null until creeps are assigned to the squad.
     */
    constructor() {
        /**
         * The unique ID of the attacker creep assigned to this power squad.
         * This creep is responsible for doing damage to power banks.
         * @type {string|null}
         */
        this.power_attacker = null;
        /**
         * The unique ID of the healer creep assigned to this power squad.
         * This creep is responsible for keeping the power attacker alive during operations.
         * @type {string|null}
         */
        this.power_healer = null;
        /**
         * The unique ID of the transport creep assigned to this power squad.
         * This creep is responsible for collecting and carrying power resources back to base.
         * @type {string|null}
         */
        this.power_transporter = null;
    }
}

// export the PowerSquadPopulation class
global.PowerSquadPopulation = PowerSquadPopulation;