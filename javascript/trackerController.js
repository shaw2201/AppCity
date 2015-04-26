//*jslint node: true, browser: true */
"use strict";

function TrackerController() {
   var trackerView = new TrackerView(),
           trackerModel = new TrackerModel();
   this.init = function() {
       
       trackerView.setButtonAction("start", function () {
            trackerModel.start();
        });
        trackerView.setButtonAction("stop", function () {
           trackerModel.stop();
           var pos = trackerModel.getPosArray();
           trackerView.centreMap(pos[pos.length-1]);
           trackerView.showPopup(trackerModel.getDistance());
           trackerView.hideMap();
        });
        trackerView.setButtonAction("return", function () {
            trackerModel.reset();
            trackerView.reset();
            trackerView.hidePopup();
            trackerView.showMap()
        });
        trackerView.setButtonAction("post", function () {
            trackerView.hidePopup();
            trackerView.showForm();
        });
        
        trackerModel.init();
        trackerView.setMap(trackerModel.getMap());
        trackerView.init();
        
    };
}

var trackerController = new TrackerController();
trackerController.init();


