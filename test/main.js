let Vehicle = require("Vehicle");
let Car = require("Car");

module.exports.loop = function () {
    let my_car = new Car("Mobi", "blue");
    console.log(my_car.color);

    let red_car = Car.makeRedCar("Prius");
    console.log(red_car.color);
};