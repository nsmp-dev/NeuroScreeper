/**
 * Production class, an object that contains all the data for executing a production
 * @class Production
 */
class Production {
    /**
     * creates a production object
     * @param {Object} inputs - The input resources
     * @param {String} output - The output resource
     * @param {number} output_amount - The amount of resource the production will make
     */
    constructor(inputs, output, output_amount) {
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
         * The amount of resource the production will make
         * @type {number}
         */
        this.output_amount = output_amount;
    }
}

// exports the Production class
module.exports = Production;