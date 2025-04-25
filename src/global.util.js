/**
 * commonly used helper functions
 * @namespace Util
 */
global.Util = {
    /**
     * gets the MainMemory object, helping with type safety
     * @return {MainMemory} the MainMemory object
     */
    getMainMemory: function () {
        // return the MainMemory object
        return Memory.main_memory;
    },
    /**
     * converts an x/y room coordinate to a string name
     * @param {number} x - x coordinate of the room in the world space
     * @param {number} y - y coordinate of the room in the world space
     * @return {string} the string name for the room
     */
    worldXYToRoomName: function (x, y) {
        // get the size of the world
        let size = Game.map.getWorldSize();
        // calculate the max number the string name uses
        let max = (size - 2) / 2;
        // the string name we are building
        let str = "";

        // if we are on the west side of the map
        if (x < (size / 2)) {
            // add the coordinate to the string name
            str += (max - x) + "W";
        } else {
            // add the coordinate to the string name
            str += (x + 1 + max - size) + "E";
        }

        // if we are on the east side of the map
        if (y < (size / 2)) {
            // add the coordinate to the string name
            str += (max - y) + "N";
        } else {
            // add the coordinate to the string name
            str += (y + 1 + max - size) + "S";
        }

        // return the string name
        return str;
    },
    /**
     * converts a string room name to x/y room coordinates
     * @param {string} name - The name of the room
     * @return {Point} the location of the room in world space
     */
    roomNameToWorldXY: function (name) {
        // get the size of the world
        let size = Game.map.getWorldSize();
        // calculate the max number the string name uses
        let max = (size - 2) / 2;
        // the coordinates we are finding
        let coordinates = new Point(-1, -1);

        // if the string contains a W
        if (name.includes("W")) {
            // split up the string
            let arr = name.split("W");
            // calculate the x coordinate
            coordinates.x = max - Number(arr[0]);
            // store the rest of the string
            name = arr[1];
        }
        // if the string contains an E
        if (name.includes("E")) {
            // split up the string
            let arr = name.split("E");
            // calculate the x coordinate
            coordinates.x = max + 1 + Number(arr[0]);
            // store the rest of the string
            name = arr[1];
        }
        // if the string contains an N
        if (name.includes("N")) {
            // split up the string
            let arr = name.split("N");
            // calculate the y coordinate
            coordinates.y = max - Number(arr[0]);
            // store the rest of the string
            name = arr[1];
        }
        // if the string contains an S
        if (name.includes("S")) {
            // split up the string
            let arr = name.split("S");
            // calculate the y coordinate
            coordinates.y = max + 1 + Number(arr[0]);
        }

        // return the coordinates
        return coordinates;
    },
    /**
     * multiplies an array a number of times
     * @param {Array} arr - The array that will be duplicated
     * @param {number} num - The number of times to repeat the array
     * @return {Array} the new resultant array
     */
    multiArray: function (arr, num) {
        // create the array we are building
        let result = [];
        // loop num amount of times
        for (let i = 0; i < num; i++) {
            // add the array to the result
            result = result.concat(arr);
        }
        // return the new array
        return result;
    },
    /**
     * generates an id, using a memory entry to ensure no collisions
     * @return {string} the guaranteed unique id
     */
    generateId: function () {
        // get the MainMemory object
        let main_memory = Util.getMainMemory();
        // the id we are building
        let id = "";
        // store the id counter
        id += main_memory.id_counter;
        // increment the id counter
        main_memory.id_counter++;
        // return the id
        return id;
    },
    /**
     * delete old creep memories to free up memory and prevent leaks
     */
    collectGarbage: function () {
        // loop through all the creep's memories
        for (let name in Memory.creeps) {
            // if the creep is dead
            if (Game.creeps[name] == undefined) {
                // delete the creep's memory
                delete Memory.creeps[name];
            }
        }

        // if the bucket meets the pixel cost threshold
        if (Game.cpu.bucket == PIXEL_CPU_COST) {
            // generate a pixel
            Game.cpu.generatePixel();
        }
    },
    /**
     * calculates what percentage of the satisfaction log in the given room data is true
     * @param {RoomData} room_data - The room data that holds the satisfaction log
     * @return {number} the calculated ratio
     */
    getSatisfiedRatio: function (room_data) {
        // the total number of true values in the room satisfaction log
        let total = 0;
        // loop through the satisfaction log
        room_data.satisfaction_log.forEach(function (satisfied) {
            // if satisfied on that tick
            if (satisfied) {
                // increment the total
                total++;
            }
        });

        // calculate the average and return it
        return (total / room_data.satisfaction_log.length);
    },
    /**
     * see if a room is available
     * @param {string} room_name - The name of the room to test
     * @return {Boolean} true if the room is available
     */
    isRoomAvailable: function (room_name) {
        // grab the room
        let room = Game.rooms[room_name];

        // if we don't have vision of the room
        if (room == undefined) {
            // mark room as unavailable
            return false;
        }

        // grab the status of the room
        let status = Game.map.getRoomStatus(room.name);
        // if the room is not normal
        if (status.status != "normal") {
            // mark room as unavailable
            return false;
        }

        // if the owner of the room is not the player
        if (room.controller.owner != undefined && room.controller.owner != USERNAME) {
            // mark room as unavailable
            return false;
        }

        // find all the hostile creeps in the room
        let hostile_creeps = room.find(FIND_HOSTILE_CREEPS).length;

        // return true if there are no hostile creeps in the room
        return hostile_creeps <= 0;
    },
    /**
     * print a summary of some stats
     */
    printSummary: function () {
        // start a new string
        let str = "";
        // the current tick
        str += "tick: " + Game.time;
        // the amount of cpu used this tick
        str += " | cpu used: " + Game.cpu.getUsed();
        // the current bucket size
        str += " | bucket: " + Game.cpu.bucket;
        // print the summary
        hlog(str);
    },
    /**
     * print all the timers we have
     */
    printTimers: function () {
        // get the MainMemory object
        let main_memory = Util.getMainMemory();
        // draw a separator
        hlog("-----Average Times-----");
        // loop through all the timers
        for (let id in main_memory.timers) {
            // print the id and average of this timer
            hlog(main_memory.timers[id].average_time.toString(), id);
        }
    },
    /**
     * finds all highway rooms found so far
     * @return {string[]} array of all the highway room names
     */
    getHighwayRooms: function () {
        // get the MainMemory object
        let main_memory = Util.getMainMemory();
        // create a list for the highways
        let highways = [];

        // loop through the rooms seen so far
        for (let room_name in main_memory.room_data) {
            // if the room is a highway
            if (main_memory.room_data[room_name] == HIGHWAY) {
                // add the room to the list of highways
                highways.push(room_name);
            }
        }
        // return the list of highways
        return highways;
    },
    /**
     * clear all the MainMemory object and suicide all creeps
     */
    clearMemory: function () {
        // loop through all the entries in memory
        for (let name in Memory) {
            // delete the entry
            delete Memory[name];
        }

        // loop through all creeps
        for (let name in Game.creeps) {
            // suicide this creep
            Game.creeps[name].suicide();
        }
    },
    /**
     * converts RGB values to a hex code for drawing
     * @param {number} r - the red value
     * @param {number} g - the green value
     * @param {number} b - the blue value
     * @return {string} the resulting hex code, including the #
     */
    rgbToHex: function (r, g, b) {
        // return the string version of the rgb value
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    },
    /**
     * distance between 2 Points
     * @param {Point} a - the first point
     * @param {Point} b - the second point
     * @return {number} the distance between the points
     */
    distance: function (a, b) {
        // get the distance between the x coordinates
        let x = a.x - b.x;
        // get the distance between the y coordinates
        let y = b.y - b.y;
        // return the hypotenuse of the two points
        return Math.sqrt((x * x) + (y * y));
    },
    /**
     * gets a 2D grid of the blocking structures from a RoomPlans object
     * @param {RoomPlans} plans - The plans of the room
     * @return {Boolean[][]} the 2D grid describing the taken and open spots as booleans
     */
    getStructureGrid: function (plans) {
        // 2d array of all the spots in the room
        let structure_grid = [];
        // loop through the X coordinates
        for (let x = 0; x < 50; x++) {
            // add a column to the structure grid
            structure_grid.push([]);
            // loop through the Y coordinates
            for (let y = 0; y < 50; y++) {
                // place a false for that position
                structure_grid[x].push(false);
            }
        }

        // loop through the planned structures
        for (let structure of plans.structures) {
            // set this spot to taken
            structure_grid[structure.location.x][structure.location.y] = true;
        }

        // loop through the source plans
        for (let source_plan of plans.source_plans) {
            // set this spot to taken
            structure_grid[source_plan.container_location.x][source_plan.container_location.y] = true;
        }

        // loop through the mineral plans
        for (let mineral_plan of plans.mineral_plans) {
            // set this spot to taken
            structure_grid[mineral_plan.container_location.x][mineral_plan.container_location.y] = true;
        }

        // return the final structure grid
        return structure_grid;
    },
};