module.exports = {
    upgradeLowestPower: function (operator) {
        let lowest_power_id = null;
        for (let power_id of POWER_INFO) {
            if (operator.powers[lowest_power_id] == null || operator.powers[lowest_power_id].level < operator.powers[power_id].level) {
                lowest_power_id = power_id;
            }
        }
        operator.upgrade(lowest_power_id);
    },
    run: function () {
        hlog("Running PowerManager...");
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
                for (let id in Game.structures) {
                    if (Game.structures[id].structureType == STRUCTURE_POWER_SPAWN && Game.structures[id].room.name == Memory.capitol_room_name) {
                        power_spawn = Game.structures[id];
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
            operator.run();
        }
    },
};