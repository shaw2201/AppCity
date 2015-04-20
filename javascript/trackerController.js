//*jslint node: true, browser: true */
"use strict";

function TrackerController() {
   var trackerView = new TrackerView(),
           trackerModel = new TrackerModel();
   this.init = function() {
        trackerView.init();
        trackerModel.init();
        trackerView.setButtonAction("start", function () {
            trackerModel.setButton(true)
            trackerModel.startPos = trackerModel.getLatLong();
        });
        trackerView.setButtonAction("stop", function () {
            var lat = trackerModel.getStartLat()+0.0025, long = trackerModel.getStartLong();
            console.log(lat + " " + long);
            trackerModel.centreMap(lat, long);
        });
    };
}

var trackerController = new TrackerController();
trackerController.init();


