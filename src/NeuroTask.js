/**
 * The NeuroTask class provides functionality for managing and executing different tasks for creeps in the game.
 * It contains methods to handle various tasks like gathering resources, depositing items, repairing structures,
 * building, upgrading controllers, claiming rooms, and more. Each task type has its own execution logic and
 * movement handling.
 * @class NeuroTask
 */
class NeuroTask {
    constructor() {}
    /**
     * run the gather task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {GatherTask} task - the task being run
     */
    runGather (creep, task) {
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
            // if the creep has enough of the requested resource or is full
        } else if ((task.amount != null && creep.store[task.resource] >= task.amount) || creep.store.getFreeCapacity(task.resource) == 0) {
            // clear the task
            creep.memory.task = null;
        } else {
            // grab the target
            let target = Game.getObjectById(task.target);
            // if the target is no longer valid
            if (target == null) {
                // clear the task
                creep.memory.task = null;
                // if the target is a resource
            } else if (target instanceof Resource) {
                // if attempting to pick up the resource results in not being in range
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    // move to the resource
                    creep.moveTo(target);
                }
                // if the target is a structure that has a store
            } else if (target instanceof StructureContainer ||
                target instanceof StructureStorage ||
                target instanceof StructureTerminal ||
                target instanceof StructureLab ||
                target instanceof StructureFactory) {
                // if the target is empty
                if (target.store[task.resource] == 0) {
                    // clear the task
                    creep.memory.task = null;
                    // if the task has an amount
                } else if (task.amount != null) {
                    // if attempting to withdraw the resource results in not being in range
                    if (creep.withdraw(target, task.resource, task.amount) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        creep.moveTo(target);
                    }
                } else {
                    // if attempting to withdraw the resource results in not being in range
                    if (creep.withdraw(target, task.resource) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
    /**
     * run the deposit task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {DepositTask} task - the task being run
     */
    runDeposit (creep, task) {
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
            // if the creep is empty
        } else if (creep.store[task.resource] == 0) {
            // clear the task
            creep.memory.task = null;
        } else {
            // grab the target
            let target = Game.getObjectById(task.target);
            // if the target is not valid or empty
            if (target == null || target.store.getFreeCapacity(task.resource) == 0) {
                // clear the task
                creep.memory.task = null;
            } else {
                // if the amount is specified
                if (task.amount == null) {
                    // if transferring to the target results in not being in range
                    if (creep.transfer(target, task.resource) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        creep.moveTo(target);
                    }
                } else {
                    // if transferring to the target results in not being in range
                    if (creep.transfer(target, task.resource, task.amount) == ERR_NOT_IN_RANGE) {
                        // move to the target
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
    /**
     * run the repair task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {RepairTask} task - the task being run
     */
    runRepair (creep, task) {
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
            // if the creep is empty
        } else if (creep.store[RESOURCE_ENERGY] == 0) {
            // clear the task
            creep.memory.task = null;
        } else {
            // grab the target
            let target = Game.getObjectById(task.structure);
            // if the target is invalid or at max health
            if (target == null || target.hits == target.hitsMax) {
                // clear the task
                creep.memory.task = null;
            } else {
                // if repairing the target results in not being in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    creep.moveTo(target);
                }
            }
        }
    }
    /**
     * run the build task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {BuildTask} task - the task being run
     */
    runBuild (creep, task) {
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
            // if the creep is empty
        } else if (creep.store[RESOURCE_ENERGY] == 0) {
            // clear the task
            creep.memory.task = null;
        } else {
            // grab the target
            let target = Game.getObjectById(task.construction_site);
            // if the target is invalid
            if (target == null) {
                // clear the task
                creep.memory.task = null;
            } else {
                // if building the target results in not being in range
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    creep.moveTo(target);
                }
            }
        }
    }
    /**
     * run the upgrade task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {UpgradeTask} task - the task being run
     */
    runUpgrade (creep, task) {
        // if the creep is not in the room for the task
        if (creep.room.name != task.room_name) {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
            // if the creep is empty
        } else if (creep.store[RESOURCE_ENERGY] == 0) {
            // clear the task
            creep.memory.task = null;
        } else {
            // if the controller's sign does not match the signature
            if (creep.room.controller.sign.text == SIGNATURE) {
                // if upgrading the controller results in not being in range
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    // move to the controller
                    creep.moveTo(creep.room.controller);
                }
            } else {
                // if signing the controller results in not being in range
                if (creep.signController(creep.room.controller, SIGNATURE) == ERR_NOT_IN_RANGE) {
                    // move to the controller
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
    /**
     * run the claim task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {ClaimTask} task - the task being run
     */
    runClaim (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
            // if the controller's sign matches the signature
            if (creep.room.controller.sign.text == SIGNATURE) {
                // if claiming the controller results in not being in range
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    // move to the controller
                    creep.moveTo(creep.room.controller);
                }
            } else {
                // if signing the controller results in not being in range
                if (creep.signController(creep.room.controller, SIGNATURE) == ERR_NOT_IN_RANGE) {
                    // move to the controller
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the reserve task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {ReserveTask} task - the task being run
     */
    runReserve (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
            // if the controller's sign matches the signature
            if (creep.room.controller.sign.text == SIGNATURE) {
                // if reserving the controller results in not being in range
                if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    // move to the controller
                    creep.moveTo(creep.room.controller);
                }
            } else {
                // if signing the controller results in not being in range
                if (creep.signController(creep.room.controller, SIGNATURE) == ERR_NOT_IN_RANGE) {
                    // move to the controller
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the drill task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {DrillTask} task - the task being run
     */
    runDrill (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
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
        } else {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the attack task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {AttackTask} task - the task being run
     */
    runAttack (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
            // grab the target
            let target = Game.getObjectById(task.target);
            // if the target is null
            if (target == null) {
                // clear the task
                creep.memory.task = null;
            } else {
                // if attacking the target results in not being in range
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    creep.moveTo(target);
                }
            }
        } else {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the heal task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {HealTask} task - the task being run
     */
    runHeal (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
            // grab the target
            let target = Game.getObjectById(task.creep);
            // if the target is invalid or at max health
            if (target == null || target.hits == target.hitsMax) {
                // clear the task
                creep.memory.task = null;
            } else {
                // if healing the target results in not being in range
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    // move to the target
                    creep.moveTo(target);
                }
            }
        } else {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the move room task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {MoveRoomTask} task - the task being run
     */
    runMoveRoom (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
            // if the timer has gone off
            if (task.timer >= 5) {
                // clear the task
                creep.memory.task = null;
            } else {
                // increment the timer
                task.timer++;
                // move to the room for the task
                creep.moveToRoom(task.room_name);
            }
        } else {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the idle task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {IdleTask} task - the task being run
     */
    runIdle (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
            // if the task has reached the tick limit
            if (task.tick_counter > task.tick_limit) {
                // clear the task
                creep.memory.task = null;
            } else {
                // increment the tick counter
                task.tick_counter++;
                // idle the creep
                creep.idle();
            }
        } else {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the renew operator task on the creep
     * @param {PowerCreep} creep - The Creep doing the task
     * @param {RenewOperatorTask} task - the task being run
     */
    runRenewOperator (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
            // grab the power spawn
            let power_spawn = Game.getObjectById(task.power_spawn);
            // if the power spawn is invalid
            if (power_spawn == null) {
                // clear the task
                creep.memory.task = null;
            } else {
                // try to renew
                let result = creep.renew(power_spawn);
                // if the creep is not in range
                if (result == ERR_NOT_IN_RANGE) {
                    // move to the power spawn
                    creep.moveTo(power_spawn);
                }
                // if the result was successful
                if (result == OK) {
                    // restore the previous task
                    creep.memory.task = task.previous_task;
                }
            }
        } else {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the move resource task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {MoveResourceTask} task - the task being run
     */
    runMoveResource (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
            // if the task is filling
            if (task.state == STATES.FILLING) {
                // if the creep has the requested amount of the resource
                if (creep.store[task.resource] == task.amount) {
                    // set the task to dumping
                    task.state = STATES.DUMPING;
                } else {
                    // grab the source structure
                    let source_structure = Game.getObjectById(task.source_structure);
                    // if the source structure is valid
                    if (source_structure == null) {
                        // clear the task
                        creep.memory.task = null;
                    } else {
                        // if attempting to withdraw from the source structure results in not being in range
                        if (creep.withdraw(source_structure, task.resource, task.amount) == ERR_NOT_IN_RANGE) {
                            // move to the source structure
                            creep.moveTo(source_structure);
                        }
                    }
                }
            }
            // if the task is dumping
            if (task.state == STATES.DUMPING) {
                // if the creep is empty
                if (creep.store.getUsedCapacity() == 0) {
                    // clear the task
                    creep.memory.task = null;
                } else {
                    // grab the target structure
                    let target_structure = Game.getObjectById(task.target_structure);
                    // if the target structure is valid
                    if (target_structure == null) {
                        // clear the task
                        creep.memory.task = null;
                    } else {
                        // if attempting to transfer to the target structure results in not being in range
                        if (creep.transfer(target_structure, task.resource, task.amount) == ERR_NOT_IN_RANGE) {
                            // move to the target structure
                            creep.moveTo(target_structure);
                        }
                    }
                }
            }
        }else{
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the harvest task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     * @param {HarvestTask} task - the task being run
     */
    runHarvest (creep, task) {
        // if the creep is in the room for the task
        if (creep.room.name == task.room_name) {
            // if the creep is full
            if (creep.store.getFreeCapacity() == 0) {
                // clear the task
                creep.memory.task = null;
            } else {
                // grab the target
                let target = Game.getObjectById(task.target);
                // if attempting to harvest the target results in not being in range
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    // move to the assigned source
                    creep.moveTo(target);
                }
            }
        } else {
            // move to the room for the task
            creep.moveToRoom(task.room_name);
        }
    }
    /**
     * run the task on the creep
     * @param {Creep|PowerCreep} creep - The Creep doing the task
     */
    run (creep) {
        /**
         * grab the task from the creep
         * @type {Task}
         */
        let task = creep.memory.task;

        // if the task matches
        if (task.type == TASK_TYPES.GATHER) {
            // run the appropriate function
            this.runGather(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.DEPOSIT) {
            // run the appropriate function
            this.runDeposit(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.REPAIR) {
            // run the appropriate function
            this.runRepair(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.BUILD) {
            // run the appropriate function
            this.runBuild(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.UPGRADE) {
            // run the appropriate function
            this.runUpgrade(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.CLAIM) {
            // run the appropriate function
            this.runClaim(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.RESERVE) {
            // run the appropriate function
            this.runReserve(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.DRILL) {
            // run the appropriate function
            this.runDrill(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.ATTACK) {
            // run the appropriate function
            this.runAttack(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.HEAL) {
            // run the appropriate function
            this.runHeal(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.MOVE_ROOM) {
            // run the appropriate function
            this.runMoveRoom(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.IDLE) {
            // run the appropriate function
            this.runIdle(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.RENEW_OPERATOR) {
            // run the appropriate function
            this.runRenewOperator(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.MOVE_RESOURCE) {
            // run the appropriate function
            this.runMoveResource(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.MOVE_RESOURCE) {
            // run the appropriate function
            this.runMoveResource(creep, creep.memory.task);
        }
        // if the task matches
        if (task.type == TASK_TYPES.HARVEST) {
            // run the appropriate function
            this.runHarvest(creep, creep.memory.task);
        }
    }
}

// export the NeuroTask class
global.NeuroTask = NeuroTask;

/**
 * Global singleton instance of NeuroTask class.
 * @constant {NeuroTask} neuro_task
 */
global.neuro_task = new NeuroTask();