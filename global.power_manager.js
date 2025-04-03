/** @module PowerManager */
module.exports = {
    /**
     * upgrades the operator's lowest level power
     * @param {PowerCreep} operator - The operator we are upgrading
     */
    upgradeLowestPower: function (operator) {
        // variable for the lowest level power
        let lowest_power_id = null;
        // loop through every power
        for (let power_id of POWER_INFO) {
            // if this is the first power or the operator doesn't have this power or it's a lower level than the lowest
            if (lowest_power_id == null || operator.powers[lowest_power_id] == null || operator.powers[lowest_power_id].level < operator.powers[power_id].level) {
                // save the new lowest power id
                lowest_power_id = power_id;
            }
        }
        // upgrade the lowest power
        operator.upgrade(lowest_power_id);
    },
    /**
     * Manages the operator and handles spawning/upgrading/renewing the operator
     */
    run: function () {
        hlog("Running PowerManager...");
        // make a list for the power spawns
        let power_spawns = [];
        // loop through all the structures
        for (let id in Game.structures) {
            // if this structure is a power spawn
            if (Game.structures[id].structureType == STRUCTURE_POWER_SPAWN) {
                // grab the power spawn
                let power_spawn = Game.structures[id];
                // add it to the list of power spawns
                power_spawns.push(power_spawn);
                // if the power spawn has enough power and energy to process it
                if (power_spawn.store[RESOURCE_POWER] > 0 && power_spawn.store[RESOURCE_ENERGY] >= 50) {
                    // process the power in the power spawn
                    power_spawn.processPower();
                }
            }
        }
        // if we have not created an operator before and we have the level needed for it
        if (Game.powerCreeps["operator"] == undefined && Game.gpl.level > 0 ) {
            hlog("Creating PowerCreep...");
            // create the operator power creep
            PowerCreep.create("operator", POWER_CLASS.OPERATOR);
        }
        // grab the operator
        let operator = Game.powerCreeps["operator"];
        // if the operator is still not created
        if (operator == undefined) {
            // exit the function
            return;
        }
        // if the operator is created but not spawned
        if (operator.ticksToLive == undefined) {
            // if we have a capitol room
            if (Memory.capitol_room_name != null) {
                // variable for the capitol's power spawn
                let capitol_power_spawn = null;
                // loop through the power spawns
                for (let power_spawn of power_spawns) {
                    // if the power spawn is in the capitol room
                    if (power_spawn.room.name == Memory.capitol_room_name) {
                        // store the power spawn
                        capitol_power_spawn = power_spawn;
                    }
                }

                // if we found a power spawn in the capitol
                if (capitol_power_spawn != null) {
                    hlog("Spawning power creep...");
                    // spawn the power creep
                    operator.spawn(capitol_power_spawn);
                }
            }
        }else{
            // if the operator is lower level than the GPL
            if (operator.level < Game.gpl.level) {
                hlog("Upgrading PowerCreep...");
                // attempt to upgrade the factory power
                let result = operator.upgrade(PWR_OPERATE_FACTORY);
                // if the upgrade failed due to the factory power being full
                if (result == ERR_FULL) {
                    // upgrade the lowest level power instead
                    this.upgradeLowestPower(operator);
                }
            }
            hlog("Running PowerCreep...");
            // run the operator, passing the appropriate plant data
            operator.run(Memory.room_data[operator.room.name].plant_data);
        }
    },
};