# NeuroScreeper
Role-based, polished AI for the programming game Screeps.

## Features
- robust, consistent, and role-based creep behavior
- extensive prototyping, high-level management code
- polished with many statistics, visuals, and monitoring systems
- high safety and stability, no breaking errors
- well documented and commented, for easy learning and forced rubber ducky effect
- fully mechanically complete: uses all mechanics and systems in the game
- raw JavaScript only, no TypeScript, no libraries, no compilation, no obfuscation, no syntactic sugar

## Installation
Requirements: Node.js, Screeps account email, and Screeps API access key
1. Clone the git repository or download the zip file and extract it into a folder.
2. Copy the `example.Gruntfile.js` to a file named `GruntFile.js`.
3. Fill out the appropriate information like email and Screeps API key.
4. If you don't have grunt installed, do so with the following command: `npm install -g grunt`
5. From that folder, run the following commands:
    ```bash
    npm install
    grunt screeps
    ```
6. Your first spawn must be placed with a clearance of 5 spaces to its left, 6 to the top and bottom, and 7 to the right. It must also be named the same as the `INITIAL_SPAWN_NAME` constant, default is `Spawn1` to match the game default.
7. The AI should now be running, fully autonomously!

## Documentation
All the code is commented for easy understanding of the inner workings.

### API
[Click here for documentation](https://nsmp-dev.github.io/NeuroScreeper/)

### ARCHITECTURE.md
- Detailed information on the design of the AI
- Each creep role's purpose and usage
- Descriptions for the global modules
- Explanations for design decisions

### STYLE.md
- Rules for how to style the code
- Example code for common actions
- Naming Conventions
- JSDoc examples
- changelog formatting rules

### CHANGELOG.md
Contains details of different versions

### TODO.md
Planned features and notes

## Visualizer
Each Colony and Expansion will run a visualizer.
- The top left has the population broken down by role and assignment.
- Below that is the estimation of the progress on the controller.
- Below that is a list of the timers for the global population counting and local room timers.
- The bottom has a log of the last 50 tick's CPU usage in the timer log, drawing it as a bar graph.
- The top has a list of popups for status updates, which fade after a few ticks.
