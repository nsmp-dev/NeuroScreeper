/**
 * Production class, an object that contains all the data for executing a production
 * @class Production
 */
class Production {
    /**
     * creates a production object
     * @param {string[]|null} inputs - The input resources
     * @param {string[]|null} input_amounts - The input resources
     * @param {String|null} output - The output resource
     * @param {number|null} output_amount - The amount of resource the production will make
     */
    constructor(inputs = null, input_amounts = null, output = null, output_amount = null) {
        this.inputs = inputs;
        this.input_amounts = input_amounts;
        this.output = output;
        this.output_amount = output_amount;
    }
}

module.exports = Production;