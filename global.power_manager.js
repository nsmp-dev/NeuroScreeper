/** @module PowerManager */
module.exports = {
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {PowerCreep} operator - The Room we are planning
     */
    upgradeLowestPower: function (operator) {
        let lowest_power_id = null;
        for (let power_id of POWER_INFO) {
            if (operator.powers[lowest_power_id] == null || operator.powers[lowest_power_id].level < operator.powers[power_id].level) {
                lowest_power_id = power_id;
            }
        }
        operator.upgrade(lowest_power_id);
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     */
    run: function () {
        hlog("Running PowerManager...");
        let power_spawns = [];
        for (let id in Game.structures) {
            if (Game.structures[id].structureType == STRUCTURE_POWER_SPAWN) {
                let power_spawn = Game.structures[id];
                power_spawns.push(power_spawn);
                if (power_spawn.store[RESOURCE_POWER] > 0 && power_spawn.store[RESOURCE_POWER] >= 50) {
                    power_spawn.processPower();
                }
            }
        }
        if (Game.powerCreeps["operator"] == undefined && Game.gpl.level > 0 ) {
            hlog("Creating PowerCreep...");
            PowerCreep.create("operator", POWER_CLASS.OPERATOR);
        }
        let operator = Game.powerCreeps["operator"];
        if (operator == undefined) {
            return;
        }
        if (operator.ticksToLive == undefined) {
            if (Memory.capitol_room_name != null) {
                let power_spawn = null;
                for (let test_power_spawn of power_spawns) {
                    if (test_power_spawn.room.name == Memory.capitol_room_name) {
                        power_spawn = test_power_spawn;
                    }
                }

                if (power_spawn != null) {
                    hlog("Spawning power creep...");
                    operator.spawn(power_spawn);
                }
            }
        }else{
            if (operator.level < Game.gpl.level) {
                hlog("Upgrading PowerCreep...");
                let result = operator.upgrade(PWR_OPERATE_FACTORY);
                if (result == ERR_FULL) {
                    this.upgradeLowestPower(operator);
                }
            }
            hlog("Running PowerCreep...");
            operator.run(Memory.room_data[operator.room.name].plant_data);
        }
    },
};