/**
 * Queen name, body, and initializers
 * @constant {Object} QUEEN
 */
global.QUEEN = {
    // identifying string
    NAME: "queen",
    // emoji for shorthand visuals
    EMOJI: "👑🚛",
    // standard body build that can be multiplied arbitrarily to build larger creeps
    BODY: [CARRY, MOVE],
    // energy cost of the body
    ENERGY_COST: 150,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[QUEEN.NAME] = QUEEN;

/**
 * QueenMemory class, storing data for an attacker
 * @class QueenMemory
 */
class QueenMemory extends CreepMemory{
    /**
     * creates an QueenMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(QUEEN.NAME, room_name);
    }
}
global.QueenMemory = QueenMemory;

/**
 * queen that takes energy from the storage and dumps it into the towers, terminal, and extensions
 */
Creep.prototype.runQueen = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if we are out of energy
        if (this.store.getUsedCapacity() == 0) {
            let storage = this.room.storage;
            let terminal = this.room.terminal;

            // if the storage isn't built or is empty
            if (storage == undefined || storage.store.getUsedCapacity() == 0) {
                // assign a new task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }else{
                if (this.room.name == Memory.capitol_room_name) {
                    for (let resource in storage.store) {
                        if (storage.store[resource] > 0 && FINAL_PRODUCTS.includes(resource) && terminal != undefined) {
                            this.memory.task = new MoveResourceTask(this.room.name, storage, terminal, resource, storage.store[resource]);
                        }
                    }
                    if (this.memory.task != null && terminal != undefined) {
                        for (let resource in terminal.store) {
                            if (terminal.store[resource] > 0 && INGREDIENTS.includes(resource)) {
                                this.memory.task = new MoveResourceTask(this.room.name, terminal, storage, resource, storage.store[resource]);
                            }
                        }
                    }
                    if (this.memory.task != null) {
                        this.memory.task = new IdleTask(this.room.name);
                    }
                }else{
                    if (terminal != undefined) {
                        for (let resource in storage.store) {
                            if (storage.store[resource] > 0 && resource != RESOURCE_ENERGY) {
                                this.memory.task = new MoveResourceTask(this.room.name, storage, terminal, resource, storage.store[resource]);
                            }
                        }
                    }else{
                        this.memory.task = new IdleTask(this.room.name);
                    }
                }

                if (this.memory.task != null) {
                    this.memory.task = new GatherTask(storage,  RESOURCE_ENERGY);
                }
            }
        }else{
            if (this.store.getUsedCapacity() == this.store[RESOURCE_ENERGY]) {
                // find a new dump target fit for a queen
                let target = this.getQueenDumpTarget();
                // if a new target was found
                if (target != null) {
                    // assign a new task
                    this.memory.task = new DepositTask(target, RESOURCE_ENERGY);
                    // announce the new task
                    this.announceTask();
                }else{
                    // assign a new task
                    this.memory.task = new IdleTask(this.memory.room_name, 10);
                    // announce the new task
                    this.announceTask();
                }
            }else{
                let storage = this.room.storage;
                if (storage != undefined) {
                    for (let resource in this.store) {
                        if (this.store[resource] > 0) {
                            this.memory.task = new DepositTask(this.room.storage, resource);
                        }
                    }
                    if (this.memory.task != null) {
                        this.memory.task = new IdleTask(this.memory.room_name, 10);
                    }
                }else{
                    this.memory.task = new IdleTask(this.memory.room_name, 10);
                }
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};