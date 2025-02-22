const RoomLog = require("my_room_log");

if (Memory.room_manager_timer === undefined) {
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
		for (let name of Game.rooms) {
			if ((Memory.room_log[name].type === RoomLog.COLONY || Memory.room_log[name].type === RoomLog.EXPANSION) && Memory.room_log[name].satisfied_counter < 100) {
				is_stable = false;
			}
		}
		if (is_stable) {
			let colony_count = 0;
			let expansion_count = 0;
			for (let name of Memory.room_log) {
				if (Memory.room_log[name].type === RoomLog.COLONY) {
					colony_count++;
				}
				if (Memory.room_log[name].type === RoomLog.EXPANSION) {
					expansion_count++;
				}
			}

			if (colony_count > expansion_count) {
				for (let name of Memory.room_log) {
					if (Memory.room_log[name].type === RoomLog.POTENTIAL_EXPANSION) {
						Memory.room_log[name].type = RoomLog.EXPANSION;
						break;
					}
				}
			}else{
				for (let name of Memory.room_log) {
					if (Memory.room_log[name].type === RoomLog.POTENTIAL_COLONY) {
						Memory.room_log[name].type = RoomLog.COLONY;
						break;
					}
				}
			}
		}
	},
};