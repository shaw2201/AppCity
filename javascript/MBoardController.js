/*jslint node: true, browser: true */
/*global DOMParser */
"use strict";

function MsgBoardController() {
    var MBoardModel = new MsgBoardModel(),
        MBoardView  = new MsgBoardView();

    this.init = function () {
        MBoardModel.init();
        MBoardView.init();
        MBoardModel.setPostCallback(function (message, username, pid) {
            MBoardView.addNewPost(message, username, pid, MBoardModel.setReplyToPID);
        });
        MBoardModel.setReplyCallback(MBoardView.addNewReply);
        MBoardView.setPostHandler(MBoardModel.post);
        MBoardView.setButtonAction("rcancel", function () {
            MBoardView.hideForm();
        });
        MBoardView.setButtonAction("rsubmit", function (evt) {
            console.log("Reply Posted");
            var val = document.getElementById("replyMsg").value;
            document.getElementById("replyMsg").value = "";
            evt.preventDefault();
            MBoardModel.reply(val);
            MBoardView.hideForm();
        });

        MBoardView.setButtonAction("ncancel", function () {
            MBoardView.hideNameForm();
        });

        MBoardView.setButtonAction("nsubmit", function (evt) {
            var val = document.getElementById("name").value;
            document.getElementById("name").value = "";
            evt.preventDefault();
            if (val !== "") {
                MBoardModel.setUsername(val);
                console.log("name set to : " + val);
            }
            MBoardView.hideNameForm();
        });

        console.log("name is : " + MBoardModel.getUsername());
        if (MBoardModel.getUsername() === "Unknown") {
            MBoardView.showNameForm();
        }
    };
}

var MBoardController = new MsgBoardController();

window.addEventListener("load", MBoardController.init, false);