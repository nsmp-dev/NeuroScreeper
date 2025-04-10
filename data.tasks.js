/**
 * Task class, an object containing data for executing simple creep actions
 * @class Task
 */
class Task {
    /**
     * creates a Task object
     * @param {number} type - The type of task
     * @param {string} room_name - The room of the task
     */
    constructor(type, room_name) {
        /**
         * type of task being created
         * @type {number}
         */
        this.type = type;
        /**
         * name of the room the target is in
         * @type {string}
         */
        this.room_name = room_name;
    }
}
global.Task = Task;

/**
 * GatherTask class, an object that contains data for running a task
 * @class GatherTask
 */
class GatherTask extends Task {
    /**
     * creates a gather task
     * @param {Structure|Resource} target - The target to gather from
     * @param {string} resource - The resource to gather
     * @param {number|null} amount - The amount of resource to gather
     */
    constructor(target, resource, amount = null) {
        super(TASK_TYPES.GATHER, target.room.name);
        /**
         * target of the task
         * @type {string}
         */
        this.target = target.id;
        /**
         * the type of resource to be gathered
         * @type {string}
         */
        this.resource = resource;
        /**
         * the amount of resource to be gathered
         * @type {number|null}
         */
        this.amount = amount;
    }
}
global.GatherTask = GatherTask;

/**
 * DepositTask class, an object that contains data for running a task
 * @class DepositTask
 */
class DepositTask extends Task {
    /**
     * creates a deposit task
     * @param {Structure} target - The target to deposit in
     * @param {string} resource - The resource to deposit
     * @param {number|null} amount - The amount of resource to deposit
     */
    constructor(target, resource, amount = null) {
        super(TASK_TYPES.DEPOSIT, target.room.name);
        /**
         * target of the task
         * @type {string}
         */
        this.target = target.id;
        /**
         * the type of resource to be gathered
         * @type {string}
         */
        this.resource = resource;
        /**
         * the amount of resource to be gathered
         * @type {number|null}
         */
        this.amount = amount;
    }
}
global.DepositTask = DepositTask;

/**
 * BuildTask class, an object that contains data for running a task
 * @class BuildTask
 */
class BuildTask extends Task {
    /**
     * creates a deposit task
     * @param {ConstructionSite} construction_site - The target to build
     */
    constructor(construction_site) {
        super(TASK_TYPES.BUILD, construction_site.room.name);
        /**
         * construction site to build
         * @type {string}
         */
        this.construction_site = construction_site.id;
    }
}
global.BuildTask = BuildTask;

/**
 * RepairTask class, an object that contains data for running a task
 * @class RepairTask
 */
class RepairTask extends Task {
    /**
     * creates a repair task
     * @param {Structure} structure - The target to repair
     */
    constructor(structure) {
        super(TASK_TYPES.REPAIR, structure.room.name);
        /**
         * target of the task
         * @type {string}
         */
        this.structure = structure.id;
    }
}
global.RepairTask = RepairTask;

/**
 * UpgradeTask class, an object that contains data for running a task
 * @class UpgradeTask
 */
class UpgradeTask extends Task {
    /**
     * creates an upgrade task
     * @param {string} room_name - name of the room to upgrade
     */
    constructor(room_name) {
        super(TASK_TYPES.UPGRADE, room_name);
    }
}
global.UpgradeTask = UpgradeTask;

/**
 * ClaimTask class, an object that contains data for running a task
 * @class ClaimTask
 */
class ClaimTask extends Task {
    /**
     * creates a claim task
     * @param {string} room_name - name of the room to claim
     */
    constructor(room_name) {
        super(TASK_TYPES.CLAIM, room_name);
    }
}
global.ClaimTask = ClaimTask;

/**
 * ReserveTask class, an object that contains data for running a task
 * @class ReserveTask
 */
class ReserveTask extends Task {
    /**
     * creates a reserve task
     * @param {string} room_name - name of the room to reserve
     */
    constructor(room_name) {
        super(TASK_TYPES.RESERVE, room_name);
    }
}
global.ReserveTask = ReserveTask;

/**
 * DrillTask class, an object that contains data for running a task
 * @class DrillTask
 */
class DrillTask extends Task {
    /**
     * creates a drill task
     * @param {string} source_id - The id of the source to drill
     * @param {Point} container_location - location of the container
     * @param {string} room_name - location of the container
     */
    constructor(source_id, container_location, room_name) {
        super(TASK_TYPES.DRILL, room_name);
        /**
         * The id of the source to drill
         * @type {string}
         */
        this.source_id = source_id;
        /**
         * location of the container
         * @type {Point}
         */
        this.container_location = container_location;
    }
}
global.DrillTask = DrillTask;

/**
 * AttackTask class, an object that contains data for running a task
 * @class AttackTask
 */
class AttackTask extends Task {
    /**
     * creates an attack task
     * @param {Creep} creep - The target to attack
     */
    constructor(creep) {
        super(TASK_TYPES.ATTACK, creep.room.name);
        /**
         * target of the task
         * @type {string}
         */
        this.creep = creep.id;
    }
}
global.AttackTask = AttackTask;

/**
 * HealTask class, an object that contains data for running a task
 * @class HealTask
 */
class HealTask extends Task {
    /**
     * creates a heal task
     * @param {Creep} creep - The target to heal
     */
    constructor(creep) {
        super(TASK_TYPES.HEAL, creep.room.name);
        /**
         * The target to heal
         * @type {string}
         */
        this.creep = creep.id;
    }
}
global.HealTask = HealTask;

/**
 * MoveRoomTask class, an object that contains data for running a task
 * @class MoveRoomTask
 */
class MoveRoomTask extends Task {
    /**
     * creates a move room task
     * @param {string} room_name - name of the room to move to
     */
    constructor(room_name) {
        super(TASK_TYPES.MOVE_ROOM, room_name);
    }
}
global.MoveRoomTask = MoveRoomTask;

/**
 * RenewOperatorTask class, an object that contains data for running a task
 * @class RenewOperatorTask
 */
class RenewOperatorTask extends Task {
    /**
     * creates a new task to renew an operator
     * @param {StructurePowerSpawn} power_spawn - The power spawn to renew at
     * @param {Task} previous_task - The previous task so we can restore it
     */
    constructor(power_spawn, previous_task) {
        super(TASK_TYPES.RENEW_OPERATOR, power_spawn.room.name);
        /**
         * The target to renew at
         * @type {string}
         */
        this.power_spawn = power_spawn.id;
        /**
         * The previous task so we can restore it
         * @type {Task}
         */
        this.previous_task = previous_task;
    }
}
global.RenewOperatorTask = RenewOperatorTask;

/**
 * IdleTask class, an object that contains data for running a task
 * @class IdleTask
 */
class IdleTask extends Task {
    /**
     * creates an idle task
     * @param {string} room_name - name of the room to idle in
     * @param {number} tick_limit - time limit for idling
     */
    constructor(room_name, tick_limit = 0) {
        super(TASK_TYPES.IDLE, room_name);
        /**
         * time limit for idling
         * @type {number}
         */
        this.tick_limit = tick_limit;
        /**
         * counter for ticks
         * @type {number}
         */
        this.tick_counter = 0;
    }
}
global.IdleTask = IdleTask;