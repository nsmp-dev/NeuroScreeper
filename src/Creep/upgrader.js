Creep.prototype.upgrader = function () {
	if (this.memory.mode == "to_container") {
		//if at assigned container
			//change mode to withdrawing
		//go to assigned container
	} else if (this.memory.mode == "withdrawing") {
		//if full
			//change mode to to_destination
		//withdraw from assigned container
	} else if (this.memory.mode == "to_controller") {
		//if at controller
			//change mode to upgrading
		//go to assigned destination
	} else if (this.memory.mode == "upgrading") {
		//if creep is empty
			//change mode to to_container
		//build assigned destination
	}
};