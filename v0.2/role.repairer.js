const Util = require("my_util");

Creep.prototype.runRepairer = function(){
	if(this.memory.state ===  Util.REPAIRER.FILLING){
        if(this.store.getFreeCapacity() === 0){
        	this.memory.state = Util.REPAIRER.REPAIRING;
        	this.memory.filling_target = null;
        	let new_target = this.getRepairTarget();
        	if (new_target != null) {
        	    this.memory.repairing_target = new_target.id;
        	}
        }else{
        	let target = Game.getObjectById(this.memory.filling_target);
        	if (target == null) {
	    		target = this.getFillTarget();
	    		if (target !== null) {
	    		    this.memory.filling_target = target.id;
	    		}
	    	}

        	if (target != null) {
        	    if (target instanceof Resource) {
        	        if (this.pickup(target) === ERR_NOT_IN_RANGE) {
    		        	this.moveTo(target);
    		        }
        	    }else{
        	        if (this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    		        	this.moveTo(target);
    		        }
        	    }
        	}
        }
    }
    if(this.memory.state ===  Util.REPAIRER.REPAIRING){
    	if(this.store[RESOURCE_ENERGY] === 0){
        	this.memory.state = Util.REPAIRER.FILLING;
        	let new_target = this.getFillTarget();
        	if (new_target != null) {
        	    this.memory.filling_target = new_target.id;
        	}
        	this.memory.repairing_target = null;
        }else{
        	let target = Game.getObjectById(this.memory.repairing_target);
        	if (target == null) {
				target = this.getRepairTarget();
				if (target != null) {
				    this.memory.repairing_target = target.id;
				}
        	}

            if (target != null) {
            	if (this.repair(target) === ERR_NOT_IN_RANGE) {
            		this.moveTo(target);
            	}
            }else{
                this.idle();
            }
        }
    }
};