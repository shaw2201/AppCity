/*jslint node: true, browser: true */

"use strict";

function eventController() {
    var model = new eventModel(),
        view = new eventView();

    this.init = function () {
        model.init();
        view.init();

        view.setButtonAction("addEvent", function () {
            view.showForm();
        });
        view.setButtonAction("ecancel", function () {
            view.hideForm();
        });
        view.setButtonAction("esubmit", function () {
            view.hideForm();
        });
        
        model.setAddPostCallback(view.addNewPost);
        view.setPostHandler(model.post);
    };
}

var eventController = new eventController();

window.addEventListener("load", eventController.init, false);