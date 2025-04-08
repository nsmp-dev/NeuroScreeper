const Task = require('data.task');
const Point = require("data.point");

/** @module Tasks */
module.exports = {
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Structure|Resource} target - The Room we are planning
     * @param {string} resource - The Plans for the room.
     * @param {number|null} amount - The initial spawn in the room.
     * @return {Task} the created Task
     */
    gather: function (target, resource, amount = null) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.GATHER);
        // set the target of the task
        task.target = target.id;
        // name of the room the target is in
        task.room_name = target.room.name;
        // the type of resource to be gathered
        task.resource = resource;
        // the amount of resource to be gathered
        task.amount = amount;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Structure} target - The Room we are planning
     * @param {string} resource - The Plans for the room.
     * @param {number|null} amount - The initial spawn in the room.
     * @return {Task} the created Task
     */
    deposit: function (target, resource, amount = null) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.DEPOSIT);
        // set the target of the task
        task.target = target.id;
        // name of the room the target is in
        task.room_name = target.room.name;
        // the type of resource to be gathered
        task.resource = resource;
        // the amount of resource to be gathered
        task.amount = amount;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Structure|ConstructionSite} target - The Room we are planning
     * @return {Task} the created Task
     */
    build: function (target) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.BUILD);
        // set the target of the task
        task.target = target.id;
        // name of the room the target is in
        task.room_name = target.room.name;
        task.resource = RESOURCE_ENERGY;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Structure} target - The Room we are planning
     * @return {Task} the created Task
     */
    repair: function (target) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.REPAIR);
        // set the target of the task
        task.target = target.id;
        // name of the room the target is in
        task.room_name = target.room.name;
        task.resource = RESOURCE_ENERGY;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     * @return {Task} the created Task
     */
    upgrade: function (room_name) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.UPGRADE);
        // name of the room the task is in
        task.room_name = room_name;
        task.resource = RESOURCE_ENERGY;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     * @return {Task} the created Task
     */
    claim: function (room_name) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.CLAIM);
        // name of the room the task is in
        task.room_name = room_name;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     * @return {Task} the created Task
     */
    reserve: function (room_name) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.RESERVE);
        // name of the room the task is in
        task.room_name = room_name;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Source} source - The Room we are planning
     * @param {number} container_x - The Plans for the room.
     * @param {number} container_y - The initial spawn in the room.
     * @return {Task} the created Task
     */
    drill: function (source, container_x, container_y) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.DRILL);
        // set the target of the task
        task.target = source.id;
        // name of the room the target is in
        task.room_name = source.room.name;
        // location of the target
        task.location = new Point(container_x, container_y);
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Creep} creep - The Room we are planning
     * @return {Task} the created Task
     */
    attack: function (creep) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.ATTACK);
        // set the target of the task
        task.target = creep.id;
        // name of the room the target is in
        task.room_name = creep.room.name;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {Creep} creep - The Room we are planning
     * @return {Task} the created Task
     */
    heal: function (creep) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.HEAL);
        // set the target of the task
        task.target = creep.id;
        // name of the room the target is in
        task.room_name = creep.room.name;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     * @return {Task} the created Task
     */
    moveRoom: function (room_name) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.MOVE_ROOM);
        // name of the room the task is in
        task.room_name = room_name;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {StructurePowerSpawn} power_spawn - The Room we are planning
     * @param {Task} previous_task - The Plans for the room.
     * @return {Task} the created Task
     */
    renewOperator: function (power_spawn, previous_task) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.RENEW_OPERATOR);
        // name of the room the power spawn is in
        task.room_name = power_spawn.room.name;
        // set the target of the task
        task.target = power_spawn.id;
        // storage for the previous task so we can resume the task
        task.previous_task = previous_task;
        // return the new task
        return task;
    },
    /**
     * Plans the initial room, basing the base off the initial spawn
     * @param {string} room_name - The Room we are planning
     * @param {number} tick_limit - The Plans for the room.
     * @return {Task} the created Task
     */
    idle: function (room_name, tick_limit = 10) {
        // create the base task of the corresponding type
        let task = new Task(TASK_TYPES.IDLE);
        // name of the room the task is in
        task.room_name = room_name;
        // limit of time to be idling
        task.tick_limit = tick_limit;
        // return the new task
        return task;
    },
};