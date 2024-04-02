Creep.prototype.claimer = function () {
	if (this.memory.mode == "to_controller") {
		//if at assigned controller
			//change mode to claiming
		//go to assigned controller
	} else if (this.memory.mode == "claiming") {
		//claim controller if room is new_colony
		//reserve controller if room is outpost
	}
};