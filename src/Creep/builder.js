Creep.prototype.builder = function () {
	if (this.memory.mode == "to_container") {
		//if at assigned container
			//change mode to withdrawing
		//go to assigned container
	} else if (this.memory.mode == "withdrawing") {
		//if full
			//change mode to to_destination
			//set assigned destination to nearest unfinished construction site
		//withdraw from assigned container
	} else if (this.memory.mode == "to_destination") {
		//if at assigned destination
			//change mode to building
		//go to assigned destination
	} else if (this.memory.mode == "building") {
		//if assigned destination is done and creep is not empty
			//change mode to to_destination
			//set assigned destination to nearest unfinished construction site
		//if creep is empty
			//change mode to to_container
		//build assigned destination
	}
};