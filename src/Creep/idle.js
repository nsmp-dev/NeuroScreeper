Creep.prototype.idle = function () {
	if (!this.pos.inRangeTo(this.room.memory.idle_x, this.room.memory.idle_y, 3)) {
		this.moveTo(this.room.memory.idle_x, this.room.memory.idle_y);
	}
};