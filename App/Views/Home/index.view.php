<div class="container-fluid">
    <div class="row">
        <div class="col text-center mb-3">
            <h3>Chat App</h3>
        </div>
    </div>
    <div id="notices"></div>
    <div class="row">
        <div class="col-2">
            <div id="active" style="display: none">
                <h3>Online users:</h3>
                <ul></ul>
            </div>
        </div>
        <div class="col-10" id="chat" style="display: none">
            <div class="mb-3">
                <label for="recipient">To:</label> <input type="text" id="recipient">
                <label for="message">Message:</label> <input type="text" id="message" size="80">
                <button id="btn-send">Send</button>
            </div>
            <h3>Messages:</h3>
            <div id="messages">
                <table class="table table-sm table-bordered">
                    <thead>
                    <tr>
                        <th>Date and time</th>
                        <th>From (=>to)</th>
                        <th>Message</th>
                    </tr>
                    </thead>
                    <tbody id="message_rows">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
