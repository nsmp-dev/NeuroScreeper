/**
 * test description
 * @class StructureTower
 */

/**
 * Executes the tower's main operational cycle. The tower performs the following tasks in priority order:
 * 1. Attacks hostile creeps in the room
 * 2. Heals damaged friendly creeps
 * 3. Repairs damaged structures (excluding roads and ramparts)
 * 4. Repairs damaged roads
 * 5. Repairs damaged ramparts
 * Will only operate if energy levels are above a minimum threshold.
 * @memberOf StructureTower#
 */
StructureTower.prototype.run = function () {
    // if the tower has less than 100 energy resources
    if (this.store[RESOURCE_ENERGY] < TOWER_MINIMUM_ENERGY) {
        // return and wait for more energy
        return;
    }

    // find all the creeps in the room
    let creeps = this.room.find(FIND_CREEPS);
    // create a list of targets
    let targets = [];

    // loop through the creeps
    for (let i = 0; i < creeps.length; i++) {
        // if the creep is an enemy that is alive
        if (!creeps[i].my && creeps[i].hits > 0) {
            // add the creep to the target list
            targets.push(creeps[i]);
        }
    }

    // if the list of targets is not empty
    if (targets.length > 0) {
        // sort the targets by hits remaining
        targets.sort((a, b) => a.hits - b.hits);
        // attack the lowest hits target
        this.attack(targets[0]);
        // exit the function
        return;
    }

    // loop through the creeps
    for (let i = 0; i < creeps.length; i++) {
        // if the creep is ours and is damaged
        if (creeps[i].my && creeps[i].hits < creeps[i].hitsMax) {
            // add the creep to the list of targets
            targets.push(creeps[i]);
        }
    }

    // if the list of targets is not empty
    if (targets.length > 0) {
        //sort by lowest % health
        targets.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));
        // heal the lowest health creep
        this.heal(targets[0]);
        // exit the function
        return;
    }

    // find all the structures in the room
    let structures = this.room.find(FIND_MY_STRUCTURES);

    // loop through the structures
    for (let i = 0; i < structures.length; i++) {
        // if the structure is not a road
        if (structures[i].structureType !== STRUCTURE_ROAD &&
            // and not a rampart
            structures[i].structureType !== STRUCTURE_RAMPART &&
            // and damaged
            structures[i].hits < structures[i].hitsMax) {
            // add it to the list of targets
            targets.push(structures[i]);
        }
    }

    // if the list of targets is not empty
    if (targets.length > 0) {
        // sort by the lowest % health
        targets.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));
        // repair the lowest health % structure
        this.repair(targets[0]);
        // exit the function
        return;
    }

    // loop through the structures
    for (let i = 0; i < structures.length; i++) {
        // if the structure is a road
        if (structures[i].structureType == STRUCTURE_ROAD &&
            // and damaged
            structures[i].hits < structures[i].hitsMax) {
            // add the structure to the list of targets
            targets.push(structures[i]);
        }
    }

    // if the list of targets is not empty
    if (targets.length > 0) {
        // sort the targets by hits remaining
        targets.sort((a, b) => a.hits - b.hits);
        // repair the lowest hits remaining structure
        this.repair(targets[0]);
        // exit the function
        return;
    }

    // loop through the structures
    for (let i = 0; i < structures.length; i++) {
        // if the structure is a rampart
        if (structures[i].structureType == STRUCTURE_RAMPART &&
            // and damaged
            structures[i].hits < structures[i].hitsMax) {
            // add the rampart to the list of targets
            targets.push(structures[i]);
        }
    }

    // if the list of targets is not empty
    if (targets.length > 0) {
        // sort the targets by hits remaining
        targets.sort((a, b) => a.hits - b.hits);
        // repair the lowest hits remaining rampart
        this.repair(targets[0]);
    }
};
