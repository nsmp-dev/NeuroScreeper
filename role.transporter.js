/**
 * Transporter name, body, and initializers
 * @constant {Object} TRANSPORTER
 */
global.TRANSPORTER = {
    // identifying string
    NAME: "transporter",
    // emoji for shorthand visuals
    EMOJI: "⚡🚛",
    // standard body build that can be multiplied arbitrarily to build larger creeps
    BODY: [CARRY, MOVE],
    // energy cost of the body
    ENERGY_COST: 100,
    // max times the body can be multiplied
    MAX_BODY_MULTIPLIER: 25,
};
global.ROLES[TRANSPORTER.NAME] = TRANSPORTER;

/**
 * TransporterMemory class, storing data for an attacker
 * @class TransporterMemory
 */
class TransporterMemory extends CreepMemory{
    /**
     * creates an TransporterMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     * @param {string} source_id - The name of the room this creep is assigned to
     * @param {Point} container_location - The name of the room this creep is assigned to
     */
    constructor(room_name, source_id, container_location){
        super(TRANSPORTER.NAME, room_name);
        /**
         * type of task being created
         * @type {string}
         */
        this.source = source_id;
        /**
         * type of task being created
         * @type {Point}
         */
        this.container_location = container_location;
        /**
         * type of task being created
         * @type {string|null}
         */
        this.container_id = null;
    }
}
global.TransporterMemory = TransporterMemory;

/**
 * transporter that takes energy from the containers under drillers and dumps the energy into the base
 */
Creep.prototype.runTransporter = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // assign a new task
        if (this.store[RESOURCE_ENERGY] == 0) {
            // grab the task
            let target = this.getTransporterTarget();

            // if the target is still null or empty
            if (target == null || (target.store != undefined && target.store[RESOURCE_ENERGY] == 0)) {
                // assign a new task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }else{
                // assign a new task
                this.memory.task = new GatherTask(target, RESOURCE_ENERGY);
                // announce the new task
                this.announceTask();
            }
        }else{
            // if we are in the room of the nearest colony
            if (this.room.name == this.getNearestColony()) {
                // find a new dump target
                let target = this.getDumpTarget();
                // if a new target was found
                if (target != null) {
                    // assign a new task
                    this.memory.task = new DepositTask(target, RESOURCE_ENERGY);
                    // announce the new task
                    this.announceTask();
                }else{
                    // assign a new task
                    this.memory.task = new IdleTask(this.memory.room_name, 10);
                    // announce the new task
                    this.announceTask();
                }
            }else{
                // assign a new task
                this.memory.task = new MoveRoomTask(this.getNearestColony());
                // announce the new task
                this.announceTask();
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};