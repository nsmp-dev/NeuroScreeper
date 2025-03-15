const Plans = require("data.plans");
const Colony = require("controller.colony");
const Expansion = require("controller.expansion");
const Plant = require("./dev/controller.plant");

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
    possible_capitol = null;
    plant_data = null;

    constructor(room) {
        room.planRoom(this.plans);
        this.possible_colony = Colony.testRoom(this.plans);
        this.possible_expansion = Expansion.testRoom(this.plans);
        // TODO: replace with test for capitol in v0.3
        this.possible_capitol = false;
        if (this.possible_capitol) {
            this.plant_data = Plant.initialize(room);
        }
    }
}

module.exports = RoomData;