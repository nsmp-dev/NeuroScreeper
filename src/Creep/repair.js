Creep.prototype.repair = function () {
	if (this.memory.mode == "to_container") {
		//if at assigned container
			//change mode to withdrawing
		//go to assigned container
	} else if (this.memory.mode == "withdrawing") {
		//if full
			//change mode to to_destination
			//set assigned destination to lowest health structure
		//withdraw from assigned container
	} else if (this.memory.mode == "to_destination") {
		//if at assigned destination
			//change mode to building
		//go to assigned destination
	} else if (this.memory.mode == "repairing") {
		//if assigned destination is full health and creep is not empty
			//change mode to to_destination
			//set assigned destination to lowest health structure
		//if creep is empty
			//change mode to to_container
		//repair assigned destination
	}
};