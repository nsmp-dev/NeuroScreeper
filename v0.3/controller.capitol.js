module.exports = {
	NAME: "capitol",
	// initialize the capitol data
	initialize: function(room, room_data) {
		let structures = [];

		let source_plans = this.room.getSourcePlans(structures);
		let mineral_plans = this.room.getMineralPlans(structures);

		let base_location = room.findBaseLocation(structures);
		let base_plans = room.getBasePlans(structures, base_location);
		structures = structures.concat(base_plans);

		let plant_location = room.findPlantLocation(structures);
		let plant_plans = room.getPlantPlans(structures, plant_location);
		structures = structures.concat(plant_plans);

		let idle_location = room.getIdleLocation(structures);

		room_data.idle_x = idle_location.x;
		room_data.idle_y = idle_location.y;
		room_data.source_plans = source_plans;
		room_data.mineral_plans = mineral_plans;
		room_data.structures = structures;

		return room_data;
	},
	//returns if the room is suitable for a capitol
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
		room_data.mineral = {};
		room_data.construction_initialized = true;

		return room_data;
	},
};