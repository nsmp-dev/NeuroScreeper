global.PowerHealerRole = new Role("power_healer", "🔴⚕️", [HEAL, TOUGH, MOVE, MOVE], 360, 12);

global.ROLES[PowerHealerRole.name] = PowerHealerRole;

/**
 * PowerHealerMemory class, storing data for an attacker
 * @class PowerHealerMemory
 */
class PowerHealerMemory extends CreepMemory{
    /**
     * creates an PowerHealerMemory object
     * @param {string} room_name - The name of the room this creep is assigned to
     */
    constructor(room_name){
        super(PowerHealerRole.name, room_name);
    }
}
global.PowerHealerMemory = PowerHealerMemory;

Creep.prototype.runPowerHealer = function () {
    if (this.memory.task == null) {
        let squad = this.getPowerSquad();
        if (squad.state == STATES.IDLE) {
            this.memory.task = new IdleTask(this.memory.room_name);
        }else{
            if (squad.state == STATES.SEARCHING) {
                if (this.room.name == squad.highway_queue[0]) {
                    this.memory.task = new IdleTask(this.room.name);
                }else{
                    this.memory.task = new MoveRoomTask(squad.highway_queue[0]);
                }
            }else if (squad.state == STATES.COLLECTING) {
                let creeps = this.room.find(FIND_MY_CREEPS, {
                    filter: creep => creep.hits < creep.hitsMax,
                });
                if (creeps.length > 0) {
                    let target = this.pos.findClosestByPath(creeps);
                    this.memory.task = new HealTask(target);
                }else{
                    this.memory.task = new IdleTask(this.room.name)
                }
            }if (squad.state == STATES.RETURNING) {
                if (this.room.name == squad.return_room_name) {
                    this.memory.task = new IdleTask(this.room.name);
                }else{
                    this.memory.task = new MoveRoomTask(squad.return_room_name);
                }
            }
        }
    }
    TaskRunner.run(this);
};