require('data.config');
require('data.construction_plan');
require('data.creep_memory');
require('data.mineral_plan');
require('data.mineral_population');
require('data.plant_data');
require('data.point');
require('data.production');
require('data.reaction');
require('data.room_data');
require('data.room_plans');
require('data.room_population');
require('data.source_plan');
require('data.source_population');
require('data.tasks');
require('factory.room_plans');
require('global.power_manager');
require('global.room_manager');
require('global.timer');
require('global.util');
require('global.visualizer');
require('prototype.creep');
require('prototype.observer');
require('prototype.room');
require('prototype.terminal');
require('prototype.tower');
require('role.attacker');
require('role.builder');
require('role.claimer');
require('role.driller');
require('role.healer');
require('role.mineral_driller');
require('role.mineral_transporter');
require('role.operator');
require('role.queen');
require('role.repairer');
require('role.scout');
require('role.transporter');
require('role.upgrader');
require('runner.plant');
require('runner.room');
require('runner.task');

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