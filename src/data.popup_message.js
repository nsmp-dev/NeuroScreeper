/**
 * PopupMessage class, an object that contains data for a popup message
 * @class PopupMessage
 */
class PopupMessage {
    /**
     * Creates a PopupMessage Object
     * @param {string} text - text to display in the popup
     */
    constructor(text) {
        /**
         * text to display in the popup
         * @type {string}
         */
        this.text = text;
        /**
         * timer for the popup message to disappear
         * @type {number}
         */
        this.timer = 0;
    }
}

// export the PopupMessage class
global.PopupMessage = PopupMessage;