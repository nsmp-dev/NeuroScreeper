const Task = require('data.task');

/** @module Tasks */
module.exports = {
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Structure|Resource} target - The Room we are planning
     * @param {string} resource - The Plans for the room.
     * @param {number|null} amount - The initial spawn in the room.
     */
    gather: function (target, resource, amount = null) {
        let task = new Task(TASK_TYPES.GATHER);
        task.target = target.id;
        task.room_name = target.room.name;
        task.resource = resource;
        task.amount = amount;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Structure} target - The Room we are planning
     * @param {string} resource - The Plans for the room.
     * @param {number|null} amount - The initial spawn in the room.
     */
    deposit: function (target, resource, amount = null) {
        let task = new Task(TASK_TYPES.DEPOSIT);
        task.target = target.id;
        task.room_name = target.room.name;
        task.resource = resource;
        task.amount = amount;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {RoomObject} target - The Room we are planning
     */
    build: function (target) {
        let task = new Task(TASK_TYPES.BUILD);
        task.target = target;
        task.room_name = target.room.name;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {RoomObject} target - The Room we are planning
     */
    repair: function (target) {
        let task = new Task(TASK_TYPES.REPAIR);
        task.target = target;
        task.room_name = target.room.name;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     */
    upgrade: function (room_name) {
        let task = new Task(TASK_TYPES.UPGRADE);
        task.room_name = room_name;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     */
    claim: function (room_name) {
        let task = new Task(TASK_TYPES.CLAIM);
        task.room_name = room_name;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     */
    reserve: function (room_name) {
        let task = new Task(TASK_TYPES.RESERVE);
        task.room_name = room_name;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Source} source - The Room we are planning
     * @param {number} container_x - The Plans for the room.
     * @param {number} container_y - The initial spawn in the room.
     */
    drill: function (source, container_x, container_y) {
        let task = new Task(TASK_TYPES.DRILL);
        task.target = source.id;
        task.room_name = source.room.name;
        task.container_x = container_x;
        task.container_y = container_y;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Creep} creep - The Room we are planning
     */
    attack: function (creep) {
        let task = new Task(TASK_TYPES.ATTACK);
        task.target = creep.id;
        task.room_name = creep.room.name;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Creep} creep - The Room we are planning
     */
    heal: function (creep) {
        let task = new Task(TASK_TYPES.HEAL);
        task.target = creep.id;
        task.room_name = creep.room.name;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     */
    moveRoom: function (room_name) {
        let task = new Task(TASK_TYPES.MOVE_ROOM);
        task.room_name = room_name;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {StructurePowerSpawn} power_spawn - The Room we are planning
     * @param {Task} previous_task - The Plans for the room.
     */
    renewOperator: function (power_spawn, previous_task) {
        let task = new Task(TASK_TYPES.RENEW_OPERATOR);
        task.room_name = power_spawn.room.name;
        task.target = power_spawn.id;
        task.previous_task = previous_task;
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     * @param {number} tick_limit - The Plans for the room.
     */
    idle: function (room_name, tick_limit = 10) {
        let task = new Task(TASK_TYPES.IDLE);
        task.room_name = room_name;
        task.tick_limit = tick_limit;
        return task;
    },
};