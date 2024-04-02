Creep.prototype.repair = function () {
	let findDestination = function(){
		let destinations = this.room.find(FIND_MY_STRUCTURES, { filter: structure =>
			structure.hits < structure.hitsMax });

		destinations.sort(function(a, b){
			return a.hits - b.hits;
		});

		return destinations[0].id;
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
			this.memory.destination = findDestination();
			this.memory.mode = "to_destination";
		}else{
			this.withdraw(Game.getObjectById(this.memory.container), RESOURCE_ENERGY);
			return;
		}
	}
	if (this.memory.mode == "repairing") {
		let destination = Game.getObjectById(this.memory.destination);
		if (this.pos.isNearTo(destination)){
			this.memory.mode = "dumping";
		}else{
			this.moveTo(destination);
		}
	}
	if (this.memory.mode == "repairing") {
		let destination = Game.getObjectById(this.memory.destination);
		if (destination.hits == destination.hitsMax && this.store.getUsedCapacity() > 0){
			this.memory.destination = findDestination();
		} else if (this.store.getUsedCapacity() == 0) {
			this.memory.mode = "to_container";
		} else {
			this.repair(destination);
			return;
		}
	}
};