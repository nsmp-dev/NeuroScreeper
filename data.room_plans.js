// RoomPlans class, an object containing all the construction plans for a room data object
class RoomPlans {
    // x coordinate of the idle location
    idle_x = null;
    // y coordinate of the idle location
    idle_y = null;
    // x coordinate of the base location
    base_x = null;
    // y coordinate of the base location
    base_y = null;
    // x coordinate of the plant location
    plant_x = null;
    // y coordinate of the plant location
    plant_y = null;
    // list of structures to place in the room
    structures = [];
    // points from which we draw roads between
    road_anchors = [];
    // list of roads to place in the room
    roads = [];
    // list of ramparts to place in the room
    ramparts = [];
    // list of sources and their containers
    sources = [];
    // list of minerals and their containers
    minerals = [];
    // x coordinate for input lab 1
    input_lab_1_x = null;
    // y coordinate for input lab 1
    input_lab_1_y = null;
    // x coordinate for input lab 2
    input_lab_2_x = null;
    // y coordinate for input lab 2
    input_lab_2_y = null;
    // x coordinate for output lab
    output_lab_x = null;
    // y coordinate for output lab
    output_lab_y = null;
    // empty constructor
    constructor() {}
}
// export the plans class
module.exports = RoomPlans;