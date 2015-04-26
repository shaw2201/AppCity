/*jslint node: true, browser: true */
"use strict";

function TrackerView() {
    var map, marker;
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
    },
            placeMarker = function(location) {
                marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    icon: 'https://devweb2014.cis.strath.ac.uk/~fqb12152/317/AppCity/images/checkered-flags.jpg',
                    title: "End"
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "End of route"
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });
            };

    this.init = function() {
        document.getElementById("popup").style.display = "none";
    };

    this.reset = function() {
        marker.setMap(null);
    }

    this.centreMap = function(pos) {
        map.setCenter(pos);
        placeMarker(pos);
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
    };
    this.hidePopup = function() {
        //handle hiding about box purely within the view
        document.getElementById("popup").style.display = "none";
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
    };
    this.hideLoad = function() {
        document.getElementById("loadMenu").style.display = "none";
    };
    
    this.showMap = function() {
        document.getElementById("map-canvas").style.display = "block";
        document.getElementById("ButtonDiv").style.display = "block";
        document.getElementById("check").style.display = "block";
    };
    
    this.hideMap = function() {
        document.getElementById("ButtonDiv").style.display = "none";
        document.getElementById("map-canvas").style.display = "none";
        document.getElementById("check").style.display = "none";
    };
}

