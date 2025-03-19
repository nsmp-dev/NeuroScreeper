hlog("Creating transporter role...");
// transporter that takes energy from the containers under drillers and dumps the energy into the base
Creep.prototype.runTransporter = function () {
    // if we are currently filling
    if (this.memory.state == TRANSPORTER.FILLING) {
        // if the energy store is full
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            // set the state to dumping
            this.memory.state = TRANSPORTER.DUMPING;
            // find a new target for dumping
            let new_target = this.getDumpTarget();
            // if we found one
            if (new_target != null) {
                // stored the target id in memory
                this.memory.dumping_target = new_target.id;
            }
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
                if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move toward the target
                    this.moveTo(container);
                }
            } else {
                // set the container in memory to null
                this.memory.container = null;
                // if we are near the container location
                if (this.pos.isNearTo(this.memory.container_x, this.memory.container_y)) {
                    // look for any energy on the ground at the container location
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
    if (this.memory.state == TRANSPORTER.DUMPING) {
        // if we are out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // set the state to filling
            this.memory.state = TRANSPORTER.FILLING;
            // clear the dumping target
            this.memory.dumping_target = null;
        } else {
            // grab the target from memory
            let target = Game.getObjectById(this.memory.dumping_target);
            // if the target is null
            if (target == null) {
                // grab a new dump target
                target = this.getDumpTarget();
                // if we find one
                if (target != null) {
                    // store the target id in memory
                    this.memory.dumping_target = target.id;
                }
            }

            if (target != null) {
                // if transferring to the target results in being not in range
                if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    this.moveTo(target);
                }
            }else{
                this.idle();
            }

        }
    }
};