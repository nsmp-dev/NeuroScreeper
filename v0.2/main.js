require('prototype.creep');
require('prototype.room');
require('prototype.tower');
require('prototype.terminal');
require('prototype.observer');
const Timer = require('global.timer');
const Util = require('global.util');
const MyLogger = require('global.logger');
const RoomManager = require('global.room_manager');
const Visualizer = require('global.visualizer');
const Colony = require("controller.colony");
const Expansion = require("controller.expansion");

const BUILD = 1;

module.exports.loop = function () {
	if (Memory.build !== BUILD) {
        for (let name in Memory) {
            delete Memory[name];
        }
        Memory.build = BUILD;
    }

	Timer.start();

	if (Memory.init !== true) {
		RoomManager.initialize();
	}

	RoomManager.run();

	for(let name in Game.creeps) {
		Game.creeps[name].run();
	}

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

	for (let name in Memory.room_data) {
		let room = Game.rooms(name);
		let room_data = Memory.room_data[name];

		if (room_data.type == Colony.NAME) {
			if (room_data.initalized !== true) {
				room_data = Colony.initialize(room, room_data);
			}
			room_data = Colony.plan(room, room_data);
			room_data = Colony.run(room, room_data);
		}

		if (room_data.type == Expansion.NAME) {
			if (room_data.initalized !== true) {
				room_data = Expansion.initialize(room, room_data);
			}
			room_data = Expansion.plan(room, room_data);
			room_data = Expansion.run(room, room_data);
		}

		Memory.room_data[name] = room_data;
		Visualizer.render(room, room_data);
		
		if (Memory.room_data[name].dead) {
			delete Memory.room_data[name];
		}
	}
	Util.collectGarbage();
	MyLogger.printSummary();
	Timer.stop();
};