// load all the files using the bootloader script
require('global_bootloader');

/**
 * Main loop function for the bot.
 * This function is executed every game tick and serves as the entry point. *
 * Responsibilities:
 * - Manages and executes tasks for all creeps.
 * - Oversees and optimizes the behavior of rooms and structures.
 * - Updates memory and handles garbage collection for unused data.
 * - Implements global control logic for colony management.
 */
let loop = function () {
    // grab the MainMemory object
    let main_memory = util.getMainMemory();

    // if the main memory object is not defined or the build number has changed
    if (main_memory == undefined || main_memory.build != BUILD) {
        hlog("Build has changed, clearing memory...");
        // clear the old memory
        util.clearMemory();

        hlog("initializing MainMemory...");
        // initialize the MainMemory object
        Memory.main_memory = new MainMemory();
        // store the main memory object for usage in main
        main_memory = util.getMainMemory();
        // grab the room that spawn is in
        let room = Game.spawns[INITIAL_SPAWN].room;
        // initialize the room data entry for the first room
        main_memory.room_data[room.name] = new RoomData(room, Game.spawns[INITIAL_SPAWN]);
        visualizer.popup("Recreated MainMemory!");
    }

    // start the main timer
    timer.start();

    // run the room manager
    neuro_screeper.run(main_memory);

    // loop through all the creeps
    for (let name in Game.creeps) {
        // run the creep
        Game.creeps[name].run();
    }

    // run the NeuroPower object
    neuro_power.run();

    // loop through all the structures
    for (let id in Game.structures) {
        // if it's a tower, terminal, or observer
        if (Game.structures[id].structureType == STRUCTURE_TOWER || Game.structures[id].structureType == STRUCTURE_OBSERVER || Game.structures[id].structureType == STRUCTURE_TERMINAL) {
            // run the structure
            Game.structures[id].run();
        }
    }

    // loop through every room we have data on
    for (let name in main_memory.room_data) {
        // grab the room data
        let room_data = main_memory.room_data[name];

        // if the room is a colony or expansion, run it
        if (room_data.type == COLONY || room_data.type == EXPANSION) {
            // if the room is currently visible
            if (Game.rooms[name] == undefined) {
                // run the room without the room reference
                neuro_room.run(room_data);
            } else {
                // run the room with the room reference
                neuro_room.run(room_data, Game.rooms[name]);
                // render the visuals for the room
                visualizer.render(Game.rooms[name]);
            }
        }

        // if the room died
        if (main_memory.room_data[name].dead) {
            visualizer.popup("Room '" + name + "' died!");
            // delete the room data
            delete main_memory.room_data[name];
            // if the room was the capitol
            if (main_memory.capitol_room_name == name) {
                // clear the capitol
                main_memory.capitol_room_name = null;
            }
        }
    }

    // collect the creep's garbage and generate pixels
    util.collectGarbage();
    // print a nice tick summary
    util.printSummary();
    // print all the average times from the timer
    util.printTimers();
    // stop the main timer
    timer.stop();
};

module.exports.loop = loop;