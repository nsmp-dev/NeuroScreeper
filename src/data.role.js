/**
 * Role class, an object containing data for executing simple creep actions
 * @class Role
 */
class Role {
    /**
     * creates a Role object
     * @param {string} name - The type of task
     * @param {string} emoji - The room of the task
     * @param {string[]} body - The type of task
     * @param {number} energy_cost - The type of task
     * @param {number} max_body_multiplier - The type of task
     */
    constructor(name, emoji, body, energy_cost, max_body_multiplier) {
        /**
         * type of task being created
         * @type {string}
         */
        this.name = name;
        /**
         * name of the room the target is in
         * @type {string}
         */
        this.emoji = emoji;
        /**
         * name of the room the target is in
         * @type {string[]}
         */
        this.body = body;
        /**
         * name of the room the target is in
         * @type {number}
         */
        this.energy_cost = energy_cost;
        /**
         * name of the room the target is in
         * @type {number}
         */
        this.max_body_multiplier = max_body_multiplier;
    }
}
global.Role = Role;