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
    async getMessages(lastID = null) {
        let lastIdString = lastID == null ? "" : "&lastId=" + lastID;
        return await this.sendRequest(
            "getAllMessages" + lastIdString,
            "POST",
            200,
            null,
            []);
    }

    /**
     * Send a message
     * @param {string} message
     * @param {string|null} recipient
     * @returns {Promise<boolean>} true if message was sent
     */
    async sendMessage(message, recipient = null) {
        return await this.sendRequest(
            "receiveMessage",
            "POST",
            204,
            {
                'recipient': recipient,
                'message': message
            },
            false);
    }
}

export {MessagesAPI}