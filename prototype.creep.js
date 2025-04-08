require('role.attacker');
require('role.builder');
require('role.claimer');
require('role.driller');
require('role.healer');
require('role.queen');
require('role.repairer');
require('role.scout');
require('role.transporter');
require('role.upgrader');

hlog("Creating base creep prototypes...");

/**
 * get a building target
 * @return {ConstructionSite} The closest construction site
 */
Creep.prototype.getBuildTarget = function () {
    // find and return the closest construction site
    return this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
};
/**
 * gets a general dumping target
 * @return {Structure} The closest dumping target
 */
Creep.prototype.getDumpTarget = function () {
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
/**
 * gets a general filling target
 * @return {Structure|Resource} The closest target to get energy from
 */
Creep.prototype.getFillTarget = function () {
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
/**
 * get a repairing target
 * @return {Structure} the nearest damaged structure
 */
Creep.prototype.getRepairTarget = function () {
    // return the closest structure
    return this.pos.findClosestByPath(FIND_STRUCTURES, {
        // if the structure is damaged
        filter: structure => structure.hits < structure.hitsMax,
    });
};
/**
 * gets a dumping target for a queen
 * @return {Structure} The nearest target for dumping energy
 */
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

    // if no spawns were found
    if (targets.length == 0) {
        // get the power spawn
        let power_spawn = this.room.getPowerSpawn();
        // if a power spawn is found, and it's energy is low
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
        this.room.terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        // return the terminal
        return this.room.terminal;
    }

    // return the closest one by path
    return this.pos.findClosestByPath(targets);
};
/**
 * move toward the idle location for the current room to get out of the way
 */
Creep.prototype.idle = function () {
    // grab the room data
    let room_data = Memory.room_data[this.room.name];

    // if we are more than 3 tiles away
    if (!this.pos.inRangeTo(room_data.plans.idle_location.x, room_data.plans.idle_location.y, 3)) {
        // move toward the idle location
        this.moveTo(room_data.plans.idle_location.x, room_data.plans.idle_location.y);
    }
};
/**
 * run the relevant function for the role that this creep has
 */
Creep.prototype.run = function () {
    // switch based on the creep's role
    switch (this.memory.role) {
        // if the role matches
        case ATTACKER.NAME:
            // call the function for this role
            this.runAttacker();
            // break the switch
            break;
        case BUILDER.NAME:
            this.runBuilder();
            break;
        case CLAIMER.NAME:
            this.runClaimer();
            break;
        case DRILLER.NAME:
            this.runDriller();
            break;
        case HEALER.NAME:
            this.runHealer();
            break;
        case QUEEN.NAME:
            this.runQueen();
            break;
        case REPAIRER.NAME:
            this.runRepairer();
            break;
        case SCOUT.NAME:
            this.runScout();
            break;
        case TRANSPORTER.NAME:
            this.runTransporter();
            break;
        case UPGRADER.NAME:
            this.runUpgrader();
            break;
    }
};
/**
 * announce the task that the creep is currently assigned
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
    }
};