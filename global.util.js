// utility module, contains creep role constants and commonly used methods
module.exports = {
    // converts an x/y room coordinate to a string name
    worldXYToRoomName: function (x, y) {
        let size = Game.map.getWorldSize();
        let max = (size - 2) / 2;
        let str = "";

        if (x < (size / 2)) {
            str += (max - x) + "W";
        } else {
            str += (x + 1 + max - size) + "E";
        }

        if (y < (size / 2)) {
            str += (max - y) + "N";
        } else {
            str += (y + 1 + max - size) + "S";
        }

        return str;
    },

    // converts a string room name to x/y room coordinates
    roomNameToWorldXY: function (name) {
        let size = Game.map.getWorldSize()
        let max = (size - 2) / 2;
        let coordinates = {
            x: null,
            y: null,
        };
        if (name.includes("W")) {
            let arr = name.split("W");
            coordinates.x = max - Number(arr[0]);
            name = arr[1];
        }
        if (name.includes("E")) {
            let arr = name.split("E");
            coordinates.x = max + 1 + Number(arr[0]);
            name = arr[1];
        }
        if (name.includes("N")) {
            let arr = name.split("N");
            coordinates.y = max - Number(arr[0]);
            name = arr[1];
        }
        if (name.includes("S")) {
            let arr = name.split("S");
            coordinates.y = max + 1 + Number(arr[0]);
        }

        return coordinates;
    },

    // multiplies an array by num times
    multiArray: function (array, num) {
        let result = [];
        for (let i = 0; i < num; i++) {
            result = result.concat(array);
        }
        return result;
    },

    // gets the corresponding role constant set for the given role
    getRole: function (role) {
        if (this.ATTACKER.NAME == role) {
            return this.ATTACKER;
        }
        if (this.BUILDER.NAME == role) {
            return this.BUILDER;
        }
        if (this.CLAIMER.NAME == role) {
            return this.CLAIMER;
        }
        if (this.DRILLER.NAME == role) {
            return this.DRILLER;
        }
        if (this.HARVESTER.NAME == role) {
            return this.HARVESTER;
        }
        if (this.HEALER.NAME == role) {
            return this.HEALER;
        }
        if (this.QUEEN.NAME == role) {
            return this.QUEEN;
        }
        if (this.REPAIRER.NAME == role) {
            return this.REPAIRER;
        }
        if (this.SCOUT.NAME == role) {
            return this.SCOUT;
        }
        if (this.TRANSPORTER.NAME == role) {
            return this.TRANSPORTER;
        }
        if (this.UPGRADER.NAME == role) {
            return this.UPGRADER;
        }
    },

    // generates an id, using a memory entry to ensure no collisions
    generateId: function () {
        if (Memory.id_counter == undefined) {
            Memory.id_counter = 0;
        }
        let id = "";
        id += Memory.id_counter;
        Memory.id_counter++;
        return id;
    },

    // calculates the ratio of time used so far this tick
    timeUsed: function () {
        return (Game.cpu.tickLimit - Game.cpu.getUsed()) / Game.cpu.tickLimit;
    },

    // calculates the distance between two points
    distance: function (x1, y1, x2, y2) {
        return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    },

    // delete old creep memories to free up memory and prevent leaks
    collectGarbage: function () {
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }
    },

    // calculates what percentage of the given array are true
    getSatisfiedRatio: function (room_data) {
        let total = 0;
        room_data.satisfaction_log.forEach(function (amount) {
            total += amount;
        });

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
    HARVESTER: {
        NAME: "harvester",
        BODY: [WORK, CARRY, MOVE, MOVE],
        ENERGY_COST: 250,
        DUMPING: 0,
        HARVESTING: 1,
        init: function (room_name) {
            return {
                role: this.NAME,
                state: this.HARVESTING,
                room_name: room_name,
                source_target: null,
                dumping_target: null,
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