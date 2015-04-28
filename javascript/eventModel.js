/*jslint node: true, browser: true */
/*global DOMParser */
"use strict";

function eventModel() {
    var postQueue = {},//associative array to hold posts
        postcallback, //the function to callback for each new message
        highestIDseen = -1, //only show IDs over this number - initialise to -1 to show all
        postID = -1,
        incrementMsgID = function () {
            postID++;
            return postID;
        },
        addItem = function (name, description, date, time, location) {
            console.log("adding " + name + " to queue");
            var id = incrementMsgID();
            if (name !== "" && description !== "" && date !== "" 
                    && time !== "" && location !== "")
                postQueue["_" + id] = "n=" + encodeURIComponent(name) + 
                                      "&d=" + encodeURIComponent(description) +
                                      "&date=" + encodeURIComponent(date) +
                                      "&t=" + encodeURIComponent(time) +
                                      "&l=" + encodeURIComponent(location) +"&csID=" + id;
        },
        removeItem = function (id) {
            console.log("Removing " + id);
            delete postQueue["_" + id];
        },
        postEvent = function (message) {
            // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
            var xhr = new XMLHttpRequest();
            xhr.open('get', '../php/addEvent.php?' + message); //add entry to the DB

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
            window.setTimeout(checkPosts, 300);
       },
        checkQueue = function () {
            console.log("checking queue");
            var key;
            for (key in postQueue) {
                postEvent(postQueue[key]);
            }
        },
        checkPosts = function () {
            // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
            var xhr = new XMLHttpRequest();
            
            console.log("checking posts from " + highestIDseen);

            xhr.open('get', '../php/getEvents.php?last=' + (highestIDseen >= 0 ? highestIDseen : 0));

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
                                    postcallback(msg.eventname, msg.description, msg.date, msg.time, msg.location);
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

    this.post = function (name, description, date, time, location) {
        addItem(name, description, date, time, location);
    };

    this.setAddPostCallback = function (f) {
      postcallback = f; 
    };

    this.init = function () {
        window.setInterval(checkQueue, 1000);
        window.setInterval(checkPosts, 300);
    };
}

