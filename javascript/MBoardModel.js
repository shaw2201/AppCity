/*jslint node: true, browser: true */
/*global DOMParser */
"use strict";
function MBoardModel() {
    var username = "Unknown",
        postQueue = {},//associative array to hold posts
        postcallback, //the function to callback for each new message
        highestIDseen = -1, //only show IDs over this number - initialise to -1 to show all
        incrementMsgID = function () {
            localStorage.rqb12154_chat_msgid++;
            return localStorage.rqb12154_chat_msgid;
        },
        addItem = function (str) {
            console.log("adding " + str + " to queue");
            var id = incrementMsgID();
            postQueue["_" + id] = "m=" + encodeURIComponent(str) + "&c=" + uuid + "&csID=" + id;
        },
        removeItem = function (id) {
            console.log("Removing " + id);
            delete postQueue["_" + id];
        },
        postMessage = function (message) {
            // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
            var xhr = new XMLHttpRequest();
            xhr.open('get', 'server.php?' + message);

            // Track the state changes of the request.
            xhr.onreadystatechange = function () {
                var DONE = 4, OK = 200; // readyState 4 = the request is done; status 200 = successful return
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        if (isNaN(xhr.responseText)) {
                            console.log("error from server " + xhr.responseText);
                        } else {
                            removeItem(xhr.responseText);
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
        checkQueue = function () {
            console.log("checking queue");
            var key;
            for (key in postQueue) {
                postMessage(postQueue[key]);
            }
        },
        checkPosts = function () {
            // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
            var xhr = new XMLHttpRequest();
            
            console.log("checking posts from " + highestIDseen);

            xhr.open('get', 'getmessages.php?last=' + (highestIDseen >= 0 ? highestIDseen : 0));

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
                                seenID = parseInt(msg.id, 10);// need to parse and parse as decimal or else risk unexpected behaviour
                                console.log("got post ID " + seenID + " (highest was " + highestIDseen + ")");
                                if (seenID > highestIDseen) {
                                    highestIDseen = msg.id;
                                    postcallback(msg.comment);
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
        addItem(msg);
    };

    this.setAddPostCallback = function (f) {
      postcallback = f; 
    };

    this.init = function () {
        //TODO handle no localStorage
        if (!localStorage.rqb12154_chat_msgid) {
            localStorage.rqb12154_chat_msgid = 0;
        }
        if (localStorage.rqb12154_username) {
            username = localStorage.rqb12154_username;
        } else {
            localStorage.rqb12154_username = username;
        }
        window.setInterval(checkQueue, 400);
        window.setInterval(checkPosts, 300);
    };
}