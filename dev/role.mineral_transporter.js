const Util = require("global.util");

Creep.prototype.runMineralTransporter = function () {
    // if we are currently filling
    if (this.memory.state == Util.MINERAL_TRANSPORTER.FILLING) {
        // if the energy store is full
        if (this.store.getFreeCapacity(this.memory.resource_type) == 0) {
            // set the state to dumping
            this.memory.state = Util.MINERAL_TRANSPORTER.DUMPING;
        } else {
            // grab the container from memory
            let container = Game.getObjectById(this.memory.container);
            // if the container is null
            if (container == null) {
                // grab all the structures at the container's location
                let structures = this.room.lookForAt(LOOK_STRUCTURES, this.memory.container_x, this.memory.container_y);
                // if a container is found there
                if (structures.length > 0 && structures[0].structureType == STRUCTURE_CONTAINER) {
                    // set the container to the found container
                    container = structures[0];
                    // save the container id in memory
                    this.memory.container = container.id;
                }
            }

            // if the container is not null
            if (container != null) {
                // if withdrawing from the target results in not being in range
                if (this.withdraw(container, this.memory.resource_type) == ERR_NOT_IN_RANGE) {
                    // move toward the target
                    this.moveTo(container);
                }
            } else {
                // set the container in memory to null
                this.memory.container = null;
                // if we are near the container location
                if (this.pos.isNearTo(this.memory.container_x, this.memory.container_y)) {
                    // look for any energy on the ground at the container location
                    // TODO: fix this loop to work on the target resource type
                    let resources = this.room.lookForAt(LOOK_ENERGY, this.memory.container_x, this.memory.container_y);
                    // if any resources are found
                    if (resources.length > 0) {
                        // pick them up
                        this.pickup(resources[0]);
                    }
                } else {
                    // move to the container location
                    this.moveTo(this.memory.container_x, this.memory.container_y);
                }
            }
        }
    }
    // if we are dumping
    if (this.memory.state == Util.MINERAL_TRANSPORTER.DUMPING) {
        // if we are out of energy
        if (this.store[this.memory.resource_type] == 0) {
            // set the state to filling
            this.memory.state = Util.TRANSPORTER.FILLING;
        } else {
            // grab the target from memory
            let storage = this.room.storage;
            // if the target is null
            if (storage == undefined) {
                this.idle();
            }else{
                // if transferring to the target results in being not in range
                if (this.transfer(storage, this.memory.resource_type) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    this.moveTo(storage);
                }
            }



        }
    }
};