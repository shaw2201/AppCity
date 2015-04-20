/*jslint node: true, browser: true */
"use strict";

function AppView() {
    var test =0,
    addMouseAndTouchUp = function (elementID, handler) {
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
    hideHome = function (){
        document.getElementById("popupScore").style.display = "none";
    };
    
    this.setMenuButtons = function (button, callback) {
        //Generic method for using the local method AddMouseAndTouchUp to assigning the given call back 
        //as an eventlisteners to the given parameters
        addMouseAndTouchUp("Track", function (){
            hideHome();
            document.getElementById("map-wrapper").style.display = "block";
            console.log("Hello");
        });
    };
}

