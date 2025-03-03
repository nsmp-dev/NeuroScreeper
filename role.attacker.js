// attacker that attacks hostile creeps in the room
Creep.prototype.runAttacker = function(){
	if (this.memory.target == undefined) {
		this.memory.target = null;
	}
	let target = Game.getObjectById(this.memory.target);
	if (target == null) {
		this.memory.target = null;
	}
	if (this.memory.target == null) {
		let creeps = this.room.find(FIND_HOSTILE_CREEPS);
		if (creeps.length > 0) {
			let new_target = this.pos.findClosestByPath(creeps);
			this.memory.target = new_target.id;
		}
	}
	if (this.memory.target != null) {
		let target = Game.getObjectById(this.memory.target);
		if (this.attack(target) == ERR_NOT_IN_RANGE) {
			this.moveTo(target);
		}
	}else{
		this.idle();
	}
};