/*jslint node: true, browser: true */
"use strict";

function TrackerView() {
    var map, marker, moved = false;
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see a blank space instead of the map, this
    // is probably because you have denied permission for location sharing.

    var addMouseAndTouchUp = function(elementID, handler) {
        //utility function to add both mouseup and touchend events and prevent double events
        var element = document.getElementById(elementID),
                f = function(e) {
                    e.preventDefault();//stops mobile browsers faking the mouse events after touch events
                    handler(e);
                    return false;
                };
        element.addEventListener("mouseup", f, false);
        element.addEventListener("touchend", f, false);
    };

    this.init = function() {
        document.getElementById("popup").style.display = "none";
        var f = function(e) {
            console.log("touch registered");
            moved = false;
            return true;
        },
                d = function(e) {
                    console.log("move registered");
                    moved = true;
                    return true;
                };
        document.getElementById("chatholder").addEventListener("touchstart", f, true);
        document.getElementById("chatholder").addEventListener("touchmove", d, true);
    };

    this.centreMap = function(pos) {
        map.setCenter(pos);
    };

    this.setMap = function(m) {
        map = m;
    };

    this.setButtonAction = function(button, callback) {
        //Generic method for using the local method AddMouseAndTouchUp to assigning the given call back 
        //as an eventlisteners to the given parameters
        addMouseAndTouchUp(button, callback);
    };

    this.showPopup = function(dis) {
        //handle showing about box purely within the view as their's no model involved
        document.getElementById("distanceTraveled").innerHTML = "You ran a distance of " + dis + "m";
        document.getElementById("popup").style.display = "block";
        document.getElementById("stopMessage").style.display = "block";
    };
    this.hidePopup = function() {
        //handle hiding about box purely within the view
        document.getElementById("popup").style.display = "none";
        document.getElementById("stopMessage").style.display = "none";
    };

    this.showForm = function() {
        document.getElementById("formHolder").style.display = "block";
    };
    this.hideForm = function() {
        document.getElementById("formHolder").style.display = "none";
    };

    this.showPost = function() {
        document.getElementById("postMessage").style.display = "block";
    };
    this.hidePost = function() {
        document.getElementById("postMessage").style.display = "none";
    };

    this.showLoad = function() {
        document.getElementById("loadMenu").style.display = "block";
        document.getElementById("chatholder").style.display = "block";
    };
    this.hideLoad = function() {
        document.getElementById("loadMenu").style.display = "none";
        document.getElementById("chatholder").style.display = "none";
    };

    this.showMap = function() {
        document.getElementById("map-canvas").style.display = "block";
        document.getElementById("ButtonDiv").style.display = "block";
    };

    this.hideMap = function() {
        document.getElementById("ButtonDiv").style.display = "none";
        document.getElementById("map-canvas").style.display = "none";
    };

    this.addNewPath = function(author, location, des, lat, long, id, callback) {
        var chatHolder = document.getElementById("chatholder"),
                node = document.createElement("DIV"),
                node2 = document.createElement("DIV"),
                node3 = document.createElement("DIV"),
                namenode = document.createTextNode("Author: " + author),
                locnode = document.createTextNode("Location: " + location),
                desnode = document.createTextNode("Description: " + des);

        node.className = "chatPostDiv";
        node.id = id;
        node.appendChild(namenode);
        node2.appendChild(locnode);
        node.appendChild(node2);
        node3.appendChild(desnode);
        node.appendChild(node3);
        chatHolder.appendChild(node);
        addMouseAndTouchUp(id, function(evt) {
            if (!moved) {
                evt.preventDefault();
                callback(lat, long);
            }
        });
    };
}

