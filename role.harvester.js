const Util = require("my_util");

Creep.prototype.runHarvester = function(){
	if(this.memory.state ===  Util.HARVESTER.HARVESTING){
	    if(this.store.getFreeCapacity() === 0){
	    	this.memory.state = Util.HARVESTER.DUMPING;
	    	this.memory.source_target = null;
	    	this.memory.dumping_target = this.getDumpTarget();
	    }else{
	    	let target = Game.getObjectById(this.memory.source_target);
	    	if (target == null || target.energy === 0) {
	    		this.memory.source_target = this.getSourceTarget();
	    		target = Game.getObjectById(this.memory.source_target);
	    	}

	    	if (this.harvest(target) === ERR_NOT_IN_RANGE) {
	    		this.moveTo(target);
	    	}
	    }
	}
	if(this.memory.state ===  Util.HARVESTER.DUMPING){
		if(this.store[RESOURCE_ENERGY] === 0){
	    	this.memory.state = Util.HARVESTER.HARVESTING;
	    	this.memory.source_target = this.getSourceTarget();
	    	this.memory.dumping_target = null;
	    }else{
	    	let target = Game.getObjectById(this.memory.dumping_target);
	    	if (target == null) {
	    		this.memory.dumping_target = this.getDumpTarget();
	    		target = Game.getObjectById(this.memory.dumping_target);
	    	}

	    	if (this.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
	    		this.moveTo(target);
	    	}
	    }
	}
};