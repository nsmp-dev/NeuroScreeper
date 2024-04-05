//TODO: overhaul
//1st priority: upgrade controller, if ticks > 1000
//2nd priority: build containers
//3rd priority: upgrade controller

Creep.prototype.bootstrapper = function () {
	let findDestination = function(){
		if (this.controller.ticksToDowngrade < 1000) {
			return {
				id: this.controller.id,
				type: "controller",
			};
		}else{
			let container = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {structureType == "container"});
			if (container) {
				return {
					id: container.id,
					type: "container",
				};
			}else{
				return {
					id: this.controller.id,
					type: "controller",
				};
			}
		}
	};
	
	if (this.memory.mode == "to_source") {
		if (!this.memory.source) {
			this.memory.source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE).id;
		}
		let source = Game.getObjectById(this.memory.source);
		if (this.pos.isNearTo(source)) {
			this.memory.mode = "harvesting";
			this.memory.source = null;
		}else{
			this.moveTo(source);
			return;
		}
	}

	if (this.memory.mode == "harvesting") {
		if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
			this.memory.destination = findDestination();
			this.memory.mode = "to_destination";
		}else{
			this.harvest(Game.getObjectById(this.memory.source));
			return;
		}
	}

	if (this.memory.mode == "to_destination") {
		let destination = Game.getObjectById(this.memory.destination.id);
		if (this.pos.isNearTo(destination)){
			this.memory.mode = "dumping";
		}else{
			this.moveTo(destination);
		}
	}

	if (this.memory.mode == "dumping") {
		if (this.store.getUsedCapacity() == 0) {
			this.memory.mode = "to_source";
			this.memory.destination = null;
		}else{
			if (this.memory.destination.type == "controller") {
				this.upgradeController(this.room.controller);
			}else{
				this.build(Game.getObjectById(this.memory.destination.id));
			}
		}
	}
};