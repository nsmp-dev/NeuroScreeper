require('data.config');
require('prototype.room');
require('prototype.creep');
require('prototype.tower');
require('prototype.terminal');
require('prototype.observer');
const Timer = require('global.timer');
const Util = require('global.util');
const RoomManager = require('global.room_manager');
const RoomRunner = require('global.room_runner');
const Visualizer = require('global.visualizer');
const PowerManager = require('global.power_manager');

// the main loop that gets run every tick
module.exports.loop = function () {
    // wipe the memory if the build has changed
    if (Memory.build != BUILD) {
        hlog("Build has changed, clearing memory...");
        Util.clearMemory();
        // set the build to the new one
        Memory.build = BUILD;
        hlog("initializing RoomManager...");
        RoomManager.initialize();
        hlog("initializing Timer...");
        Timer.initialize();
    }


    // start the main timer
    Timer.start();

    hlog("Running RoomManager...");
    RoomManager.run();

    hlog("Running creeps...");
    for (let name in Game.creeps) {
        // run the creep
        Game.creeps[name].run();
    }

    hlog("Running PowerManager...");
    PowerManager.run();

    hlog("Running structures...");
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
            Visualizer.render(room);
        }

        // if the room died
        if (Memory.room_data[name].dead) {
            hlog("Room '" + name + "' died!");
            // delete the room data
            delete Memory.room_data[name];
            if (Memory.capitol_room_name == name) {
                Memory.capitol_room_name = null;
            }
        }
    }
    hlog("Collecting garbage...");
    Util.collectGarbage();
    // print a nice tick summary
    Util.printSummary();
    // stop the main timer
    Timer.stop();
};