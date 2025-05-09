/**
 * Factory for creating room plans. Handles the planning and placement of structures,
 * roads, and ramparts. Provides methods for initial room setup and
 * later new room planning, including source mining, mineral extraction, base construction,
 * and plant construction.
 * @class RoomPlansFactory
 */
class RoomPlansFactory{
    constructor(){}
    /**
     * Plans the initial room, placing the base off the initial spawn's position
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room
     * @param {StructureSpawn} initial_spawn - The initial spawn in the room
     */
    planFirstRoom (room, plans, initial_spawn) {
        // plan the sources in the room, if any, and their containers
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
        // plan the roads between the base and the sources and minerals
        this.planRoads(room, plans);
        // plan the ramparts on top of all the structures planned
        this.planRamparts(room, plans);
        // find a location not around anything to send the idle creeps in the room
        this.planIdleLocation(room, plans);
    }
    /**
     * start the planning of a room, the new plans will be added to the passed plans object
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The RoomPlans for the room.
     */
    planRoom (room, plans) {
        // plan the sources in the room, if any, and their containers
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
        // plan the roads between the base and the source_plans and minerals
        this.planRoads(room, plans);
        // plan the ramparts on top of all the structures planned
        this.planRamparts(room, plans);
        // find a location not around anything to send the idle creeps in the room
        this.planIdleLocation(room, plans);
    }
    /**
     * plan the sources in the room, if any, and their containers
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planSources (room, plans) {
        // find all the sources in the room
        /** @type {Source[]} */
        let sources = room.find(FIND_SOURCES);

        // loop through the sources
        for (let source of sources) {
            // find an adjacent space to put the container
            let container_location = room.findClearAdjacentLocation(source.pos.x, source.pos.y, plans);

            // if a place was found
            if (container_location != null) {
                // make the plans and add them to the source list
                plans.source_plans.push(new SourcePlan(source.id, container_location));
            }
        }
    }
    /**
     * plan the minerals in the room, if any, and their containers
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planMinerals (room, plans) {
        // find all the minerals in the room
        /** @type {Mineral[]} */
        let minerals = room.find(FIND_MINERALS);

        // loop through the minerals
        for (let mineral of minerals) {
            // find an adjacent space to put the container
            let container_location = room.findClearAdjacentLocation(mineral.pos.x, mineral.pos.y, plans);

            // add the mineral plan to the mineral plans list
            if (container_location != null) {
                // create the MineralPlan and push it onto the plans
                plans.mineral_plans.push(new MineralPlan(mineral.id, new Point(mineral.pos.x, mineral.pos.y), container_location, mineral.mineralType));
            }
        }
    }
    /**
     * locate a suitable location to place a base
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planBaseLocation (room, plans) {
        // find a clear area of size 14 x 14
        let base_location = room.findClearArea(14, 14, plans);
        // if we were able to find a location
        if (base_location != null) {
            // save the coordinates of the base
            plans.base_location = base_location;
        }
    }
    /**
     * fill the base with plans for the structures based on the base location
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planBase (room, plans) {
        // if we were unable to find a base location
        if (plans.base_location == null) {
            // plan the base free-form instead
            this.planFreeformBase(room, plans);
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
        // add in the roads inside the base
        plans.roads[x][y] = true;
        plans.roads[x + 6][y] = true;
        plans.roads[x + 12][y] = true;
        plans.roads[x + 1][y + 1] = true;
        plans.roads[x + 6][y + 1] = true;
        plans.roads[x + 11][y + 1] = true;
        plans.roads[x + 2][y + 2] = true;
        plans.roads[x + 6][y + 2] = true;
        plans.roads[x + 10][y + 2] = true;
        plans.roads[x + 3][y + 3] = true;
        plans.roads[x + 6][y + 3] = true;
        plans.roads[x + 9][y + 3] = true;
        plans.roads[x + 4][y + 4] = true;
        plans.roads[x + 6][y + 4] = true;
        plans.roads[x + 8][y + 4] = true;
        plans.roads[x + 5][y + 5] = true;
        plans.roads[x + 7][y + 5] = true;
        plans.roads[x][y + 6] = true;
        plans.roads[x + 1][y + 6] = true;
        plans.roads[x + 2][y + 6] = true;
        plans.roads[x + 3][y + 6] = true;
        plans.roads[x + 4][y + 6] = true;
        plans.roads[x + 6][y + 6] = true;
        plans.roads[x + 8][y + 6] = true;
        plans.roads[x + 9][y + 6] = true;
        plans.roads[x + 10][y + 6] = true;
        plans.roads[x + 11][y + 6] = true;
        plans.roads[x + 12][y + 6] = true;
        plans.roads[x + 5][y + 7] = true;
        plans.roads[x + 7][y + 7] = true;
        plans.roads[x + 4][y + 8] = true;
        plans.roads[x + 6][y + 8] = true;
        plans.roads[x + 8][y + 8] = true;
        plans.roads[x + 3][y + 9] = true;
        plans.roads[x + 6][y + 9] = true;
        plans.roads[x + 9][y + 9] = true;
        plans.roads[x + 2][y + 10] = true;
        plans.roads[x + 6][y + 10] = true;
        plans.roads[x + 10][y + 10] = true;
        plans.roads[x + 1][y + 11] = true;
        plans.roads[x + 6][y + 11] = true;
        plans.roads[x + 11][y + 11] = true;
        plans.roads[x][y + 12] = true;
        plans.roads[x + 6][y + 12] = true;
        plans.roads[x + 12][y + 12] = true;

        // store the road anchors for further road planning
        plans.base_road_anchors = [
            new Point(x, y),
            new Point(x + 6, y),
            new Point(x + 12, y),
            new Point(x, y + 6),
            new Point(x + 12, y + 6),
            new Point(x, y + 12),
            new Point(x + 6, y + 12),
            new Point(x + 12, y + 12),
        ];
    }
    /**
     * fill the base with plans for the structures in an outward spiral from the center
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planFreeformBase (room, plans) {
        for (let i = 0; i < 3; i++) {
            let location = room.findConstructionLocation(plans);
            if (location != null) {
                plans.structures.push(new ConstructionPlan(location.x, location.y, STRUCTURE_SPAWN));
            }
        }

        let location = room.findConstructionLocation(plans);
        if (location != null) {
            plans.structures.push(new ConstructionPlan(location.x, location.y, STRUCTURE_STORAGE));
        }

        location = room.findConstructionLocation(plans);
        if (location != null) {
            plans.structures.push(new ConstructionPlan(location.x, location.y, STRUCTURE_TERMINAL));
        }

        location = room.findConstructionLocation(plans);
        if (location != null) {
            plans.structures.push(new ConstructionPlan(location.x, location.y, STRUCTURE_OBSERVER));
        }

        for (let i = 0; i < 6; i++) {
            location = room.findConstructionLocation(plans);
            if (location != null) {
                plans.structures.push(new ConstructionPlan(location.x, location.y, STRUCTURE_TOWER));
            }
        }

        for (let i = 0; i < 60; i++) {
            location = room.findConstructionLocation(plans);
            if (location != null) {
                plans.structures.push(new ConstructionPlan(location.x, location.y, STRUCTURE_EXTENSION));
            }
        }
    }
    /**
     * locate a suitable location to place a plant
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planPlantLocation (room, plans) {
        // find a clear area of size 4 x 3
        let plant_location = room.findClearArea(4, 3, plans);
        // if we were able to find a location
        if (plant_location != null) {
            // save the coordinates of the plant
            plans.plant_location = plant_location;
        }
    }
    /**
     * fill the plant with plans for the structures based on the plant location
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planPlant (room, plans) {
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

        // concat the structure lists together
        plans.structures = plans.structures.concat([
            // coordinates and type of the structure
            new ConstructionPlan(x, y, STRUCTURE_POWER_SPAWN),
            new ConstructionPlan(x, y + 2, STRUCTURE_FACTORY),
            new ConstructionPlan(x + 2, y, STRUCTURE_LAB),
            new ConstructionPlan(x + 3, y + 1, STRUCTURE_LAB),
            new ConstructionPlan(x + 2, y + 2, STRUCTURE_LAB),
        ]);
        // add in the roads inside the plant
        plans.roads[x + 1][y] = true;
        plans.roads[x + 3][y] = true;
        plans.roads[x][y + 1] = true;
        plans.roads[x + 1][y + 1] = true;
        plans.roads[x + 2][y + 1] = true;
        plans.roads[x + 1][y + 2] = true;
        plans.roads[x + 3][y + 2] = true;

        // store the road anchors for further road planning
        plans.plant_road_anchors = [
            new Point(x + 1, y),
            new Point(x + 3, y),
            new Point(x, y + 1),
            new Point(x + 1, y + 2),
            new Point(x + 3, y + 2),
        ];
    }
    /**
     * find a location not around anything to send the idle creeps in the room
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planIdleLocation (room, plans) {
        // return a clear area of size 5 x 5
        let idle_location = room.findClearArea(5, 5, plans);
        // if an area is found
        if (idle_location != null) {
            // save the coordinates of the idle location
            plans.idle_location = idle_location;
        }
    }
    /**
     * adds roads between the source and mineral containers and the road anchors
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planRoads (room, plans) {
        // if this room has a base
        if (plans.base_location != null) {
            // for each source plan
            for (let source_plan of plans.source_plans) {
                // draw roads between it and the closest anchor
                this.planRoadsBetween(plans.base_road_anchors, [source_plan.container_location], room, plans);
            }
            // for each mineral plan
            for (let mineral_plan of plans.mineral_plans) {
                // draw roads between it and the closest anchor
                this.planRoadsBetween(plans.base_road_anchors, [mineral_plan.container_location], room, plans);
            }
            // if the room has a plant
            if (plans.plant_location != null) {
                // draw roads between an anchor on the plant and the base
                this.planRoadsBetween(plans.base_road_anchors, plans.plant_road_anchors, room, plans);
            }
            // grab the left exits
            /** @type {RoomPosition[]} */
            let left_exits = room.find(FIND_EXIT_LEFT);

            // if any were found
            if (left_exits.length > 0) {
                // draw roads between an anchor and one of the exits
                this.planRoadsBetween(plans.base_road_anchors, left_exits, room, plans);
            }

            // grab the top exits
            /** @type {RoomPosition[]} */
            let top_exits = room.find(FIND_EXIT_TOP);

            // if any were found
            if (top_exits.length > 0) {
                // draw roads between an anchor and one of the exits
                this.planRoadsBetween(plans.base_road_anchors, top_exits, room, plans);
            }

            // grab the right exits
            /** @type {RoomPosition[]} */
            let right_exits = room.find(FIND_EXIT_RIGHT);

            // if any were found
            if (right_exits.length > 0) {
                // draw roads between an anchor and one of the exits
                this.planRoadsBetween(plans.base_road_anchors, right_exits, room, plans);
            }

            // grab the bottom exits
            /** @type {RoomPosition[]} */
            let bottom_exits = room.find(FIND_EXIT_BOTTOM);

            // if any were found
            if (bottom_exits.length > 0) {
                // draw roads between an anchor and one of the exits
                this.planRoadsBetween(plans.base_road_anchors, bottom_exits, room, plans);
            }
        }
    }
    /**
     * add ramparts on top of all structures in the plans
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planRamparts (room, plans) {
        // if the room has a base
        if (plans.base_location != null) {
            // loop through all the planned structures
            for (let construction_plan of plans.structures) {
                // mark that spot for a rampart
                plans.ramparts[construction_plan.location.x][construction_plan.location.y] = true;
            }

            // loop through all the source plans
            for (let source_plan of plans.source_plans) {
                // mark that spot for a rampart
                plans.ramparts[source_plan.container_location.x][source_plan.container_location.y] = true;
            }

            // loop through all the mineral plans
            for (let mineral_plan of plans.mineral_plans) {
                // mark that spot for a rampart
                plans.ramparts[mineral_plan.container_location.x][mineral_plan.container_location.y] = true;
            }
        }
    }
    /**
     * adds roads on a path between two points chosen from the given arrays, using the closest two points in them
     * @param {Point[] | RoomPosition[]} first_points - first array of points to choose from when drawing the roads
     * @param {Point[] | RoomPosition[]} second_points - second array of points to choose from when drawing the roads
     * @param {Room} room - The Room we are planning
     * @param {RoomPlans} plans - The Plans for the room.
     */
    planRoadsBetween (first_points, second_points, room, plans) {
        // by default, the closest first point is the first in the array
        let closest_first_point = first_points[0];
        // by default, the closest second point is the first in the array
        let closest_second_point = second_points[0];
        // record the closest distance between the points
        let closest_distance = util.distance(closest_first_point, closest_second_point);
        // loop through all the first points
        for (let first_point of first_points) {
            // loop through all the second points
            for (let second_point of second_points) {
                // if the distance between the two points is lower than the closest
                if (util.distance(first_point, second_point) < closest_distance) {
                    // record the new closest first point
                    closest_first_point = first_point;
                    // record the new closest second point
                    closest_second_point = second_point;
                    // record the new closest distance
                    closest_distance = util.distance(first_point, second_point);
                }
            }
        }

        // create a position for pathfinding
        let a_pos = new RoomPosition(closest_first_point.x, closest_first_point.y, room.name);
        // create a second position for pathfinding
        let b_pos = new RoomPosition(closest_second_point.x, closest_second_point.y, room.name);
        // find the path between the points
        /** @type {RoomPosition[]} */
        let path = room.findPath(a_pos, b_pos);

        // loop through all the positions of the path
        for (let position of path) {
            // mark that position as a road
            plans.roads[position.x][position.y] = true;
        }
    }
}

// export the RoomPlansFactory class
global.RoomPlansFactory = RoomPlansFactory;

/**
 * Instance of the RoomPlansFactory class that provides centralized room planning functions
 * @constant {RoomPlansFactory} room_plans_factory
 */
global.room_plans_factory = new RoomPlansFactory();