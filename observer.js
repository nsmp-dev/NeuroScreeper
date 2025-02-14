StructureObserver.prototype.TIMER_LENGTH = 10;

StructureObserver.prototype.run = function(){
	if (this.memory.timer == undefined) {
		this.memory.timer = 0;
	}

	if (this.memory.timer >= this.TIMER_LENGTH) {
		this.memory.timer = 0;
	}else{
		this.memory.timer++;
		return;
	}

	if (Memory.this_x == undefined) {
		let size = Game.map.getWorldSize();
		Memory.this_x = 0;
		Memory.this_y = 0;
	}
	this.observeRoom(Util.worldXYToRoomName(Memory.this_x, Memory.this_y));
	Memory.this_x++;
	if (Memory.this_x >= Game.map.getWorldSize()) {
		Memory.this_x = 0;
		Memory.this_y++;
	}
	if (Memory.this_y >= Game.map.getWorldSize()) {
		Memory.this_x = 0;
		Memory.this_y = 0;
	}
};