const Vehicle = require("Vehicle");

class Car extends Vehicle {
    constructor(name, color) {
        super(name);
        this.color = color;
    }

    static makeRedCar(name) {
        return new Car(name, "red");
    }
}

module.exports = Car;