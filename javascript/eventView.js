/*jslint node: true, browser: true */
"use strict";

function eventView() {
    var openNav = true,
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
        };
        
        this.showForm = function () {
            console.log("test");
            document.getElementById("formHolder").style.display = "block";
        };
        this.hideForm = function () {
            document.getElementById("formHolder").style.display = "none";
        };


        this.setButtonAction = function (button, callback) {
        //Generic method for using the local method AddMouseAndTouchUp to assigning the given call back 
        //as an eventlisteners to the given parameters
            addMouseAndTouchUp(button, callback);
        };
        
        this.init = function () {
    };
}