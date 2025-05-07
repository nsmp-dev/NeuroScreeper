/**
 * Base Task class that provides the foundation for all creep actions in the game.
 * Defines common properties used by all specialized task types,
 * enabling consistent task management and execution across different creep roles.
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
 * GatherTask manages the collection of resources from containers, storage, or
 * dropped resources in the game world. Provides specific targeting and amount
 * tracking for efficient resource gathering operations.
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
 * DepositTask manages the storage of resources into containers, storage, or other
 * structures. Controls the transfer of specific resource types and amounts from
 * the creep into designated storage facilities.
 * @class DepositTask
 */
class DepositTask extends Task {
    /**
     * creates a deposit task
     * @param {Structure} target - The target to deposit in
     * @param {string} resource - The type of resource to deposit
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
 * BuildTask manages the construction of new structures at designated construction
 * sites. Coordinates creep activities to transform construction sites into
 * completed structures using available energy resources.
 * @class BuildTask
 */
class BuildTask extends Task {
    /**
     * creates a build task
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
 * RepairTask manages the maintenance and repair of damaged structures in the game.
 * Coordinates creeps to restore hit points to structures, helping maintain
 * infrastructure integrity and defensive capabilities.
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
 * UpgradeTask manages the process of upgrading room controllers to unlock new
 * capabilities. Coordinates creeps to transfer energy to controllers for room
 * level progression and territory control.
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
 * ClaimTask manages the process of claiming ownership of neutral rooms through
 * controller interaction. Enables territory expansion by coordinating creeps
 * to establish control over new rooms.
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
 * ReserveTask manages the temporary control of neutral room controllers.
 * Coordinates creeps to maintain reservation status on controllers, securing
 * resource access without full room ownership.
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
 * DrillTask manages dedicated, continuous resource extraction operations at
 * specific sources. Coordinates positioning and container usage for optimal
 * resource gathering efficiency at a fixed location.
 * @class DrillTask
 */
class DrillTask extends Task {
    /**
     * creates a drill task
     * @param {string} source_id - The id of the source to drill
     * @param {Point} container_location - location of the container
     * @param {string} room_name - name of the room the source is in
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
 * AttackTask manages offensive operations against hostile creeps or structures.
 * Coordinates combat actions to damage or destroy specified targets, supporting
 * both defensive and offensive military operations.
 * @class AttackTask
 */
class AttackTask extends Task {
    /**
     * creates an attack task
     * @param {Creep|Structure} target - The target to attack
     */
    constructor(target) {
        super(TASK_TYPES.ATTACK, target.room.name);
        /**
         * target of the task
         * @type {string}
         */
        this.target = target.id;
    }
}

global.AttackTask = AttackTask;

/**
 * HealTask manages the restoration of hit points to damaged creeps.
 * Coordinates healing operations to maintain creep health during combat
 * or other hazardous operations.
 * @class HealTask
 */
class HealTask extends Task {
    /**
     * creates a heal task
     * @param {Creep} creep - The creep to heal
     */
    constructor(creep) {
        super(TASK_TYPES.HEAL, creep.room.name);
        /**
         * The creep to heal
         * @type {string}
         */
        this.creep = creep.id;
    }
}

global.HealTask = HealTask;

/**
 * MoveRoomTask manages creep navigation between different rooms.
 * Coordinates inter-room travel with a built-in timer to ensure proper
 * positioning and prevent premature task completion.
 * @class MoveRoomTask
 */
class MoveRoomTask extends Task {
    /**
     * creates a move room task
     * @param {string} room_name - name of the room to move to
     */
    constructor(room_name) {
        super(TASK_TYPES.MOVE_ROOM, room_name);
        /**
         * timer for ensuring we stay in the new room for a few ticks
         * @type {number}
         */
        this.timer = 0;
    }
}

global.MoveRoomTask = MoveRoomTask;

/**
 * RenewOperatorTask manages the process of renewing power creeps at power spawns.
 * Handles the temporary interruption of other tasks to maintain power creep
 * operations, storing previous task state for restoration.
 * @class RenewOperatorTask
 */
class RenewOperatorTask extends Task {
    /**
     * creates a new task to renew an operator
     * @param {StructurePowerSpawn} power_spawn - The power spawn to renew at
     * @param {GatherTask|DepositTask|UpgradeTask|MoveRoomTask|IdleTask|RenewOperatorTask|MoveResourceTask} previous_task - The previous task so we can restore it
     */
    constructor(power_spawn, previous_task) {
        super(TASK_TYPES.RENEW_OPERATOR, power_spawn.room.name);
        /**
         * The PowerSpawn to renew at
         * @type {string}
         */
        this.power_spawn = power_spawn.id;
        /**
         * The previous task so we can restore it
         * @type {GatherTask|DepositTask|UpgradeTask|MoveRoomTask|IdleTask|RenewOperatorTask|MoveResourceTask}
         */
        this.previous_task = previous_task;
    }
}

global.RenewOperatorTask = RenewOperatorTask;

/**
 * IdleTask manages temporary pauses in creep activity with configurable duration.
 * Provides controlled wait states for timing coordination or resource availability,
 * automatically completing after the specified tick limit.
 * @class IdleTask
 */
class IdleTask extends Task {
    /**
     * creates an idle task
     * @param {string} room_name - name of the room to idle in
     * @param {number} tick_limit - time limit for idling, defaults to 10 ticks
     */
    constructor(room_name, tick_limit = 10) {
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

/**
 * MoveResourceTask manages the complete cycle of resource transportation between
 * structures. Coordinates both withdrawal and deposit operations as a single task,
 * tracking resource types and amounts for efficient logistics.
 * @class MoveResourceTask
 */
class MoveResourceTask extends Task {
    /**
     * creates a move resource task
     * @param {string} room_name - name of the room in which the task is in
     * @param {Structure} source_structure - the structure to withdraw from
     * @param {Structure} target_structure - the structure to deposit in
     * @param {string} resource - The resource to deposit
     * @param {number} amount - The amount of resource to gather
     */
    constructor(room_name, source_structure, target_structure, resource, amount) {
        super(TASK_TYPES.MOVE_RESOURCE, room_name);
        /**
         * the structure to withdraw from
         * @type {string}
         */
        this.source_structure = source_structure.id;
        /**
         * the structure to deposit in
         * @type {string}
         */
        this.target_structure = target_structure.id;
        /**
         * the type of resource to be moved
         * @type {string}
         */
        this.resource = resource;
        /**
         * the amount of resource to be moved
         * @type {number}
         */
        this.amount = amount;
        /**
         * the amount of resource to be moved
         * @type {number}
         */
        this.state = STATES.FILLING;
    }
}

global.MoveResourceTask = MoveResourceTask;

/**
 * HarvestTask manages direct resource collection from sources or mineral deposits.
 * Coordinates single-target harvesting operations, suitable for temporary or
 * mobile resource gathering without fixed infrastructure requirements.
 * @class HarvestTask
 */
class HarvestTask extends Task {
    /**
     * creates a harvest task
     * @param {string} room_name - name of the room in which the task is in
     * @param {Source|Deposit} target - the source or deposit to harvest from
     */
    constructor(room_name, target) {
        super(TASK_TYPES.HARVEST, room_name);
        /**
         * the source or deposit to harvest from
         * @type {string}
         */
        this.target = target.id;
    }
}

global.HarvestTask = HarvestTask;