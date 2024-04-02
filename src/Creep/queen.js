Creep.prototype.queen = function () {
	if (this.memory.mode == "to_storage") {
		//if at storage
			//change mode to withdrawing
		//go to storage
	} else if (this.memory.mode == "withdrawing") {
		//if full
			//change mode to to_destination
			//set assigned destination to nearest non-full extension>spawner>tower>terminal
		//withdraw from storage
	} else if (this.memory.mode == "to_destination") {
		//if at assigned destination
			//change mode to dumping
		//go to assigned destination
	} else if (this.memory.mode == "dumping") {
		//if assigned destination is full and creep is not empty
			//change mode to to_destination
			//set assigned destination to nearest non-full extension>spawner>tower>terminal
		//if creep is empty
			//change mode to to_storage
		//dump energy into assigned destination
	}
};