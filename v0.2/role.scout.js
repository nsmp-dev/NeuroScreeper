Creep.prototype.runScout = function(){
	if (this.memory.room_queue.length === 0) {
		this.memory.room_queue.push(this.room.name);
	}
	if (this.room.name !== this.memory.room_queue[0]){
		this.moveTo(new RoomPosition(25, 25, this.memory.room_queue[0]))
	}else{
		let exits = Game.map.describeExits(this.room.name);
		let new_rooms = [];
		if (exits[TOP]) {
			new_rooms.push(exits[TOP]);
		}
		if (exits[RIGHT]) {
			new_rooms.push(exits[RIGHT]);
		}
		if (exits[BOTTOM]) {
			new_rooms.push(exits[BOTTOM]);
		}
		if (exits[LEFT]) {
			new_rooms.push(exits[LEFT]);
		}

		let creep = this;
		new_rooms.forEach(function(room_name){
			let found = false;
			creep.memory.room_queue.forEach(function(t_room){
				if (t_room === room_name) {
					found = true;
				}
			});
			creep.memory.room_log.forEach(function(t_room){
				if (t_room === room_name) {
					found = true;
				}
			});
			if (!found) {
				creep.memory.room_queue.push(room_name);
			}
		});
		this.memory.room_log.push(this.memory.room_queue.shift());
	}
};