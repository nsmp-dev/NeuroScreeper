// set up the role constants
global.TransporterRole = new Role("transporter", "⚡🚛", [CARRY, MOVE], 100, 25);

// add the role to the roles hash
global.ROLES[TransporterRole.name] = TransporterRole;

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
        super(TransporterRole.name, room_name);
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
        /**
         * nearest colony for returning the energy
         * @type {string|null}
         */
        this.nearest_colony_name = null;
    }
}
global.TransporterMemory = TransporterMemory;

/**
 * transporter that takes energy from the containers under drillers and dumps the energy into the base
 */
Creep.prototype.runTransporter = function () {
    // if we don't have a task currently assigned
    if (this.memory.task == null) {
        // if the creep is out of energy
        if (this.store[RESOURCE_ENERGY] == 0) {
            // find the gather target for the transporter
            let target = this.getTransporterTarget();

            // if the target is still null or empty
            if (target == null || (target.store != undefined && target.store[RESOURCE_ENERGY] == 0)) {
                // assign a new task
                this.memory.task = new IdleTask(this.memory.room_name, 10);
                // announce the new task
                this.announceTask();
            }else{
                // assign a new gather task
                this.memory.task = new GatherTask(target, RESOURCE_ENERGY);
                // announce the gather task
                this.announceTask();
            }
        }else{
            // if we are in the room of the nearest colony
            if (this.room.name == this.memory.nearest_colony_name) {
                // remove the nearest colony name
                this.memory.nearest_colony_name = null;
                // find a new dump target
                let target = this.getDumpTarget();
                // if a new target was found
                if (target != null) {
                    // assign a new deposit task
                    this.memory.task = new DepositTask(target, RESOURCE_ENERGY);
                    // announce the deposit task
                    this.announceTask();
                }else{
                    // assign a new idle task
                    this.memory.task = new IdleTask(this.memory.room_name, 10);
                    // announce the idle task
                    this.announceTask();
                }
            }else{
                // store the nearest colony name
                this.memory.nearest_colony_name = this.getNearestColony();
                // assign a new MoveRoomTask
                this.memory.task = new MoveRoomTask(this.memory.nearest_colony_name);
                // announce the MoveRoomTask
                this.announceTask();
            }
        }
    }
    // run the task
    TaskRunner.run(this);
};