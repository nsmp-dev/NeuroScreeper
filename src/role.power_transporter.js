// set up the role constants
global.PowerTransporterRole = new Role("power_transporter", "🔴🚛", [CARRY, MOVE], 100, 25);

// add the role to the roles hash
global.ROLES[PowerTransporterRole.name] = PowerTransporterRole;

/**
 * PowerTransporterMemory class, storing data for an attacker
 * @class PowerTransporterMemory
 */
class PowerTransporterMemory extends CreepMemory {
    /**
     * creates an PowerTransporterMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name) {
        super(PowerTransporterRole.name, room_name);
    }
}

global.PowerTransporterMemory = PowerTransporterMemory;
/**
 * power transporter that carries power back to the colony
 */
Creep.prototype.runPowerTransporter = function () {
    // if no task is assigned
    if (this.memory.task == null) {
        // grab the power squad
        let squad = this.getPowerSquad();
        // if the power squad is idle
        if (squad.state == STATES.IDLE) {
            // assign a new idle task
            this.memory.task = new IdleTask(this.memory.room_name);
            // announce the idle task
            this.announceTask();
            // if the power squad is searching
        } else if (squad.state == STATES.SEARCHING) {
            // if we are in the room next in the queue
            if (this.room.name == squad.highway_queue[0]) {
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            } else {
                // assign a new MoveRoomTask
                this.memory.task = new MoveRoomTask(squad.highway_queue[0]);
                // announce the MoveRoomTask
                this.announceTask();
            }
            // if the power squad is collecting
        } else if (squad.state == STATES.COLLECTING) {
            // find any power piles in the room
            let power_piles = this.room.find(FIND_DROPPED_RESOURCES, {filter: {resourceType: RESOURCE_POWER}});
            // if any power piles were found
            if (power_piles.length > 0) {
                // find the closest pile
                let target = this.pos.findClosestByPath(power_piles);
                // assign a new gather task
                this.memory.task = new GatherTask(target, RESOURCE_POWER);
                // announce the gather task
                this.announceTask();
            } else {
                // assign a new idle task
                this.memory.task = new IdleTask(this.room.name);
                // announce the idle task
                this.announceTask();
            }
            // if the power squad is returning
        }
        if (squad.state == STATES.RETURNING) {
            // if we are in the room we are returning to
            if (this.room.name == squad.return_room_name) {
                // assign a new deposit task
                this.memory.task = new DepositTask(this.room.storage, RESOURCE_POWER);
                // announce the deposit task
                this.announceTask();
            } else {
                // assign a new MoveRoomTask
                this.memory.task = new MoveRoomTask(squad.return_room_name);
                // announce the MoveRoomTask
                this.announceTask();
            }
        }
    }
    // run the task
    NeuroTask.run(this);
};