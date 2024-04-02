Creep.prototype.bootstrapper = function () {
	if (this.memory.mode == "to_source") {
		//if at assigned source
			//change mode to extracting
		//go to assigned source
	} else if (this.memory.mode == "extracting") {
		//if full
			//change mode to to_destination
			//set assigned destination to nearest extension>spawner>tower>storage
		//work assigned source
	} else if (this.memory.mode == "to_destination") {
		//if at assigned destination
			//change mode to dumping
		//go to assigned destination
	} else if (this.memory.mode == "dumping") {
		//if assigned destination is full and creep is not empty
			//change mode to to_destination
			//set assigned destination to nearest extension>spawner>tower>storage
		//if creep is empty
			//change mode to to_source
		//dump energy into assigned destination
	}
};