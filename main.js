// load all the files using a bootloader script
require('global.bootloader');

// the main loop that gets run every tick
module.exports.loop = function () {
    hlog("-------------------------------------");
    hlog("-------------------------------------");
    hlog("-------------------------------------");

    // grab the MainMemory object
    let main_memory = Util.getMainMemory();

    // wipe the memory if the build has changed
    if (main_memory == undefined || main_memory.build != BUILD) {
        hlog("Build has changed, clearing memory...");
        // clear the old memory
        Util.clearMemory();

        hlog("initializing MainMemory...");
        // initialize the MainMemory object
        Memory.main_memory = new MainMemory();
    }

    // start the main timer
    Timer.start();

    hlog("Running RoomManager...");
    // run the room manager
    RoomManager.run(main_memory);

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
    for (let name in main_memory.room_data) {
        // grab the room reference
        let room = Game.rooms[name];
        // grab the room data
        let room_data = main_memory.room_data[name];

        // if the room is a colony or expansion, run it
        if (room_data.type == COLONY || room_data.type == EXPANSION) {
            // run the room
            RoomRunner.run(room, room_data);
            // render the visuals for the room
            Visualizer.render(room);
        }

        // if the room died
        if (main_memory.room_data[name].dead) {
            hlog("Room '" + name + "' died!");
            // delete the room data
            delete main_memory.room_data[name];
            // if the room was the capitol
            if (main_memory.capitol_room_name == name) {
                // clear the capitol
                main_memory.capitol_room_name = null;
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