// set up the role constants
global.PowerTransporterRole = new Role("power_transporter", "🔴🚛", [CARRY, MOVE], 100, 25);

// add the role to the roles hash
global.ROLES[PowerTransporterRole.name] = PowerTransporterRole;

/**
 * PowerTransporterMemory class represents memory storage for specialized creeps that transport power resources.
 * It extends CreepMemory to store state information for power transporters working in power collection squads.
 * @class PowerTransporterMemory
 * @extends CreepMemory
 */
class PowerTransporterMemory extends CreepMemory {
    /**
     * Creates a new PowerTransporterMemory instance for a specialized creep that transports power resources.
     * This creep operates as part of a power collection squad, collecting and delivering power to storage.
     * @param {string} room_name - The identifier of the spawn room where this power transporter is created and operates from
     */
    constructor(room_name) {
        super(PowerTransporterRole.name, room_name);
    }
}

global.PowerTransporterMemory = PowerTransporterMemory;
/**
 * Specialized creep behavior for transporting power resources in power collection squads.
 * Follows squad state machine transitions between searching, collecting and returning phases.
 * Efficiently gathers dropped power and delivers it to colony storage facilities.
 * @memberOf Creep#
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
    neuro_task.run(this);
};