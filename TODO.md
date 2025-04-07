# v0.2

## final review

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

## add follow task
add in a follow task that accepts a target to follow
utilize this with task interrupts (like for a dying operator) to create squads of creeps

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
