const Util = require('global.util');

StructureObserver.prototype.run = function(){
	if (Memory.observer_log == undefined) {
		Memory.observer_log = {};
	}

	if (Memory.observer_log[this.room.name] == undefined) {
		let room_coords = Util.roomNameToWorldXY(this.room.name)
		Memory.observer_log[this.room.name] = {
			min_x: room_coords.x - 10,
			min_y: room_coords.y - 10,
			max_x: room_coords.x + 10,
			max_y: room_coords.y + 10,
			current_x: room_coords.x - 10,
			current_y: room_coords.y - 10,
		};
	}


	let log = Memory.observer_log[this.room.name];
	this.observeRoom(Util.worldXYToRoomName(log.current_x, log.current_y));
	log.current_x++;
	if (log.current_x >= log.max_x) {
		log.current_x = log.min_x;
		log.current_y++;
	}
	if (log.current_y >= log.max_y) {
		log.current_y = log.min_y;
	}
};