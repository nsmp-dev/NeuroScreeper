/**
 * contains logic for running a power squad, using a PowerSquad object for storage
 * @module PowerSquadRunner
 */
global.PowerSquadRunner = {
    /**
     * run the power squad, kicking off sub-functions for specific activities
     * @param {PowerSquad} power_squad - The power squad we are running
     */
    run: function (power_squad) {
        // TODO: if the creeps are not cached
            // search for them
            // if found
                // cache the ids
                // set the state to SEARCHING
            // else
                // return

        // TODO: grab the cached creeps

        // TODO: if any of the creeps were not found
            // invalidate the cached ids
            // set the state to IDLE

        // TODO: if state is SEARCHING
            // if all creeps are in the next room
                // advance the queue
                // if the room has a power bank
                    // change state to COLLECTING
        // TODO: if state is COLLECTING
            // if power transporter is full
                // find nearest colony
                // set state to RETURNING
            // else
                // if power bank is empty
                    // set state to SEARCHING
        // TODO: if state is RETURNING
            // if the power transporter is empty
                // set state to SEARCHING

        // TODO: occasionally check for new highway rooms
    },
};