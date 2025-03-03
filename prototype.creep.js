const Util = require("global.util");
require('role.attacker');
require('role.builder');
require('role.claimer');
require('role.driller');
require('role.harvester');
require('role.healer');
require('role.queen');
require('role.repairer');
require('role.scout');
require('role.transporter');
require('role.upgrader');

// gets a dumping target for a queen
Creep.prototype.getQueenDumpTarget = function () {
    let targets = this.room.find(FIND_MY_STRUCTURES, {
        filter: function (structure) {
            return (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        },
    });

    if (targets.length == 0) {
        targets = this.room.find(FIND_MY_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            },
        });
    }

    if (targets.length == 0) {
        targets = this.room.find(FIND_MY_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            },
        });
    }

    if (targets.length == 0) {
        targets = this.room.find(FIND_MY_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_TERMINAL && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            },
        });
    }

    return this.pos.findClosestByPath(targets);
};

// gets a dumping target for a harvester
Creep.prototype.getHarvesterDumpTarget = function () {
    let sites = this.room.find(FIND_MY_CONSTRUCTION_SITES);

    if (sites.length > 0) {
        return this.pos.findClosestByPath(sites);
    }

    let targets = this.room.find(FIND_MY_STRUCTURES, {
        filter: function (structure) {
            return (structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        },
    });

    if (targets.length == 0) {
        targets = this.room.find(FIND_MY_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            },
        });
    }

    if (targets.length == 0 && this.room.storage) {
        targets = [this.room.storage];
    }

    return this.pos.findClosestByPath(targets);
};

// gets a general dumping target
Creep.prototype.getDumpTarget = function () {
    let targets = this.room.find(FIND_MY_STRUCTURES, {
        filter: function (structure) {
            return (structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        },
    });

    if (targets.length == 0) {
        targets = this.room.find(FIND_MY_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            },
        });
    }

    if (targets.length == 0 && this.room.storage) {
        targets = [this.room.storage];
    }

    return this.pos.findClosestByPath(targets);
};

// gets a general filling target
Creep.prototype.getFillTarget = function () {
    let targets = this.room.find(FIND_DROPPED_RESOURCES, {filter: {resourceType: RESOURCE_ENERGY}});

    if (targets.length == 0) {
        targets = this.room.find(FIND_MY_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
            },
        });
    }


    if (targets.length == 0 && this.room.storage && this.room.storage.store[RESOURCE_ENERGY] > 0) {
        targets = [this.room.storage];
    }

    return this.pos.findClosestByPath(targets);
};

// get a building target
Creep.prototype.getBuildTarget = function () {
    return this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
};

// get a repairing target
Creep.prototype.getRepairTarget = function () {
    return this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function (structure) {
            return structure.hits < structure.hitsMax;
        },
    });
};

// get a source target
Creep.prototype.getSourceTarget = function () {
    return this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
};

// move toward the idle location for the current room to get out of the way
Creep.prototype.idle = function () {
    let room_data = Memory.room_log[this.room.name];

    if (!this.pos.inRangeTo(room_data.idle_x, room_data.idle_y, 3)) {
        this.moveTo(room_data.idle_x, room_data.idle_y);
    }
};

// run the relevant function for the role that this creep has
Creep.prototype.run = function () {
    switch (this.memory.role) {
        case Util.ATTACKER.NAME:
            this.runAttacker();
            break;
        case Util.BUILDER.NAME:
            this.runBuilder();
            break;
        case Util.CLAIMER.NAME:
            this.runClaimer();
            break;
        case Util.DRILLER.NAME:
            this.runDriller();
            break;
        case Util.HARVESTER.NAME:
            this.runHarvester();
            break;
        case Util.HEALER.NAME:
            this.runHealer();
            break;
        case Util.QUEEN.NAME:
            this.runQueen();
            break;
        case Util.REPAIRER.NAME:
            this.runRepairer();
            break;
        case Util.SCOUT.NAME:
            this.runScout();
            break;
        case Util.TRANSPORTER.NAME:
            this.runTransporter();
            break;
        case Util.UPGRADER.NAME:
            this.runUpgrader();
            break;
    }
};
