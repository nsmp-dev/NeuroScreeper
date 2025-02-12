const Util = require("util");

Creep.prototype.runHealer = function(){
	let target = Game.getObjectById(this.memory.target);
	if (target == null) {
		this.memory.target = null;
	}
	if (this.memory.target == null) {
		let creeps = this.room.find(FIND_MY_CREEPS, {
			filter: function(creep){
				return creep.hits < creep.hitsMax;
			},
		});
		if (creeps.length > 1) {
			let new_target = this.pos.findClosestByPath(creeps);
			this.memory.target = new_target.id;
		}
	}
	if (this.memory.target != null) {
		let target = Game.getObjectById(this.memory.target);
		if (this.heal(target) == ERR_NOT_IN_RANGE) {
			this.moveTo(target);
		}
	}else{
		Healer.idle();
	}
};