Creep.prototype.transporter = function () {
	if (this.memory.mode == "to_container") {
		//if at assigned container
			//change mode to withdrawing
		//go to assigned container
	} else if (this.memory.mode == "withdrawing") {
		//if full
			//change mode to to_destination
			//set assigned destination to nearest extension>spawner>tower>storage>terminal
		//withdraw from assigned container
	} else if (this.memory.mode == "to_destination") {
		//if at assigned destination
			//change mode to dumping
		//go to assigned destination
	} else if (this.memory.mode == "dumping") {
		//if assigned destination is full and creep is not empty
			//change mode to to_destination
			//set assigned destination to nearest extension>spawner>tower>storage>terminal
		//if creep is empty
			//change mode to to_container
		//dump energy into assigned destination
	}
};