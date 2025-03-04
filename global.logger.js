// logger module: has tools for logging things and can be shut off for easy debugging
module.exports = {
    // sets whether to print or not to clean up the console
    DEBUG_MODE: true,
    // regular logging, simply logs to console
    /*
    log: function (str) {

        // if we have debug mode turned on
        if (this.DEBUG_MODE) {
            // print the string
            console.log(str);
        }
    },
    */
    // stringifies the given object and logs it to the console
    /*
    print: function (obj) {
        // if we have debug mode turned on
        if (this.DEBUG_MODE) {
            // print the stringified object
            console.log(JSON.stringify(obj));
        }
    },
     */
    // prints a summary of various stats to the console
    printSummary: function () {
        let str = "";
        // the current tick
        str += "tick: " + Game.time;
        // the amount of cpu used this tick
        str += " | cpu used: " + Game.cpu.getUsed();
        // the current bucket size
        str += " | bucket: " + Game.cpu.bucket;
        // the average cpu used
        str += " | avg cpu: " + Memory.average_time;
        // print the summary
        console.log(str);
    },
};