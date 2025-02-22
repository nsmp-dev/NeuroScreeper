const Util = require("my_util");

Creep.prototype.runBuilder = function(){
	if(this.memory.state ===  Util.BUILDER.FILLING){
        if(this.store.getFreeCapacity() === 0){
        	this.memory.state = Util.BUILDER.BUILDING;
        	this.memory.filling_target = null;
        	this.memory.building_target = this.getBuildTarget();
        }else{
        	// noinspection DuplicatedCode
			let target = Game.getObjectById(this.memory.filling_target);
        	if (target == null || target.store[RESOURCE_ENERGY] === 0) {
        		this.memory.filling_target = this.getFillTarget();
        		target = Game.getObjectById(this.memory.filling_target);
        	}

        	if (this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        		this.moveTo(target);
        	}
        }
    }
    if(this.memory.state ===  Util.BUILDER.BUILDING){
    	if(this.store[RESOURCE_ENERGY] === 0){
        	this.memory.state = Util.BUILDER.FILLING;
        	this.memory.filling_target = this.getFillTarget();
        	this.memory.building_target = null;
        }else{
        	let target = Game.getObjectById(this.memory.building_target);
        	if (target == null) {
        		this.memory.building_target = this.getBuildTarget();
        		target = Game.getObjectById(this.memory.building_target);
        	}

        	if (this.build(target) === ERR_NOT_IN_RANGE) {
        		this.moveTo(target);
        	}
        }
    }
};