/**
 * Represents a popup message with text content and timing functionality.
 * This class handles the data structure for displaying temporary messages in a popup format.
 * @class PopupMessage
 */
class PopupMessage {
    /**
     * Initializes a new instance of PopupMessage with the specified display text
     * @param {string} text - The message content that will be shown in the popup display
     */
    constructor(text) {
        /**
         * The message content that will be displayed in the popup window
         * @type {string}
         */
        this.text = text;
        /**
         * Counter value that controls how long the popup message remains visible
         * @type {number}
         */
        this.timer = 0;
    }
}

// export the PopupMessage class
global.PopupMessage = PopupMessage;