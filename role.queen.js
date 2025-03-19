hlog("Creating queen role...");
// gets a dumping target for a queen
Creep.prototype.getQueenDumpTarget = function () {
    // find all the towers that are not full
    let targets = this.room.findLowTowers();

    // if no towers are found
    if (targets.length == 0) {
        // find any extensions that are not full
        targets = this.room.findLowExtensions();
    }

    // if no extensions are found
    if (targets.length == 0) {
        // find all the spawns that are not full
        targets = this.room.findLowSpawns();
    }

    // if no spawns are found
    if (targets.length == 0 &&
        // and there is a terminal in the room
        this.room.terminal != undefined &&
        // and the terminal is not full
        this.room.terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        // return the terminal
        return this.room.terminal;
    }

    // return the closest one by path
    return this.pos.findClosestByPath(targets);
};

// queen that takes energy from the storage and dumps it into the towers, terminal, and extensions
Creep.prototype.runQueen = function () {
    // if we are currently filling
    if (this.memory.state == QUEEN.FILLING) {
        // if the energy store is full
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            // set the state to dumping
            this.memory.state = QUEEN.DUMPING;
            // find a new dump target
            let new_target = this.getQueenDumpTarget();
            // if we found one
            if (new_target != null) {
                // save the target id in memory
                this.memory.dumping_target = new_target.id;
            }
        } else {
            // if the storage exists and is not empty
            if (this.room.storage != undefined && this.room.storage.store[RESOURCE_ENERGY] > 0) {
                // if withdrawing from the storage results in not being in range
                if (this.withdraw(this.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move to the storage
                    this.moveTo(this.room.storage);
                }
            }
        }
    }
    // if we are dumping
    if (this.memory.state == QUEEN.DUMPING) {
        // if the store is out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // set the state back to filling
            this.memory.state = QUEEN.FILLING;
        } else {
            // grab the target
            let target = Game.getObjectById(this.memory.dumping_target);
            // if the target is not null
            if (target == null) {
                // grab a new target
                target = this.getQueenDumpTarget();
                // if the target is not null
                if (target != null) {
                    // save the target id to memory
                    this.memory.dumping_target = target.id;
                }
            }
            // if the target is not null
            if (target != null) {
                // if transferring to the target results in not being in range
                if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    this.moveTo(target);
                }
            }
        }
    }
};