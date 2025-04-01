const Point = require("data.point");
const SourcePlan = require("data.source_plan");
const MineralPlan = require("data.mineral_plan");
const ConstructionPlan = require("data.construction_plan");

/** @module PlansFactory */
module.exports = {
    /**
     * Plans the initial room, placing the base off the initial spawn's position
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     * @param {StructureSpawn} initial_spawn - The initial spawn in the room.
     */
    planFirstRoom: function (room, plans, initial_spawn) {
        // plan the sources in the room and their containers
        this.planSources(room, plans);
        // plan the minerals in the room, if any, and their containers
        this.planMinerals(room, plans);
        // manually set the location of the base using the provided initial spawn
        plans.base_location = new Point(initial_spawn.pos.x - 5, initial_spawn.pos.y - 6);
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
     * @param {RoomPlans} plans - The RoomPlans for the room.
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

            // if a place was found
            if (container_location != null) {
                // make the plans and add them to the source list
                plans.sources.push(new SourcePlan(source.id, container_location.x, container_location.y));
            }
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
            if (container_location != null) {
                plans.minerals.push(new MineralPlan(mineral.id, mineral.pos.x, mineral.pos.y, container_location.x, container_location.y));
            }
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
            // save the coordinates of the base
            plans.base_location = base_location;
        }
    },
    /**
     * fill the base with plans for the structures based on the base location
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planBase: function (room, plans) {
        // if we were unable to find a base location
        if (plans.base_location == null) {
            // exit the function
            return;
        }
        // get the base x coordinate
        let x = plans.base_location.x;
        // get the base y coordinate
        let y = plans.base_location.y;
        // add to the list of structures
        plans.structures = plans.structures.concat([
            // coordinates and type of the structure
            new ConstructionPlan(x + 1, y, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 5, y, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 7, y, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 11, y, STRUCTURE_EXTENSION),
            new ConstructionPlan(x, y + 1, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 2, y + 1, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 3, y + 1, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 5, y + 1, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 7, y + 1, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 9, y + 1, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 10, y + 1, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 12, y + 1, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 1, y + 2, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 3, y + 2, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 4, y + 2, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 5, y + 2, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 7, y + 2, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 8, y + 2, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 9, y + 2, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 11, y + 2, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 1, y + 3, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 2, y + 3, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 4, y + 3, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 5, y + 3, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 7, y + 3, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 8, y + 3, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 10, y + 3, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 11, y + 3, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 2, y + 4, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 3, y + 4, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 9, y + 4, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 10, y + 4, STRUCTURE_EXTENSION),
            new ConstructionPlan(x, y + 5, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 1, y + 5, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 2, y + 5, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 3, y + 5, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 9, y + 5, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 10, y + 5, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 11, y + 5, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 12, y + 5, STRUCTURE_EXTENSION),
            new ConstructionPlan(x, y + 7, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 1, y + 7, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 2, y + 7, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 3, y + 7, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 9, y + 7, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 10, y + 7, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 11, y + 7, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 12, y + 7, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 2, y + 8, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 3, y + 8, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 9, y + 8, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 10, y + 8, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 1, y + 9, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 2, y + 9, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 4, y + 9, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 5, y + 9, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 7, y + 9, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 8, y + 9, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 10, y + 9, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 11, y + 9, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 1, y + 10, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 3, y + 10, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 4, y + 10, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 5, y + 10, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 7, y + 10, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 8, y + 10, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 9, y + 10, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 11, y + 10, STRUCTURE_EXTENSION),
            new ConstructionPlan(x, y + 11, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 2, y + 11, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 3, y + 11, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 5, y + 11, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 7, y + 11, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 9, y + 11, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 10, y + 11, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 12, y + 11, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 1, y + 12, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 5, y + 12, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 7, y + 12, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 11, y + 12, STRUCTURE_EXTENSION),
            new ConstructionPlan(x + 7, y + 6, STRUCTURE_TOWER),
            new ConstructionPlan(x + 4, y + 7, STRUCTURE_TOWER),
            new ConstructionPlan(x + 8, y + 7, STRUCTURE_TOWER),
            new ConstructionPlan(x + 4, y + 9, STRUCTURE_TOWER),
            new ConstructionPlan(x + 8, y + 9, STRUCTURE_TOWER),
            new ConstructionPlan(x + 5, y + 10, STRUCTURE_TOWER),
            new ConstructionPlan(x + 5, y + 8, STRUCTURE_SPAWN),
            new ConstructionPlan(x + 7, y + 8, STRUCTURE_SPAWN),
            new ConstructionPlan(x + 6, y + 9, STRUCTURE_SPAWN),
            new ConstructionPlan(x + 6, y + 7, STRUCTURE_STORAGE),
            new ConstructionPlan(x + 5, y + 6, STRUCTURE_OBSERVER),
            new ConstructionPlan(x + 7, y + 10, STRUCTURE_TERMINAL),
        ]);
        // add to the list of ramparts
        plans.ramparts = plans.ramparts.concat([
            // coordinates of ramparts
            new Point(x + 1, y + 1),

            new Point(x + 5, y),
            new Point(x + 1, y),
            new Point(x + 7, y),
            new Point(x + 11, y),
            new Point(x, y + 1),
            new Point(x + 2, y + 1),
            new Point(x + 3, y + 1),
            new Point(x + 5, y + 1),
            new Point(x + 7, y + 1),
            new Point(x + 9, y + 1),
            new Point(x + 10, y + 1),
            new Point(x + 12, y + 1),
            new Point(x + 1, y + 2),
            new Point(x + 3, y + 2),
            new Point(x + 4, y + 2),
            new Point(x + 5, y + 2),
            new Point(x + 7, y + 2),
            new Point(x + 8, y + 2),
            new Point(x + 9, y + 2),
            new Point(x + 11, y + 2),
            new Point(x + 1, y + 3),
            new Point(x + 2, y + 3),
            new Point(x + 4, y + 3),
            new Point(x + 5, y + 3),
            new Point(x + 7, y + 3),
            new Point(x + 8, y + 3),
            new Point(x + 10, y + 3),
            new Point(x + 11, y + 3),
            new Point(x + 2, y + 4),
            new Point(x + 3, y + 4),
            new Point(x + 9, y + 4),
            new Point(x + 10, y + 4),
            new Point(x, y + 5),
            new Point(x + 1, y + 5),
            new Point(x + 2, y + 5),
            new Point(x + 3, y + 5),
            new Point(x + 9, y + 5),
            new Point(x + 10, y + 5),
            new Point(x + 11, y + 5),
            new Point(x + 12, y + 5),
            new Point(x, y + 7),
            new Point(x + 1, y + 7),
            new Point(x + 2, y + 7),
            new Point(x + 3, y + 7),
            new Point(x + 9, y + 7),
            new Point(x + 10, y + 7),
            new Point(x + 11, y + 7),
            new Point(x + 12, y + 7),
            new Point(x + 2, y + 8),
            new Point(x + 3, y + 8),
            new Point(x + 9, y + 8),
            new Point(x + 10, y + 8),
            new Point(x + 1, y + 9),
            new Point(x + 2, y + 9),
            new Point(x + 4, y + 9),
            new Point(x + 5, y + 9),
            new Point(x + 7, y + 9),
            new Point(x + 8, y + 9),
            new Point(x + 10, y + 9),
            new Point(x + 11, y + 9),
            new Point(x + 1, y + 10),
            new Point(x + 3, y + 10),
            new Point(x + 4, y + 10),
            new Point(x + 5, y + 10),
            new Point(x + 7, y + 10),
            new Point(x + 8, y + 10),
            new Point(x + 9, y + 10),
            new Point(x + 11, y + 10),
            new Point(x, y + 11),
            new Point(x + 2, y + 11),
            new Point(x + 3, y + 11),
            new Point(x + 5, y + 11),
            new Point(x + 7, y + 11),
            new Point(x + 9, y + 11),
            new Point(x + 10, y + 11),
            new Point(x + 12, y + 11),
            new Point(x + 1, y + 12),
            new Point(x + 5, y + 12),
            new Point(x + 7, y + 12),
            new Point(x + 11, y + 12),
            new Point(x + 7, y + 6),
            new Point(x + 4, y + 7),
            new Point(x + 8, y + 7),
            new Point(x + 4, y + 9),
            new Point(x + 8, y + 9),
            new Point(x + 5, y + 10),
            new Point(x + 5, y + 8),
            new Point(x + 7, y + 8),
            new Point(x + 6, y + 9),
            new Point(x + 6, y + 7),
            new Point(x + 5, y + 6),
            new Point(x + 7, y + 10),
            new Point(x, y),
            new Point(x + 6, y),
            new Point(x + 12, y),
            new Point(x + 1, y + 1),
            new Point(x + 6, y + 1),
            new Point(x + 11, y + 1),
            new Point(x + 2, y + 2),
            new Point(x + 6, y + 2),
            new Point(x + 10, y + 2),
            new Point(x + 3, y + 3),
            new Point(x + 6, y + 3),
            new Point(x + 9, y + 3),
            new Point(x + 4, y + 4),
            new Point(x + 6, y + 4),
            new Point(x + 8, y + 4),
            new Point(x + 5, y + 5),
            new Point(x + 7, y + 5),
            new Point(x, y + 6),
            new Point(x + 1, y + 6),
            new Point(x + 2, y + 6),
            new Point(x + 3, y + 6),
            new Point(x + 4, y + 6),
            new Point(x + 6, y + 6),
            new Point(x + 8, y + 6),
            new Point(x + 9, y + 6),
            new Point(x + 10, y + 6),
            new Point(x + 11, y + 6),
            new Point(x + 12, y + 6),
            new Point(x + 5, y + 7),
            new Point(x + 7, y + 7),
            new Point(x + 4, y + 8),
            new Point(x + 6, y + 8),
            new Point(x + 8, y + 8),
            new Point(x + 3, y + 9),
            new Point(x + 6, y + 9),
            new Point(x + 9, y + 9),
            new Point(x + 2, y + 10),
            new Point(x + 6, y + 10),
            new Point(x + 10, y + 10),
            new Point(x + 1, y + 11),
            new Point(x + 6, y + 11),
            new Point(x + 11, y + 11),
            new Point(x, y + 12),
            new Point(x + 6, y + 12),
            new Point(x + 12, y + 12),
        ]);
        // add to the list of roads
        plans.roads = plans.roads.concat([
            // coordinates of roads
            new Point(x, y),
            new Point(x + 6, y),
            new Point(x + 12, y),
            new Point(x + 1, y + 1),
            new Point(x + 6, y + 1),
            new Point(x + 11, y + 1),
            new Point(x + 2, y + 2),
            new Point(x + 6, y + 2),
            new Point(x + 10, y + 2),
            new Point(x + 3, y + 3),
            new Point(x + 6, y + 3),
            new Point(x + 9, y + 3),
            new Point(x + 4, y + 4),
            new Point(x + 6, y + 4),
            new Point(x + 8, y + 4),
            new Point(x + 5, y + 5),
            new Point(x + 7, y + 5),
            new Point(x, y + 6),
            new Point(x + 1, y + 6),
            new Point(x + 2, y + 6),
            new Point(x + 3, y + 6),
            new Point(x + 4, y + 6),
            new Point(x + 6, y + 6),
            new Point(x + 8, y + 6),
            new Point(x + 9, y + 6),
            new Point(x + 10, y + 6),
            new Point(x + 11, y + 6),
            new Point(x + 12, y + 6),
            new Point(x + 5, y + 7),
            new Point(x + 7, y + 7),
            new Point(x + 4, y + 8),
            new Point(x + 6, y + 8),
            new Point(x + 8, y + 8),
            new Point(x + 3, y + 9),
            new Point(x + 6, y + 9),
            new Point(x + 9, y + 9),
            new Point(x + 2, y + 10),
            new Point(x + 6, y + 10),
            new Point(x + 10, y + 10),
            new Point(x + 1, y + 11),
            new Point(x + 6, y + 11),
            new Point(x + 11, y + 11),
            new Point(x, y + 12),
            new Point(x + 6, y + 12),
            new Point(x + 12, y + 12),
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
            // save the coordinates of the plant
            plans.plant_location = plant_location;
        }
    },
    /**
     * fill the plant with plans for the structures based on the plant location
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planPlant: function (room, plans) {
        // if we were unable to find a plant location
        if (plans.plant_location == null) {
            // exit the function
            return;
        }
        // get the plant x coordinate
        let x = plans.plant_location.x;
        // get the plant y coordinate
        let y = plans.plant_location.y;

        // save the lab/factory/power spawn locations for easy access
        plans.input_lab_1_location = new Point(x + 2, y);
        plans.input_lab_2_location = new Point(x + 2, y + 2);
        plans.output_lab_location = new Point(x + 3, y + 1);
        plans.factory_location = new Point(x, y + 2);
        plans.power_spawn_location = new Point(x, y);

        // concat the structure lists together
        plans.structures = plans.structures.concat([
            // coordinates and type of the structure
            new ConstructionPlan(x, y, STRUCTURE_POWER_SPAWN),
            new ConstructionPlan(x, y + 2, STRUCTURE_FACTORY),
            new ConstructionPlan(x + 2, y, STRUCTURE_LAB),
            new ConstructionPlan(x + 3, y + 1, STRUCTURE_LAB),
            new ConstructionPlan(x + 2, y + 2, STRUCTURE_LAB),
        ]);
        // concat the rampart lists together
        plans.ramparts = plans.ramparts.concat([
            // coordinates and type of the structure
            new Point(x, y),
            new Point(x + 1, y),
            new Point(x + 2, y),
            new Point(x + 3, y),
            new Point(x, y + 1),
            new Point(x + 1, y + 1),
            new Point(x + 2, y + 1),
            new Point(x + 3, y + 1),
            new Point(x, y + 2),
            new Point(x + 1, y + 2),
            new Point(x + 2, y + 2),
            new Point(x + 3, y + 2),
        ]);
        // concat the road lists together
        plans.roads = plans.roads.concat([
            // coordinates and type of the structure
            new Point(x + 1, y),
            new Point(x + 3, y),
            new Point(x, y + 1),
            new Point(x + 1, y + 1),
            new Point(x + 2, y + 1),
            new Point(x + 1, y + 2),
            new Point(x + 3, y + 2),
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
            // save the coordinates of the idle location
            plans.idle_location = idle_location;
        }
    },
};