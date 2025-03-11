module.exports = {
    upgradeLowestPower: function (operator) {
        let lowest_power_id = null;
        for (let power_id of operator.powers) {
            if (operator.powers[lowest_power_id] == null || operator.powers[lowest_power_id].level < operator.powers[power_id].level) {
                lowest_power_id = power_id;
            }
        }
        operator.upgrade(lowest_power_id);
    },
    run: function () {
        if (Game.powerCreeps["operator"] == undefined && Game.gpl.level > 0 ) {
            PowerCreep.create("operator", POWER_CLASS.OPERATOR);
        }
        let operator = Game.powerCreeps["operator"];
        if (operator.ticksToLive == undefined) {
            let power_spawns = [];
            for (let id in Game.structures) {
                if (Game.structures[id].structureType == STRUCTURE_POWER_SPAWN) {
                    power_spawns.push(Game.structures[id]);
                }
            }

            if (power_spawns.length > 0) {
                operator.spawn(power_spawns[0]);
            }
        }else{
            if (operator.level < Game.gpl.level) {
                let result = operator.upgrade(PWR_OPERATE_FACTORY);
                if (result == ERR_FULL) {
                    this.upgradeLowestPower(operator);
                }
            }
            operator.run();
        }
    },
};