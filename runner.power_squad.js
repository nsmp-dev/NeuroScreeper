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
        for (let room_name in Memory.room_data) {
            if (Memory.room_data[room_name].type == HIGHWAY && !power_squad.highway_queue.includes(room_name) && !power_squad.highway_log.includes(room_name)) {
                power_squad.highway_queue.push(room_name);
            }
        }

        let power_attacker = Game.getObjectById(power_squad.power_attacker);
        let power_healer = Game.getObjectById(power_squad.power_healer);
        let power_transporter = Game.getObjectById(power_squad.power_transporter);

        if (power_attacker == null || power_healer == null || power_transporter == null) {
            let found_power_attacker = null;
            let found_power_healer = null;
            let found_power_transporter = null;

            for (let name in Game.creeps) {
                if (Game.creeps[name].memory.role == POWER_ATTACKER.NAME && power_squad.room_name) {
                    found_power_attacker = Game.creeps[name];
                }
                if (Game.creeps[name].memory.role == POWER_HEALER.NAME && power_squad.room_name) {
                    found_power_healer = Game.creeps[name];
                }
                if (Game.creeps[name].memory.role == POWER_TRANSPORTER.NAME && power_squad.room_name) {
                    found_power_transporter = Game.creeps[name];
                }
            }

            if (found_power_attacker != null && found_power_healer != null && found_power_transporter != null) {
                power_squad.power_attacker = found_power_attacker.id;
                power_attacker = found_power_attacker;
                power_squad.power_healer = found_power_healer.id;
                power_healer = found_power_healer;
                power_squad.power_transporter = found_power_transporter.id;
                power_transporter = found_power_transporter;
                power_squad.state = STATES.SEARCHING;
            }else{
                power_squad.power_attacker = null;
                power_squad.power_healer = null;
                power_squad.power_transporter = null;
                power_squad.state = STATES.IDLE;
                return;
            }
        }

        if (power_squad.state == STATES.SEARCHING) {
            if (power_squad.highway_queue.length == 0) {
                if (power_squad.highway_log.length > 0) {
                    power_squad.highway_queue.push(power_squad.highway_log.shift());
                }else{
                    power_squad.state = STATES.IDLE;
                    return;
                }
            }
            if (power_attacker.room.name == power_squad.highway_queue[0] && power_healer.room.name == power_squad.highway_queue[0] && power_transporter.room.name == power_squad.highway_queue[0]) {
                power_squad.highway_log.push(power_squad.highway_queue.shift());
                let power_banks = this.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_POWER_BANK } });
                if (power_banks.length > 0) {
                    power_squad.state = STATES.COLLECTING;
                }
            }
        }else if (power_squad.state == STATES.COLLECTING) {
            if (power_transporter.store.getUsedCapacity() == 0) {
                power_squad.return_room_name = power_transporter.getNearestColony();
                power_squad.state = STATES.RETURNING;
            }else{
                let power_banks = this.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_POWER_BANK } });
                if (power_banks.length == 0) {
                    power_squad.state = STATES.SEARCHING;
                }
            }
        }else if (power_squad.state == STATES.RETURNING) {
            if (power_transporter.store.getUsedCapacity() == 0) {
                power_squad.state = STATES.SEARCHING;
            }
        }
    },
};