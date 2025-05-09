/**
 * PowerSquadPopulation class manages the population of creeps in a power squad.
 * @class PowerSquadPopulation
 */
class PowerSquadPopulation {
    /**
     * Creates a new PowerSquadPopulation instance to track creep assignments for a power squad.
     * Initially, all role assignments are null until creeps are found.
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
         * This creep is responsible for collecting and carrying power resources back to the colony.
         * @type {string|null}
         */
        this.power_transporter = null;
    }
}

// export the PowerSquadPopulation class
global.PowerSquadPopulation = PowerSquadPopulation;