/**
 * This is the class containing all methods for web API calling.
 */
class DataService {

    /**
     * Base url of the web API
     * @type {string}
     */
    #baseUrl = "http://localhost"
    /**
     * Prefix of target controller
     * @type {string}
     */
    #controller;

    constructor(controler) {
        this.#controller = controler;
    }

    /**
     * Build up URL for an action
     * @param {string} action
     * @returns {string} URL
     */
    #url(action) {
        return this.#baseUrl + "?c=" + this.#controller + "&a=" + action;
    }

    /**
     * Send a request to an endpoint (action)
     * @param {string} action Action in service controller
     * @param {string} method HTTP method (POST, GET etc.)
     * @param {number|string} responseCode Expected HTTP response code
     * @param {object} body  Parameters to be sent to the action
     * @param onErrorReturn If there is an error, return this value
     * @returns {Promise<any|any>} Return Promise, because this method uses fetch method
     */
    async sendRequest(action, method, responseCode, body, onErrorReturn = null) {
        // TODO Implement this method
    }
}

export {DataService}