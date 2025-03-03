// logger module: has tools for logging things and can be shut off for easy debugging
module.exports = {
	// sets whether to print or not to clean up the console
	DEBUG_MODE: true,
	// regular logging, simply logs to console
	log: function(str){
		if (this.DEBUG_MODE) {
			console.log(str);
		}
	},
	// stringifies the given object and logs it to the console
	print: function(obj){
		if (this.DEBUG_MODE) {
			console.log(JSON.stringify(obj));
		}
	},
	// prints a summary of various stats to the console
	printSummary: function(){
		let str = "";
		str += "tick: " + Game.time;
		str += " | cpu used: " + Game.cpu.getUsed();
		str += " | bucket: " + Game.cpu.bucket;
		str += " | avg cpu: " + Memory.average_time;
		console.log(str);
	},
};