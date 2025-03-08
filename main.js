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
const BUILD = 2;

// the main loop that gets run every tick
module.exports.loop = function () {
    // wipe the memory if the build has changed
    if (Memory.build !== BUILD) {
        // loop through all the entries in memory
        for (let name in Memory) {
            // delete the entry
            delete Memory[name];
        }
        // set the build to the new one
        Memory.build = BUILD;
        // initialize the room manager
        RoomManager.initialize();
    }

    // start the main timer
    Timer.start();

    // if we are not initialized
    if (Memory.init !== true) {
        // initialize the room manager
        RoomManager.initialize();
    }

    // run the room manager to scan/add rooms
    RoomManager.run();

    // loop through every creep
    for (let name in Game.creeps) {
        // run the creep
        Game.creeps[name].run();
    }

    // loop through every structure
    for (let id in Game.structures) {
        // if it's a tower, terminal, or observer
        if (Game.structures[id].structureType == STRUCTURE_TOWER ||
            Game.structures[id].structureType == STRUCTURE_OBSERVER ||
            Game.structures[id].structureType == STRUCTURE_TERMINAL) {
            // run the structure
            Game.structures[id].run();
        }
    }

    // loop through all the rooms we know of
    for (let name in Memory.room_data) {
        // grab the room reference
        let room = Game.rooms[name];
        // grab the room data
        let room_data = Memory.room_data[name];

        // if room is a colony, plan and run it
        if (room_data.type == Colony.NAME) {
            // run the colony
            room_data = Colony.run(room, room_data);
        }

        // if room is an expansion, plan and run it
        if (room_data.type == Expansion.NAME) {
            // run the expansion
            room_data = Expansion.run(room, room_data);
        }

        // save the room data
        Memory.room_data[name] = room_data;
        // render the visuals for the room
        Visualizer.render(room, room_data);

        // if the room died
        if (Memory.room_data[name].dead) {
            // delete the room data
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