module.exports = {
	NAME: "expansion",
	// initialize the expansion data
	initialize: function(room, room_data) {
		return room_data;
	},
	//returns if the room is suitable for a expansion
	testRoom: function(room) {
		let suitable = true;
		return suitable;
	},
	plan: function(room, room_data) {
		// occasionally update the data if it is old
		return room_data;
	},
	run: function(room, room_data) {
		// execute any plans
		return room_data;
	},
};