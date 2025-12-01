import {DataService} from "./DataService.js";

/**
 * Class containing all calls to MessageApiController
 */
class MessagesAPI extends DataService {

    constructor() {
        super("api/message");
    }

    /**
     * Get all messages for the user
     * @param {string|number|null} lastID id of the last downloaded message, currently not used
     * @returns {Promise<Array<Object>>}
     */
    async getAllMessages(lastID = null) {
        // TODO Implement this method
    }

    /**
     * Send a message to the backend
     * @param {string} message
     * @param {string|null} recipient
     * @returns {Promise<boolean>} true if message was sent
     */
    async sendMessage(message, recipient = null) {
        // TODO Implement this method
    }
}

export {MessagesAPI}