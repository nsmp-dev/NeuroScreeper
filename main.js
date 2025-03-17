require('global.config');
require('prototype.room');
require('prototype.creep');
require('prototype.tower');
require('prototype.terminal');
require('prototype.observer');
const Timer = require('global.timer');
const Util = require('global.util');
const MyLogger = require('global.logger');
const RoomManager = require('global.room_manager');
const RoomRunner = require('global.room_runner');
const Visualizer = require('global.visualizer');

// change the build number to trigger a memory wipe
const BUILD = 4;

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
        Timer.initialize();
    }

    // start the main timer
    Timer.start();

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

        // if room is a colony, run it
        if (room_data.type == COLONY || room_data.type == EXPANSION) {
            // run the colony
            RoomRunner.run(room, room_data);
            // render the visuals for the room
            Visualizer.render(room, room_data);
        }

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