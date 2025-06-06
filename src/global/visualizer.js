/**
 * Visualizer object that provides functionality for rendering game statistics and managing visual elements in rooms.
 * It handles CPU usage visualization through bar graphs, population statistics display, and temporary popup messages.
 * Works in conjunction with the Timer utility to display performance metrics and game state information.
 * @class Visualizer
 */
class Visualizer {
    constructor(){}
    /**
     * renders the population of the given room
     * @param {Room} room - The room we are rendering on
     * @returns {number} The offset to start rendering at
     */
    renderPopulation(room){
        // get the MainMemory object
        let main_memory = util.getMainMemory();
        // grab the local population
        let pop = main_memory.populations[room.name];
        // keep track of the offset as we loop through the population
        let offset_y = 0;

        // print a header for the population
        room.visual.text("Population:", 1, 1 + offset_y, {font: 0.8});
        // increment the offset
        offset_y++;

        // if the population is defined
        if (pop != undefined) {
            // for each role in the population
            for (let role in pop.roles) {
                // if the role has any creeps
                if (pop.roles[role] > 0) {
                    // draw the role and the population of it
                    room.visual.text(ROLES[role].emoji + ": " + pop.roles[role], 2, 1 + offset_y, {font: 0.8});
                    // increment the offset
                    offset_y++;
                }
            }

            // draw total population of the room
            room.visual.text("Total: " + pop.total, 2, 1 + offset_y, {font: 0.8});
        }
        // return the offset
        return offset_y;
    }
    /**
     * renders the main timer log
     * @param {Room} room - The room we are rendering on
     */
    renderTimerLog(room){
        // get the MainMemory object
        let main_memory = util.getMainMemory();
        // if the main timer is defined
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
                let color = util.rgbToHex(Math.floor(ratio * 255), (255 - Math.floor(ratio * 255)), 0);
                // draw the bar for the bar graph
                room.visual.rect(i, ROOM_SIZE - 1 - height, 1, height, {fill: color});
            }
        }
    }
    /**
     * renders the timers of the given room
     * @param {Room} room - The room we are rendering on
     * @param {number} offset_y - The offset to start rendering at
     * @returns {number} The offset to start rendering at
     */
    renderTimers(room, offset_y){
        // get the MainMemory object
        let main_memory = util.getMainMemory();
        // grab the room data
        let room_data = room.room_data;
        // print a header for the timers
        room.visual.text("Timers:", 1, 1 + offset_y, {font: 0.8});
        // increment the offset
        offset_y++;
        // print the global population timer
        room.visual.text("Count Population: " + main_memory.population_timer, 2, 1 + offset_y, {font: 0.8});
        // increment the offset
        offset_y++;
        // print the room request creeps timer
        room.visual.text("Request Creeps: " + room_data.population_timer, 2, 1 + offset_y, {font: 0.8});
        // increment the offset
        offset_y++;
        // print the construction timer
        room.visual.text("Construction: " + room_data.construction_timer, 2, 1 + offset_y, {font: 0.8});
        // increment the offset
        offset_y++;
        // print the power squad timer
        room.visual.text("Power Squad: " + room_data.power_squad_timer, 2, 1 + offset_y, {font: 0.8});
        // increment the offset
        offset_y++;

        // if the room has plant data
        if (room_data.plant_data != null) {
            // print the lab's timer
            room.visual.text("Labs: " + room_data.plant_data.labs_timer, 2, 1 + offset_y, {font: 0.8});
            // increment the offset
            offset_y++;
            // print the factory timer
            room.visual.text("Factory: " + room_data.plant_data.factory_timer, 2, 1 + offset_y, {font: 0.8});
            // increment the offset
            offset_y++;
        }
        // return the offset
        return offset_y;
    }
    /**
     * renders the controller progress of the given room
     * @param {Room} room - The room we are rendering on
     * @param {number} offset_y - The offset to start rendering at
     */
    renderProgress(room, offset_y){
        // if the controller is level 8 (max level)
        if (room.controller.level == 8) {
            // exit the function
            return;
        }
        // grab the room data
        let room_data = room.room_data;
        // grab the progress log
        let progress_log = room_data.progress_log;
        // calculate the progress per tick
        let progress_per_tick = (progress_log[progress_log.length] - progress_log[0]) / progress_log.length;
        // calculate the ticks until the controller levels up
        let ticks_until_level_up = (room.controller.progressTotal - room.controller.progress) / progress_per_tick;
        // render the progress per tick
        room.visual.text("progress per tick: " + progress_per_tick, 1, 1 + offset_y, {font: 0.8});
        // increment the offset
        offset_y++;
        // render the ticks until level up
        room.visual.text("ticks until level up: " + ticks_until_level_up, 1, 1 + offset_y, {font: 0.8});
        // increment the offset
        offset_y++;
    }
    /**
     * renders the popups
     * @param {Room} room - The room we are rendering on
     */
    renderPopups(room){
        // get the MainMemory object
        let main_memory = util.getMainMemory();
        // keep track of the offset as we loop through the population
        let offset_y = 0;
        // for each popup message in the list of popups
        for (let i = 0; i < main_memory.popup_messages.length; i++) {
            // if this popup message has expired
            if (main_memory.popup_messages[i].timer > POPUP_TIMER_LIMIT) {
                // remove it from the list of popups
                main_memory.popup_messages.splice(i, 1);
                // decrement the i so we don't skip over the next one
                i--;
            }else{
                // draw the popup message
                room.visual.text(main_memory.popup_messages[i].text, 25, 1 + offset_y, {
                    font: 0.8,
                    // adjust the opacity based on how long it has been showing
                    opacity: (1 - (main_memory.popup_messages[i].timer / POPUP_TIMER_LIMIT)),
                });
                // increment the timer for this popup message
                main_memory.popup_messages[i].timer++;
                // increment the offset
                offset_y++;
            }
        }
    }
    /**
     * renders the stats in the given room
     * @param {Room} room - The room we are rendering on
     */
    render (room) {
        // render the main timer log
        this.renderTimerLog(room);
        // render the population of the room
        let offset_y = this.renderPopulation(room);
        // render the timers of the room
        offset_y = this.renderTimers(room, offset_y);
        // render the controller progress of the room
        this.renderProgress(room, offset_y);
        // render the popups
        this.renderPopups(room);
    }
    /**
     * add a popup message to the list of popups
     * @param {string} text - the text to display
     */
    popup (text) {
        // get the MainMemory object
        let main_memory = util.getMainMemory();
        // add the popup message to the list of popups
        main_memory.popup_messages.push(new PopupMessage(text));
    }
}

// export the Visualizer class
global.Visualizer = Visualizer;

/**
 * Global singleton instance of Visualizer class.
 * @constant {Visualizer} visualizer
 */
global.visualizer = new Visualizer();
