import {DataService} from "./DataService.js";

/**
 * Class containing all calls to MessageApiController
 */
class MessagesAPI extends DataService {

    constructor() {
        super("messageApi");
    }

    /**
     * Get all messages for the user
     * @param {string|number|null} lastID
     * @returns {Promise<Array<Object>>}
     */
    async getMessages(lastID = null) {
        let lastIdString = lastID == null ? "" : "&lastId=" + lastID;
        return await this.sendRequest(
            "getMessages" + lastIdString,
            'POST',
            200,
            null,
            []
        )
    }

    /**
     * Send a message
     * @param {string} message
     * @param {string|null} recipient
     * @returns {Promise<boolean>} true if message was sent
     */
    async sendMessage(message, recipient = null) {
        return await this.sendRequest(
            "sendMessage",
            "POST",
            204,
            {
                "recipient" : recipient,
                "message" : message
            },
            false
        )
    }
}

export {MessagesAPI}
