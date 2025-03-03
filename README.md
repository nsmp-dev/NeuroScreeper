# cheat sheet

to loop thru hashes

```
for(let name in Game.creeps) {
	// do stuff...
}
```

to count lines:

```
^(.*)$
```

# v0.2

## new roles

### power attacker

attacks power bank

### power healer

heals the attacker

### power transporter

picks up power and takes it back to capitol

### mineral driller

drills the mineral in the room if it exists

### mineral transporter

transports the mined minerals to the capitol

### operator power creep

able to operate factory to enable it
transports reagents to labs and results back to storage
transports commodities into/from factory

### commodity collector

goes out to find commodities and returns them to the capitol

## Capital Room

new type of room that is unique
has powerspawn/lab/factory area
all collected power/minerals/commodities go to this room's storage
spawns power creeplab tech to setup reactions and store result
lab tech also feeds factories and sends output to be sold

## 3 types of systems

### entity contextualized

code run off the entity themselves like creep.run()

### room contextualized

code run once for each colony like construction and population

### global contextualized

code run once for the whole system like deciding to expand to new rooms

## request/fill systems

population
construction
lab jobs
factory jobs

# general approach

focus on role-base creep and structure behaviour
higher level functions like population and construction are handled on a room-by-room basis
capitol room that concentrates resources to one place for processing
colony rooms that handle normal bases
expansion rooms that harvest extra energy
robust self-timing and visualization
high stability - very little errors
tight timing - never times out
do it raw - no TS, no compilation, no syntactic sugar, just normal modules using state machine patterns

# Roles

## attacker

defends whatever room they are assigned to

## builder

builds any construction sites in the room

## claimer

claims the room it is assigned to

## commodity collector

goes out to find commodities and returns them to the capitol

## driller

harvests a given energy source, standing over it's assigned container

## harvester

harvests energy and takes it directly to spawn. only for bootstrapping

## healer

heals any creeps in the assigned room

## mineral driller

drills the mineral in the room if it exists

## mineral transporter

transports the mined minerals to the capitol

## operator power creep

able to operate factory to enable it
transports reagents to labs and results back to storage
transports commodities into/from factory

## power attacker

attacks power bank

## power healer

heals the attacker

## power transporter

picks up power and takes it back to capitol

## queen

takes energy from the storage and puts it into the tower or the terminal

## repairer

repairs any structures in the room, used before towers are unlocked

## scout

scouts out new rooms using simple search algorithm

## transporter

moves energy from assigned container back to the spawn/extensions/storage

## upgrader

upgrades the room's controller to level it up and maintain ownership
