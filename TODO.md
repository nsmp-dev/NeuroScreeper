# v0.2

## JSDoc overhaul
- add line comments to new code (in progress)
- review jsdoc descriptions (in progress)
- review line comments (in progress)

### files to be verified
runner.task.js

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

## add in fallback logic for creep roles that overlap
for example, repairers fallback to building and builders fallback to upgrading

## figure out JSDoc documentation rendering
find out how to render html and md files that will go in a /docs folder
add these files to a GitHub page

# v0.3

## flesh out operator
add in logic to fill the currently requested reaction/production
account for cleanup commands as well
double-check the reaction/production assignment logic in plant runner
double-check the cleanup detection

## new roles
these roles fill out the operations of end game resource collection

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
