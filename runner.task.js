/**
 * runs a task that is attached to the provided creep
 * @constant {Object} TaskRunner
 * */
global.TaskRunner = {
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runGather: function (creep) {
        // grab the task from the creep
        /** @type {GatherTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
            // if the creep has enough of the requested resource or is full
        }else if ((task.amount != null && creep.store[task.resource] >= task.amount) || creep.store.getFreeCapacity(task.resource) == 0) {
            // clear the task
            creep.memory.task = null;
        }else{
            // grab the target
            let target = Game.getObjectById(task.target);
            // if the target is no longer valid
            if (target == null) {
                // clear the task
                creep.memory.task = null;
                // if the target is a resource
            }else if (target instanceof Resource) {
                // if attempting to pick up the resource results in not being in range
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    // move to the resource
                    creep.moveTo(target);
                }
                // if the target is a structure that has a store
            }else if (target instanceof StructureContainer ||
                target instanceof StructureStorage ||
                target instanceof StructureTerminal ||
                target instanceof StructureLab ||
                target instanceof StructureFactory) {
                // if the target is empty
                if (target.store[task.resource] == 0) {
                    // clear the task
                    creep.memory.task = null;
                    // if the task has an amount
                }else if (task.amount != null) {
                    // if attempting to withdraw the resource results in not being in range
                    if (creep.withdraw(target, task.resource, task.amount) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        creep.moveTo(target);
                    }
                }else{
                    // if attempting to withdraw the resource results in not being in range
                    if (creep.withdraw(target, task.resource) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        creep.moveTo(target);
                    }
                }
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runDeposit: function (creep) {
        // grab the task from the creep
        /** @type {DepositTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
            // if the creep is empty
        }else if (creep.store[task.resource] == 0) {
            // clear the task
            creep.memory.task = null;
        }else{
            // grab the target
            let target = Game.getObjectById(task.target);
            // if the target is not valid or empty
            if (target == null || target.store.getFreeCapacity(task.resource) == 0) {
                // clear the task
                creep.memory.task = null;
            }else {
                // if the amount is specified
                if (task.amount != null) {
                    // if transferring to the target results in not being in range
                    if (creep.transfer(target, task.resource, task.amount) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        creep.moveTo(target);
                    }
                }else{
                    // if transferring to the target results in not being in range
                    if (creep.transfer(target, task.resource) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        creep.moveTo(target);
                    }
                }
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runRepair: function (creep) {
        // grab the task from the creep
        /** @type {RepairTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
            // if the creep is empty
        }else if (creep.store[RESOURCE_ENERGY] == 0) {
            // clear the task
            creep.memory.task = null;
        }else{
            // grab the target
            let target = Game.getObjectById(task.structure);
            // if the target is invalid or at max health
            if (target == null || target.hits == target.hitsMax) {
                // clear the task
                creep.memory.task = null;
            }else{
                // if repairing the target results in not being in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    creep.moveTo(target);
                }
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runBuild: function (creep) {
        // grab the task from the creep
        /** @type {BuildTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
            // if the creep is empty
        }else if (creep.store[RESOURCE_ENERGY] == 0) {
            // clear the task
            creep.memory.task = null;
        }else{
            // grab the target
            let target = Game.getObjectById(task.construction_site);
            // if the target is invalid
            if (target == null) {
                // clear the task
                creep.memory.task = null;
            }else{
                // if building the target results in not being in range
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    creep.moveTo(target);
                }
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runUpgrade: function (creep) {
        // grab the task from the creep
        /** @type {UpgradeTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
            // if the creep is empty
        }else if (creep.store[RESOURCE_ENERGY] == 0) {
            // clear the task
            creep.memory.task = null;
        }else{
            // if upgrading the controller results in not being in range
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move to the controller
                creep.moveTo(creep.room.controller);
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runClaim: function (creep) {
        // grab the task from the creep
        /** @type {ClaimTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            // if claiming the controller results in not being in range
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move to the controller
                creep.moveTo(creep.room.controller);
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runReserve: function (creep) {
        // grab the task from the creep
        /** @type {ReserveTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            // if reserving the controller results in not being in range
            if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move to the controller
                creep.moveTo(creep.room.controller);
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runDrill: function (creep) {
        // grab the task from the creep
        /** @type {DrillTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            // grab the target
            let target = Game.getObjectById(task.source_id);
            // if we are at the location of the container
            if (creep.pos.isEqualTo(task.container_location.x, task.container_location.y)) {
                // harvest from the assigned source
                creep.harvest(target);
            } else {
                // move to the location of the container
                creep.moveTo(task.container_location.x, task.container_location.y);
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runAttack: function (creep) {
        // grab the task from the creep
        /** @type {AttackTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            // grab the target
            let target = Game.getObjectById(task.creep);
            // if the target is null
            if (target == null) {
                // clear the task
                creep.memory.task = null;
            }else{
                // if attacking the target results in not being in range
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    creep.moveTo(target);
                }
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runHeal: function (creep) {
        // grab the task from the creep
        /** @type {HealTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            // grab the target
            let target = Game.getObjectById(task.creep);
            // if the target is invalid or at max health
            if (target == null || target.hits == target.hitsMax) {
                // clear the task
                creep.memory.task = null;
            }else{
                // if healing the target results in not being in range
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    creep.moveTo(target);
                }
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runMoveRoom: function (creep) {
        // grab the task from the creep
        /** @type {MoveRoomTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            // clear the task
            creep.memory.task = null;
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runIdle: function (creep) {
        // grab the task from the creep
        /** @type {IdleTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            // if the task has reached the tick limit
            if (task.tick_counter > task.tick_limit) {
                // clear the task
                creep.memory.task = null;
            }else{
                // increment the tick counter
                task.tick_counter++;
                // idle the creep
                creep.idle();
            }
        }
    },
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    runRenewOperator: function (creep) {
        // grab the task from the creep
        /** @type {RenewOperatorTask} */
        let task = creep.memory.task;
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            // grab the power spawn
            let power_spawn = Game.getObjectById(task.power_spawn);
            // if the power spawn is invalid
            if (power_spawn == null) {
                // clear the task
                creep.memory.task = null;
            }else{
                // try to renew
                let result = creep.renew(power_spawn);
                // if the creep is not in range
                if (result == ERR_NOT_IN_RANGE) {
                    // move to the power spawn
                    this.moveTo(power_spawn);
                }
                // if the result was successful
                if (result == OK) {
                    // restore the previous task
                    creep.memory.task = task.previous_task;
                }
            }
        }
    },
    /**
     * run the task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    run: function (creep) {
        // grab the task from the creep
        /** @type {Task} */
        let task = creep.memory.task;

        // if the task matches
        if (task.type == TASK_TYPES.GATHER) {
            // run the appropriate function
            this.runGather(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.DEPOSIT) {
            // run the appropriate function
            this.runDeposit(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.REPAIR) {
            // run the appropriate function
            this.runRepair(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.BUILD) {
            // run the appropriate function
            this.runBuild(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.UPGRADE) {
            // run the appropriate function
            this.runUpgrade(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.CLAIM) {
            // run the appropriate function
            this.runClaim(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.RESERVE) {
            // run the appropriate function
            this.runReserve(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.DRILL) {
            // run the appropriate function
            this.runDrill(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.ATTACK) {
            // run the appropriate function
            this.runAttack(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.HEAL) {
            // run the appropriate function
            this.runHeal(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.MOVE_ROOM) {
            // run the appropriate function
            this.runMoveRoom(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.IDLE) {
            // run the appropriate function
            this.runIdle(creep);
        }
        // if the task matches
        if (task.type == TASK_TYPES.RENEW_OPERATOR) {
            // run the appropriate function
            this.runRenewOperator(creep);
        }
    },
};