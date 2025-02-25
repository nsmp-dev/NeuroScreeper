require('prototype.creep');
require('prototype.tower');
require('prototype.terminal');
require('prototype.observer');
const Timer = require('my_timer');
const MyLogger = require('my_logger');
const Construction = require('my_construction');
const Population = require('my_population');
const RoomLog = require('my_room_log');
const RoomManager = require('my_room_manager');
const Visualizer = require('my_visualizer');

module.exports.loop = function () {
    if (Memory.clear == true) {
        Memory = {};
    }
    
	Timer.start();
	if (Memory.init === undefined) {
		if (Game.cpu.bucket === 10000) {
			Memory.init = true;
		}else{
			return;
		}
	}

	MyLogger.log("starting room log...");
	RoomLog.run();

	MyLogger.log("starting room manager...");
	RoomManager.run();

	MyLogger.log("starting creeps...");
	for(let name in Game.creeps) {
		Game.creeps[name].run();
	}

	MyLogger.log("starting population controllers...");
	for (let name in Memory.room_log) {
		if (Memory.room_log[name].type === RoomLog.COLONY) {
			Population.runColony(Game.rooms[name]);
		}
		if (Memory.room_log[name].type === RoomLog.EXPANSION) {
			Population.runExpansion(Game.rooms[name]);
		}
	}
	
	MyLogger.log("starting structures...");
	for (let id in Game.structures) {
		
		if (Game.structures[id].structureType === STRUCTURE_TOWER ||
			Game.structures[id].structureType === STRUCTURE_OBSERVER) {
			Game.structures[id].run();
		}
		if (Game.structures[id].structureType === STRUCTURE_TERMINAL) {
			Game.structures[id].sell();
			Game.structures[id].buy();
		}
	}

	MyLogger.log("starting construction controllers...");
	for (let name in Memory.room_log) {
		if (Memory.room_log[name].type === RoomLog.COLONY || Memory.room_log[name].type === RoomLog.EXPANSION) {
			Construction.run(Game.rooms[name]);
		}
	}

	MyLogger.log("starting visualizer...");
	if (Game.flags["viz"] !== undefined) {
		Visualizer.render(Game.flags["viz"].room);
	}

	MyLogger.printSummary();
	Timer.stop();
}