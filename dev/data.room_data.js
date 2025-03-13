const Plans = require("data.plans");

class RoomData {
    construction_timer = 0;
    population_timer = 0;
    constructor(room) {
        this.plans = new Plans(room);
    }
}

module.exports = RoomData;