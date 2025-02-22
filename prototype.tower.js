StructureTower.prototype.TIMER_LENGTH = 10;
StructureTower.prototype.run = function(){
	if (this.store[RESOURCE_ENERGY] < 100) {
		return;
	}

	let creeps = this.room.find(FIND_CREEPS);
	let targets = [];

	// attack hostiles
	for (let i = 0; i < creeps.length; i++) {
		if (!creeps[i].my && creeps[i].hits > 0) {
			targets.push(creeps[i]);
		}
	}

	if (targets.length > 0) {
		targets.sort(function(a, b){
			return a.hits - b.hits;
		});
		this.attack(targets[0]);
		return;
	}

	// heal friendlies
	for (let i = 0; i < creeps.length; i++) {
		if (creeps[i].my && creeps[i].hits < creeps[i].hitsMax) {
			targets.push(creeps[i]);
		}
	}

	if (targets.length > 0) {
		//find lowest % health
		targets.sort(function(a, b){
			return (a.hits/a.hitsMax) - (b.hits/b.hitsMax);
		});
		this.heal(targets[0]);
		return;
	}
		
	let structures = this.room.find(FIND_MY_STRUCTURES);

	// heal non-road, non-rampart structures
	for (let i = 0; i < structures.length; i++) {
		if (structures[i].structureType !== STRUCTURE_ROAD &&
			structures[i].structureType !== STRUCTURE_RAMPART &&
			structures[i].hits < structures[i].hitsMax) {
			targets.push(structures[i]);
		}
	}

	if (targets.length > 0) {
		//find lowest % health
		targets.sort(function(a, b){
			//double check direction
			return (a.hits/a.hitsMax) - (b.hits/b.hitsMax);
		});
		this.repair(targets[0]);
		return;
	}

	// repair roads
	for (let i = 0; i < structures.length; i++) {
		if (structures[i].structureType === STRUCTURE_ROAD &&
			structures[i].hits < structures[i].hitsMax) {
			targets.push(structures[i]);
		}
	}

	if (targets.length > 0) {
		//find lowest % health
		targets.sort(function(a, b){
			return a.hits - b.hits;
		});
		this.repair(targets[0]);
	}

	// repair ramparts
	for (let i = 0; i < structures.length; i++) {
		if (structures[i].structureType === STRUCTURE_RAMPART &&
			structures[i].hits < structures[i].hitsMax) {
			targets.push(structures[i]);
		}
	}

	if (targets.length > 0) {
		//find lowest % health
		targets.sort(function(a, b){
			return a.hits - b.hits;
		});
		this.repair(targets[0]);
	}
};