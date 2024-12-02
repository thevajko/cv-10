import {DataService} from "./DataService.js";

/**
 * Class containing all calls to AuthApiController
 */
class AuthAPI extends DataService {

    constructor() {
        super("authApi");
    }

    /**
     * Check and return current status of the user
     * @returns {Promise<object|null>} Object with the login attribute, if there is no error
     */
    async userStatus() {
        let response = await this.sendRequest(
            "status",
            "POST",
            200,
            {},
            null);
        return response != null ? response.login : response;
    }

    /**
     * Check and return current status of the user
     * @returns {Promise<object|null>} Object with attribute login, if there is no error
     */
    async loggedDetails() {
        let response = await this.sendRequest(
            "status",
            "POST",
            200,
            {},
            null);
        return response != null ? response.login : response;
    }

    /**
     * Logout user
     * @returns {Promise<{object}>}
     */
    async logout() {
        return await this.sendRequest(
            "logout",
            "POST",
            204,
            {},
            false);
    }

    /**
     * Login user with the credentials
     * @param {string} login
     * @param {string} password
     * @returns {Promise<boolean>} true if login was successful
     */
    async login(login, password) {
        return await this.sendRequest(
            "login",
            "POST",
            204,
            {
                login: login,
                password: password
            },
            false);
    }

    /**
     * Get an active users list
     * @returns {Promise<Array<string>>}
     */
    async getActiveUsers() {
        return await this.sendRequest(
            "activeUsers",
            "POST",
            200,
            null,
            []);
    }
}

export {AuthAPI}