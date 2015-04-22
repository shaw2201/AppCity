//*jslint node: true, browser: true */
"use strict";

function TrackerController() {
   var trackerView = new TrackerView(),
           trackerModel = new TrackerModel(),
           intervalObject,
           updateMap = function(){
               trackerModel.updatePosition(); 
            };
   this.init = function() {
        trackerModel.init();
        trackerView.setMap(trackerModel.getMap());
        trackerView.init();
        trackerView.setButtonAction("start", function () {
            trackerModel.setButton(true);
            trackerModel.start();
            intervalObject = window.setInterval(updateMap, 100);
        });
        trackerView.setButtonAction("stop", function () {
           trackerModel.stop();
           var lat = trackerModel.getLatArray(), long = trackerModel.getLongArray();
           trackerView.centreMap(lat[lat.length-1], long[long.length-1]);
           window.clearInterval(intervalObject);
        });
    };
}

var trackerController = new TrackerController();
trackerController.init();


