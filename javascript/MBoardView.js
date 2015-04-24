/*jslint node: true, browser: true */
"use strict";

function MBoardView() {
    this.addNewPost = function (msg) {
        var chatHolder = document.getElementById("chatholder"),
            node = document.createElement("DIV"),
            textnode = document.createTextNode(msg);

        node.className = "chatPostDiv";
        node.appendChild(textnode);
        chatHolder.appendChild(node);
        document.getElementById("postmessage").scrollIntoView();
    };

    this.setPostHandler = function (callback) {
        document.getElementById("chatform").addEventListener("submit", function (evt) {
            var val = document.getElementById("postmessage").value;
            document.getElementById("postmessage").value = "";
            evt.preventDefault();
            callback(val);
        });
    };

    this.init = function () {};
}