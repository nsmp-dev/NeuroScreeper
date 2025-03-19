// Reaction class, an object that contains all the data for executing a reaction
class Reaction {
    // creates a plant data object
    constructor(input_1 = null, input_2 = null, output = null, amount= null) {
        this.input_1 = input_1;
        this.input_2 = input_2;
        this.output = output;
        this.amount = amount;
        this.is_cleanup = (input_1 == null);
    }
}

module.exports = Reaction;