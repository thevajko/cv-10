import {AuthAPI} from "./AuthAPI.js";
import {MessagesAPI} from "./MessagesAPI.js";

/**
 * Main chat class
 */
class Chat {

    /**
     * API for authentication
     * @type {AuthAPI}
     */
    #authService;
    /**
     * API for sending and receiving messages
     * @type {MessagesAPI}
     */
    #messageService;

    constructor(elementId) {

        this.#authService = new AuthAPI();
        this.#messageService = new MessagesAPI();

        // Add handler for 'Login' button
        document.getElementById("btn-login").onclick = async () => {
            await this.#authService.login(
                document.getElementById("login").value,
                document.getElementById("password").value
            );
            // re-check user status
            await this.showLoginOrLogout(true);
        }
        // Add handler for 'Logout' button
        document.getElementById("btn-logout").onclick = async () => {
            await this.#authService.logout();
            // re-check user status
            await this.showLoginOrLogout();
        }
        // Add handler for 'Send message' button
        document.getElementById("btn-send").onclick = async () => {
            let response = await this.#messageService.sendMessage(
                document.getElementById("message").value,
                document.getElementById("recipient").value
            );
            // If message was sent, clear message and recipient input field
            if (response === true) {
                document.getElementById("message").value = "";
                document.getElementById("recipient").value = "";
            } else {
                // If not show notice
                this.showNotice("The message can't be sent. The recipient might be not active or an error occurred.");
            }
        }

        // Periodically ask API for new messages and status
        setInterval(
            () => this.checkChanges(),
            1000
        );

    }

    /**
     * Check for changes and change UI
     * @returns {Promise<void>}
     */
    async checkChanges() {
        if (await this.showLoginOrLogout()) { // check if user is logged in
            await this.getMessages(); //  get all messages
            await this.getActiveUsers(); // get list of active users
        }
    }

    /**
     * Check current user status and show or hide login form
     * @param showNotice used to shoe notice, if this method is called using login button
     * @returns {Promise<boolean>}
     */
    async showLoginOrLogout(showNotice = false) {
        // get logged status bool
        let logged = await this.#authService.loggedDetails();

        if (logged == null) {
            // user is not logged, hide all except login form
            document.getElementById("user-logged").style.display = "none";
            document.getElementById("user-not-logged").style.display = "block";
            document.getElementById("chat").style.display = "none";
            document.getElementById("active").style.display = "none";
        } else {
            // user is logged, show chat UI and hide login form
            let loginElemelent = document.getElementById("user-logged");
            loginElemelent.style.display = "block";
            loginElemelent.querySelector("span").innerText = logged;
            document.getElementById("user-not-logged").style.display = "none";
            document.getElementById("chat").style.display = "block";
            document.getElementById("active").style.display = "block";

            return true;
        }
        // If there is a problem with login
        if (showNotice) {
            this.showNotice("There were some problems with login!");
        }
        return false;
    }

    /**
     * Show a notice
     * @param {string} message
     */
    showNotice(message) {
        // Get an element for notices
        let noticesElement = document.getElementById("notices");
        // Add a new notice at the top of the notices stack
        noticesElement.innerHTML =
            `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
             </div>` + noticesElement.innerHTML;
    }

    /**
     * Get and show active users
     * @returns {Promise<void>}
     */
    async getActiveUsers() {
        let users = await this.#authService.getActiveUsers();
        let list = document.querySelector("#active ul");
        list.innerHTML = "";

        for (let user of users) {
            let li = document.createElement("li");
            li.innerText = user.login;
            li.addEventListener("click", () => {
                document.getElementById("recipient").value = user.login;
            });
            list.appendChild(li);
        }
    }

    /**
     * Get all messages for the user
     * @returns {Promise}
     */
    async getMessages() {
        // TODO Implement this method
    }
}

export {Chat}
