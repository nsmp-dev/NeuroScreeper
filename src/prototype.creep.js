/**
 * The base game Creep class. Custom properties and functions are listed below.
 * @class Creep
 */

/**
 * Locates and returns a resource target for a transporter creep to gather from.
 * First checks for a container in memory, then looks for dropped resources at the container location.
 * @memberOf Creep#
 * @member {function} getTransporterTarget
 * @return {StructureContainer|Resource|null} The container, dropped resource, or null if none found
 */
Creep.prototype.getTransporterTarget = function () {
    // grab the container from memory
    let target = Game.getObjectById(this.memory.container_id);
    // if the container is null
    if (target == null) {
        // grab all the structures at the container's location
        target = this.room.getStructureAt(STRUCTURE_CONTAINER, this.memory.container_location.x, this.memory.container_location.y);
        // if a container is found there
        if (target == null) {
            // remove the container id from memory
            this.memory.container_id = null;
        } else {
            // save the container id in memory
            this.memory.container_id = target.id;
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
/**
 * Finds the nearest construction site that needs to be built.
 * Uses pathfinding to determine the closest site to the creep's current position.
 * @memberOf Creep#
 * @member {function} getBuildTarget
 * @return {ConstructionSite} The closest construction site by path
 */
Creep.prototype.getBuildTarget = function () {
    // find and return the closest construction site
    return this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
};
/**
 * Finds a structure to deposit energy into, prioritizing extensions, then spawns, then terminals.
 * Only returns the terminal if it has available energy capacity.
 * @memberOf Creep#
 * @member {function} getBuildTarget
 * @return {Structure} The closest valid structure that can receive energy
 */
Creep.prototype.getDumpTarget = function () {
    // find any extensions that are not full
    /** @type {Structure[]} */
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
/**
 * Locates the nearest energy source, prioritizing dropped energy, then containers, then storage.
 * Only returns storage if it contains energy and no other sources are available.
 * @memberOf Creep#
 * @member {function} getFillTarget
 * @return {Structure|Resource} The closest available energy source
 */
Creep.prototype.getFillTarget = function () {
    // find any dropped energy
    /** @type {Resource|Structure[]} */
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
/**
 * Finds the closest structure that needs repairs by comparing current hits to maximum hits.
 * Uses pathfinding to determine the nearest damaged structure to repair.
 * @memberOf Creep#
 * @member {function} getRepairTarget
 * @return {Structure} The closest structure that has less than maximum hit points
 */
Creep.prototype.getRepairTarget = function () {
    // return the closest structure
    return this.pos.findClosestByPath(FIND_STRUCTURES, {
        // if the structure is damaged
        filter: structure => structure.hits < structure.hitsMax,
    });
};
/**
 * Finds an energy storage target specifically for queen creeps, prioritizing towers, extensions, spawns, power spawn, and terminal.
 * Checks capacity limits and terminal energy caps before returning a target.
 * @memberOf Creep#
 * @member {function} getQueenDumpTarget
 * @return {StructureTower|StructureExtension|StructureSpawn|StructurePowerSpawn|StructureTerminal} The highest priority structure that needs energy
 */
Creep.prototype.getQueenDumpTarget = function () {
    // find all the towers that are not full
    /** @type {Structure[]} */
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
/**
 * Directs the creep to move toward the designated idle location in its current room.
 * Only moves if the creep is more than 3 tiles away from the idle position.
 * @memberOf Creep#
 * @member {function} idle
 */
Creep.prototype.idle = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();
    // grab the room data
    let room_data = main_memory.room_data[this.room.name];

    // if we are more than 3 tiles away
    if (!this.pos.inRangeTo(room_data.plans.idle_location.x, room_data.plans.idle_location.y, 3)) {
        // move toward the idle location
        this.moveTo(room_data.plans.idle_location.x, room_data.plans.idle_location.y);
    }
};
/**
 * Locates the closest storage structure across all visible rooms.
 * Returns current room's storage if present, otherwise finds the nearest storage in other rooms.
 * @memberOf Creep#
 * @member {function} getNearestStorage
 * @return {StructureStorage|null} The nearest accessible storage structure or null if none exist
 */
Creep.prototype.getNearestStorage = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();
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
/**
 * Finds the closest room designated as a colony using linear distance calculation.
 * Searches through all known rooms in memory to find the nearest colony type room.
 * @memberOf Creep#
 * @member {function} getNearestColony
 * @return {string|null} The name of the nearest colony room, or null if none found
 */
Creep.prototype.getNearestColony = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();
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
/**
 * Finds the closest room designated as a colony using linear distance calculation.
 * Searches through all known rooms in memory to find the nearest colony type room.
 * @memberOf Creep#
 * @member {function} moveToRoom
 * @return {string|null} The name of the nearest colony room, or null if none found
 */
Creep.prototype.moveToRoom = function (room_name) {
    this.moveTo(new RoomPosition(ROOM_SIZE/2, ROOM_SIZE/2, room_name));
};
/**
 * Retrieves the power squad assignment for this creep from room memory.
 * Uses the creep's assigned room to look up its associated power squad.
 * @memberOf Creep#
 * @member {function} getPowerSquad
 * @return {PowerSquad} The power squad this creep is currently assigned to
 */
Creep.prototype.getPowerSquad = function () {
    // get the MainMemory object
    let main_memory = util.getMainMemory();
    // return the power squad this creep is assigned to
    return main_memory.room_data[this.memory.room_name].power_squad;
};
/**
 * Creates and assigns an energy-gathering task to the creep.
 * If no energy source is found, assigns an idle task instead.
 * @memberOf Creep#
 * @member {function} gatherEnergy
 */
Creep.prototype.gatherEnergy = function () {
    // find a new fill target
    let target = this.getFillTarget();
    // if a new target was found
    if (target == null) {
        // assign a new idle task
        this.memory.task = new IdleTask(this.memory.room_name);
        // announce the new task
        this.announceTask();
    } else {
        // assign a new gather task
        this.memory.task = new GatherTask(target, RESOURCE_ENERGY);
        // announce the new task
        this.announceTask();
    }
};
/**
 * Displays a visual message indicating the creep's current task type.
 * Uses the creep's say() method to show different messages based on task enumeration.
 * @memberOf Creep#
 * @member {function} announceTask
 */
Creep.prototype.announceTask = function () {
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
/**
 * Executes the appropriate role-specific behavior function based on the creep's assigned role.
 * Uses a switch statement to determine and call the correct role implementation method.
 * @memberOf Creep#
 * @member {function} run
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