/**
 * PowerSquadPopulation class, an object that contains data for populating a power squad
 * @class PowerSquadPopulation
 */
class PowerSquadPopulation {
    /**
     * Creates a PowerSquadPopulation Object
     */
    constructor() {
        /**
         * the id of the power attacker assigned to this power squad
         * @type {string|null}
         */
        this.power_attacker = null;
        /**
         * the id of the power healer assigned to this power squad
         * @type {string|null}
         */
        this.power_healer = null;
        /**
         * the id of the power transporter assigned to this power squad
         * @type {string|null}
         */
        this.power_transporter = null;
    }
}

// export the PowerSquadPopulation class
global.PowerSquadPopulation = PowerSquadPopulation;