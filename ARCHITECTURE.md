# General Approach
The main challenge for Screeps is scoping out things and caching data in clever ways.
There are 5 types of files we work with, organized into folders:
- prototype: Functions wrapped around built-in classes to enhance their functionality.
- data: Classes for data storage. No logic whatsoever to allow for serialization. We do this to leverage type safety and documentation.
- neuro: Holds the actual logic functions. Uses the data classes to store and pass data between each other.
- global: Miscellaneous functions for utility, visualization, and timing.
- role: Creep roles that control the configuration and behavior of Creeps.

We focus on role-based creep and structure behavior via extensive prototyping.
We put as much of the bulk of code into prototyped functions as we can to consolidate the code and improve stability.
We should never be repeating ourselves much.
Higher level functions like population and construction are handled on a room-by-room basis, with tailored behavior for
their type.
The Capitol room is a special Colony room that all non-energy resources are concentrated at.
Colony rooms are normal bases that have all the major structures.
Expansion rooms harvest extra energy and are not fully owned but reserved.
We focus on making polished features like time statistics, visuals, loggers, memory wiping, and commands.
This creates a pleasant and native experience for the player watching the colony.
We want the visuals and console to act as a neat screen-saver if desired.
Stability is a large focus, with no breaking errors and no time-outs.
We also make sure to support occasional memory wipes so that the system can recover after a fix or change to the code.
Support for build numbers allows for automatic memory wipe and recovery to prevent version differences causing breaking
changes.
All the code is in raw JavaScript.
The code is kept simple to aid in teaching and readability.
No libraries, TypeScript, syntactic sugar, or compilation allows the code to be read by a beginner.
Nearly every single line of code is commented and explained.
The code should be self-explaining, with documentation being optional to understand it.
Documentation is optional but extensive, containing design notes as well as usage guides.
An API sit is included that shows the details of all classes, constants, and prototype extensions.

# File Structure
Code is held in the `src` folder.
The `src` folder is organized into folders for each type of file.
Grunt is set up to automatically compile the code into the `dist` folder.
The `dist` folder is the folder uploaded to the server.
This allows us to use folders to organize the code but still have a flattened structure for uploading.

# Task system
Low-level actions such as "get this resource from here" or "idle here" or "build this" are stored as Tasks on the Creep.
Tasks can detect when the task is done and delete themselves or restore an old task.
Decision trees are only used if the task is empty, this cuts down on CPU time heavily.
This also cuts down on duplicated code, reducing footprint and improving stability.
Task invalidating eliminates the need for state machines, avoiding broken states entirely.
Each creep need only ask itself: "Do I have a task? If so, do it. If not, find a new task."
Only catastrophic events such as a colony dying cause broken states, which have far worse consequences than a few confused creeps.

# JSDoc usage
All systems have JSDoc type hints to use IDE features for debugging.
This also helps with autocomplete and forcing documentation standards.
You can re-generate the documentation site using `npm run generate`.

# Roles
This is a list of the creep roles that are used.
Each one gets some initial data in memory and then from their work independently and does not require oversight.
These are all implemented as prototypes onto the built-in Creep type to allow for native use like `creep.run()`

## attacker
Defends whatever room they are assigned to

## builder
Builds any construction sites in the room

## claimer
Claims or reserves the room it is assigned to, depending on the room's type

## commodity collector
Finds commodities in highway rooms and returns them to the capitol

## driller
Harvests a given energy source, standing over its assigned container

## healer
Heals any creeps in the assigned room

## mineral driller
Harvests the mineral in the room, standing over its assigned container

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
Repairs any structures in the room

## scout
Scouts out new rooms using a simple search algorithm

## transporter
Moves energy from the assigned container back to the spawn/extensions/storage

## upgrader
Upgrades the room's controller to level it up and maintain ownership
