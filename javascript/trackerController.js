//*jslint node: true, browser: true */
"use strict";

function TrackerController() {
    var trackerView = new TrackerView(),
            trackerModel = new TrackerModel();
    this.init = function() {

        trackerModel.setPathCallback(function(author, location, des, lat, long, pid) {
            trackerView.addNewPath(author, location, des, lat, long, pid, function(l, lo) {
                trackerView.hideLoad();
                trackerView.showMap();
                trackerModel.load(l, lo);
                trackerModel.init();
                var pos = trackerModel.getPosArray();
                console.log(pos.length);
                trackerView.centreMap(pos[pos.length - 1]);
            });
        });

        trackerView.setButtonAction("start", function() {
            trackerModel.start();
        });
        trackerView.setButtonAction("stop", function() {
            trackerModel.stop();
            var pos = trackerModel.getPosArray();
            trackerView.centreMap(pos[pos.length - 1]);
            trackerView.showPopup(trackerModel.getDistance());
            trackerView.hideMap();
        });
        trackerView.setButtonAction("return", function() {
            trackerModel.reset();
            trackerView.reset();
            trackerView.hidePopup();
            trackerView.showMap();
            location.href = "https://devweb2014.cis.strath.ac.uk/~fqb12152/317/AppCity/html/RouteTracking.html";
            location.reload();
        });
        trackerView.setButtonAction("post", function() {
            trackerView.hidePopup();
            trackerView.showForm();
        });

        trackerView.setButtonAction("fSubmit", function() {
            trackerModel.postPath();
            trackerView.showPost();
            trackerView.hideForm();
        });

        trackerView.setButtonAction("load", function() {
            trackerView.showLoad();
            trackerView.hideMap();
        });

        trackerView.setButtonAction("cancel", function() {
            trackerView.hideLoad();
            trackerView.showMap();
            location.href = "https://devweb2014.cis.strath.ac.uk/~fqb12152/317/AppCity/html/RouteTracking.html";
            location.reload();
        });

        trackerView.setButtonAction("postReturn", function() {
            trackerView.hidePost();
            trackerView.showMap();
        });

        trackerModel.init();
        trackerView.setMap(trackerModel.getMap());
        trackerView.init();

    };
}

var trackerController = new TrackerController();
trackerController.init();


