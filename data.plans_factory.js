/** @module PlansFactory */
module.exports = {
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     * @param {StructureSpawn} initial_spawn - The initial spawn in the room.
     */
    planFirstRoom: function (room, plans, initial_spawn) {
        // plan the sources in the room and their containers
        this.planSources(room, plans);
        // plan the minerals in the room, if any, and their containers
        this.planMinerals(room, plans);
        // manually set the x location of the base using the provided initial spawn
        plans.base_x = initial_spawn.pos.x - 5;
        // manually set the y location of the base using the provided initial spawn
        plans.base_y = initial_spawn.pos.y - 6;

        // fill the base with plans for the structures based on the base location
        this.planBase(room, plans);
        // locate a suitable location to place a plant
        this.planPlantLocation(room, plans);
        // fill the plant with plans for the structures based on the plant location
        this.planPlant(room, plans);
        // find a location that is not around anything to send the idle creeps in the room
        this.planIdleLocation(room, plans);
    },
    /**
     * start the planning of a room, the new plans will be added to the passed plans object
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planRoom: function (room, plans) {
        // plan the sources in the room and their containers
        this.planSources(room, plans);
        // plan the minerals in the room, if any, and their containers
        this.planMinerals(room, plans);
        // locate a suitable location to place a base
        this.planBaseLocation(room, plans);
        // fill the base with plans for the structures based on the base location
        this.planBase(room, plans);
        // locate a suitable location to place a plant
        this.planPlantLocation(room, plans);
        // fill the plant with plans for the structures based on the plant location
        this.planPlant(room, plans);
        // find a location that is not around anything to send the idle creeps in the room
        this.planIdleLocation(room, plans);
    },
    /**
     * plan the sources in the room and their containers
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planSources: function (room, plans) {
        // find all the sources in the room
        let sources = room.find(FIND_SOURCES);

        // loop through the sources
        for (let source of sources) {
            // find an adjacent space to put the container
            let container_location = room.getClearAdjacentLocation(source.pos.x, source.pos.y, plans);

            // add the plans to the plans list
            plans.sources.push({
                // id of the source
                source_id: source.id,
                // x coordinate of the container
                container_x: container_location.x,
                // y coordinate of the container
                container_y: container_location.y,
            });
        }
    },
    /**
     * plan the minerals in the room, if any, and their containers
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planMinerals: function (room, plans) {
        // find all the sources in the room
        let minerals = room.find(FIND_MINERALS);

        // loop through the sources
        for (let mineral of minerals) {
            // find an adjacent space to put the container
            let container_location = room.getClearAdjacentLocation(mineral.pos.x, mineral.pos.y, plans);

            // add the plans to the plans list
            plans.minerals.push({
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
    },
    /**
     * locate a suitable location to place a base
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planBaseLocation: function (room, plans) {
        // find a clear area of size 14 x 14
        let base_location = room.getClearArea(14, 14, plans);
        // if we were able to find a location
        if (base_location != null) {
            // save the x coordinate of the base
            plans.base_x = base_location.x;
            // save the y coordinate of the base
            plans.base_y = base_location.y;
        }
    },
    /**
     * fill the base with plans for the structures based on the base location
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planBase: function (room, plans) {
        // if we were unable to find a base location
        if (plans.base_x == null) {
            // exit the function
            return;
        }
        // get the base x coordinate
        let x = plans.base_x;
        // get the base y coordinate
        let y = plans.base_y;
        // add to the list of structures
        plans.structures = plans.structures.concat([
            // coordinates and type of the structure
            {x: x + 1, y: y, type: STRUCTURE_EXTENSION},
            {x: x + 5, y: y, type: STRUCTURE_EXTENSION},
            {x: x + 7, y: y, type: STRUCTURE_EXTENSION},
            {x: x + 11, y: y, type: STRUCTURE_EXTENSION},
            {x: x, y: y + 1, type: STRUCTURE_EXTENSION},
            {x: x + 2, y: y + 1, type: STRUCTURE_EXTENSION},
            {x: x + 3, y: y + 1, type: STRUCTURE_EXTENSION},
            {x: x + 5, y: y + 1, type: STRUCTURE_EXTENSION},
            {x: x + 7, y: y + 1, type: STRUCTURE_EXTENSION},
            {x: x + 9, y: y + 1, type: STRUCTURE_EXTENSION},
            {x: x + 10, y: y + 1, type: STRUCTURE_EXTENSION},
            {x: x + 12, y: y + 1, type: STRUCTURE_EXTENSION},
            {x: x + 1, y: y + 2, type: STRUCTURE_EXTENSION},
            {x: x + 3, y: y + 2, type: STRUCTURE_EXTENSION},
            {x: x + 4, y: y + 2, type: STRUCTURE_EXTENSION},
            {x: x + 5, y: y + 2, type: STRUCTURE_EXTENSION},
            {x: x + 7, y: y + 2, type: STRUCTURE_EXTENSION},
            {x: x + 8, y: y + 2, type: STRUCTURE_EXTENSION},
            {x: x + 9, y: y + 2, type: STRUCTURE_EXTENSION},
            {x: x + 11, y: y + 2, type: STRUCTURE_EXTENSION},
            {x: x + 1, y: y + 3, type: STRUCTURE_EXTENSION},
            {x: x + 2, y: y + 3, type: STRUCTURE_EXTENSION},
            {x: x + 4, y: y + 3, type: STRUCTURE_EXTENSION},
            {x: x + 5, y: y + 3, type: STRUCTURE_EXTENSION},
            {x: x + 7, y: y + 3, type: STRUCTURE_EXTENSION},
            {x: x + 8, y: y + 3, type: STRUCTURE_EXTENSION},
            {x: x + 10, y: y + 3, type: STRUCTURE_EXTENSION},
            {x: x + 11, y: y + 3, type: STRUCTURE_EXTENSION},
            {x: x + 2, y: y + 4, type: STRUCTURE_EXTENSION},
            {x: x + 3, y: y + 4, type: STRUCTURE_EXTENSION},
            {x: x + 9, y: y + 4, type: STRUCTURE_EXTENSION},
            {x: x + 10, y: y + 4, type: STRUCTURE_EXTENSION},
            {x: x, y: y + 5, type: STRUCTURE_EXTENSION},
            {x: x + 1, y: y + 5, type: STRUCTURE_EXTENSION},
            {x: x + 2, y: y + 5, type: STRUCTURE_EXTENSION},
            {x: x + 3, y: y + 5, type: STRUCTURE_EXTENSION},
            {x: x + 9, y: y + 5, type: STRUCTURE_EXTENSION},
            {x: x + 10, y: y + 5, type: STRUCTURE_EXTENSION},
            {x: x + 11, y: y + 5, type: STRUCTURE_EXTENSION},
            {x: x + 12, y: y + 5, type: STRUCTURE_EXTENSION},
            {x: x, y: y + 7, type: STRUCTURE_EXTENSION},
            {x: x + 1, y: y + 7, type: STRUCTURE_EXTENSION},
            {x: x + 2, y: y + 7, type: STRUCTURE_EXTENSION},
            {x: x + 3, y: y + 7, type: STRUCTURE_EXTENSION},
            {x: x + 9, y: y + 7, type: STRUCTURE_EXTENSION},
            {x: x + 10, y: y + 7, type: STRUCTURE_EXTENSION},
            {x: x + 11, y: y + 7, type: STRUCTURE_EXTENSION},
            {x: x + 12, y: y + 7, type: STRUCTURE_EXTENSION},
            {x: x + 2, y: y + 8, type: STRUCTURE_EXTENSION},
            {x: x + 3, y: y + 8, type: STRUCTURE_EXTENSION},
            {x: x + 9, y: y + 8, type: STRUCTURE_EXTENSION},
            {x: x + 10, y: y + 8, type: STRUCTURE_EXTENSION},
            {x: x + 1, y: y + 9, type: STRUCTURE_EXTENSION},
            {x: x + 2, y: y + 9, type: STRUCTURE_EXTENSION},
            {x: x + 4, y: y + 9, type: STRUCTURE_EXTENSION},
            {x: x + 5, y: y + 9, type: STRUCTURE_EXTENSION},
            {x: x + 7, y: y + 9, type: STRUCTURE_EXTENSION},
            {x: x + 8, y: y + 9, type: STRUCTURE_EXTENSION},
            {x: x + 10, y: y + 9, type: STRUCTURE_EXTENSION},
            {x: x + 11, y: y + 9, type: STRUCTURE_EXTENSION},
            {x: x + 1, y: y + 10, type: STRUCTURE_EXTENSION},
            {x: x + 3, y: y + 10, type: STRUCTURE_EXTENSION},
            {x: x + 4, y: y + 10, type: STRUCTURE_EXTENSION},
            {x: x + 5, y: y + 10, type: STRUCTURE_EXTENSION},
            {x: x + 7, y: y + 10, type: STRUCTURE_EXTENSION},
            {x: x + 8, y: y + 10, type: STRUCTURE_EXTENSION},
            {x: x + 9, y: y + 10, type: STRUCTURE_EXTENSION},
            {x: x + 11, y: y + 10, type: STRUCTURE_EXTENSION},
            {x: x, y: y + 11, type: STRUCTURE_EXTENSION},
            {x: x + 2, y: y + 11, type: STRUCTURE_EXTENSION},
            {x: x + 3, y: y + 11, type: STRUCTURE_EXTENSION},
            {x: x + 5, y: y + 11, type: STRUCTURE_EXTENSION},
            {x: x + 7, y: y + 11, type: STRUCTURE_EXTENSION},
            {x: x + 9, y: y + 11, type: STRUCTURE_EXTENSION},
            {x: x + 10, y: y + 11, type: STRUCTURE_EXTENSION},
            {x: x + 12, y: y + 11, type: STRUCTURE_EXTENSION},
            {x: x + 1, y: y + 12, type: STRUCTURE_EXTENSION},
            {x: x + 5, y: y + 12, type: STRUCTURE_EXTENSION},
            {x: x + 7, y: y + 12, type: STRUCTURE_EXTENSION},
            {x: x + 11, y: y + 12, type: STRUCTURE_EXTENSION},
            {x: x + 7, y: y + 6, type: STRUCTURE_TOWER},
            {x: x + 4, y: y + 7, type: STRUCTURE_TOWER},
            {x: x + 8, y: y + 7, type: STRUCTURE_TOWER},
            {x: x + 4, y: y + 9, type: STRUCTURE_TOWER},
            {x: x + 8, y: y + 9, type: STRUCTURE_TOWER},
            {x: x + 5, y: y + 10, type: STRUCTURE_TOWER},
            {x: x + 5, y: y + 8, type: STRUCTURE_SPAWN},
            {x: x + 7, y: y + 8, type: STRUCTURE_SPAWN},
            {x: x + 6, y: y + 9, type: STRUCTURE_SPAWN},
            {x: x + 6, y: y + 7, type: STRUCTURE_STORAGE},
            {x: x + 5, y: y + 6, type: STRUCTURE_OBSERVER},
            {x: x + 7, y: y + 10, type: STRUCTURE_TERMINAL},
        ]);
        // add to the list of ramparts
        plans.ramparts = plans.ramparts.concat([
            // coordinates of ramparts
            {x: x + 1, y: y,},
            {x: x + 5, y: y,},
            {x: x + 7, y: y,},
            {x: x + 11, y: y,},
            {x: x, y: y + 1,},
            {x: x + 2, y: y + 1,},
            {x: x + 3, y: y + 1,},
            {x: x + 5, y: y + 1,},
            {x: x + 7, y: y + 1,},
            {x: x + 9, y: y + 1,},
            {x: x + 10, y: y + 1,},
            {x: x + 12, y: y + 1,},
            {x: x + 1, y: y + 2,},
            {x: x + 3, y: y + 2,},
            {x: x + 4, y: y + 2,},
            {x: x + 5, y: y + 2,},
            {x: x + 7, y: y + 2,},
            {x: x + 8, y: y + 2,},
            {x: x + 9, y: y + 2,},
            {x: x + 11, y: y + 2,},
            {x: x + 1, y: y + 3,},
            {x: x + 2, y: y + 3,},
            {x: x + 4, y: y + 3,},
            {x: x + 5, y: y + 3,},
            {x: x + 7, y: y + 3,},
            {x: x + 8, y: y + 3,},
            {x: x + 10, y: y + 3,},
            {x: x + 11, y: y + 3,},
            {x: x + 2, y: y + 4,},
            {x: x + 3, y: y + 4,},
            {x: x + 9, y: y + 4,},
            {x: x + 10, y: y + 4,},
            {x: x, y: y + 5,},
            {x: x + 1, y: y + 5,},
            {x: x + 2, y: y + 5,},
            {x: x + 3, y: y + 5,},
            {x: x + 9, y: y + 5,},
            {x: x + 10, y: y + 5,},
            {x: x + 11, y: y + 5,},
            {x: x + 12, y: y + 5,},
            {x: x, y: y + 7,},
            {x: x + 1, y: y + 7,},
            {x: x + 2, y: y + 7,},
            {x: x + 3, y: y + 7,},
            {x: x + 9, y: y + 7,},
            {x: x + 10, y: y + 7,},
            {x: x + 11, y: y + 7,},
            {x: x + 12, y: y + 7,},
            {x: x + 2, y: y + 8,},
            {x: x + 3, y: y + 8,},
            {x: x + 9, y: y + 8,},
            {x: x + 10, y: y + 8,},
            {x: x + 1, y: y + 9,},
            {x: x + 2, y: y + 9,},
            {x: x + 4, y: y + 9,},
            {x: x + 5, y: y + 9,},
            {x: x + 7, y: y + 9,},
            {x: x + 8, y: y + 9,},
            {x: x + 10, y: y + 9,},
            {x: x + 11, y: y + 9,},
            {x: x + 1, y: y + 10,},
            {x: x + 3, y: y + 10,},
            {x: x + 4, y: y + 10,},
            {x: x + 5, y: y + 10,},
            {x: x + 7, y: y + 10,},
            {x: x + 8, y: y + 10,},
            {x: x + 9, y: y + 10,},
            {x: x + 11, y: y + 10,},
            {x: x, y: y + 11,},
            {x: x + 2, y: y + 11,},
            {x: x + 3, y: y + 11,},
            {x: x + 5, y: y + 11,},
            {x: x + 7, y: y + 11,},
            {x: x + 9, y: y + 11,},
            {x: x + 10, y: y + 11,},
            {x: x + 12, y: y + 11,},
            {x: x + 1, y: y + 12,},
            {x: x + 5, y: y + 12,},
            {x: x + 7, y: y + 12,},
            {x: x + 11, y: y + 12,},
            {x: x + 7, y: y + 6,},
            {x: x + 4, y: y + 7,},
            {x: x + 8, y: y + 7,},
            {x: x + 4, y: y + 9,},
            {x: x + 8, y: y + 9,},
            {x: x + 5, y: y + 10,},
            {x: x + 5, y: y + 8,},
            {x: x + 7, y: y + 8,},
            {x: x + 6, y: y + 9,},
            {x: x + 6, y: y + 7,},
            {x: x + 5, y: y + 6,},
            {x: x + 7, y: y + 10,},
            {x: x, y: y,},
            {x: x + 6, y: y,},
            {x: x + 12, y: y,},
            {x: x + 1, y: y + 1,},
            {x: x + 6, y: y + 1,},
            {x: x + 11, y: y + 1,},
            {x: x + 2, y: y + 2,},
            {x: x + 6, y: y + 2,},
            {x: x + 10, y: y + 2,},
            {x: x + 3, y: y + 3,},
            {x: x + 6, y: y + 3,},
            {x: x + 9, y: y + 3,},
            {x: x + 4, y: y + 4,},
            {x: x + 6, y: y + 4,},
            {x: x + 8, y: y + 4,},
            {x: x + 5, y: y + 5,},
            {x: x + 7, y: y + 5,},
            {x: x, y: y + 6,},
            {x: x + 1, y: y + 6,},
            {x: x + 2, y: y + 6,},
            {x: x + 3, y: y + 6,},
            {x: x + 4, y: y + 6,},
            {x: x + 6, y: y + 6,},
            {x: x + 8, y: y + 6,},
            {x: x + 9, y: y + 6,},
            {x: x + 10, y: y + 6,},
            {x: x + 11, y: y + 6,},
            {x: x + 12, y: y + 6,},
            {x: x + 5, y: y + 7,},
            {x: x + 7, y: y + 7,},
            {x: x + 4, y: y + 8,},
            {x: x + 6, y: y + 8,},
            {x: x + 8, y: y + 8,},
            {x: x + 3, y: y + 9,},
            {x: x + 6, y: y + 9,},
            {x: x + 9, y: y + 9,},
            {x: x + 2, y: y + 10,},
            {x: x + 6, y: y + 10,},
            {x: x + 10, y: y + 10,},
            {x: x + 1, y: y + 11,},
            {x: x + 6, y: y + 11,},
            {x: x + 11, y: y + 11,},
            {x: x, y: y + 12,},
            {x: x + 6, y: y + 12,},
            {x: x + 12, y: y + 12,},
        ]);
        // add to the list of roads
        plans.roads = plans.roads.concat([
            // coordinates of roads
            {x: x, y: y,},
            {x: x + 6, y: y,},
            {x: x + 12, y: y,},
            {x: x + 1, y: y + 1,},
            {x: x + 6, y: y + 1,},
            {x: x + 11, y: y + 1,},
            {x: x + 2, y: y + 2,},
            {x: x + 6, y: y + 2,},
            {x: x + 10, y: y + 2,},
            {x: x + 3, y: y + 3,},
            {x: x + 6, y: y + 3,},
            {x: x + 9, y: y + 3,},
            {x: x + 4, y: y + 4,},
            {x: x + 6, y: y + 4,},
            {x: x + 8, y: y + 4,},
            {x: x + 5, y: y + 5,},
            {x: x + 7, y: y + 5,},
            {x: x, y: y + 6,},
            {x: x + 1, y: y + 6,},
            {x: x + 2, y: y + 6,},
            {x: x + 3, y: y + 6,},
            {x: x + 4, y: y + 6,},
            {x: x + 6, y: y + 6,},
            {x: x + 8, y: y + 6,},
            {x: x + 9, y: y + 6,},
            {x: x + 10, y: y + 6,},
            {x: x + 11, y: y + 6,},
            {x: x + 12, y: y + 6,},
            {x: x + 5, y: y + 7,},
            {x: x + 7, y: y + 7,},
            {x: x + 4, y: y + 8,},
            {x: x + 6, y: y + 8,},
            {x: x + 8, y: y + 8,},
            {x: x + 3, y: y + 9,},
            {x: x + 6, y: y + 9,},
            {x: x + 9, y: y + 9,},
            {x: x + 2, y: y + 10,},
            {x: x + 6, y: y + 10,},
            {x: x + 10, y: y + 10,},
            {x: x + 1, y: y + 11,},
            {x: x + 6, y: y + 11,},
            {x: x + 11, y: y + 11,},
            {x: x, y: y + 12,},
            {x: x + 6, y: y + 12,},
            {x: x + 12, y: y + 12,},
        ]);
    },
    /**
     * locate a suitable location to place a plant
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planPlantLocation: function (room, plans) {
        // find a clear area of size 4 x 3
        let plant_location = room.getClearArea(4, 3, plans);
        // if we were able to find a location
        if (plant_location != null) {
            // save the x coordinate of the plant
            plans.plant_x = plant_location.x;
            // save the y coordinate of the plant
            plans.plant_y = plant_location.y;
        }
    },
    /**
     * fill the plant with plans for the structures based on the plant location
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planPlant: function (room, plans) {
        // if we were unable to find a plant location
        if (plans.plant_x == null) {
            // exit the function
            return;
        }
        // get the plant x coordinate
        let x = plans.plant_x;
        // get the plant y coordinate
        let y = plans.plant_y;

        // save the lab locations for easy access
        plans.input_lab_1_x = x + 2;
        plans.input_lab_1_y = y;
        plans.input_lab_2_x = x + 2;
        plans.input_lab_2_y = y + 2;
        plans.output_lab_x = x + 3;
        plans.output_lab_y = y + 1;
        plans.factory_x = x;
        plans.factory_y = y + 2;
        plans.power_spawn_x = x;
        plans.power_spawn_y = y;

        // concat the structure lists together
        plans.structures = plans.structures.concat([
            // coordinates and type of the structure
            {x: x, y: y, type: STRUCTURE_POWER_SPAWN},
            {x: x, y: y + 2, type: STRUCTURE_FACTORY},
            {x: x + 2, y: y, type: STRUCTURE_LAB},
            {x: x + 3, y: y + 1, type: STRUCTURE_LAB},
            {x: x + 2, y: y + 2, type: STRUCTURE_LAB},
        ]);
        // concat the structure lists together
        plans.ramparts = plans.ramparts.concat([
            // coordinates and type of the structure
            {x: x, y: y,},
            {x: x + 1, y: y,},
            {x: x + 2, y: y,},
            {x: x + 3, y: y,},
            {x: x, y: y + 1,},
            {x: x + 1, y: y + 1,},
            {x: x + 2, y: y + 1,},
            {x: x + 3, y: y + 1,},
            {x: x, y: y + 2,},
            {x: x + 1, y: y + 2,},
            {x: x + 2, y: y + 2,},
            {x: x + 3, y: y + 2,},
        ]);
        // concat the structure lists together
        plans.roads = plans.roads.concat([
            // coordinates and type of the structure
            {x: x + 1, y: y,},
            {x: x + 3, y: y,},
            {x: x, y: y + 1,},
            {x: x + 1, y: y + 1,},
            {x: x + 2, y: y + 1,},
            {x: x + 1, y: y + 2,},
            {x: x + 3, y: y + 2,},
        ]);
    },
    /**
     * find a location that is not around anything to send the idle creeps in the room
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planIdleLocation: function (room, plans) {
        // return a clear area of size 5 x 5
        let idle_location = room.getClearArea(5, 5, plans);
        // if an area is found
        if (idle_location != null) {
            // save the x coordinate of the idle location
            plans.idle_x = idle_location.x;
            // save the y coordinate of the idle location
            plans.idle_y = idle_location.y;
        }
    },
};