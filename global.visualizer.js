/**
 * visualizer module that displays various stats and populations in the relevant rooms
 * @module Visualizer
 */
global.Visualizer = {
    /**
     * renders the stats in the given room
     * @param {Room} room - The room we are rendering on
     */
    render: function (room) {
        let main_memory = Util.getMainMemory();
        if (main_memory.timers["main"] != undefined) {
            // grab the times from the timer log
            let times = main_memory.timers["main"].log;
    
            // loop through all the times
            for (let i = 0; i < times.length; i++) {
                // get the height of the bar for the bar graph
                let height = (times[i] / Game.cpu.limit) * 5;
                // get the ratio for calculating the color
                let ratio = (times[i] / Game.cpu.limit) > 1 ? 1 : (times[i] / Game.cpu.limit);
                // get the color to use from the ratio of cpu used
                let color = Util.rgbToHex(Math.floor(ratio * 255), (255 - Math.floor(ratio * 255)), 0);
                // draw the bar for the bar graph
                room.visual.rect(i, 49 - height, 1, height, {fill: color});
            }
        }
        

        // grab the local population
        let pop = main_memory.populations[room.name];
        // keep track of the offset as we loop through the population
        let offset_y = 0;

        // for each role in the population
        for (let role in pop.roles) {
            // if the role has any creeps
            if (pop.roles[role] > 0) {
                // draw the role and the population of it
                room.visual.text(ROLES[role].EMOJI + ": " + pop.roles[role], 1, 1 + offset_y, {font: 0.8});
                // increment the offset
                offset_y++;
            }
        }

        // draw total population of the room
        room.visual.text("total : " + pop.total, 1, 1 + offset_y, {font: 0.8});
    },
};