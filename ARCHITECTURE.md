# general approach
The main challenge for Screeps is scoping out things and caching them in clever ways.
There are 3 levels of scope we work with:
- Prototype: Functions wrapped around built-in classes to enhance their functionality
- Room: Handles running an individual room, spawning creeps and creating construction sites
- Global: High level management that creates new rooms and counts the creeps

We focus on role-base creep and structure behaviour via extensive prototyping.
We put as much of the bulk of code into prototyped functions so we can to consolidate the code and improve stability.
We should never be repeating ourselves much.
Higher level functions like population and construction are handled on a room-by-room basis, with tailored behaviour for
their type.
The Capitol room is a room that all non-energy resources are concentrated at.
Colony rooms are normal bases that have all the major structures.
Expansion rooms harvest extra energy, and are not fully owned, but reserved.
We focus on making polished features like time statistics, visuals, loggers, memory wiping, and commands.
This creates a pleasant and native experience for the player watching the colony.
We want the visuals and console to act as a neat screen-saver if desired.
Stability is a large focus, with no breaking errors and no time-outs.
We also make sure to support occasional memory wipes so that the system can recover after a fix or change to the code.
Support for build numbers allows for automatic memory wipe and recovery to prevent version differences causing breaking
changes.
All the code is in raw Javascript.
The code is kept simple to aid in teaching and readability.
No libraries, typescript, syntactic sugar, or compilation allows the code to be read by a beginner.
Nearly every single line of code is commented and explained.
The code should be self-explaining, with documentation being optional to understand it.
Documentation is optional but extensive, containing design notes as well as usage guides.

# Roles

This is a list of the creep roles that are utilized.
Each one gets some initial data in memory and then from there work independently and do not require oversight.
These are all implemented as prototypes onto the built-in Creep type to allow for native use like `creep.run()`

## attacker

Defends whatever room they are assigned to

## builder

Builds any construction sites in the room

## claimer

Claims or reserves the room it is assigned to, depending on the room's type

## commodity collector

Finds commodities and returns them to the capitol

## driller

Harvests a given energy source, standing over it's assigned container

## healer

Heals any creeps in the assigned room

## mineral driller

Harvests the mineral in the room, standing over it's assigned container

## mineral transporter

Transports the mined minerals to the capitol

## operator power creep

Able to operate factory to enable it
Transports reagents to labs and products back to storage
Transports commodities into and from the factory

## power attacker

Attacks a power bank

## power healer

Heals the attacker it is assigned to

## power transporter

Follows the assigned attacker and picks up power, taking it back to the capitol

## queen

Takes energy from the storage and puts it into the tower, extensions, or the terminal

## repairer

Repairs any structures in the room, used before towers are unlocked

## scout

Scouts out new rooms using simple search algorithm

## transporter

Moves energy from assigned container back to the spawn/extensions/storage

## upgrader

Upgrades the room's controller to level it up and maintain ownership
