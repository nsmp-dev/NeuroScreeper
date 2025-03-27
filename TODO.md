# v0.2

## JSDoc overhaul
- add type hints to everything (in progress)
- add line comments to new code
- review jsdoc descriptions

## flesh out road anchors
finish up making road anchors and connecting them to containers
connect lab anchors to the base anchors
each container gets connected to the nearest anchor

## `global.cmd.js`
new module for running arbitrary commands

## RoomManager
add in logic for "lastScanned" tick
scan when it gets too long ago, if we have vision
add in threat system and ownership markers to
account for threat when spawning new colonies and expansions

## Colony/Expansion
rework and add in conditionals for roles that are conditional on structures built

# v0.3

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
has PowerSpawn/lab/factory area
all collected power/minerals/commodities go to this room's storage
spawns power creep lab tech to set up reactions and store result
lab tech also feeds factories and sends output to be sold

## Room manager
add in logic to check for a capitol when adding rooms
add in check for if a room can be a capitol

## new prototypes
- `Room.prototype.findPlantLocation()`
- `Room.prototype.getMineralPlans()`
- `Room.prototype.getPlantPlans()`
