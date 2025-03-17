const Util = require("global.util");
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

// gets a general dumping target
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

// gets a general filling target
Creep.prototype.getFillTarget = function () {
    // find any dropped energy
    let targets = this.room.find(FIND_DROPPED_RESOURCES, {filter: {resourceType: RESOURCE_ENERGY}});

    // if no dropped energy is found
    if (targets.length == 0) {
        // find any non-empty containers
        targets = this.room.findFilledContainers();
    }

    // if no spawns are found
    if (targets.length == 0 &&
        // and there is a terminal in the room
        this.room.terminal != undefined &&
        // and the terminal is not empty
        this.room.storage.store[RESOURCE_ENERGY] > 0) {
        // return the terminal
        return this.room.terminal;
    }

    // return the closest one by path
    return this.pos.findClosestByPath(targets);
};

// move toward the idle location for the current room to get out of the way
Creep.prototype.idle = function () {
    // grab the room data
    let room_data = Memory.room_log[this.room.name];

    // if we are more than 3 tiles away
    if (!this.pos.inRangeTo(room_data.idle_x, room_data.idle_y, 3)) {
        // move toward the idle location
        this.moveTo(room_data.idle_x, room_data.idle_y);
    }
};

// run the relevant function for the role that this creep has
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
