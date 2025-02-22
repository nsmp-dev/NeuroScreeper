const Timer = require('timer');
Timer.start();

require('prototype.creep');
require('prototype.tower');
require('prototype.terminal');
require('prototype.observer');

const le = require('logger');
const Construction = require('construction');
const Population = require('population');
const RoomLog = require('room_log');
const RoomManager = require('room_manager');
const Visualizer = require('my_visualizer');

module.exports.loop = function () {
	if (Memory.init === undefined) {
		if (Game.cpu.bucket === 10000) {
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
	for(let name in Game.creeps) {
		Game.creeps[name].run();
	}

	le.log("starting population controllers...");
	for (let name in Memory.room_log) {
		if (Memory.room_log[name].type === RoomLog.COLONY) {
			Population.runColony(Game.rooms[name]);
		}
		if (Memory.room_log[name].type === RoomLog.EXPANSION) {
			Population.runExpansion(Game.rooms[name]);
		}
	}
	
	le.log("starting structures...");
	for (let id of Game.structures) {
		
		if (Game.structures[id].structureType === STRUCTURE_TOWER ||
			Game.structures[id].structureType === STRUCTURE_OBSERVER) {
			Game.structures[id].run();
		}
		if (Game.structures[id].structureType === STRUCTURE_TERMINAL) {
			Game.structures[id].sell();
			Game.structures[id].buy();
		}
	}

	le.log("starting construction controllers...");
	for (let [room_name, room_data] of Object.entries(Memory.room_log)) {
		if (room_data.type === RoomLog.COLONY || room_data.type === RoomLog.EXPANSION) {
			Construction.run(Game.rooms[room_name]);
		}
	}

	le.log("starting visualizer...");
	if (Game.flags["viz"] !== undefined) {
		Visualizer.render(Game.flags["viz"].room.name);
	}

	le.printSummary();
	Timer.stop();
}