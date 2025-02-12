const Util = require("util");
require('attacker');
require('builder');
require('claimer');
require('driller');
require('harvester');
require('healer');
require('queen');
require('repairer');
require('scout');
require('transporter');
require('upgrader');

Creep.prototype.getQueenDumpTarget = function(){
	let targets = this.room.find(FIND_MY_STRUCTURES, {
		filter: function(structure){ 
			return (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity() > 0);
		},
	});

	if(targets.length == 0){
		targets = this.room.find(FIND_MY_STRUCTURES, {
			filter: function(structure){ 
				return (structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity() > 0);
			},
		});
	}

	if(targets.length == 0){
		targets = this.room.find(FIND_MY_STRUCTURES, {
			filter: function(structure){ 
				return (structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity() > 0);
			},
		});
	}

	if(targets.length == 0){
		targets = this.room.find(FIND_MY_STRUCTURES, {
			filter: function(structure){ 
				return (structure.structureType == STRUCTURE_TERMINAL && structure.store.getFreeCapacity() > 0);
			},
		});
	}

	return this.pos.findClosestByPath(targets);
};

Creep.prototype.getDumpTarget = function(){
	let targets = this.room.find(FIND_MY_STRUCTURES, {
		filter: function(structure){ 
			return (structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity() > 0);
		},
	});

	if(targets.length == 0){
		targets = this.room.find(FIND_MY_STRUCTURES, {
			filter: function(structure){ 
				return (structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity() > 0);
			},
		});
	}

	if(targets.length == 0 && this.room.storage){
		targets = [this.room.storage];
	}

	return this.pos.findClosestByPath(targets);
};

Creep.prototype.getFillTarget = function(){
	let targets = this.room.find(FIND_DROPPED_RESOURCES, { filter: { resourceType: RESOURCE_ENERGY }});

	if (targets.length == 0) {
		targets = this.room.find(FIND_MY_STRUCTURES, {
			filter: function(structure){ 
				return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
			},
		});
	}
	

	if(targets.length == 0 && this.room.storage && this.room.storage.store[RESOURCE_ENERGY] > 0){
		targets = [this.room.storage];
	}

	return this.pos.findClosestByPath(targets);
};

Creep.prototype.getBuildTarget = function(){
	return this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
};

Creep.prototype.getRepairTarget = function(){
	return this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
		filter: function(structure){
			return structure.hits < structure.hitsMax;
		},
	});
};

Creep.prototype.getSourceTarget = function(){
	return this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
};

Creep.prototype.idle = function(){
	let room_data = Memory.room_log[this.room.name];

	if (!this.pos.inRangeTo(room_data.idle_x, room_data.idle_y, 3)){
		this.moveTo(room_data.idle_x, room_data.idle_y);
	}
};

Creep.prototype.run = function(){
	switch (this.memory.role) {
		case Util.ATTACKER:
			this.runAttacker();
			break;
		case Util.BUILDER:
			this.runBuilder();
			break;
		case Util.CLAIMER:
			this.runClaimer();
			break;
		case Util.DRILLER:
			this.runDriller();
			break;
		case Util.HARVESTER:
			this.runHarvester();
			break;
		case Util.HEALER:
			this.runHealer();
			break;
		case Util.QUEEN:
			this.runQueen();
			break;
		case Util.REPAIRER:
			this.runRepairer();
			break;
		case Util.SCOUT:
			this.runScout();
			break;
		case Util.TRANSPORTER:
			this.runTransporter();
			break;
		case Util.UPGRADER:
			this.runUpgrader();
			break;
	}
};