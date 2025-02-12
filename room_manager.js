const RoomLog = require("room_log");

module.exports = {
	run: function(){
		let is_stable = true;
		for (let [name, room] of Object.entries(Game.rooms)) {
			if (Memory.rooms[name].satisfied_counter < 100) {
				is_stable = false;
			}
		}
		if (is_stable) {
			let colony_count = 0;
			let expansion_count = 0;
			for (let [room_name, room_data] of Object.entries(Memory.rooms)) {
				if (room_data.type == RoomLog.COLONY) {
					colony_count++;
				}
				if (room_data.type == RoomLog.EXPANSION) {
					expansion_count++;
				}
			}

			if (colony_count > expansion_count) {
				for (let [room_name, room_data] of Object.entries(Memory.rooms)) {
					if (room_data.type == RoomLog.POTENTIAL_EXPANSION) {
						room_data.type = RoomLog.EXPANSION;
					}
				}
			}else{
				for (let [room_name, room_data] of Object.entries(Memory.rooms)) {
					if (room_data.type == RoomLog.POTENTIAL_COLONY) {
						room_data.type = RoomLog.COLONY;
					}
				}
			}
		}
	},
};