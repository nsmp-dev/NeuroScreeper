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
        this.type = type;
        this.resource = null;
        this.amount = null;
        this.target = null;
        this.room_name = null;
        this.container_x = null;
        this.container_y = null;
        this.tick_counter = 0;
        this.tick_limit = 0;
    }
}

module.exports = Task;