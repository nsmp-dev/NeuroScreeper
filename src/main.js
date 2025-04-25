// load all the files using a bootloader script
require('data.bootloader');

// the main loop that gets run every tick
module.exports.loop = function () {
    hlog("-------------------------------------");
    hlog("-------------------------------------");
    hlog("-------------------------------------");

    // grab the MainMemory object
    let main_memory = Util.getMainMemory();

    // if the main memory object is not defined or the build number has changed
    if (main_memory == undefined || main_memory.build != BUILD) {
        hlog("Build has changed, clearing memory...");
        // clear the old memory
        Util.clearMemory();

        hlog("initializing MainMemory...");
        // initialize the MainMemory object
        Memory.main_memory = new MainMemory();
        // store the main memory object for usage in main
        main_memory = Util.getMainMemory();
        // grab one of the names of the spawns
        let spawn_name = Object.keys(Game.spawns)[0];
        // grab the room that spawn is in
        let room = Game.spawns[spawn_name].room;
        // initialize the room data entry for the first room
        main_memory.room_data[room.name] = new RoomData(room, Game.spawns[spawn_name]);
    }

    // start the main timer
    Timer.start();

    hlog("Running NeuroScreeper...");
    // run the room manager
    NeuroScreeper.run(main_memory);

    hlog("Running creeps...");
    // loop through all the creeps
    for (let name in Game.creeps) {
        // run the creep
        Game.creeps[name].run();
    }

    hlog("Running PowerManager...");
    // run the power manager
    NeuroPower.run();

    hlog("Running structures...");
    // loop through all the structures
    for (let id in Game.structures) {
        // if it's a tower, terminal, or observer
        if (Game.structures[id].structureType == STRUCTURE_TOWER || Game.structures[id].structureType == STRUCTURE_OBSERVER || Game.structures[id].structureType == STRUCTURE_TERMINAL) {
            // run the structure
            Game.structures[id].run();
        }
    }

    hlog("Running rooms...");
    // loop through every room we have data on
    for (let name in main_memory.room_data) {
        // grab the room data
        let room_data = main_memory.room_data[name];

        // if the room is a colony or expansion, run it
        if (room_data.type == COLONY || room_data.type == EXPANSION) {
            // if the room is currently visible
            if (Game.rooms[name] != undefined) {
                // run the room with the room reference
                NeuroRoom.run(room_data, Game.rooms[name]);
                // render the visuals for the room
                Visualizer.render(Game.rooms[name]);
            } else {
                // run the room without the room reference
                NeuroRoom.run(room_data);
            }
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
    // collect the creep's garbage and generate pixels
    Util.collectGarbage();
    // print a nice tick summary
    Util.printSummary();
    // print all the average times from the timer
    Util.printTimers();
    // stop the main timer
    Timer.stop();
};