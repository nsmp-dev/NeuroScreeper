Creep.prototype.builder = function () {	
	if (this.memory.mode == "to_container") {
		let container = Game.getObjectById(this.memory.container);
		if (this.memory.container) {
			if (this.pos.isNearTo(container)) {
				this.memory.mode = "withdrawing";
			}else{
				this.moveTo(container);
				return;
			}
		}else{
			
		}
		
	}

	if (this.memory.mode == "withdrawing") {
		if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
			this.memory.destination = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
			this.memory.mode = "to_destination";
		}else{
			this.withdraw(Game.getObjectById(this.memory.container), RESOURCE_ENERGY);
			return;
		}
	}

	if (this.memory.mode == "to_destination") {
		if (this.memory.destination) {
			let destination = Game.getObjectById(this.memory.destination);
			if (this.pos.isNearTo(destination)){
				this.memory.mode = "building";
			}else{
				this.moveTo(destination);
			}
		}else{
			this.memory.destination = findDestination();
			this.idle();
		}
	}

	if (this.memory.mode == "building") {
		let destination = Game.getObjectById(this.memory.destination);
		if (this.store.getUsedCapacity() == 0){
			this.memory.mode = "to_container";
		} else if (!destination && this.store.getUsedCapacity() > 0) {
			this.memory.destination = findDestination();
			this.memory.mode = "to_destination";
		} else {
			this.build(destination);
			return;
		}
	}
};