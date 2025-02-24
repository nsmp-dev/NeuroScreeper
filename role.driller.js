Creep.prototype.runDriller = function(){
	if (this.pos.isEqualTo(this.memory.container_x, this.memory.container_y)) {
		this.harvest(Game.getObjectById(this.memory.source));
	}else{
		this.moveTo(this.memory.container_x, this.memory.container_y);
	}
};