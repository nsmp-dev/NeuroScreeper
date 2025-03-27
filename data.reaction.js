/**
 * Reaction class, an object that contains all the data for executing a reaction
 * @class Reaction
 * @classDesc Holds the stored data for a reaction in a factory.
 */
class Reaction {
    /**
     * creates a reaction object
     * @param {string|null} input_1 - The first input resource
     * @param {string|null} input_2 - The second input resource
     * @param {String|null} output - The output resource
     * @param {number|null} amount - The amount of resource the production will use and make
     */
    constructor(input_1 = null, input_2 = null, output = null, amount= null) {
        this.input_1 = input_1;
        this.input_2 = input_2;
        this.output = output;
        this.amount = amount;
    }
}

module.exports = Reaction;