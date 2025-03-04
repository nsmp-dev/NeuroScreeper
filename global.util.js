// utility module, contains creep role constants and commonly used methods
module.exports = {
    // converts an x/y room coordinate to a string name
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

    // converts a string room name to x/y room coordinates
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

    // multiplies an array by num times
    multiArray: function (array, num) {
        // create the array we are building
        let result = [];
        // loop num amount of times
        for (let i = 0; i < num; i++) {
            // add the array to the result
            result = result.concat(array);
        }
        // return the new array
        return result;
    },

    // gets the corresponding role constant set for the given role
    getRole: function (role) {
        // switch based on the role
        switch (role) {
            case this.ATTACKER.NAME:
                return this.ATTACKER;
            case this.BUILDER.NAME:
                return this.BUILDER;
            case this.CLAIMER.NAME:
                return this.CLAIMER;
            case this.DRILLER.NAME:
                return this.DRILLER;
            case this.HEALER.NAME:
                return this.HEALER;
            case this.QUEEN.NAME:
                return this.QUEEN;
            case this.REPAIRER.NAME:
                return this.REPAIRER;
            case this.SCOUT.NAME:
                return this.SCOUT;
            case this.TRANSPORTER.NAME:
                return this.TRANSPORTER;
            case this.UPGRADER.NAME:
                return this.UPGRADER;
        }
    },

    // generates an id, using a memory entry to ensure no collisions
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

    /*
    // calculates the ratio of time used so far this tick
    timeUsed: function () {
        // calculate the time used so far and return it
        return (Game.cpu.tickLimit - Game.cpu.getUsed()) / Game.cpu.tickLimit;
    },
    */
    /*
    // calculates the distance between two points
    distance: function (x1, y1, x2, y2) {
        // calculate and return the distance using D = (dx^2 + dy^2)^(1/2)
        return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    },
    */
    // delete old creep memories to free up memory and prevent leaks
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

    // calculates what percentage of the satisfaction log in the given room data is 1
    getSatisfiedRatio: function (room_data) {
        // the total number of 1s in the room satisfaction log
        let total = 0;
        // loop through the satisfaction log
        room_data.satisfaction_log.forEach(function (amount) {
            // increment the total
            total += amount;
        });

        // calculate the average and return it
        return (total / room_data.satisfaction_log.length);
    },

    // constants for creep role usage
    ATTACKER: {
        // identifying string
        NAME: "attacker",
        // standard body build, can be multiplied arbitrarily to build larger creeps
        BODY: [ATTACK, TOUGH, MOVE, MOVE],
        // energy cost of the body
        ENERGY_COST: 100,
        // initializer that assembles the initial creep memory
        init: function (room_name) {
            // return the memory object
            return {
                // role of the creep
                role: this.NAME,
                // the current target for the creep
                target: null,
                // the room the creep is assigned to
                room_name: room_name,
            };
        },
    },
    BUILDER: {
        NAME: "builder",
        BODY: [WORK, CARRY, MOVE, MOVE],
        ENERGY_COST: 250,
        BUILDING: 0,
        FILLING: 1,
        init: function (room_name) {
            return {
                role: this.NAME,
                state: this.FILLING,
                filling_target: null,
                building_target: null,
                room_name: room_name,
            };
        },
    },
    CLAIMER: {
        NAME: "claimer",
        BODY: [CLAIM, MOVE],
        ENERGY_COST: 650,
        init: function (room_name) {
            return {
                role: this.NAME,
                room_name: room_name,
            };
        },
    },
    DRILLER: {
        NAME: "driller",
        BODY: [WORK, MOVE],
        ENERGY_COST: 150,
        init: function (room_name, source_id, container_x, container_y) {
            return {
                role: this.NAME,
                room_name: room_name,
                source: source_id,
                container_x: container_x,
                container_y: container_y,
            };
        },
    },
    HEALER: {
        NAME: "healer",
        BODY: [HEAL, TOUGH, MOVE, MOVE],
        ENERGY_COST: 360,
        init: function (room_name) {
            return {
                role: this.NAME,
                room_name: room_name,
            };
        },
    },
    QUEEN: {
        NAME: "queen",
        BODY: [CARRY, MOVE],
        ENERGY_COST: 150,
        DUMPING: 0,
        FILLING: 1,
        init: function (room_name) {
            return {
                role: this.NAME,
                room_name: room_name,
                state: this.FILLING,
                dumping_target: null,
            };
        },
    },
    REPAIRER: {
        NAME: "repairer",
        BODY: [WORK, CARRY, MOVE, MOVE],
        ENERGY_COST: 250,
        REPAIRING: 0,
        FILLING: 1,
        init: function (room_name) {
            return {
                role: this.NAME,
                state: this.FILLING,
                filling_target: null,
                repairing_target: null,
                room_name: room_name,
            };
        },
    },
    SCOUT: {
        NAME: "scout",
        BODY: [MOVE],
        ENERGY_COST: 50,
        init: function (room_name) {
            return {
                role: this.NAME,
                room_name: room_name,
                room_queue: [],
                room_log: [],
            };
        },
    },
    TRANSPORTER: {
        NAME: "transporter",
        BODY: [CARRY, MOVE],
        ENERGY_COST: 100,
        DUMPING: 0,
        FILLING: 1,
        init: function (room_name, source_id, container_x, container_y) {
            return {
                role: this.NAME,
                room_name: room_name,
                source: source_id,
                container_x: container_x,
                container_y: container_y,
                container_id: null,
                dumping_target: null,
                state: this.FILLING,
            };
        },
    },
    UPGRADER: {
        NAME: "upgrader",
        BODY: [WORK, CARRY, MOVE, MOVE],
        ENERGY_COST: 250,
        UPGRADING: 0,
        FILLING: 1,
        init: function (room_name) {
            return {
                role: this.NAME,
                room_name: room_name,
                state: this.FILLING,
            };
        },
    },
};