/**
 * This module manages a power squad team that collects power from power banks in highway rooms.
 * Uses a PowerSquad object to track squad state and member information.
 * Contains a state machine to systematically search highway rooms from a queue.
 * Monitors squad member status - resets to idle if any member dies.
 * Coordinates power collection and transport - returns to base when transporter is full.
 * @class NeuroPowerSquad
 */
class NeuroPowerSquad {
    /**
     * find any new highways and add them to the queue
     * @param power_squad
     */
    getNewHighways (power_squad) {
        // grab the main memory
        let main_memory = util.getMainMemory();
        // loop through the rooms we have seen so far
        for (let room_name in main_memory.room_data) {
            // if the room is a highway, and the room is not in the queue or the log
            if (main_memory.room_data[room_name].type == HIGHWAY && !power_squad.highway_queue.includes(room_name) && !power_squad.highway_log.includes(room_name)) {
                // add the room to the queue
                power_squad.highway_queue.push(room_name);
            }
        }
    }
    /**
     * validate that the creeps are still alive and valid
     * @param {PowerSquad} power_squad
     * @returns {PowerSquadCreeps|null}
     */
    validateCreeps (power_squad) {
        // grab the power attacker
        let power_attacker = Game.getObjectById(power_squad.power_attacker);
        // grab the power healer
        let power_healer = Game.getObjectById(power_squad.power_healer);
        // grab the power transporter
        let power_transporter = Game.getObjectById(power_squad.power_transporter);

        // if any of the creeps are not valid
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

            // if all the creeps are found
            if (found_power_attacker != null && found_power_healer != null && found_power_transporter != null) {
                // return the creeps
                return new PowerSquadCreeps(found_power_attacker, found_power_healer, found_power_transporter);
            } else {
                // invalidate the power attacker cache
                power_squad.power_attacker = null;
                // invalidate the power healer cache
                power_squad.power_healer = null;
                // invalidate the power transporter cache
                power_squad.power_transporter = null;
                // set the power squad to idle
                power_squad.state = STATES.IDLE;
                // exit the function
                return null;
            }
        }
    }
    /**
     * run the power squad, kicking off sub-functions for specific activities
     * @param {PowerSquad} power_squad - The power squad we are running
     */
    run (power_squad) {
        // check for any new highways
        this.getNewHighways(power_squad);

        // grab the creeps and validate them
        let creeps = this.validateCreeps(power_squad);

        // if the creeps were found
        if (creeps != null) {
            // if the power squad is searching
            if (power_squad.state == STATES.SEARCHING) {
                // if the queue is empty
                if (power_squad.highway_queue.length == 0) {
                    // if the log is non-empty
                    if (power_squad.highway_log.length > 0) {
                        // push a room from the log onto the queue
                        power_squad.highway_queue.push(power_squad.highway_log.shift());
                    } else {
                        // set the power squad to idle
                        power_squad.state = STATES.IDLE;
                        // exit the function
                        return;
                    }
                }
                // grab the next room in the queue
                let next_room = power_squad.highway_queue[0];
                // if all the creeps are in the next room in the queue
                if (creeps.power_attacker.room.name == next_room && creeps.power_healer.room.name == next_room && creeps.power_transporter.room.name == next_room) {
                    // shift the next room in the queue onto the log
                    power_squad.highway_log.push(power_squad.highway_queue.shift());
                    /**
                     * find any power banks in the room
                     * @type {StructurePowerBank[]}
                     */
                    let power_banks = creeps.power_attacker.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_POWER_BANK}});
                    // if any power banks are found
                    if (power_banks.length > 0) {
                        // set the power squad to collectins
                        power_squad.state = STATES.COLLECTING;
                    }
                }

            }
            // if the power squad is collecting
            if (power_squad.state == STATES.COLLECTING) {
                // if the power transporter is full
                if (creeps.power_transporter.store.getUsedCapacity() == 0) {
                    // set the power squad's return room to the nearest colony
                    power_squad.return_room_name = creeps.power_transporter.findNearestColony();
                    // set the power squad to returning
                    power_squad.state = STATES.RETURNING;
                } else {
                    /**
                     * find any power banks in the room
                     * @type {StructurePowerBank[]}
                     */
                    let power_banks = creeps.power_attacker.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_POWER_BANK}});
                    // if any power banks are found
                    if (power_banks.length == 0) {
                        // set the power squad to searching
                        power_squad.state = STATES.SEARCHING;
                    }
                }
            }
            // if the power squad is returning
            if (power_squad.state == STATES.RETURNING) {
                // if the power transporter is empty
                if (creeps.power_transporter.store.getUsedCapacity() == 0) {
                    // set the power squad to searching
                    power_squad.state = STATES.SEARCHING;
                }
            }
        }
    }
}

// export the NeuroPowerSquad class
global.NeuroPowerSquad = NeuroPowerSquad;

/**
 * Global singleton instance of NeuroPowerSquad class.
 * @constant {NeuroPowerSquad} neuro_power_squad
 */
global.neuro_power_squad = new NeuroPowerSquad();