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

    constructor(controller) {
        this.#controller = controller;
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
     * @param {object} body Parameters to be sent to the action
     * @param onErrorReturn If there is an error, return this value
     * @returns {Promise<any|any>} Return Promise, because this method uses fetch method
     */
    async sendRequest(action, method, responseCode, body, onErrorReturn = null) {
        try {
            const options = {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                }
            };

            // len pri metódach s telom
            if (body && method.toUpperCase() !== "GET" && method.toUpperCase() !== "HEAD") {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(this.#url(action), options);

            // ak status nie je očakávaný, vyhoď výnimku s onErrorReturn
            if (response.status !== Number(responseCode)) {
                throw onErrorReturn;
            }

            // 204 - No Content -> vráť true
            if (response.status === 204) {
                return true;
            }

            // inak sa očakávajú dáta -> vráť ich
            return await response.json();
        } catch (e) {
            // pri chybe vyhoď výnimku s hodnotou onErrorReturn
            throw onErrorReturn;
        }
    }
}

export {DataService}