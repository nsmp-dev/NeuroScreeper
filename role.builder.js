const Util = require("global.util");

// builder that builds any construction sites that are found
Creep.prototype.runBuilder = function () {
    // if we are currently filling
    if (this.memory.state == Util.BUILDER.FILLING) {
        // if the energy storage is full
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            // set the state to building
            this.memory.state = Util.BUILDER.BUILDING;
            // set the filling target to null
            this.memory.filling_target = null;
            // find a new building target
            let new_target = this.getBuildTarget();
            // if we found a new target
            if (new_target != null) {
                // save the building target's id in memory
                this.memory.building_target = new_target.id;
            }
        } else {
            // grab the target from memory
            let target = Game.getObjectById(this.memory.filling_target);
            // if the target is null or the store has no energy
            if (target == null || (target.store != undefined && target.store[RESOURCE_ENERGY] == 0)) {
                // grab a new fill target
                target = this.getFillTarget();
                // if we found a new target
                if (target != null) {
                    // save the building target's id in memory
                    this.memory.filling_target = target.id;
                }
            }

            // if the target is not null
            if (target != null) {
                // if the target is a resource
                if (target instanceof Resource) {
                    // if picking up the resource results in not being in range
                    if (this.pickup(target) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        this.moveTo(target);
                    }
                } else {
                    // if withdrawing from the target results in not being in range
                    if (this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        this.moveTo(target);
                    }
                }
            }
        }
    }
    // if we are currently building
    if (this.memory.state == Util.BUILDER.BUILDING) {
        // if we are out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // set the state back to filling
            this.memory.state = Util.BUILDER.FILLING;
            // clear the building target
            this.memory.building_target = null;
            // find a new fill target
            let new_target = this.getFillTarget();
            // if one is found
            if (new_target != null) {
                // save its id in memory
                this.memory.filling_target = new_target.id;
            }
        } else {
            // grab the target from memory
            let target = Game.getObjectById(this.memory.building_target);
            // if the target is null
            if (target == null) {
                // find a new build target
                let target = this.getBuildTarget();
                // if we found one
                if (target != null) {
                    // save the id in memory
                    this.memory.building_target = target.id;
                }
            }

            // if the target is not null
            if (target != null) {
                // if building the target results in not being in range
                if (this.build(target) == ERR_NOT_IN_RANGE) {
                    // move toward the target
                    this.moveTo(target);
                }
            } else {
                // idle if we have nothing to build
                this.idle();
            }
        }
    }
};