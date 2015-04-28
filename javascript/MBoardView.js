/*jslint node: true, browser: true */
"use strict";

function MsgBoardView() {
    var addMouseAndTouchUp = function (elementID, handler) {
            //utility function to add both mouseup and touchend events and prevent double events
            var element = document.getElementById(elementID),
                f = function (e) {
                    e.preventDefault();//stops mobile browsers faking the mouse events after touch events
                    handler(e);
                    return false;
                };
            element.addEventListener("mouseup", f, false);
            element.addEventListener("touchend", f, false);
        },
        showForm = function () {
            console.log("form shown");
            document.getElementById("formHolder").style.display = "block";
        },
        moved = false;

    this.addNewPost = function (msg, username, id, callback) {
        var chatHolder = document.getElementById("chatholder"),
            node = document.createElement("DIV"),
            node2 = document.createElement("DIV"),
            namenode = document.createTextNode(username),
            msgnode = document.createTextNode(msg);

        node.className = "chatPostDiv";
        node.id = id;
        node.appendChild(namenode);
        node2.appendChild(msgnode);
        node.appendChild(node2);
        chatHolder.appendChild(node);
        node.scrollIntoView();
        addMouseAndTouchUp(id, function (evt) {
            if (!moved) {
                evt.preventDefault();
                showForm();
                callback(id);
            }
        });
    };
    this.addNewReply = function (msg, username, id) {
        var postHolder = document.getElementById(id),
            node = document.createElement("DIV"),
            node2 = document.createElement("DIV"),
            namenode = document.createTextNode(username),
            msgnode = document.createTextNode(msg);

        node.className = "chatReplyDiv";
        node.appendChild(namenode);
        node2.appendChild(msgnode);
        node.appendChild(node2);
        postHolder.appendChild(node);
        postHolder.scrollIntoView();
    };
    this.setButtonAction = function (button, callback) {
        //Generic method for using the local method AddMouseAndTouchUp to assigning the given call back 
        //as an eventlisteners to the given parameters
        addMouseAndTouchUp(button, callback);
    };
    this.setPostHandler = function (callback) {
        document.getElementById("chatform").addEventListener("submit", function (evt) {
            console.log("Msg Posted");
            var val = document.getElementById("postmessage").value;
            document.getElementById("postmessage").value = "";
            evt.preventDefault();
            callback(val);
        });
    };
    this.showForm = function () {
        console.log("form shown");
        document.getElementById("formHolder").style.display = "block";
    };
    this.hideForm = function () {
        console.log("form hidden");
        document.getElementById("formHolder").style.display = "none";
    };
    this.showNameForm = function () {
        console.log("name form shown");
        document.getElementById("nameFormHolder").style.display = "block";
    };
    this.hideNameForm = function () {
        console.log("name form hidden");
        document.getElementById("nameFormHolder").style.display = "none";
    };
    this.init = function () {
        var f = function (e) {
                console.log("touch registered");
                moved = false;
                return true;
            },
            d = function (e) {
                console.log("move registered");
                moved = true;
                return true;
            };
        document.getElementById("chatholder").addEventListener("touchstart", f, true);
        document.getElementById("chatholder").addEventListener("touchmove", d, true);
        document.getElementById("replyform").addEventListener("submit", function(evt){
          evt.preventDefault();  
        });
        document.getElementById("nameform").addEventListener("submit", function(evt){
          evt.preventDefault();  
        });
    };
}