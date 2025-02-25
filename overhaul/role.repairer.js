const Util = require("my_util");

Creep.prototype.runRepairer = function(){
	if(this.memory.state ===  Util.REPAIRER.FILLING){
        if(this.store.getFreeCapacity() === 0){
        	this.memory.state = Util.REPAIRER.REPAIRING;
        	this.memory.filling_target = null;
        	this.memory.repairing_target = this.getRepairTarget().id;
        }else{
        	// noinspection DuplicatedCode
			let target = Game.getObjectById(this.memory.filling_target);
        	if (target == null || target.store[RESOURCE_ENERGY] === 0) {
        		target = this.getFillTarget();
        		this.memory.filling_target = target.id;
        	}

        	if (this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        		this.moveTo(target);
        	}
        }
    }
    if(this.memory.state ===  Util.REPAIRER.REPAIRING){
    	if(this.store[RESOURCE_ENERGY] === 0){
        	this.memory.state = Util.REPAIRER.FILLING;
        	this.memory.filling_target = this.getFillTarget().id;
        	this.memory.repairing_target = null;
        }else{
        	let target = Game.getObjectById(this.memory.repairing_target);
        	if (target == null) {
				target = this.getRepairTarget();
        		this.memory.repairing_target = target.id;
        	}

        	if (this.repair(target) === ERR_NOT_IN_RANGE) {
        		this.moveTo(target);
        	}
        }
    }
};