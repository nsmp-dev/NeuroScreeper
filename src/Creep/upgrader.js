Creep.prototype.upgrader = function () {
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
			this.memory.mode = "to_controller";
		}else{
			this.withdraw(Game.getObjectById(this.memory.container), RESOURCE_ENERGY);
			return;
		}
	}
	if (this.memory.mode == "to_controller") {
		if (this.pos.isNearTo(this.room.controller)){
			this.memory.mode = "upgrading";
		}else{
			this.moveTo(this.room.controller);
		}
	}
	if (this.memory.mode == "upgrading") {
		if (this.store.getUsedCapacity() == 0) {
			this.memory.mode = "to_container";
		} else {
			this.upgradeController(this.room.controller);
			return;
		}
	}
};