require('data.config');
require('prototype.room');
require('prototype.creep');
require('prototype.tower');
require('prototype.terminal');
require('prototype.observer');
const Timer = require('global.timer');
const Util = require('global.util');
const RoomManager = require('global.room_manager');
const RoomRunner = require('runner.room');
const Visualizer = require('global.visualizer');
const PowerManager = require('global.power_manager');

// the main loop that gets run every tick
module.exports.loop = function () {
    hlog("-------------------------------------");
    hlog("-------------------------------------");
    hlog("-------------------------------------");
    // wipe the memory if the build has changed
    if (Memory.build != BUILD) {
        hlog("Build has changed, clearing memory...");
        // clear the old memory
        Util.clearMemory();
        // set the build to the new one
        Memory.build = BUILD;
        hlog("initializing RoomManager...");
        // initialize the room manager
        RoomManager.initialize();
        hlog("initializing Timer...");
        // initialize the timer
        Timer.initialize();
    }


    // start the main timer
    Timer.start();

    hlog("Running RoomManager...");
    // run the room manager
    RoomManager.run();

    hlog("Running creeps...");
    // loop through all the creeps
    for (let name in Game.creeps) {
        // run the creep
        Game.creeps[name].run();
    }

    hlog("Running PowerManager...");
    // run the power manager
    PowerManager.run();

    hlog("Running structures...");
    // loop through all the structures
    for (let id in Game.structures) {
        // if it's a tower, terminal, or observer
        if (Game.structures[id].structureType == STRUCTURE_TOWER ||
            Game.structures[id].structureType == STRUCTURE_OBSERVER ||
            Game.structures[id].structureType == STRUCTURE_TERMINAL) {
            // run the structure
            Game.structures[id].run();
        }
    }

    hlog("Running rooms...");
    // loop through every room we have data on
    for (let name in Memory.room_data) {
        // grab the room reference
        let room = Game.rooms[name];
        // grab the room data
        let room_data = Memory.room_data[name];

        // if room is a colony or expansion, run it
        if (room_data.type == COLONY || room_data.type == EXPANSION) {
            // run the room
            RoomRunner.run(room, room_data);
            // render the visuals for the room
            Visualizer.render(room);
        }

        // if the room died
        if (Memory.room_data[name].dead) {
            hlog("Room '" + name + "' died!");
            // delete the room data
            delete Memory.room_data[name];
            // if the room was the capitol
            if (Memory.capitol_room_name == name) {
                // clear the capitol
                Memory.capitol_room_name = null;
            }
        }
    }
    hlog("Collecting garbage...");
    // collect the creep's garbage
    Util.collectGarbage();
    // print a nice tick summary
    Util.printSummary();
    // print all the average times from the timer
    Util.printTimers();
    // stop the main timer
    Timer.stop();
};