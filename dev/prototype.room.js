Room.prototype.getMineralPlans = function (structures) {
    // create the list of source plans
    let mineral_plans = [];
    // find all the sources in the room
    let minerals = this.find(FIND_MINERALS);

    // loop through the sources
    for (let mineral of minerals) {
        // find an adjacent space to put the container
        let container_location = this.getClearAdjacentLocation(mineral.pos.x, mineral.pos.y, structures);

        // add the plans to the plans list
        mineral_plans.push({
            // id of the source
            mineral_id: mineral.id,
            // x coordinate of the container
            mineral_x: mineral.pos.x,
            // y coordinate of the container
            mineral_y: mineral.pos.y,
            // x coordinate of the container
            container_x: container_location.x,
            // y coordinate of the container
            container_y: container_location.y,
        });
    }

    // return the source plans
    return mineral_plans;
};
Room.prototype.findPlantLocation = function (structures) {
    return this.getClearArea(14, 14, structures);
};
Room.prototype.getPlantPlans = function (plant_location, structures) {
// get the base x coordinate
    let x = plant_location.x;
    // get the base y coordinate
    let y = plant_location.y;
    // create the list of structures
    let new_structures = [
        // coordinates and type of the structure
        {x: x, y: y, type: STRUCTURE_POWER_SPAWN},
        {x: x, y: y + 2, type: STRUCTURE_FACTORY},
        {x: x + 2, y: y, type: STRUCTURE_LAB},
        {x: x + 3, y: y + 1, type: STRUCTURE_LAB},
        {x: x + 2, y: y + 2, type: STRUCTURE_LAB},
        {x: x + 1, y: y, type: STRUCTURE_ROAD},
        {x: x + 3, y: y, type: STRUCTURE_ROAD},
        {x: x, y: y + 1, type: STRUCTURE_ROAD},
        {x: x + 1, y: y + 1, type: STRUCTURE_ROAD},
        {x: x + 2, y: y + 1, type: STRUCTURE_ROAD},
        {x: x + 1, y: y + 2, type: STRUCTURE_ROAD},
        {x: x + 3, y: y + 2, type: STRUCTURE_ROAD},
    ];

    // concat the structure lists together
    return structures.concat(new_structures);
};
Room.prototype.getStructureAt = function (structure_type, x, y) {
    let structures = this.lookForAt(LOOK_STRUCTURES, x, y);
    for (let structure in structures) {
        if (structure.structureType == structure_type) {
            return structure;
        }
    }
    return null;
};