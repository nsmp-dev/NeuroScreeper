/**
 * Point class represents a two-dimensional coordinate in a Cartesian coordinate system.
 * Used throughout the game to specify locations and positions of game objects and structures.
 * @class Point
 */
class Point {
    /**
     * Creates a Point Object with specified coordinates
     * @param {number} x - The horizontal position in the coordinate system
     * @param {number} y - The vertical position in the coordinate system
     */
    constructor(x, y) {
        /**
         * The horizontal (x-axis) coordinate position
         * @type {number}
         */
        this.x = x;
        /**
         * The vertical (y-axis) coordinate position
         * @type {number}
         */
        this.y = y;
    }
}

// export the Point class
global.Point = Point;