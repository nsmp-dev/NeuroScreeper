/**
 * Role class defines the characteristics and capabilities of different creep roles in the game.
 * It encapsulates properties that determine a creep's appearance, body composition, and scaling limits.
 * @class Role
 */
class Role {
    /**
     * Creates a new Role object with specified characteristics
     * @param {string} name - Unique identifier for the role, used for reference and identification
     * @param {string} emoji - Visual representation of the role using emoji characters
     * @param {string[]} body - Array of body part constants defining the creep's basic structure
     * @param {number} energy_cost - Total energy required to spawn a creep with the standard body
     * @param {number} max_body_multiplier - Maximum allowed multiplier for scaling the body parts
     */
    constructor(name, emoji, body, energy_cost, max_body_multiplier) {
        /**
         * Unique identifier for the role used in game logic and references
         * @type {string}
         */
        this.name = name;
        /**
         * Visual emoji representation that helps identify the role in the game
         * @type {string}
         */
        this.emoji = emoji;
        /**
         * Base configuration of body parts that defines the creep's capabilities
         * @type {string[]}
         */
        this.body = body;
        /**
         * Total energy points required to spawn a creep with the standard body configuration
         * @type {number}
         */
        this.energy_cost = energy_cost;
        /**
         * Maximum number of times the standard body can be repeated when scaling up the creep
         * @type {number}
         */
        this.max_body_multiplier = max_body_multiplier;
    }
}

// export the Role class
global.Role = Role;