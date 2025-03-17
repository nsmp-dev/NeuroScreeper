const Util = require("global.util");

// upgrader that upgrades the room's controller
Creep.prototype.runUpgrader = function () {
    // if we are currently filling
    if (this.memory.state == UPGRADER.FILLING) {
        // if the energy store is full
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            // change the state to upgrading
            this.memory.state = UPGRADER.UPGRADING;
            // clear the filling target
            this.memory.filling_target = null;
        } else {
            // grab the target from memory
            let target = Game.getObjectById(this.memory.filling_target);

            // if the target is null
            if (target == null) {
                // grab a new fill target
                target = this.getFillTarget();
                // if we found a target
                if (target != null) {
                    // store the new target's id in memory
                    this.memory.filling_target = target.id;
                }
            }

            // if the target is not null
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
    // if we are upgrading
    if (this.memory.state == UPGRADER.UPGRADING) {
        // if we are out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // set the state to filling
            this.memory.state = UPGRADER.FILLING;
            // find a new filling target
            let new_target = this.getFillTarget();
            // if we find one
            if (new_target != null) {
                // save the target id in memory
                this.memory.filling_target = new_target.id;
            }
        } else {
            // if upgrading the controller results in not being in range
            if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                // move to the controller
                this.moveTo(this.room.controller);
            }
        }
    }
};