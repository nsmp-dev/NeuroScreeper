module.exports = {
	NAME: "colony",
	// initialize the colony data
	initialize: function(room, room_data) {
		return room_data;
	},
	//returns if the room is suitable for a colony
	testRoom: function(room) {
		let suitable = true;
		return suitable;
	},
	plan: function(room, room_data) {
		// occasionally update the data if it is old
		if (!room_data.construction_initialized) {
			room_data = this.planStructures(room, room_data);
		}
		return room_data;
	},
	run: function(room, room_data) {
		// execute any plans
		return room_data;
	},
	planStructures: function(room, room_data) {
		room_data.structures = [];
		room_data.sources = [];
		room_data.construction_initialized = true;

		return room_data;
	},
};