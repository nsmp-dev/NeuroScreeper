require('./src/Creep/attacker.js');
require('./src/Creep/bootstrapper.js');
require('./src/Creep/builder.js');
require('./src/Creep/claimer.js');
require('./src/Creep/driller.js');
require('./src/Creep/idle.js');
require('./src/Creep/queen.js');
require('./src/Creep/repair.js');
require('./src/Creep/scout.js');
require('./src/Creep/transporter.js');
require('./src/Creep/upgrader.js');
require('./src/Room/constructColony.js');
require('./src/Room/populateColony.js');
require('./src/Room/constructOutpost.js');
require('./src/Room/populateOutpost.js');
require('./src/Tower/run.js');
require('./src/Terminal/run.js');
const memory_manager = require('./src/memory_manager.js');
const room_manager = require('./src/room_manager.js');

module.exports.loop = function () {
    memory_manager.refresh();

    for (let [name, creep] of Object.entries(Game.creeps)) {
        creep[creep.memory.role]();
    }

    for (let [name, room] of Object.entries(Memory.rooms)) {
        if (room.type == "colony") {
            Game.rooms[name].find(FIND_MY_STRUCTURES, {structureType: STRUCTURE_TOWER}).forEach(function(tower){
                tower.run();
            });
        }
    }

    if (Memory.population_counter > 5 && (Game.cpu.tickLimit - Game.cpu.getUsed()) > 1) {
        Memory.population_counter = 0;
        for (let [name, room] of Object.entries(Memory.rooms)) {
            if (room.type == "colony") {
                Game.rooms[name].populateColony();
            }
        }
        for (let [name, room] of Object.entries(Memory.rooms)) {
            if (room.type == "outpost") {
                Game.rooms[name].populateOutpost();
            }
        }
    }

    if (Memory.construction_counter > 50 && (Game.cpu.tickLimit - Game.cpu.getUsed()) > 1) {
        Memory.construction_counter = 0;
        for (let [name, room] of Object.entries(Memory.rooms)) {
            if (room.type == "colony") {
                Game.rooms[name].constructColony();
            }else if (room.type == "outpost") {
                Game.rooms[name].constructOutpost();
            }
        }
    }

    if (Memory.terminal_counter > 1000 && (Game.cpu.tickLimit - Game.cpu.getUsed()) > 1) {
        Memory.terminal_counter = 0;
        for (let [name, room] of Object.entries(Memory.rooms)) {
            if (room.type == "colony" && Game.rooms[name].terminal) {
                Game.rooms[name].terminal.run();
            }
        }
    }

    if (Memory.isStable && Memory.room_manager_counter > 1000 && (Game.cpu.tickLimit - Game.cpu.getUsed()) > 1) {
        Memory.room_manager_counter = 0;
        room_manager.refresh();
    }

    let cpu_used = Game.cpu.getUsed();
    let status_str = "CPU: ";
    status_str += cpu_used + "/" + Game.cpu.tickLimit;
    status_str += ((cpu_used / Game.cpu.tickLimit)*100).toFixed(2) + "% | ";
    status_str += "Bucket: " + Game.cpu.bucket;
    console.log(status_str);

    Memory.finished_last_tick = true;
};