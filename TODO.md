# v0.2

## final review

## name possibilities
NeuroScreeper
SongCrawl
CyberCreeps

## emoji choices
pick 2 emojis to illustrate each role
 - attacker
 - builder
 - claimer
 - commodity_collector
 - driller
 - healer
 - mineral_driller
 - mineral_transporter
 - operator
 - power_attacker
 - power_healer
 - power_transporter
 - queen
 - repairer
 - scout
 - transporter
 - upgrader

# v0.3

## flesh out operator
add in logic to fill the currently requested reaction/production
account for cleanup commands as well
double-check the reaction/production assignment logic in plant runner
double-check the cleanup detection

## update queen logic
when in a non-capitol room, move reaction and production ingredients from storage to terminal
when in a capitol room, move reaction and production ingredients from terminal to storage

## update terminal
add logic to sell end-game commodities/resources
add logic to move reaction and production ingredients to capitol room

## add squads
squads get stored on the room_data object, similar to drillers and transporters
population requester knows how to spawn members of the squad
if the squad is not full, the members idle until it is full

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

### commodity collector
goes out to find commodities and returns them to nearest terminal

# v0.4

## Bug testing
make sure to observe every single mechanic in the game
watch each role for a while, making sure they spawn and behave properly

## Documentation and comments
polish all the comments and JSDoc descriptions/types
regenerate the JSDoc site
look at themes for JSDoc
flesh out the documentation markdown files

## Visualizer overhaul
add in tons to the visualizer

## Logger additions
add in logs in many places
add in timers in many places that are CPU intensive
