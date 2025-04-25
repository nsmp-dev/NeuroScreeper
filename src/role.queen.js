// set up the role constants
global.QueenRole = new Role("queen", "👑🚛", [CARRY, MOVE], 150, 25);

// add the role to the roles hash
global.ROLES[QueenRole.name] = QueenRole;

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
        super(QueenRole.name, room_name);
    }
}
global.QueenMemory = QueenMemory;

/**
 * queen that takes energy from the storage and dumps it into the towers, terminal, and extensions
 */
Creep.prototype.runQueen = function () {
    // get the MainMemory object
    let main_memory = Util.getMainMemory();
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if we are out of energy
        if (this.store.getUsedCapacity() == 0) {
            // grab the storage
            let storage = this.room.storage;
            // grab the terminal
            let terminal = this.room.terminal;

            // if the storage isn't built or is empty
            if (storage == undefined || storage.store.getUsedCapacity() == 0) {
                // assign a new idle task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the idle task
                this.announceTask();
            }else{
                // if this room is the capitol
                if (this.room.name == main_memory.capitol_room_name) {
                    // loop through the resources in the storage
                    for (let resource in storage.store) {
                        // if the resource is a final product
                        if (storage.store[resource] > 0 && FINAL_PRODUCTS.includes(resource) && terminal != undefined) {
                            // assign a new MoveResourceTask
                            this.memory.task = new MoveResourceTask(this.room.name, storage, terminal, resource, storage.store[resource]);
                            // announce the MoveResourceTask
                            this.announceTask();
                        }
                    }
                    // if no task is assigned and the terminal is built
                    if (this.memory.task != null && terminal != undefined) {
                        // loop through the resources in the terminal
                        for (let resource in terminal.store) {
                            // if the resource is an ingredient
                            if (terminal.store[resource] > 0 && INGREDIENTS.includes(resource)) {
                                // assign a new MoveResourceTask
                                this.memory.task = new MoveResourceTask(this.room.name, terminal, storage, resource, storage.store[resource]);
                                // announce the MoveResourceTask
                                this.announceTask();
                            }
                        }
                    }
                    // if a task is not assigned
                    if (this.memory.task != null) {
                        // assign a new idle task
                        this.memory.task = new IdleTask(this.room.name);
                        // announce the idle task
                        this.announceTask();
                    }
                }else{
                    // if the terminal is built
                    if (terminal != undefined) {
                        // loop through the resources in the storage
                        for (let resource in storage.store) {
                            // if the resource is not energy
                            if (storage.store[resource] > 0 && resource != RESOURCE_ENERGY) {
                                // assign a new MoveResourceTask
                                this.memory.task = new MoveResourceTask(this.room.name, storage, terminal, resource, storage.store[resource]);
                                // announce the MoveResourceTask
                                this.announceTask();
                            }
                        }
                    }else{
                        // assign a new idle task
                        this.memory.task = new IdleTask(this.room.name);
                        // announce the idle task
                        this.announceTask();
                    }
                }

                // if no task is assigned
                if (this.memory.task != null) {
                    // grab a target for dumping
                    let target = this.getQueenDumpTarget();
                    // if a target was found
                    if (target != null) {
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
                        this.memory.task = new MoveResourceTask(this.room.name, storage, target, RESOURCE_ENERGY, amount);
                        // announce the MoveResourceTask
                        this.announceTask();
                    }else{
                        // assign a new idle task
                        this.memory.task = new IdleTask(this.room.name);
                        // announce the idle task
                        this.announceTask();
                    }
                }
            }
        }else{
            // grab the storage
            let storage = this.room.storage;
            // if the storage is built
            if (storage != undefined) {
                // loop through the resources in this creep's store
                for (let resource in this.store) {
                    // if the creep has any of the resource
                    if (this.store[resource] > 0) {
                        // assign a deposit task
                        this.memory.task = new DepositTask(storage, resource);
                        // announce the deposit task
                        this.announceTask();
                    }
                }
                // if no task is assigned
                if (this.memory.task == null) {
                    // assign a new idle task
                    this.memory.task = new IdleTask(this.room.name);
                    // announce the idle task
                    this.announceTask();
                }
            }else{
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            }
        }
    }
    // run the task
    NeuroTask.run(this);
};