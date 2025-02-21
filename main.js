const Timer = require('timer');
Timer.start();

const le = require('logger');
const Construction = require('construction');
const Population = require('population');
const RoomLog = require('room_log');
const RoomManager = require('room_manager');
const Visualizer = require('visualizer');
require('tower');
require('terminal');
require('observer');

module.exports.loop = function () {
	if (Memory.init == undefined) {
		if (Game.cpu.bucket == 10000) {
			Memory.init = true;
		}else{
			return;
		}
	}

	le.log("starting room log...");
	RoomLog.run();

	le.log("starting room manager...");
	RoomManager.run();

	le.log("starting creeps...");
	for(let [name, creep] in Object.entries(Game.creeps)) {
		creep.run();
	}

	le.log("starting population controllers...");
	for (let [room_name, room_data] of Object.entries(Memory.rooms)) {
		if (room_data.type == RoomLog.COLONY) {
			Population.runColony(Game.rooms[room_name]);
		}
		if (room_data.type == RoomLog.EXPANSION) {
			Population.runExpansion(Game.rooms[room_name]);
		}
	}
	
	le.log("starting structures...");
	for (let [name, structure] of Object.entries(Game.structures)) {
		
		if (structure.structureType == STRUCTURE_TOWER ||
			structure.structureType == STRUCTURE_OBSERVER) {
			structure.run();
		}
		if (structure.structureType == STRUCTURE_TERMINAL) {
			structure.sell();
			structure.buy();
		}
	}

	le.log("starting construction controllers...");
	for (let [room_name, room_data] of Object.entries(Memory.rooms)) {
		if (room_data.type == RoomLog.COLONY || room_data.type == RoomLog.EXPANSION) {
			Construction.run(Game.rooms[room_name]);
		}
	}

	le.log("starting vizualizer...");
	if (Game.flags["viz"] != undefined) {
		Visualizer.render(Game.flags["viz"].room.name);
	}

	le.printSummary();
	Timer.stop();
}