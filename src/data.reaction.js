/**
 * Reaction class, an object that contains all the data for executing a reaction
 * @class Reaction
 */
class Reaction {
    /**
     * creates a reaction object
     * @param {string} input_1 - The first reagent resource
     * @param {string} input_2 - The second reagent resource
     * @param {String} output - The output product resource
     * @param {number} amount - The amount of resource the production will use and make
     */
    constructor(input_1, input_2, output, amount) {
        /**
         * The first reagent resource
         * @type {string}
         */
        this.input_1 = input_1;
        /**
         * The second reagent resource
         * @type {string}
         */
        this.input_2 = input_2;
        /**
         * The output product resource
         * @type {string}
         */
        this.output = output;
        /**
         * The amount of resource the production will use and make
         * @type {number}
         */
        this.amount = amount;
    }
}

// exports the Reaction class
global.Reaction = Reaction;