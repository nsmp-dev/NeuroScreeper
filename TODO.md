# v0.2

## JSDoc overhaul
- add line comments to new code (in progress)
- review jsdoc descriptions
- review line comments

## Start using new classes
Point - holds x and y coordinates
ConstructionPlan - holds x and y coordinates and a type of structure
SourcePlan - holds source id, location, and container location
MineralPlan - holds mineral id, location, and container location

## file renaming
data.plans_factory.js -> factory.room_plans.js
data.tasks.js -> factory.task.js

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

# v0.3

## new roles

### power attacker
attacks power bank

### power healer
heals the attacker

### power transporter
picks up power and takes it back to the nearest terminal

### mineral driller
drills the mineral in the room if it exists

### mineral transporter
transports the mined minerals to the nearest terminal

### operator power creep
able to operate factory to enable it
transports reagents to labs and results back to storage
transports commodities into/from factory
moves all ingredients in the terminal to the storage
moves all products in the terminal to the storage

### commodity collector
goes out to find commodities and returns them to nearest terminal

## Terminal
add in selling setting for when 1 ingredient gets too full
add in selling for final products
add in logic to move all minerals and commodities to the capitol
