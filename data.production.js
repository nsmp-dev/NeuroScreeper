// Production class, an object that contains all the data for executing a production
class Production {
    // creates a production object
    constructor(inputs = null, output = null, amount = null) {
        this.inputs = inputs;
        this.output = output;
        this.amount = amount;
        this.is_cleanup = (inputs == null);
    }
}

module.exports = Production;