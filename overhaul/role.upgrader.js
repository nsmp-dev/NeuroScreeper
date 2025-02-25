const Util = require("my_util");

Creep.prototype.runUpgrader = function(){
	if(this.memory.state ===  Util.UPGRADER.FILLING){
        if(this.store.getFreeCapacity() === 0){
        	this.memory.state = Util.UPGRADER.UPGRADING;
        	this.memory.filling_target = null;
        }else{
        	let target = Game.getObjectById(this.memory.filling_target);

        	if (target != null) {
				if (this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
		        	this.moveTo(target);
		        }
        	}	
        }
    }
    if(this.memory.state ===  Util.UPGRADER.UPGRADING){
    	if(this.store[RESOURCE_ENERGY] === 0){
        	this.memory.state = Util.UPGRADER.FILLING;
        	this.memory.filling_target = this.getFillingTarget().id;
        }else{
        	let controller = this.room.controller;

        	if (this.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        		this.moveTo(controller);
        	}
        }
    }
};