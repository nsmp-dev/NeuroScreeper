Creep.prototype.attacker = function () {
	let nearest_enemy = this.room.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

	if (nearest_enemy) {
		if (nearest_enemy.pos.isNearTo(this.pos)) {
			this.attack(nearest_enemy);
		}else{
			if (this.hits < this.hitsMax) {
				this.heal(this);
			}
			this.moveTo(nearest_enemy);
		}
	}else{
		if (this.hits < this.hitsMax) {
			this.heal(this);
		}
		this.idle();
	}
};