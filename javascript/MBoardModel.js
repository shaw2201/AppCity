/*jslint node: true, browser: true */
/*global DOMParser */
"use strict";
function MsgBoardModel() {
    var username = "Fraser",
        postQueue = {},//associative array to hold posts
        replyQueue = {},//associative array to hold replies
        postcallback,
        replycallback,//the function to callback for each new message
        highestIDseen = -1,//only show IDs over this number - initialise to -1 to show all
        highestRIDseen = -1,
        msgid = -1,
        replyid = -1,
        ReplyToPID = -1,
        incrementMsgID = function () {
            msgid += 1;
            return msgid;
        },
        incrementReplyID = function () {
            replyid += 1;
            return replyid;
        },
        addPost = function (str) {
            console.log("adding " + str + " to post queue");
            var id = incrementMsgID();
            if(str!==""){
                postQueue["_" + id] = "m=" + encodeURIComponent(str) + "&username=" + encodeURIComponent(username) + "&csID=" + encodeURIComponent(id);
            }
        },
        addReply = function (str) {
            console.log("adding " + str + " to reply queue");
            var id = incrementReplyID();
            if(str!==""){
                replyQueue["_" + id] = "m=" + encodeURIComponent(str) + "&username=" + encodeURIComponent(username) + "&RID=" + encodeURIComponent(id) + "&PID=" + encodeURIComponent(ReplyToPID);
            }
        },
        removePost = function (id) {
            console.log("Removing post " + id);
            delete postQueue["_" + id];
        },
        removeReply = function (id) {
            console.log("Removing reply " + id);
            delete replyQueue["_" + id];
        },
        postMessage = function (message) {
            // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
            var xhr = new XMLHttpRequest();
            xhr.open('get', '../php/postMessage.php?' + message);

            // Track the state changes of the request.
            xhr.onreadystatechange = function () {
                var DONE = 4, OK = 200; // readyState 4 = the request is done; status 200 = successful return
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        if (isNaN(xhr.responseText)) {
                            console.log("error from server " + xhr.responseText);
                        } else {
                            removePost(xhr.responseText);
                        }
                    } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                    }
                }
            };

            xhr.send(); // Send the request to send-ajax-data.php
            window.setTimeout(checkQueue, 100);
            window.setTimeout(checkPosts, 300);
        },
        postReply = function (message) {
            // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
            var xhr = new XMLHttpRequest();
            xhr.open('get', '../php/postReply.php?' + message);

            // Track the state changes of the request.
            xhr.onreadystatechange = function () {
                var DONE = 4, OK = 200; // readyState 4 = the request is done; status 200 = successful return
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        if (isNaN(xhr.responseText)) {
                            console.log("error from server " + xhr.responseText);
                        } else {
                            removeReply(xhr.responseText);
                        }
                    } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                    }
                }
            };

            xhr.send(); // Send the request to send-ajax-data.php
            window.setTimeout(checkQueue, 100);
            window.setTimeout(checkReplies, 300);
        },
        checkQueue = function () {
            var key;
            for (key in postQueue) {
                console.log("postMessage" + postQueue[key]);
                postMessage(postQueue[key]);
            }
            for (key in replyQueue) {
                console.log("replyMessage" + replyQueue[key]);
                postReply(replyQueue[key]);
            }
        },
        checkPosts = function () {
            // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
            var xhr = new XMLHttpRequest();
            xhr.open('get', '../php/getMessages.php?last=' + (highestIDseen >= 0 ? highestIDseen : 0));

            // Track the state changes of the request.
            xhr.onreadystatechange = function () {
                var DONE = 4, OK = 200, index, lines, line, msg, seenID; // readyState 4 = the request is done; status 200 = successful return
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        //console.log("reply = "+xhr.responseText);
                        lines = xhr.responseText.split("\n");
                        for (index = 0; index < lines.length; index++) {
                            line = lines[index];
                            if (line.length > 0) {
                                msg  = JSON.parse(line);
                                seenID = parseInt(msg.pid, 10);// need to parse and parse as decimal or else risk unexpected behaviour
                                console.log("got post ID " + seenID + " (highest was " + highestIDseen + ")");
                                if (seenID > highestIDseen) {
                                    highestIDseen = msg.pid;
                                    postcallback(msg.message, msg.username, msg.pid);
                                }
                            }
                        }
                    } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                    }
                }
            };

            xhr.send(); // Send the request to send-ajax-data.php
        },
        checkReplies = function () {
            // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
            var xhr = new XMLHttpRequest();
            xhr.open('get', '../php/getReplies.php?last=' + (highestRIDseen >= 0 ? highestRIDseen : 0));

            // Track the state changes of the request.
            xhr.onreadystatechange = function () {
                var DONE = 4, OK = 200, index, lines, line, msg, seenID; // readyState 4 = the request is done; status 200 = successful return
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        //console.log("reply = "+xhr.responseText);
                        lines = xhr.responseText.split("\n");
                        for (index = 0; index < lines.length; index++) {
                            line = lines[index];
                            if (line.length > 0) {
                                msg  = JSON.parse(line);
                                seenID = parseInt(msg.rid, 10);// need to parse and parse as decimal or else risk unexpected behaviour
                                console.log("got reply ID " + seenID + " (highest was " + highestRIDseen + ")");
                                if (seenID > highestRIDseen) {
                                    highestRIDseen = msg.rid;
                                    replycallback(msg.message, msg.username, msg.pid);
                                }
                            }
                        }
                    } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                    }
                }
            };

            xhr.send(); // Send the request to send-ajax-data.php
        };

    this.post = function (msg) {
        addPost(msg);
    };
    this.reply = function (msg) {
        if (ReplyToPID !== -1) {
            addReply(msg);
        }
    };

    this.setReplyCallback = function (f) {
        replycallback = f;
    };

    this.setPostCallback = function (f) {
        postcallback = f;
    };
    this.setReplyToPID = function (id) {
        ReplyToPID = parseInt(id, 10);
    };

    this.init = function () {
        if (localStorage.rqb12154_username) {
            if(localStorage.rqb12154_username!=="Unknown")
            username = localStorage.rqb12154_username;
        }
        window.setInterval(checkQueue, 900);
        window.setInterval(checkPosts, 600);
        window.setInterval(checkReplies, 700);
    };
}