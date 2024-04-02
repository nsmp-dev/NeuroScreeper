Creep.prototype.builder = function () {
	let findDestination = function(){
		let destination = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);

		return destination.id;
	};
	
	if (this.memory.mode == "to_container") {
		let container = Game.getObjectById(this.memory.container);
		if (this.pos.isNearTo(container)) {
			this.memory.mode = "withdrawing";
		}else{
			this.moveTo(container);
			return;
		}
	}
	if (this.memory.mode == "withdrawing") {
		if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
			this.memory.destination = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES).id;
			this.memory.mode = "to_destination";
		}else{
			this.withdraw(Game.getObjectById(this.memory.container), RESOURCE_ENERGY);
			return;
		}
	}
	if (this.memory.mode == "to_destination") {
		let destination = Game.getObjectById(this.memory.destination);
		if (this.pos.isNearTo(destination)){
			this.memory.mode = "building";
		}else{
			this.moveTo(destination);
		}
	}
	if (this.memory.mode == "building") {
		let destination = Game.getObjectById(this.memory.destination);
		if (!destination && this.store.getUsedCapacity() > 0){
			this.memory.destination = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES).id;
		} else if (this.store.getUsedCapacity() == 0) {
			this.memory.mode = "to_container";
		} else {
			this.build(destination);
			return;
		}
	}
};