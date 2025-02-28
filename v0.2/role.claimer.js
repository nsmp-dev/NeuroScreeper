const RoomLog = require("my_room_log");

Creep.prototype.runClaimer = function(){
	let controller = Game.rooms[this.memory.room_name].controller;
	if (Memory.room_log[this.memory.room_name].type == RoomLog.COLONY) {
		if (this.claimController(controller) == ERR_NOT_IN_RANGE) {
			this.moveTo(controller);
		}
	}else{
		if (this.reserveController(controller) == ERR_NOT_IN_RANGE) {
			this.moveTo(controller);
		}
	}
	
};