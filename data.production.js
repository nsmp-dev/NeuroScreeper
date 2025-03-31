/**
 * Production class, an object that contains all the data for executing a production
 * @class Production
 */
class Production {
    /**
     * creates a production object
     * @param {string[]} inputs - The input resources
     * @param {number[]} input_amounts - The input amounts
     * @param {String} output - The output resource
     * @param {number} output_amount - The amount of resource the production will make
     */
    constructor(inputs, input_amounts, output, output_amount) {
        /**
         * the input resources
         * @type {string[]}
         */
        this.inputs = inputs;
        /**
         * the corresponding input amounts
         * @type {number[]}
         */
        this.input_amounts = input_amounts;
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