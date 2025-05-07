# Changelog

## [Unreleased]

## [0.3.2] - 2025-05-07

## Added
- room data now tracks the progress of the controller in the room
- visualizer now prints timers and controller progress in the room

## Changed
- updated documentation
- task announcements have been moved into a new task getter and setter
- renamed creep and room prototype functions to be more descriptive
- the visualizer is now split up into smaller functions
- NeuroPlant is now split up into smaller functions

## [0.3.1] - 2025-04-25

## Changed
- documentation updates
- bug fixes
- name changes to fit the theme of the new name
- documentation grammar updates

## [0.3.0] - 2025-04-23

## Added
- controller-based tasks now attempt to sign the controller using the SIGNATURE constant
- example Gruntfile for uploading to the server

## Changed
- bug fixes
- Roles now have classes to improve type safety
- RoomRunner now accounts for rooms that are not currently visible
- Moved the spawn function to the room runner from the Room game object to improve stability
- moved source files to the `src/` folder

## [0.2.6] - 2025-04-21

## Added
- role logic for commodity collector
- role logic for power attacker
- role logic for power healer
- role logic for power transporter
- role logic for operator
- power squad logic for swapping between states
- room runner logic for spawning new roles
- room manager logic for counting new roles
- room death calculation
- power squad population class for counting the population of power squads
- power squad timer for occasionally running the power squad

## Changed
- terminals now sell final products and send ingredients to other rooms
- queen now also moves ingredients and final products between the terminal and the storage

## [0.2.5] - 2025-04-15

## Added
- type hints to the creep memory classes
- SourcePopulation and MineralPopulation classes that log the population of sources and minerals
- pixel generating on a full bucket
- planning for future role additions
- findTransporterTarget, which grabs a target for a transporter style creep, combining some duplicated code
- MoveResourceTask that handles moving an amount of resource from one structure to another

## Changed
- all functions now use Points instead of individual name_x and name_y style parameters
- tasks now use classes to handle different types of tasks
- moved all globals, classes, etc. into the global scope to make the type hints more consistent
- moved role configs into the role files
- moved creep memory classes onto global scope
- plant runner now uses state machines to manage the labs and factory

## [0.2.4] - 2025-04-08

## Added
- RoomPopulation class for standardizing population operations
- MineralDriller and MineralTransporter roles
- new resource type property on mineral plans
- new architecture documentation on file structure and task system

## Changed
- mineral plans adjusted to hold locations
- modified population counting to use the new class
- visualizer updated to use the RoomPopulation class
- simplified population requesting by not having to check for undefined roles

## [0.2.3] - 2025-04-07

## Changed
- Builders now fallback to repairing and then upgrading
- Repairers now fallback to building and then upgrading

## [0.2.2] - 2025-04-07

### Added
- new road and rampart grid on RoomPlan objects
- road anchors for bases and plant
- new functions for drawing roads in the RoomPlans factory
- new distance function in Util

### Changed
- changed road and rampart arrays to road and rampart grids with booleans
- the construction function on the room prototype now uses the new road and rampart grids

## [0.2.1] - 2025-04-07

### Added
- plant for extra endgame buildings
- operator role for doing plant operations
- task system for common creep actions
- object classes for greater type protection
- JSDoc documentation for type hints and automatic documentation rendering
- capitol room that concentrates all resources

### Changed
- refactored file structure and naming conventions for cleaner style and architecture

## [0.2.0] - 2025-02-21

### Added
- comments to every line
- new roles to fill out actions that are needed
- combined capitol/expansion/colony logic
- added many prototypes to expand room and creep functionality

### Changed
- changed role logic to use new prototypes

### Fixed
- fixed room planning not accounting for initial spawn placement

## [0.1.0] - 2025-02-12

### Added
- added global objects that handle major logic
- added many roles that handle creep behavior
- added population calculations and requesting
- added spawning of creeps with certain roles
- added room manager to handle adding rooms
- util global for common actions
- visualizer for convenient visual output
- logger for proper debugging and status
- controllers for different types of rooms
- prototypes to handle towers, terminals, and observers

## [0.0.0] - 2024-03-26

### Added
- initial commit and repository creation
- project skeleton and planning notes