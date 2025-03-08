const Colony = require("controller.colony");

// claimer that moves toward the assigned room and either reserves or claims the controller
Creep.prototype.runClaimer = function () {
    // if we are not in the assigned room
    if (this.room.name != this.memory.room_name) {
        // move to the assigned room
        this.moveTo(new RoomPosition(25, 25, this.memory.room_name));
    }else{
        // grab the controller
        let controller = this.room.controller;
        // if this room is a colony
        if (Memory.room_data[this.memory.room_name].type == Colony.NAME) {
            // if claiming the controller results in not being in range
            if (this.claimController(controller) == ERR_NOT_IN_RANGE) {
                // move toward the controller
                this.moveTo(controller);
            }
        } else {
            // if reserving the controller results in not being in range
            if (this.reserveController(controller) == ERR_NOT_IN_RANGE) {
                // move toward the controller
                this.moveTo(controller);
            }
        }
    }
};