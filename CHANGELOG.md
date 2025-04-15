# Changelog

## [Unreleased]

## [0.2.5] - 2025-04-15

## Added
- type hints to the creep memory classes
- SourcePopulation and MineralPopulation classes that log population of sources and minerals
- pixel generating on a full bucket
- planning for future role additions
- getTransporterTarget, which grabs a target for a transporter style creep, combining some duplicated code

## Changed
- all functions now use Points instead of individual name_x and name_y style parameters
- tasks now use classes to handle different types of tasks
- moved all globals, classes, etc. into the global scope to make the type hints more consistent
- moved role configs into the role files
- moved creep memory classes onto global scope

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
- construction function on room prototype now uses the new road and rampart grids

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
- new roles to fill out needed actions
- combined capitol/expansion/colony logic
- added many prototypes to expand room and creep functionality

### Changed
- changed role logic to use new prototypes

### Fixed
- fixed room planning not accounting for initial spawn placement

## [0.1.0] - 2025-02-12

### Added
- added global objects that handle major logic
- added many roles that handle creep behaviour
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