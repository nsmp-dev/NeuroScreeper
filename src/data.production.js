/**
 * Production class, an object that contains all the data for executing a production
 * @class Production
 */
class Production {
    /**
     * creates a production object
     * @param {Object<string,number>} inputs - The input resources
     * @param {String} output - The output resource
     * @param {number} amount - The amount of output resources
     */
    constructor(inputs, output, amount) {
        /**
         * the input resources
         * @type {Object<string,number>}
         */
        this.inputs = inputs;
        /**
         * The output resource
         * @type {string}
         */
        this.output = output;
        /**
         * The number of output resources
         * @type {number}
         */
        this.amount = amount;
    }
}

// export the Production class
global.Production = Production;