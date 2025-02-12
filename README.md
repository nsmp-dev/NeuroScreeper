# cheat sheet
to loop thru hashes
```
for(let [name, creep] in Object.entries(Game.creeps)) {
	// do stuff...
}
```

to count lines:
```
^(.*)$
```

https://github.com/screepers/screeps-launcher



# base
3 spawns (S)
60 extensions (E)
1 storage (A)
6 towers (T)
1 observer (O)
1 terminal (M)

# v0.1 roadmap
tight constraints
basic things only
bug test for a a long time

## features
auto-scouting and expansion
defensive forces with healers and attackers
role-based creeps with asigned positions per room
auto-construction of rampart covered base
terminal that sells excess energy/minerals and buys more when low
idle flag placement in all used rooms
stat calculation and visualizaiton
command system
controller sign placement
well commented with documentation that explains how to use
need-based population control, any spawn can be used to make a creep for any colony/expansion, the best one is used



## restrictions
no labs
no minerals
no power creeps
no nukes


# priority
in bootstrap?
harvesters

not in bootstrap?
driller
transporter
upgrader
builder
queen
scout
claimer
