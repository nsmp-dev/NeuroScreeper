/**
 * utility module, contains creep role constants and commonly used methods
 * @module Util
 * */
module.exports = {
    /**
     * converts an x/y room coordinate to a string name
     * @param {number} x - The Creep being ran
     * @param {number} y - The Creep being ran
     * @return {string} the memory object for the creep
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
     * @param {string} name - The Creep being ran
     * @return {Object} the memory object for the creep
     */
    roomNameToWorldXY: function (name) {
        // get the size of the world
        let size = Game.map.getWorldSize();
        // calculate the max number the string name uses
        let max = (size - 2) / 2;
        // the coordinates we are finding
        let coordinates = {
            x: null,
            y: null,
        };

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
     * multiplies an array by num times
     * @param {Array} arr - The Creep being ran
     * @param {number} num - The Creep being ran
     * @return {Array[string]} the memory object for the creep
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
     * @return {string} the memory object for the creep
     */
    generateId: function () {
        // if the id counter has not been set before
        if (Memory.id_counter == undefined) {
            // set the id counter to 0
            Memory.id_counter = 0;
        }
        // the id we are building
        let id = "";
        // store the id
        id += Memory.id_counter;
        // increment the id counter
        Memory.id_counter++;
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
    },
    /**
     * calculates what percentage of the satisfaction log in the given room data is 1
     * @param {RoomData} room_data - The Creep being ran
     * @return {number} the memory object for the creep
     */
    getSatisfiedRatio: function (room_data) {
        // the total number of 1s in the room satisfaction log
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
     * @param {string} room_name - The Creep being ran
     * @return {Boolean} the memory object for the creep
     */
    isRoomAvailable: function (room_name) {
        let room = Game.rooms[room_name];

        if (room == undefined) {
            return false;
        }

        let status = Game.map.getRoomStatus(room.name);
        if (status.status != "normal") {
            return false;
        }

        if (room.controller.owner != undefined && room.controller.owner != USERNAME) {
            return false;
        }

        let hostile_creeps = room.find(FIND_HOSTILE_CREEPS).length;

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
        // the average cpu used
        str += " | avg cpu: " + Memory.average_time;
        // print the summary
        console.log(str);
    },
    /**
     * clear all memory except for the id counter
     */
    clearMemory: function () {
        // loop through all the entries in memory
        for (let name in Memory) {
            // if this field is not the id_counter
            if (name != "id_counter") {
                // delete the entry
                delete Memory[name];
            }
        }
    },
};