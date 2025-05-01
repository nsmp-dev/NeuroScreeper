/**
 * Represents a production process that transforms input resources into output resources.
 * @class Production
 */
class Production {
    /**
     * Creates a new Production instance defining a specific recipe
     * @param {Object.<string,number>} inputs - A mapping of resource types to their required quantities for production
     * @param {String} output - The type of resource that will be produced
     * @param {number} amount - The quantity of output resource that will be produced
     */
    constructor(inputs, output, amount) {
        /**
         * A key-value mapping of input resource types to their required quantities for the production process
         * @type {Object.<string,number>}
         */
        this.inputs = inputs;
        /**
         * The type of resource that this production process creates as output
         * @type {string}
         */
        this.output = output;
        /**
         * The quantity of output resource that this production process generates when completed
         * @type {number}
         */
        this.amount = amount;
    }
}

// export the Production class
global.Production = Production;