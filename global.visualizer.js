// visualizer module that displays various stats and populations in the relevant rooms
module.exports = {
    // renders the stats in the given room
    render: function (room, room_data) {
        let times = Memory.timer_log;

        for (let i = 0; i < times.length; i++) {
            let height = (times[i] / Game.cpu.limit) * 5;
            room.visual.rect(i, 49 - height, 1, height, {fill: '#ffffff'});
        }

        let pop = Memory.populations[room.name];
        let offset_y = 0;

        for (let role in pop) {
            room.visual.text(role + ": " + pop[role], 10, 10 + offset_y, {font: 0.8});
            offset_y++;
        }
    },
};