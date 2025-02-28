module.exports = {
	DEBUG_MODE: false,
	log: function(str){
		if (this.DEBUG_MODE) {
			console.log(str);
		}
	},
	print: function(obj){
		if (this.DEBUG_MODE) {
			console.log(JSON.stringify(obj));
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