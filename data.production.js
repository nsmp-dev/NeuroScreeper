/**
 * Production class, an object that contains all the data for executing a production
 * @class Production
 */
class Production {
    /**
     * creates a production object
     * @param {Object} inputs - The input resources
     * @param {String} output - The output resource
     */
    constructor(inputs, output) {
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
    }
}

// exports the Production class
global.Production = Production;