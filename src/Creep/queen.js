Creep.prototype.queen = function () {
	let findDestination = function(){
		let destination = this.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: structure =>
			structure.structureType == STRUCTURE_EXTENSION &&
			structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 });

		if (!destination) {
			destination = this.pos.findClosestByPath(FIND_MY_SPAWNS, { filter: spawn =>
				spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0 });

			if (!destination) {
				destination = this.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: tower =>
					tower.structureType == STRUCTURE_TOWER &&
					tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0 });
				
				if (!destination) {
					destination = this.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: terminal =>
						terminal.structureType == STRUCTURE_TERMINAL });
				}
			}
		}

		return destination.id;
	};
	
	if (this.memory.mode == "to_storage") {
		if (this.pos.isNearTo(this.room.storage)) {
			this.memory.mode = "withdrawing";
		}else{
			this.moveTo(container);
			return;
		}
	}
	if (this.memory.mode == "withdrawing") {
		if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
			this.memory.destination = findDestination();
			this.memory.mode = "to_destination";
		}else{
			this.withdraw(Game.getObjectById(this.memory.container), RESOURCE_ENERGY);
			return;
		}
	}
	if (this.memory.mode == "to_destination") {
		let destination = Game.getObjectById(this.memory.destination);
		if (this.pos.isNearTo(destination)){
			this.memory.mode = "dumping";
		}else{
			this.moveTo(destination);
		}
	}
	if (this.memory.mode == "dumping") {
		let destination = Game.getObjectById(this.memory.destination);
		if (destination.store.getFreeCapacity() == 0 && this.store.getUsedCapacity() > 0){
			this.memory.destination = findDestination();;
		} else if (this.store.getUsedCapacity() == 0) {
			this.memory.mode = "to_storage";
		} else {
			this.transfer(destination, RESOURCE_ENERGY);
			return;
		}
	}
};