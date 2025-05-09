// set up the role constants
global.QueenRole = new Role("queen", "👑🚛", [CARRY, MOVE], 150, 25);

// add the role to the roles hash
global.ROLES[QueenRole.name] = QueenRole;

/**
 * QueenMemory class represents memory structure for queen creeps that manage storage and resource distribution.
 * Queens are responsible for transferring energy and resources between storage, terminals, towers, and extensions.
 * @class QueenMemory
 */
class QueenMemory extends CreepMemory {
    /**
     * Creates a new QueenMemory instance for managing queen creep's memory.
     * Queen creeps are specialized units responsible for resource distribution and storage management within a room.
     * @param {string} room_name - The identifier of the room where this queen creep will operate
     */
    constructor(room_name) {
        super(QueenRole.name, room_name);
    }
}

global.QueenMemory = QueenMemory;

/**
 * Queen creeps manage resource distribution within their assigned room. They primarily handle:
 * 1. Transferring energy from storage to towers, terminals, and extensions
 * 2. Moving final products from storage to terminal in capitol rooms
 * 3. Moving ingredients from the terminal to storage in capitol rooms
 * 4. Transporting non-energy resources to the terminal in non-capitol rooms
 * @memberOf Creep#
 * @member {function} runQueen
 */
Creep.prototype.runQueen = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();
    // if we don't have a task currently assigned
    if (this.task == null) {
        // if we are out of energy
        if (this.store.getUsedCapacity() == 0) {
            // grab the storage
            let storage = this.room.storage;
            // grab the terminal
            let terminal = this.room.terminal;

            // if the storage isn't built or is empty
            if (storage == undefined || storage.store.getUsedCapacity() == 0) {
                // assign a new idle task
                this.task = new IdleTask(this.memory.room_name, 10);
            } else {
                // if this room is the capitol
                if (this.room.name == main_memory.capitol_room_name) {
                    // loop through the resources in the storage
                    for (let resource in storage.store) {
                        // if the resource is a final product
                        if (storage.store[resource] > 0 && FINAL_PRODUCTS.includes(resource) && terminal != undefined) {
                            // assign a new MoveResourceTask
                            this.task = new MoveResourceTask(this.room.name, storage, terminal, resource, storage.store[resource]);
                        }
                    }
                    // if no task is assigned and the terminal is built
                    if (this.task != null && terminal != undefined) {
                        // loop through the resources in the terminal
                        for (let resource in terminal.store) {
                            // if the resource is an ingredient
                            if (terminal.store[resource] > 0 && INGREDIENTS.includes(resource)) {
                                // assign a new MoveResourceTask
                                this.task = new MoveResourceTask(this.room.name, terminal, storage, resource, storage.store[resource]);
                            }
                        }
                    }
                    // if a task is not assigned
                    if (this.task != null) {
                        // assign a new idle task
                        this.task = new IdleTask(this.room.name);
                    }
                } else {
                    // if the terminal is built
                    if (terminal == undefined) {
                        // assign a new idle task
                        this.task = new IdleTask(this.room.name);
                    } else {
                        // loop through the resources in the storage
                        for (let resource in storage.store) {
                            // if the resource is not energy
                            if (storage.store[resource] > 0 && resource != RESOURCE_ENERGY) {
                                // assign a new MoveResourceTask
                                this.task = new MoveResourceTask(this.room.name, storage, terminal, resource, storage.store[resource]);
                            }
                        }
                    }
                }

                // if no task is assigned
                if (this.task != null) {
                    // grab a target for dumping
                    let target = this.findQueenDumpTarget();
                    // if a target was found
                    if (target == null) {
                        // assign a new idle task
                        this.task = new IdleTask(this.room.name);
                    } else {
                        // get the amount of free space on the creep
                        let amount = this.store.getFreeCapacity();
                        // if the target has less free capacity than the amount
                        if (target.store.getFreeCapacity() < amount) {
                            // set the amount to the free space in the target
                            amount = target.store.getFreeCapacity();
                        }
                        // if the storage has less energy than the amount
                        if (storage.store[RESOURCE_ENERGY] < amount) {
                            // set the amount to the energy in the storage
                            amount = storage.store[RESOURCE_ENERGY];
                        }
                        // assign a new MoveResourceTask
                        this.task = new MoveResourceTask(this.room.name, storage, target, RESOURCE_ENERGY, amount);
                    }
                }
            }
        } else {
            // grab the storage
            let storage = this.room.storage;
            // if the storage is built
            if (storage == undefined) {
                // assign a new idle task
                this.task = new IdleTask(this.room.name);
            } else {
                // loop through the resources in this creep's store
                for (let resource in this.store) {
                    // if the creep has any of the resource
                    if (this.store[resource] > 0) {
                        // assign a deposit task
                        this.task = new DepositTask(storage, resource);
                    }
                }
                // if no task is assigned
                if (this.task == null) {
                    // assign a new idle task
                    this.task = new IdleTask(this.room.name);
                }
            }
        }
    }
    // run the task
    neuro_task.run(this);
};