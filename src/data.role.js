/**
 * Role class, an object containing constants for a role
 * @class Role
 */
class Role {
    /**
     * creates a Role object
     * @param {string} name - the name of the role, for id usage
     * @param {string} emoji - set of emojis to represent the role
     * @param {string[]} body - the standard body of the creep
     * @param {number} energy_cost - energy cost of the standard body
     * @param {number} max_body_multiplier - the max number of times the body can be multiplied
     */
    constructor(name, emoji, body, energy_cost, max_body_multiplier) {
        /**
         * the name of the role, for id usage
         * @type {string}
         */
        this.name = name;
        /**
         * set of emojis to represent the role
         * @type {string}
         */
        this.emoji = emoji;
        /**
         * the standard body of the creep
         * @type {string[]}
         */
        this.body = body;
        /**
         * energy cost of the standard body
         * @type {number}
         */
        this.energy_cost = energy_cost;
        /**
         * the max number of times the body can be multiplied
         * @type {number}
         */
        this.max_body_multiplier = max_body_multiplier;
    }
}

// export the Role class
global.Role = Role;