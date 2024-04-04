module.exports = {
	verbose: true,
	print: function(data){
		if (this.verbose) {
			console.log(data);
		}
	},
	generateName: function(role){
		let result = role + '-';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 10; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	},
};