const RoomLog = require("room_log");

if (Memory.room_manager_timer == undefined) {
	Memory.room_manager_timer = this.TIMER_LENGTH;
}

module.exports = {
	run: function(){
		if (Memory.room_manager_timer >= this.TIMER_LENGTH) {
			Memory.room_manager_timer = 0;
		}else{
			Memory.room_manager_timer++;
			return;
		}

		let is_stable = true;
		for (let [name, room] of Object.entries(Game.rooms)) {
			if ((Memory.rooms[name].type == RoomLog.COLONY || Memory.rooms[name].type == RoomLog.EXPANSION) && Memory.rooms[name].satisfied_counter < 100) {
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
						break;
					}
				}
			}else{
				for (let [room_name, room_data] of Object.entries(Memory.rooms)) {
					if (room_data.type == RoomLog.POTENTIAL_COLONY) {
						room_data.type = RoomLog.COLONY;
						break;
					}
				}
			}
		}
	},
};