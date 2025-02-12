if (Memory.DEBUG_MODE == undefined) {
	Memory.DEBUG_MODE = true;
}

module.exports = {
	log: function(str){
		if (Memory.DEBUG_MODE) {
			console.log(str);
		}
	},

	printSummary: function(){
		let str = "";
		str += "tick: " + Game.time;
		str += " | cpu used: " + Game.cpu.getUsed();
		str += " | bucket: " + Game.cpu.bucket;
		str += " | avg cpu: " + Memory.average_time;
		console.log(str);
	},
};