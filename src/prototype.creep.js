/**
 * get a resource to gather for a transporter
 * @return {StructureContainer|Resource|null} The target, accounting for a not-yet-built container
 */
let getTransporterTarget = function () {
    // grab the container from memory
    let target = Game.getObjectById(this.memory.container_id);
    // if the container is null
    if (target == null) {
        // grab all the structures at the container's location
        target = this.room.getStructureAt(STRUCTURE_CONTAINER, this.memory.container_location.x, this.memory.container_location.y);
        // if a container is found there
        if (target != null) {
            // save the container id in memory
            this.memory.container_id = target.id;
        } else {
            // remove the container id from memory
            this.memory.container_id = null;
        }
    }

    // if the target is still null
    if (target == null) {
        // default to look for energy
        let look_type = LOOK_ENERGY;
        // if the creep is a mineral transporter
        if (this.memory.role == MineralTransporterRole.name) {
            // change the look type to look for all types of resources
            look_type = LOOK_RESOURCES;
        }
        // look for dropped resources at the container location
        let resources = this.room.lookForAt(look_type, this.memory.container_location.x, this.memory.container_location.y);
        // if any resources are found
        if (resources.length > 0) {
            // set the resource as the target
            target = resources[0];
        }
    }
    // return the target
    return target;
};
Creep.prototype.getTransporterTarget = getTransporterTarget;
PowerCreep.prototype.getTransporterTarget = getTransporterTarget;
/**
 * get a building target
 * @return {ConstructionSite} The closest construction site
 */
let getBuildTarget = function () {
    // find and return the closest construction site
    return this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
};
Creep.prototype.getBuildTarget = getBuildTarget;
PowerCreep.prototype.getBuildTarget = getBuildTarget;
/**
 * gets a general dumping target
 * @return {Structure} The closest dumping target
 */
let getDumpTarget = function () {
    // find any extensions that are not full
    let targets = this.room.findLowExtensions();

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
Creep.prototype.getDumpTarget = getDumpTarget;
PowerCreep.prototype.getDumpTarget = getDumpTarget;
/**
 * gets a general filling target
 * @return {Structure|Resource} The closest target to get energy from
 */
let getFillTarget = function () {
    // find any dropped energy
    let targets = this.room.find(FIND_DROPPED_RESOURCES, {filter: {resourceType: RESOURCE_ENERGY}});

    // if no dropped energy is found
    if (targets.length == 0) {
        // find any non-empty containers
        targets = this.room.findFilledContainers();
    }

    // if no non-empty containers are found
    if (targets.length == 0 &&
        // and there is a storage in the room
        this.room.storage != undefined &&
        // and the storage is not empty
        this.room.storage.store[RESOURCE_ENERGY] > 0) {
        // return the storage
        return this.room.storage;
    }

    // return the closest one by path
    return this.pos.findClosestByPath(targets);
};
Creep.prototype.getFillTarget = getFillTarget;
PowerCreep.prototype.getFillTarget = getFillTarget;
/**
 * get a repairing target
 * @return {Structure} the nearest damaged structure
 */
let getRepairTarget = function () {
    // return the closest structure
    return this.pos.findClosestByPath(FIND_STRUCTURES, {
        // if the structure is damaged
        filter: structure => structure.hits < structure.hitsMax,
    });
};
Creep.prototype.getRepairTarget = getRepairTarget;
PowerCreep.prototype.getRepairTarget = getRepairTarget;
/**
 * gets a dumping target for a queen
 * @return {StructureTower|StructureExtension|StructureSpawn|StructurePowerSpawn|StructureTerminal} The nearest target for dumping energy
 */
let getQueenDumpTarget = function () {
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

    // if no spawns were found
    if (targets.length == 0) {
        // get the power spawn
        let power_spawn = this.room.getPowerSpawn();
        // if a PowerSpawn is found, and it's energy is low
        if (power_spawn != null && power_spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            // return the power spawn
            return power_spawn;
        }
    }

    // if no spawns are found
    if (targets.length == 0 &&
        // and there is a terminal in the room
        this.room.terminal != undefined &&
        // and the terminal is not full
        this.room.terminal.store[RESOURCE_ENERGY] < TERMINAL_ENERGY_CAP) {
        // return the terminal
        return this.room.terminal;
    }

    // return the closest one by path
    return this.pos.findClosestByPath(targets);
};
Creep.prototype.getQueenDumpTarget = getQueenDumpTarget;
PowerCreep.prototype.getQueenDumpTarget = getQueenDumpTarget;
/**
 * move toward the idle location for the current room to get out of the way
 */
let idle = function () {
    // get the MainMemory object
    let main_memory = Util.getMainMemory();
    // grab the room data
    let room_data = main_memory.room_data[this.room.name];

    // if we are more than 3 tiles away
    if (!this.pos.inRangeTo(room_data.plans.idle_location.x, room_data.plans.idle_location.y, 3)) {
        // move toward the idle location
        this.moveTo(room_data.plans.idle_location.x, room_data.plans.idle_location.y);
    }
};
Creep.prototype.idle = idle;
PowerCreep.prototype.idle = idle;
/**
 * get the nearest storage or null
 * @return {StructureStorage|null} The nearest storage or null
 */
let getNearestStorage = function () {
    // get the MainMemory object
    let main_memory = Util.getMainMemory();
    // create a list of storages
    let storages = [];
    // loop through all the rooms we have seen so far
    for (let room_name in main_memory.room_data) {
        // if the room is visible and has a storage
        if (Game.rooms[room_name] != undefined && Game.rooms[room_name].storage != undefined) {
            // if this room is the room the creep is in
            if (room_name == this.room.name) {
                // return the storage
                return Game.rooms[room_name].storage;
            } else {
                // add the storage to the list of storages
                storages.push(Game.rooms[room_name].storage);
            }
        }
    }
    // if no storages were found
    if (storages.length == 0) {
        // return null
        return null;
    }

    // default the closest storage to the first storage
    let nearest_storage = storages[0];
    // default the lowest distance to the first storage
    let lowest_distance = Game.map.getRoomLinearDistance(this.room.name, storages[0].room.name);
    // loop through the storages
    for (let storage of storages) {
        // if this storage is closer than the closest storage
        if (Game.map.getRoomLinearDistance(this.room.name, storage.room.name) < lowest_distance) {
            // store the new closest storage
            nearest_storage = storage;
            // store the new lowest distance
            lowest_distance = Game.map.getRoomLinearDistance(this.room.name, storage.room.name);
        }
    }
    // return the closest storage
    return nearest_storage;
};
Creep.prototype.getNearestStorage = getNearestStorage;
PowerCreep.prototype.getNearestStorage = getNearestStorage;
/**
 * returns the nearest colony room's name
 * @return {string|null} The nearest colony room's name
 */
let getNearestColony = function () {
    // get the MainMemory object
    let main_memory = Util.getMainMemory();
    // variable for the nearest room name
    let nearest_room_name = null;
    // variable for the lowest distance
    let lowest_distance = null;
    // loop through all the rooms we have seen so far
    for (let room_name in main_memory.room_data) {
        // if the room is a colony and is closer than the closest colony so far
        if (main_memory.room_data[room_name].type == COLONY && (nearest_room_name == null || Game.map.getRoomLinearDistance(this.room.name, room_name) < lowest_distance)) {
            // store the new closest room name
            nearest_room_name = room_name;
            // store the new lowest distance
            lowest_distance = Game.map.getRoomLinearDistance(this.room.name, room_name);
        }
    }
    // return the closest room name
    return nearest_room_name;
};
Creep.prototype.getNearestColony = getNearestColony;
PowerCreep.prototype.getNearestColony = getNearestColony;
/**
 * returns the squad this creep is assigned to
 * @return {PowerSquad} The nearest room's name
 */
Creep.prototype.getPowerSquad = function () {
    // get the MainMemory object
    let main_memory = Util.getMainMemory();
    // return the power squad this creep is assigned to
    return main_memory.room_data[this.memory.room_name].power_squad;
};
/**
 * assign a standard gather task to just grab energy for various needs
 */
let gatherEnergy = function () {
    // find a new fill target
    let target = this.getFillTarget();
    // if a new target was found
    if (target != null) {
        // assign a new gather task
        this.memory.task = new GatherTask(target, RESOURCE_ENERGY);
        // announce the new task
        this.announceTask();
    } else {
        // assign a new idle task
        this.memory.task = new IdleTask(this.memory.room_name, 10);
        // announce the new task
        this.announceTask();
    }
};
Creep.prototype.gatherEnergy = gatherEnergy;
PowerCreep.prototype.gatherEnergy = gatherEnergy;
/**
 * announce the task that the creep is currently assigned
 */
let announceTask = function () {
    // grab the task
    let task = this.memory.task;

    // if the task is not set
    if (task == null) {
        // exit the function early
        return;
    }

    // switch based on the task's type
    switch (task.type) {
        // if the task type matches
        case TASK_TYPES.IDLE:
            // announce the task
            this.say("Idling...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.GATHER:
            // announce the task
            this.say("Gathering...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.DEPOSIT:
            // announce the task
            this.say("Depositing...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.REPAIR:
            // announce the task
            this.say("Repairing...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.BUILD:
            // announce the task
            this.say("Building...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.UPGRADE:
            // announce the task
            this.say("Upgrading...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.CLAIM:
            // announce the task
            this.say("Claiming...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.RESERVE:
            // announce the task
            this.say("Reserving...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.DRILL:
            // announce the task
            this.say("Drilling...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.ATTACK:
            // announce the task
            this.say("Attacking...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.HEAL:
            // announce the task
            this.say("Healing...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.MOVE_ROOM:
            // announce the task
            this.say("Moving...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.RENEW_OPERATOR:
            // announce the task
            this.say("Renewing...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.MOVE_RESOURCE:
            // announce the task
            this.say("Moving Resource...");
            // break the switch
            break;
        // if the task type matches
        case TASK_TYPES.HARVEST:
            // announce the task
            this.say("Harvesting...");
            // break the switch
            break;
    }
};
Creep.prototype.announceTask = announceTask;
PowerCreep.prototype.announceTask = announceTask;
/**
 * run the relevant function for the role that this creep has
 */
Creep.prototype.run = function () {
    // switch based on the creep's role
    switch (this.memory.role) {
        // if the role matches
        case AttackerRole.name:
            // call the function for this role
            this.runAttacker();
            // break the switch
            break;
        case BuilderRole.name:
            this.runBuilder();
            break;
        case ClaimerRole.name:
            this.runClaimer();
            break;
        case CommodityCollectorRole.name:
            this.runCommodityCollector();
            break;
        case DrillerRole.name:
            this.runDriller();
            break;
        case HealerRole.name:
            this.runHealer();
            break;
        case MineralDrillerRole.name:
            this.runMineralDriller();
            break;
        case MineralTransporterRole.name:
            this.runMineralTransporter();
            break;
        case PowerAttackerRole.name:
            this.runPowerAttacker();
            break;
        case PowerHealerRole.name:
            this.runPowerHealer();
            break;
        case PowerTransporterRole.name:
            this.runPowerTransporter();
            break;
        case QueenRole.name:
            this.runQueen();
            break;
        case RepairerRole.name:
            this.runRepairer();
            break;
        case ScoutRole.name:
            this.runScout();
            break;
        case TransporterRole.name:
            this.runTransporter();
            break;
        case UpgraderRole.name:
            this.runUpgrader();
            break;
    }
};