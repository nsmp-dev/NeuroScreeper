// healer that heals any damaged creeps in the room
Creep.prototype.runHealer = function () {
    // grab the target from memory
    let target = Game.getObjectById(this.memory.target);
    // if the target is null
    if (target == null) {
        // clear the target in memory
        this.memory.target = null;
        // find all my creeps in the room
        let creeps = this.room.find(FIND_MY_CREEPS, {
            // that are damaged
            filter: creep => creep.hits < creep.hitsMax,
        });
        // if we found any
        if (creeps.length > 0) {
            // find the closest one
            target = this.pos.findClosestByPath(creeps);
            // save the creep's id in memory
            this.memory.target = target.id;
        }
    }
    // if target is not null
    if (target != null) {
        // if healing the target results in not being in range
        if (this.heal(target) == ERR_NOT_IN_RANGE) {
            // move to the target
            this.moveTo(target);
        }
    } else {
        // idle if we have nothing to heal
        this.idle();
    }
};