const Util = require("my_util");

Creep.prototype.runQueen = function(){
	if(this.memory.state ===  Util.QUEEN.FILLING){
        if(this.store.getFreeCapacity() === 0){
        	this.memory.state = Util.QUEEN.DUMPING;
        	this.memory.dumping_target = this.getQueenDumpTarget();
        }else{
        	let target = this.room.storage;
        	if (target !== null && target !== undefined && target.store[RESOURCE_ENERGY] > 0) {
	        	if (this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
	        		this.moveTo(target);
	        	}
        	}
        }
    }
    if(this.memory.state ===  Util.QUEEN.DUMPING){
    	if(this.store[RESOURCE_ENERGY] === 0){
        	this.memory.state = Util.QUEEN.FILLING;
        }else{
        	let target = Game.getObjectById(this.memory.dumping_target);
        	if (target == null) {
        		this.memory.dumping_target = this.getQueenDumpTarget();
        		target = Game.getObjectById(this.memory.dumping_target);
        	}

        	if (this.build(target) === ERR_NOT_IN_RANGE) {
        		this.moveTo(target);
        	}
        }
    }
};