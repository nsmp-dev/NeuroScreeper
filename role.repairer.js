const Util = require("global.util");

// get a repairing target
Creep.prototype.getRepairTarget = function () {
    // return the closest damaged structure
    return this.pos.findClosestByPath(FIND_STRUCTURES, {
        // declare the filter function to use
        filter: structure => structure.hits < structure.hitsMax,
    });
};

// repairer that repairs any damaged structures in the room
Creep.prototype.runRepairer = function () {
    // if we are currently filling
    if (this.memory.state == REPAIRER.FILLING) {
        // if the store is out of energy
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            // set the state to repairing
            this.memory.state = REPAIRER.REPAIRING;
            // clear the filling target
            this.memory.filling_target = null;
            // grab a new repair target
            let new_target = this.getRepairTarget();
            // if the new target is not null
            if (new_target != null) {
                // save the new target's id in memory
                this.memory.repairing_target = new_target.id;
            }
        } else {
            // grab the target
            let target = Game.getObjectById(this.memory.filling_target);
            // if the target is null
            if (target == null) {
                // grab a new target
                target = this.getFillTarget();
                // if the target is not null
                if (target !== null) {
                    // save the target id in memory
                    this.memory.filling_target = target.id;
                }
            }

            // if target is not null
            if (target != null) {
                // if the target is a resource
                if (target instanceof Resource) {
                    // if picking up the resource results in not being in range
                    if (this.pickup(target) == ERR_NOT_IN_RANGE) {
                        // move toward the target
                        this.moveTo(target);
                    }
                } else {
                    // if withdrawing from the target results in not being in range
                    if (this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move toward the target
                        this.moveTo(target);
                    }
                }
            }
        }
    }
    // if we are currently repairing
    if (this.memory.state == REPAIRER.REPAIRING) {
        // if we are out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // set the state back to filling
            this.memory.state = REPAIRER.FILLING;
            // clear the repairing target
            this.memory.repairing_target = null;
            // find a new fill target
            let new_target = this.getFillTarget();
            // if one is found
            if (new_target != null) {
                // save its id in memory
                this.memory.filling_target = new_target.id;
            }
        } else {
            // grab the target from memory
            let target = Game.getObjectById(this.memory.repairing_target);
            // if the target is null
            if (target == null) {
                // find a new repair target
                target = this.getRepairTarget();
                // if we found one
                if (target != null) {
                    // save the id in memory
                    this.memory.repairing_target = target.id;
                }
            }

            // if target is not null
            if (target != null) {
                // if repairing the target results in not being in range
                if (this.repair(target) == ERR_NOT_IN_RANGE) {
                    // move toward the target
                    this.moveTo(target);
                }
            } else {
                // idle if we have nothing to repair
                this.idle();
            }
        }
    }
};