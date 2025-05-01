/**
 * This module manages the operator power creep by handling:
 * - Processing energy and power through PowerSpawns
 * - Spawning a new operator when one is needed
 * - Upgrading operator powers when possible
 * - Running operator logic and actions when spawned
 * - Managing operator power cooldowns and renewal
 * @class NeuroPower
 */
class NeuroPower {
    constructor() {}
    /**
     * upgrades the operator's lowest level power
     * @param {PowerCreep} operator - The operator we are upgrading
     */
    upgradeLowestPower (operator) {
        // variable for the lowest level power
        let lowest_power_id = null;
        // loop through every power
        for (let power_id of POWER_INFO) {
            // if this is the first power, or the operator doesn't have this power, or it's a lower level than the lowest
            if (lowest_power_id == null || operator.powers[lowest_power_id] == null || operator.powers[lowest_power_id].level < operator.powers[power_id].level) {
                // save the new lowest power id
                lowest_power_id = power_id;
            }
        }
        // upgrade the lowest power
        operator.upgrade(lowest_power_id);
    }
    runPowerSpawns () {
        // make a list for the power spawns
        let power_spawns = [];
        // loop through all the structures
        for (let id in Game.structures) {
            // if this structure is a PowerSpawn
            if (Game.structures[id].structureType == STRUCTURE_POWER_SPAWN) {
                // grab the PowerSpawn
                let power_spawn = Game.structures[id];
                // add it to the list of PowerSpawns
                power_spawns.push(power_spawn);
                // if the PowerSpawn has enough power and energy to process it
                if (power_spawn.store[RESOURCE_POWER] > 0 && power_spawn.store[RESOURCE_ENERGY] >= POWER_SPAWN_ENERGY_RATIO) {
                    // process the power in the PowerSpawn
                    power_spawn.processPower();
                }
            }
        }

        return power_spawns;
    }
    /**
     * Manages the operator and handles spawning/upgrading/renewing the operator
     */
    run () {
        // get the MainMemory object
        let main_memory = util.getMainMemory();
        // make a list for the power spawns
        let power_spawns = this.runPowerSpawns();
        // if we have not created an operator before, and we have the level needed for it
        if (Game.powerCreeps["operator"] == undefined && Game.gpl.level > 0) {
            visualizer.popup("Created the operator!");
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
            if (main_memory.capitol_room_name != null) {
                // variable for the capitol's power spawn
                let capitol_power_spawn = null;
                // loop through the power spawns
                for (let power_spawn of power_spawns) {
                    // if the power spawn is in the capitol room
                    if (power_spawn.room.name == main_memory.capitol_room_name) {
                        // store the power spawn
                        capitol_power_spawn = power_spawn;
                    }
                }

                // if we found a PowerSpawn in the capitol
                if (capitol_power_spawn != null) {
                    visualizer.popup("Spawned the operator!");
                    // spawn the power creep
                    operator.spawn(capitol_power_spawn);
                }
            }
        } else {
            // if the operator is lower level than the GPL
            if (operator.level < Game.gpl.level) {
                // attempt to upgrade the factory power
                let result = operator.upgrade(PWR_OPERATE_FACTORY);
                // if the upgrade failed due to the factory power being full
                if (result == ERR_FULL) {
                    // upgrade the lowest level power instead
                    this.upgradeLowestPower(operator);
                }
                visualizer.popup("Upgraded the operator!");
            }
            // run the operator, passing the appropriate plant data
            operator.runOperator(main_memory.room_data[operator.room.name].plant_data);
        }
    }
}

global.NeuroPower = NeuroPower;

global.neuro_power = new NeuroPower();