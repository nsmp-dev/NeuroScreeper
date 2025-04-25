/**
 * contains logic for running a power squad, using a PowerSquad object for storage
 * @module PowerSquadRunner
 */
global.PowerSquadRunner = {
    /**
     * run the power squad, kicking off sub-functions for specific activities
     * @param {PowerSquad} power_squad - The power squad we are running
     */
    run: function (power_squad) {
        // get the MainMemory object
        let main_memory = Util.getMainMemory();

        // loop through the rooms we have seen so far
        for (let room_name in main_memory.room_data) {
            // if the room is a highway and the room is not in the queue or the log
            if (main_memory.room_data[room_name].type == HIGHWAY && !power_squad.highway_queue.includes(room_name) && !power_squad.highway_log.includes(room_name)) {
                // add the room to the queue
                power_squad.highway_queue.push(room_name);
            }
        }

        // grab the power attacker
        let power_attacker = Game.getObjectById(power_squad.power_attacker);
        // grab the power healer
        let power_healer = Game.getObjectById(power_squad.power_healer);
        // grab the power transporter
        let power_transporter = Game.getObjectById(power_squad.power_transporter);

        // if the any of the creeps are not valid
        if (power_attacker == null || power_healer == null || power_transporter == null) {
            // default the power attacker to not found
            let found_power_attacker = null;
            // default the power healer to not found
            let found_power_healer = null;
            // default the power transporter to not found
            let found_power_transporter = null;

            // loop through the creeps in the game
            for (let name in Game.creeps) {
                // if the creep is a power attacker and part of this power squad
                if (Game.creeps[name].memory.role == PowerAttackerRole.name && power_squad.room_name) {
                    // cache the power attacker
                    found_power_attacker = Game.creeps[name];
                }
                // if the creep is a power healer and part of this power squad
                if (Game.creeps[name].memory.role == PowerHealerRole.name && power_squad.room_name) {
                    // cache the power healer
                    found_power_healer = Game.creeps[name];
                }
                // if the creep is a power transporter and part of this power squad
                if (Game.creeps[name].memory.role == PowerTransporterRole.name && power_squad.room_name) {
                    // cache the power transporter
                    found_power_transporter = Game.creeps[name];
                }
            }

            // if all of the creeps are found
            if (found_power_attacker != null && found_power_healer != null && found_power_transporter != null) {
                // cache the power attacker id
                power_squad.power_attacker = found_power_attacker.id;
                // set the power attacker
                power_attacker = found_power_attacker;
                // cache the power healer id
                power_squad.power_healer = found_power_healer.id;
                // set the power healer
                power_healer = found_power_healer;
                // cache the power transporter id
                power_squad.power_transporter = found_power_transporter.id;
                // set the power transporter
                power_transporter = found_power_transporter;
                // set the power squad to searching
                power_squad.state = STATES.SEARCHING;
            }else{
                // invalidate the power attacker cache
                power_squad.power_attacker = null;
                // invalidate the power healer cache
                power_squad.power_healer = null;
                // invalidate the power transporter cache
                power_squad.power_transporter = null;
                // set the power squad to idle
                power_squad.state = STATES.IDLE;
                // exit the function
                return;
            }
        }

        // if the power squad is searching
        if (power_squad.state == STATES.SEARCHING) {
            // if the queue is empty
            if (power_squad.highway_queue.length == 0) {
                // if the log is non-empty
                if (power_squad.highway_log.length > 0) {
                    // push a room from the log onto the queue
                    power_squad.highway_queue.push(power_squad.highway_log.shift());
                }else{
                    // set the power squad to idle
                    power_squad.state = STATES.IDLE;
                    // exit the function
                    return;
                }
            }
            // if all the creeps are in the next room in the queue
            if (power_attacker.room.name == power_squad.highway_queue[0] && power_healer.room.name == power_squad.highway_queue[0] && power_transporter.room.name == power_squad.highway_queue[0]) {
                // shift the next room in the queue onto the log
                power_squad.highway_log.push(power_squad.highway_queue.shift());
                // find any power banks in the room
                let power_banks = this.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_POWER_BANK } });
                // if any power banks are found
                if (power_banks.length > 0) {
                    // set the power squad to collectins
                    power_squad.state = STATES.COLLECTING;
                }
            }
        // if the power squad is collecting
        }else if (power_squad.state == STATES.COLLECTING) {
            // if the power transporter is full
            if (power_transporter.store.getUsedCapacity() == 0) {
                // set the power squad's return room to the nearest colony
                power_squad.return_room_name = power_transporter.getNearestColony();
                // set the power squad to returning
                power_squad.state = STATES.RETURNING;
            }else{
                // find any power banks in the room
                let power_banks = this.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_POWER_BANK } });
                // if any power banks are found
                if (power_banks.length == 0) {
                    // set the power squad to searching
                    power_squad.state = STATES.SEARCHING;
                }
            }
        // if the power squad is returning
        }else if (power_squad.state == STATES.RETURNING) {
            // if the power transporter is empty
            if (power_transporter.store.getUsedCapacity() == 0) {
                // set the power squad to searching
                power_squad.state = STATES.SEARCHING;
            }
        }
    },
};