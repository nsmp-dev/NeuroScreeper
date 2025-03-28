
/**
 * runs a task that is attached to the provided creep
 * @module TaskRunner
 * */
module.exports = {
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runGather: function (creep) {
        let task = creep.memory.task;

        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else if ((task.amount != null && creep.store[task.resource] >= task.amount) || creep.store.getFreeCapacity(task.resource) == 0) {
            creep.memory.task = null;
        }else{
            let target = Game.getObjectById(task.target);
            if (target == null) {
                creep.memory.task = null;
            }else if (target instanceof Resource) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else if (target instanceof StructureContainer ||
                target instanceof StructureStorage ||
                target instanceof StructureTerminal ||
                target instanceof StructureLab ||
                target instanceof StructureFactory) {
                if (target.store[task.resource] == 0) {
                    creep.memory.task = null;
                }else if (task.amount != null && creep.withdraw(target, task.resource, task.amount) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }else if (creep.withdraw(target, task.resource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runDeposit: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else if (creep.store[task.resource] == 0) {
            creep.memory.task = null;
        }else{
            let target = Game.getObjectById(task.target);
            if (target == null || target.getFreeCapacity(task.resource) == 0) {
                creep.memory.task = null;
            }else {
                if (task.amount != null) {
                    if (creep.transfer(target, task.resource, task.amount) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }else{
                    if (creep.transfer(target, task.resource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runRepair: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else if (creep.store[task.resource] == 0) {
            creep.memory.task = null;
        }else{
            let target = Game.getObjectById(task.target);
            if (target == null || target.hits == target.hitsMax) {
                creep.memory.task = null;
            }else{
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runBuild: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else if (creep.store[task.resource] == 0) {
            creep.memory.task = null;
        }else{
            let target = Game.getObjectById(task.target);
            if (target == null) {
                creep.memory.task = null;
            }else{
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runUpgrade: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else if (creep.store[task.resource] == 0) {
            creep.memory.task = null;
        }else{
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runClaim: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runReserve: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runDrill: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            let target = Game.getObjectById(task.target);
            // if we are at the location of the container
            if (creep.pos.isEqualTo(task.container_x, task.container_y)) {
                // harvest from the assigned source
                creep.harvest(Game.getObjectById(task.memory.source));
            } else {
                // move to the location of the container
                creep.moveTo(task.container_x, task.container_y);
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runAttack: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            let target = Game.getObjectById(task.target);
            if (target == null) {
                creep.memory.task = null;
            }else{
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runHeal: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            let target = Game.getObjectById(task.target);
            if (target == null || target.hits == target.hitsMax) {
                creep.memory.task = null;
            }else{
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runMoveRoom: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            creep.memory.task = null;
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runIdle: function (creep) {
        let task = creep.memory.task;

        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            if (task.tick_counter > task.tick_limit) {
                creep.memory.task = null;
            }else{
                task.tick_counter++;
                creep.idle();
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    runRenewOperator: function (creep) {
        let task = creep.memory.task;
        if (creep.room.name != task.room_name) {
            creep.moveTo(new RoomPosition(25, 25, task.room_name));
        }else{
            let power_spawn = Game.getObjectById(task.target);
            if (power_spawn == null) {
                creep.memory.task = null;
            }else{
                let result = creep.renew(power_spawn);
                if (result == ERR_NOT_IN_RANGE) {
                    this.moveTo(power_spawn);
                }
                if (result == OK) {
                    creep.memory.task = task.previous_task;
                }
            }
        }
    },
    /**
     * recalculate the population needs and save the requested creeps to room_data
     * @param {Creep|PowerCreep} creep - The Creep being ran
     */
    run: function (creep) {
        let task = creep.memory.task;

        if (task.type == TASK_TYPES.GATHER) {
            this.runGather(creep);
        }
        if (task.type == TASK_TYPES.DEPOSIT) {
            this.runDeposit(creep);
        }
        if (task.type == TASK_TYPES.REPAIR) {
            this.runRepair(creep);
        }
        if (task.type == TASK_TYPES.BUILD) {
            this.runBuild(creep);
        }
        if (task.type == TASK_TYPES.UPGRADE) {
            this.runUpgrade(creep);
        }
        if (task.type == TASK_TYPES.CLAIM) {
            this.runClaim(creep);
        }
        if (task.type == TASK_TYPES.RESERVE) {
            this.runReserve(creep);
        }
        if (task.type == TASK_TYPES.DRILL) {
            this.runDrill(creep);
        }
        if (task.type == TASK_TYPES.ATTACK) {
            this.runAttack(creep);
        }
        if (task.type == TASK_TYPES.HEAL) {
            this.runHeal(creep);
        }
        if (task.type == TASK_TYPES.MOVE_ROOM) {
            this.runMoveRoom(creep);
        }
        if (task.type == TASK_TYPES.IDLE) {
            this.runIdle(creep);
        }
    },
};