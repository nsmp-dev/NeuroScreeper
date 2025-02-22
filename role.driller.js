Creep.prototype.runDriller = function(){
	let source = Game.getObjectById(this.memory.source);
	let container = Game.getObjectById(this.memory.container);

	if (container == null) {
		if (this.harvest(source) === ERR_NOT_IN_RANGE) {
			this.moveTo(source);
		}
	}else{
		if (this.pos.isEqualTo(container)) {
			this.harvest(source);
		}else{
			this.moveTo(container);
		}
	}
};