module.exports = {
    planRoom: function (room, plans) {
        this.planSources(room, plans);
        this.planMinerals(room, plans);
        this.planBaseLocation(room, plans);
        this.planBase(room, plans);
        this.planPlantLocation(room, plans);
        this.planPlant(room, plans);
        this.planIdleLocation(room, plans);
    },
    planIdleLocation: function (room, plans) {
        // return a clear area of size 5 x 5
        let idle_location = room.getClearArea(5, 5, plans);
        if (idle_location != null) {
            plans.idle_x = idle_location.x;
            plans.idle_y = idle_location.y;
        }
    },
    planBaseLocation: function (room, plans) {
        // find a clear area of size 14 x 14
        let base_location = room.getClearArea(14, 14, plans);
        if (base_location != null) {
            plans.base_x = base_location.x;
            plans.base_y = base_location.y;
        }
    },
    planPlantLocation: function (room, plans) {
        let plant_location = room.getClearArea(14, 14, plans);
        if (plant_location != null) {
            plans.plant_x = plant_location.x;
            plans.plant_y = plant_location.y;
        }
    },
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
    planBase: function (room, plans) {
        if (plans.base_x == null) {
            return;
        }
        // get the base x coordinate
        let x = plans.base_x;
        // get the base y coordinate
        let y = plans.base_y;
        // create the list of structures
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
        plans.ramparts = plans.ramparts.concat([
            {x: x + 1, y: y, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y, type: STRUCTURE_RAMPART},
            {x: x, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 12, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 4, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 8, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 4, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 8, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 4, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 4, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 4, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 4, type: STRUCTURE_RAMPART},
            {x: x, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x + 12, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 12, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 8, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 8, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 8, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 8, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 4, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 8, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 4, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 8, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 12, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 12, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 12, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 12, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 12, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 4, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 8, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 4, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 8, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 8, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 8, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x, y: y, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y, type: STRUCTURE_RAMPART},
            {x: x + 12, y: y, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 1, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 2, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 3, type: STRUCTURE_RAMPART},
            {x: x + 4, y: y + 4, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 4, type: STRUCTURE_RAMPART},
            {x: x + 8, y: y + 4, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 5, type: STRUCTURE_RAMPART},
            {x: x, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 4, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 8, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 12, y: y + 6, type: STRUCTURE_RAMPART},
            {x: x + 5, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 7, y: y + 7, type: STRUCTURE_RAMPART},
            {x: x + 4, y: y + 8, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 8, type: STRUCTURE_RAMPART},
            {x: x + 8, y: y + 8, type: STRUCTURE_RAMPART},
            {x: x + 3, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 9, y: y + 9, type: STRUCTURE_RAMPART},
            {x: x + 2, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 10, y: y + 10, type: STRUCTURE_RAMPART},
            {x: x + 1, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x + 11, y: y + 11, type: STRUCTURE_RAMPART},
            {x: x, y: y + 12, type: STRUCTURE_RAMPART},
            {x: x + 6, y: y + 12, type: STRUCTURE_RAMPART},
            {x: x + 12, y: y + 12, type: STRUCTURE_RAMPART},
        ]);
        plans.roads = plans.roads.concat([
            {x: x, y: y, type: STRUCTURE_ROAD},
            {x: x + 6, y: y, type: STRUCTURE_ROAD},
            {x: x + 12, y: y, type: STRUCTURE_ROAD},
            {x: x + 1, y: y + 1, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 1, type: STRUCTURE_ROAD},
            {x: x + 11, y: y + 1, type: STRUCTURE_ROAD},
            {x: x + 2, y: y + 2, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 2, type: STRUCTURE_ROAD},
            {x: x + 10, y: y + 2, type: STRUCTURE_ROAD},
            {x: x + 3, y: y + 3, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 3, type: STRUCTURE_ROAD},
            {x: x + 9, y: y + 3, type: STRUCTURE_ROAD},
            {x: x + 4, y: y + 4, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 4, type: STRUCTURE_ROAD},
            {x: x + 8, y: y + 4, type: STRUCTURE_ROAD},
            {x: x + 5, y: y + 5, type: STRUCTURE_ROAD},
            {x: x + 7, y: y + 5, type: STRUCTURE_ROAD},
            {x: x, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 1, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 2, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 3, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 4, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 8, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 9, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 10, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 11, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 12, y: y + 6, type: STRUCTURE_ROAD},
            {x: x + 5, y: y + 7, type: STRUCTURE_ROAD},
            {x: x + 7, y: y + 7, type: STRUCTURE_ROAD},
            {x: x + 4, y: y + 8, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 8, type: STRUCTURE_ROAD},
            {x: x + 8, y: y + 8, type: STRUCTURE_ROAD},
            {x: x + 3, y: y + 9, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 9, type: STRUCTURE_ROAD},
            {x: x + 9, y: y + 9, type: STRUCTURE_ROAD},
            {x: x + 2, y: y + 10, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 10, type: STRUCTURE_ROAD},
            {x: x + 10, y: y + 10, type: STRUCTURE_ROAD},
            {x: x + 1, y: y + 11, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 11, type: STRUCTURE_ROAD},
            {x: x + 11, y: y + 11, type: STRUCTURE_ROAD},
            {x: x, y: y + 12, type: STRUCTURE_ROAD},
            {x: x + 6, y: y + 12, type: STRUCTURE_ROAD},
            {x: x + 12, y: y + 12, type: STRUCTURE_ROAD},
        ]);
    },
    planPlant: function (room, plans) {
        if (plans.plant_x == null) {
            return;
        }
        // get the base x coordinate
        let x = plans.plant_x;
        // get the base y coordinate
        let y = plans.plant_y;

        plans.input_lab_1_x = x + 2;
        plans.input_lab_1_y = y;
        plans.input_lab_2_x = x + 2;
        plans.input_lab_2_y = y + 2;
        plans.output_lab_x = x + 3;
        plans.output_lab_y = y + 1;

        // concat the structure lists together
        plans.structures = plans.structures.concat([
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
        ]);
    },
};