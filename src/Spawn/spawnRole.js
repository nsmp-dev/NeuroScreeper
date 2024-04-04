const util = require('./src/util.js');

const BODYPART_VALUES = {
	"tough": 0,
	"claim": 1,
	"work": 2,
	"carry": 3,
	"move": 4,
	"attack": 5,
	"ranged_attack": 6,
	"heal": 7,
};

let calcCost = function(parts){
	let total = 0;

	parts.forEach(function(part){
		total += BODYPART_COST[part];
	});
	return total;
};

StructureSpawn.prototype.spawnRole = function (memory) {
	let parts = [];
	let energy = this.room.energyAvailable;

	if (memory.role == "attacker") {
		parts.push(ATTACK);
		parts.push(MOVE);

		if (calcCost(parts) > energy) {
			return null;
		}

		while (true) {
			if (calcCost(parts.concat([ATTACK, MOVE])) <= energy) {
				parts.push(ATTACK);
				parts.push(MOVE);
			}else{
				break;
			}

			if (calcCost(parts.concat([TOUGH, MOVE])) <= energy) {
				parts.push(TOUGH);
				parts.push(MOVE);
			}else{
				break;
			}

			if (calcCost(parts.concat([HEAL, MOVE])) <= energy) {
				parts.push(HEAL);
				parts.push(MOVE);
			}else{
				break;
			}
		}
	}else if (memory.role == "bootstrapper" || memory.role == "builder" || memory.role == "repair" || memory.role == "upgrader"){
		parts.push(WORK);
		parts.push(MOVE);
		parts.push(CARRY);
		parts.push(MOVE);

		if (calcCost(parts) > energy) {
			return null;
		}

		while (true) {
			if (calcCost(parts.concat([WORK, MOVE, CARRY, MOVE])) <= energy) {
				parts.push(WORK);
				parts.push(MOVE);
				parts.push(CARRY);
				parts.push(MOVE);
			}else{
				break;
			}
		}
	}else if (memory.role == "claimer"){
		parts.push(CLAIM);
		parts.push(MOVE);

		if (calcCost(parts) > energy) {
			return null;
		}
	}else if (memory.role == "driller"){
		parts.push(WORK);
		parts.push(MOVE);

		if (calcCost(parts) > energy) {
			return null;
		}

		while (true) {
			if (parts.length < 8 && calcCost(parts.concat([WORK, MOVE])) <= energy) {
				parts.push(WORK);
				parts.push(MOVE);
			}else{
				break;
			}
		}
	}else if (memory.role == "queen" || memory.role == "transporter"){
		parts.push(CARRY);
		parts.push(MOVE);

		if (calcCost(parts) > energy) {
			return null;
		}

		while (true) {
			if (calcCost(parts.concat([CARRY, MOVE])) <= energy) {
				parts.push(CARRY);
				parts.push(MOVE);
			}else{
				break;
			}
		}
	}else if (memory.role == "scout"){
		parts.push(MOVE);

		if (calcCost(parts) > energy) {
			return null;
		}

		while (true) {
			if (parts.length < 10 && calcCost(parts.concat([MOVE])) <= energy) {
				parts.push(MOVE);
			}else{
				break;
			}
		}
	}

	parts.splice(50);
	parts.sort(function(a,b){
		return BODYPART_VALUES[a] - BODYPART_VALUES[b];
	});

	this.spawnCreep(parts, util.generateName(memory.role), { memory: memory });
	return calcCost(parts);
};