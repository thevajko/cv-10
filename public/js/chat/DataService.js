/**
 * This is the class containing all methods for web API calling.
 */
class DataService {

    /**
     * Base url of the web API
     * @type {string}
     */
    #url = "http://localhost"
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
    baseUrl(action) {
        return this.#url + "?c=" + this.#controller + "&a=" + action;
    }

    /**
     * Send a request to an endpoint (action)
     * @param {string} action Action in service controller
     * @param {string} method HTTP method (POST, GET etc.)
     * @param {number} responseCode Expected HTTP response code
     * @param {object} body  Parameters to be sent to the action
     * @param onErrorReturn If there will be an error in request processing, return this value
     * @returns {Promise<any|any>} Return Promise, because this method uses fetch method
     */
    async sendRequest(action, method, responseCode, body, onErrorReturn = null) {
        try {
            const response = await fetch(this.baseUrl(action), {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (response.status !== responseCode) {
                return onErrorReturn;
            }

            return response.json();
        }
        catch (Exception) {
            return onErrorReturn;
        }
    }
}

export {DataService}