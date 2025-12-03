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

    /**
     * Id of the last message, we have in a chat
     * @type {number}
     */
    #lastId = 0;

    constructor() {

        this.#authService = new AuthAPI();
        this.#messageService = new MessagesAPI();

        document.getElementById("message_rows").innerHTML = ""

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
                this.showNotice("The message can't be sent. The recipient might be not active or an error occurred.", 'danger');
            }
        }

        // Periodically ask API for new messages and status
        setInterval(
            () => this.checkChanges(),
            1000
        );

    }

    /**
     * Check current session status and according to it, it will change visibility of
     * UI.
     * @param showNotice used to shoe notice, if this method is called using login button
     * @returns {Promise<boolean>}
     */
    async showLoginOrLogout(showNotice = false) {
        // Get user status
        let logged = await this.#authService.userStatus();

        if (logged == null) {
            // User is not logged, hide everything except login form
            document.getElementById("user-logged").style.display = "none";
            document.getElementById("user-not-logged").style.display = "block";
            document.getElementById("chat").style.display = "none";
            document.getElementById("active").style.display = "none";
        } else {
            // User is logged, show chat UI and hide login form
            let loginElement = document.getElementById("user-logged");
            loginElement.style.display = "block";
            loginElement.querySelector("span").innerText = logged;
            document.getElementById("user-not-logged").style.display = "none";
            document.getElementById("chat").style.display = "block";
            document.getElementById("active").style.display = "block";

            return true;
        }
        // If there is a problem with login
        if (showNotice) {
            this.showNotice("Login failed!", 'danger');
        }
        return false;
    }

    /**
     * Check for changes and change UI
     * @returns {Promise<void>}
     */
    async checkChanges() {
        if (await this.showLoginOrLogout()) { // check if user is logged in
            await this.showMessages(); //  get all messages
            await this.showActiveUsers(); // get list of active users
        }
    }

    /**
     * Show a notice
     * @param {string} message
     * @param type type of the alert
     */
    showNotice(message, type = 'alert') {
        // Get an element for notices
        let noticesElement = document.getElementById("notices");
        // Add a new notice at the top of the notices stack
        noticesElement.innerHTML =
            `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
             </div>` + noticesElement.innerHTML;
    }

    /**
     * Gets and show active users
     * @returns {Promise<void>}
     */
    async showActiveUsers() {
        // Get list of all active users
        let active = await this.#authService.getActiveUsers();
        // Get an element where the list will be created
        let ulElement = document.getElementById("active").querySelector("ul");
        // Remove all previous content
        ulElement.innerHTML = "";

        if (active.length > 0) {
            // If there are active users, iterate them
            active.forEach((user) => {
                // For each user, create a LI element
                let li = document.createElement("li");
                // Show user login
                li.innerText = user.login;
                // Add onclick handler
                li.onclick = () => {
                    // By clicking login in the active user list copy the name to recipient input field
                    document.getElementById("recipient").value = user.login;
                }
                // Append a new list item
                ulElement.append(li);
            });
        }
    }

    /**
     * Show messages
     * @returns {Promise}
     */
    async showMessages() {
        // Get all messages
        let messages = await this.#messageService.getAllMessages(this.#lastId);
        // Get an element where to put all messages
        let tbodyElement = document.getElementById("message_rows");
        // stringHTML will contain a HTML code of all messages
        let stringHTML = "";
        // remember last id (the newest message come as the first one)
        if (messages.length > 0) {
            this.#lastId = messages[0].id;
        }
        // Formatter for a correct date conversion
        let formatter = new Intl.DateTimeFormat('sk-SK', {dateStyle: 'short', timeStyle: 'medium'});

        // Iterate through the messages
        messages.forEach((message) => {
            // Get a date object
            let date = Date.parse(message.created);
            // Is the message private?
            let isPrivate = message.recipient != null;
            // Set the author and the recipient (if the message is private)
            let to = isPrivate ? message.author + " => " + message.recipient : message.author;
            // Set the CSS class to highlight line with private message
            let privateClass = isPrivate ? "table-primary" : "";
            // One message per table row
            stringHTML += `
                <tr class="${privateClass}">
                    <td style="width:15%">${formatter.format(date)}</td>
                    <td style="width:15%">${to}</td>
                    <td>${message.message}</td>
                </tr>
                `
        });
        // Wrap messages to the table with a header
        console.log(this.#lastId);
        tbodyElement.innerHTML = stringHTML + tbodyElement.innerHTML;
    }
}

export {Chat}