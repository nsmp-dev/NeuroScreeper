const Util = require("util");

Creep.prototype.runRepairer = function(){
	if(this.memory.state ==  Util.REPAIRER.FILLING){
        if(this.store.getFreeCapacity() == 0){
        	this.memory.state = Util.REPAIRER.REPAIRING;
        	this.memory.filling_target = null;
        	this.memory.repairing_target = this.getRepaiTarget();
        }else{
        	let target = Game.getObjectById(this.memory.filling_target);
        	if (target == null || target.store[RESOURCE_ENERGY] == 0) {
        		this.memory.filling_target = this.getFillTarget();
        		target = Game.getObjectById(this.memory.filling_target);
        	}

        	if (this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        		this.moveTo(target);
        	}
        }
    }
    if(this.memory.state ==  Util.REPAIRER.REPAIRING){
    	if(this.store[RESOURCE_ENERGY] == 0){
        	this.memory.state = Util.REPAIRER.FILLING;
        	this.memory.filling_target = this.getFillTarget();
        	this.memory.repairing_target = null;
        }else{
        	let target = Game.getObjectById(this.memory.repairing_target);
        	if (target == null) {
        		this.memory.repairing_target = this.getRepairTarget();
        		target = Game.getObjectById(this.memory.repairing_target);
        	}

        	if (this.repair(target) == ERR_NOT_IN_RANGE) {
        		this.moveTo(target);
        	}
        }
    }
};