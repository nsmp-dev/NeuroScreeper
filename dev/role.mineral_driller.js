Creep.prototype.runMineralDriller = function () {
    // if we are at the location of the container
    if (this.pos.isEqualTo(this.memory.container_x, this.memory.container_y)) {
        // harvest from the assigned source
        this.harvest(Game.getObjectById(this.memory.mineral));
    } else {
        // move to the location of the container
        this.moveTo(this.memory.container_x, this.memory.container_y);
    }
};