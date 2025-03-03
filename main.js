require('prototype.creep');
require('prototype.room');
require('prototype.tower');
require('prototype.terminal');
require('prototype.observer');
const Timer = require('global.timer');
const Util = require('global.util');
const MyLogger = require('global.logger');
const RoomManager = require('global.room_manager');
const Visualizer = require('global.visualizer');
const Colony = require("controller.colony");
const Expansion = require("controller.expansion");

// change the build number to trigger a memory wipe
const BUILD = 1;

module.exports.loop = function () {
    // wipe the memory if the build has changed
    if (Memory.build !== BUILD) {
        for (let name in Memory) {
            delete Memory[name];
        }
        Memory.build = BUILD;
        RoomManager.initialize();
    }

    // start the main timer
    Timer.start();

    // if we are not initialized, initialize the room manager
    if (Memory.init !== true) {
        RoomManager.initialize();
    }

    // run the room manager to scan/add rooms
    RoomManager.run();

    // run every creep
    for (let name in Game.creeps) {
        Game.creeps[name].run();
    }

    // loop thru ever structure
    for (let id in Game.structures) {
        // if it's a tower or observer, run them
        if (Game.structures[id].structureType == STRUCTURE_TOWER ||
            Game.structures[id].structureType == STRUCTURE_OBSERVER) {
            Game.structures[id].run();
        }
        // if it's a terminal, sell and buy
        if (Game.structures[id].structureType == STRUCTURE_TERMINAL) {
            Game.structures[id].sell();
            Game.structures[id].buy();
        }
    }

    // loop thru all the rooms we know of
    for (let name in Memory.room_data) {
        let room = Game.rooms[name];
        let room_data = Memory.room_data[name];

        // if room is a colony, plan and run it
        if (room_data.type == Colony.NAME) {
            room_data = Colony.plan(room, room_data);
            room_data = Colony.run(room, room_data);
        }

        // if room is a expansion, plan and run it
        if (room_data.type == Expansion.NAME) {
            room_data = Expansion.plan(room, room_data);
            room_data = Expansion.run(room, room_data);
        }

        Memory.room_data[name] = room_data;
        // render the visuals for the room
        Visualizer.render(room, room_data);

        // if the room died, remove it's data
        if (Memory.room_data[name].dead) {
            delete Memory.room_data[name];
        }
    }
    // collect any garbage
    Util.collectGarbage();
    // print a nice tick summary
    MyLogger.printSummary();
    // stop the main timer
    Timer.stop();
};