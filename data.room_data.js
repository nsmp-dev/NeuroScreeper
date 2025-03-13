const Plans = require("data.plans");
const Colony = require("controller.colony");
const Expansion = require("controller.expansion");

class RoomData {
    type = null;
    construction_timer = 0;
    population_timer = 0;
    satisfaction_log = [];
    satisfied = false;
    dead = false;
    requested_creeps = [];
    plans = new Plans();
    possible_colony = null;
    possible_expansion = null;

    constructor(room) {
        this.possible_colony = Colony.testRoom(room);
        this.possible_expansion = Expansion.testRoom(room);
    }
}

module.exports = RoomData;