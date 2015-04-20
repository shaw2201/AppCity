/*jslint node: true, browser: true */
"use strict";

function TrackerView() {
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see a blank space instead of the map, this
    // is probably because you have denied permission for location sharing.
    
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
        };
    
    this.init = function() {  

    };
    
    this.setButtonAction = function (button, callback) {
    //Generic method for using the local method AddMouseAndTouchUp to assigning the given call back 
    //as an eventlisteners to the given parameters
        addMouseAndTouchUp(button, callback);
    };
}

