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
     * @param {string|number|null} lastID id of the last downloaded message, currently not used
     * @returns {Promise<Array<Object>>}
     */
    async getMessages(lastID = null) {
        return await this.sendRequest(
            "getMessages&lastId="+lastID,
            "POST",
            200,
            {},
            []
        );
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
                message: message,
                recipient: recipient
            },
            false
        )
    }
}

export {MessagesAPI}
