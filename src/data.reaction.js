/**
 * Represents a chemical reaction process in the game that combines two input resources to create a new resource.
 * This class maintains the relationship between reagents and their resulting product.
 * @class Reaction
 */
class Reaction {
    /**
     * Creates a new Reaction instance defining a specific chemical transformation process
     * @param {string} input_1 - The resource type of the first reagent required for the reaction
     * @param {string} input_2 - The resource type of the second reagent required for the reaction
     * @param {String} output - The resource type that will be produced from the reaction
     * @param {number} amount - The quantity of resources involved in the reaction (both inputs consumed and output produced)
     */
    constructor(input_1, input_2, output, amount) {
        /**
         * The resource type identifier for the first reagent required in the reaction
         * @type {string}
         */
        this.input_1 = input_1;
        /**
         * The resource type identifier for the second reagent required in the reaction
         * @type {string}
         */
        this.input_2 = input_2;
        /**
         * The resource type identifier for the product created by this reaction
         * @type {string}
         */
        this.output = output;
        /**
         * The quantity of resources that will be consumed from each input and produced as output
         * @type {number}
         */
        this.amount = amount;
    }
}

// export the Reaction class
global.Reaction = Reaction;