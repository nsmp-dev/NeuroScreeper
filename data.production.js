/**
 * Production class, an object that contains all the data for executing a production
 * @class Production
 */
class Production {
    /**
     * creates a production object
     * @param {Object} inputs - The input resources
     * @param {String} output - The output resource
     * @param {number} amount - The amount of output resources
     */
    constructor(inputs, output, amount) {
        /**
         * the input resources
         * @type {Object}
         */
        this.inputs = inputs;
        /**
         * The output resource
         * @type {string}
         */
        this.output = output;
        /**
         * The amount of output resources
         * @type {number}
         */
        this.amount = amount;
    }
}

// exports the Production class
global.Production = Production;