/**
 * Point class, an object that contains x and y coordinates
 * @class Point
 */
class Point {
    /**
     * Creates a Point Object
     * @param {number} x - x coordinate
     * @param {number} y - y coordinate
     */
    constructor(x, y) {
        /**
         * x coordinate
         * @type {number}
         */
        this.x = x;
        /**
         * y coordinate
         * @type {number}
         */
        this.y = y;
    }
}

// export the Point class
global.Point = Point;