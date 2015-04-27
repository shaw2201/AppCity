/*jslint node: true, browser: true */
/*global DOMParser */
"use strict";

function MsgBoardController() {
    var MBoardModel = new MsgBoardModel(),
        MBoardView  = new MsgBoardView();

    this.init = function () {
        MBoardModel.init();
        MBoardModel.setPostCallback(function (message, username, pid) {
            MBoardView.addNewPost(message, username, pid, MBoardModel.setReplyToPID);
        });
        MBoardModel.setReplyCallback(MBoardView.addNewReply);
        MBoardView.setPostHandler(MBoardModel.post);
        MBoardView.setReplyHandler(MBoardModel.reply);
        MBoardView.setButtonAction("rcancel", function () {
            MBoardView.hideForm();
        });
        MBoardView.setButtonAction("ncancel", function () {
            MBoardView.hideNameForm();
        });
        console.log("name is : " + MBoardModel.getUsername());
        MBoardView.setNameHandler(MBoardModel.setUsername);
        if (MBoardModel.getUsername() == "Unknown") {
            MBoardView.showNameForm();
        }
    };
}

var MBoardController = new MsgBoardController();

window.addEventListener("load", MBoardController.init, false);