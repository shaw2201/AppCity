/*jslint node: true, browser: true */
/*global DOMParser */
"use strict";

function MBoardController() {
    var testModel = new TestModel(),
        testView = new TestView();
    
    this.init = function () {
        testModel.init();
        testModel.setAddPostCallback(testView.addNewPost);
        testView.setPostHandler(testModel.post);
    };
}
    
var mBoardController = new MBoardController();

window.addEventListener("load", mBoardController.init, false);