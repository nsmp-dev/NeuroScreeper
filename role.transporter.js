const Util = require("global.util");

// transporter that takes energy from the containers under drillers and dumps the energy into the base
Creep.prototype.runTransporter = function(){
	if(this.memory.state ==  Util.TRANSPORTER.FILLING){
	    if(this.store.getFreeCapacity() == 0){
	    	this.memory.state = Util.TRANSPORTER.DUMPING;
	    	let new_target = this.getDumpTarget();
	    	if (new_target != null) {
    		    this.memory.dumping_target = new_target.id;
    		}
	    }else{
			let container = Game.getObjectById(this.memory.container);

			if (container == null) {
				let structures = this.room.lookForAt(LOOK_STRUCTURES, this.memory.container_x, this.memory.container_y);
				if (structures.length > 0 && structures[0].structureType == STRUCTURE_CONTAINER) {
					container = structures[0];
					this.memory.container = container.id;
				}
			}
	    	
	    	if (container !== null) {
				if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		        	this.moveTo(container);
		        }
	    	}else{
				this.memory.container = null;
				if (this.pos.isNearTo(this.memory.container_x, this.memory.container_y)) {
					let resources = this.room.lookForAt(LOOK_ENERGY, this.memory.container_x, this.memory.container_y);
					if (resources.length > 0) {
						this.pickup(resources[0]);
					}
				}else{
				    this.moveTo(this.memory.container_x, this.memory.container_y);
				}
			}
	    }
	}
	if(this.memory.state ==  Util.TRANSPORTER.DUMPING){
		if(this.store[RESOURCE_ENERGY] == 0){
	    	this.memory.state = Util.TRANSPORTER.FILLING;
	    	this.memory.dumping_target = null;
	    }else{
	    	let target = Game.getObjectById(this.memory.dumping_target);
	    	if (target == null) {
	    		target = this.getDumpTarget();
	    		if (target != null) {
	    		    this.memory.dumping_target = target.id;
	    		}
	    	}

	    	if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	    		this.moveTo(target);
	    	}
	    }
	}
};