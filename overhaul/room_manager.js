module.exports = {
	POPULATION_TIMER_LENGTH: 10,
	initialize: function() {
		Memory.room_data = {};
		Memory.population_timer = this.POPULATION_TIMER_LENGTH;
		Memory.population = {};

		// setup the starting room as a capitol/colony
	},
	countPopulation: function() {

	},
	run: function() {
		Memory.population_timer++;

		if (Memory.population_timer > this.POPULATION_TIMER_LENGTH) {
			this.countPopulation();
			Memory.population_timer = 0;
		}

		// check for new rooms
			// set their type possibilities
		
		// decide if any rooms have changed status

		// decide if we are stable
			// if stable, add a room
	},
};