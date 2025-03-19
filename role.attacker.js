hlog("Creating attacker role...");
// attacker that attacks hostile creeps in the room
Creep.prototype.runAttacker = function () {
    // attempt to grab the target
    let target = Game.getObjectById(this.memory.target);
    // if the target was not found
    if (target == null) {
        // set the target to null
        this.memory.target = null;
    }
    // if target is null
    if (target == null) {
        // find all hostile creeps in the room
        let creeps = this.room.find(FIND_HOSTILE_CREEPS);
        // if any hostile creeps are found
        if (creeps.length > 0) {
            // find the closest hostile creep
            target = this.pos.findClosestByPath(creeps);
            // store the new target's id
            this.memory.target = target.id;
        }
    }

    // if the target is not null
    if (target != null) {
        // if attacking the target results in not being in range
        if (this.attack(target) == ERR_NOT_IN_RANGE) {
            // move toward the target
            this.moveTo(target);
        }
    } else {
        // idle since we have no target
        this.idle();
    }
};