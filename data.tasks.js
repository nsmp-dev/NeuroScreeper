const Task = require('data.task');

module.exports = {
    gather: function (target, resource, amount = null) {
        let task = new Task(TASK_TYPES.GATHER);
        task.target = target.id;
        task.room_name = target.room.name;
        task.resource = resource;
        task.amount = amount;
        return task;
    },
    deposit: function (target, resource, amount = null) {
        let task = new Task(TASK_TYPES.DEPOSIT);
        task.target = target.id;
        task.room_name = target.room.name;
        task.resource = resource;
        task.amount = amount;
        return task;
    },
    build: function (target) {
        let task = new Task(TASK_TYPES.BUILD);
        task.target = target;
        task.room_name = target.room.name;
        return task;
    },
    repair: function (target) {
        let task = new Task(TASK_TYPES.REPAIR);
        task.target = target;
        task.room_name = target.room.name;
        return task;
    },
    upgrade: function (room_name) {
        let task = new Task(TASK_TYPES.UPGRADE);
        task.room_name = room_name;
        return task;
    },
    claim: function (room_name) {
        let task = new Task(TASK_TYPES.CLAIM);
        task.room_name = room_name;
        return task;
    },
    reserve: function (room_name) {
        let task = new Task(TASK_TYPES.RESERVE);
        task.room_name = room_name;
        return task;
    },
    drill: function (source, container_x, container_y) {
        let task = new Task(TASK_TYPES.DRILL);
        task.target = source.id;
        task.room_name = source.room.name;
        task.container_x = container_x;
        task.container_y = container_y;
        return task;
    },
    attack: function (creep) {
        let task = new Task(TASK_TYPES.ATTACK);
        task.target = creep.id;
        task.room_name = creep.room.name;
        return task;
    },
    heal: function (creep) {
        let task = new Task(TASK_TYPES.HEAL);
        task.target = creep.id;
        task.room_name = creep.room.name;
        return task;
    },
    moveRoom: function (room_name) {
        let task = new Task(TASK_TYPES.MOVE_ROOM);
        task.room_name = room_name;
        return task;
    },
    idle: function (room_name, tick_limit) {
        let task = new Task(TASK_TYPES.IDLE);
        task.room_name = room_name;
        task.tick_limit = tick_limit;
        return task;
    },
};