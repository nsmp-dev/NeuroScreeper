/**
 * Task class, an object containing data for executing simple creep actions
 * @class Task
 */
class Task {
    /**
     * creates a Task object
     * @param {number} type - The type of task
     */
    constructor(type) {
        /**
         * type of task being created
         * @type {number}
         */
        this.type = type;
        /**
         * the resource being worked with, if applicable
         * @type {string|null}
         */
        this.resource = null;
        /**
         * the amount of resource being worked with, if applicable
         * @type {number|null}
         */
        this.amount = null;
        /**
         * the target of the task, if applicable
         * @type {string|null}
         */
        this.target = null;
        /**
         * name of the destination room, if applicable
         * @type {string|null}
         */
        this.room_name = null;
        /**
         * location of the target
         * @type {Point|null}
         */
        this.location = null;
        /**
         * count the number of ticks that have passed while doing the task
         * @type {number}
         */
        this.tick_counter = 0;
        /**
         * the timeout time if applicable. task will invalidate itself after this many ticks.
         * @type {number|null}
         */
        this.tick_limit = 0;
    }
}

module.exports = Task;