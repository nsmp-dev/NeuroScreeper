const Colony = require("controller.colony");

// claimer that moves toward the assigned room and either reserves or claims the controller
Creep.prototype.runClaimer = function () {
    let controller = Game.rooms[this.memory.room_name].controller;
    if (Memory.room_data[this.memory.room_name].type == Colony.NAME) {
        if (this.claimController(controller) == ERR_NOT_IN_RANGE) {
            this.moveTo(controller);
        }
    } else {
        if (this.reserveController(controller) == ERR_NOT_IN_RANGE) {
            this.moveTo(controller);
        }
    }
};