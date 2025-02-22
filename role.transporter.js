const Util = require("my_util");

Creep.prototype.runTransporter = function(){
	if(this.memory.state ===  Util.TRANSPORTER.FILLING){
	    if(this.store.getFreeCapacity() === 0){
	    	this.memory.state = Util.TRANSPORTER.DUMPING;
	    	this.memory.dumping_target = this.getDumpTarget();
	    }else{
	    	let container = Game.getObjectById(this.memory.container);

	    	if (container != null) {
				if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
		        	this.moveTo(container);
		        }
	    	}	
	    }
	}
	if(this.memory.state ===  Util.TRANSPORTER.DUMPING){
		if(this.store[RESOURCE_ENERGY] === 0){
	    	this.memory.state = Util.TRANSPORTER.FILLING;
	    	this.memory.dumping_target = null;
	    }else{
	    	let target = Game.getObjectById(this.memory.dumping_target);
	    	if (target == null) {
	    		this.memory.dumping_target = this.getDumpTarget();
	    		target = Game.getObjectById(this.memory.dumping_target);
	    	}

	    	if (this.build(target) === ERR_NOT_IN_RANGE) {
	    		this.moveTo(target);
	    	}
	    }
	}
};