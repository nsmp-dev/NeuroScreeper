Creep.prototype.driller = function () {
	if (this.memory.mode == "drilling") {
		this.harvest(Game.getObjectById(this.memory.source));
	}else if (this.memory.mode == "to_source") {
		let container = Game.getObjectById(this.memory.container);
		if (this.pos.isEqualTo(container)) {
			this.memory.mode = "extracting";
		}else{
			this.moveTo(container);
			return;
		}
	}
};