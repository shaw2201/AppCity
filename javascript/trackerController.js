//*jslint node: true, browser: true */
"use strict";

function TrackerController() {
    var trackerView = new TrackerView(),
            trackerModel = new TrackerModel();
    this.init = function() {

        trackerView.init();

        trackerModel.setPathCallback(function(author, location, des, lat, long, pid) {
            trackerView.addNewPath(author, location, des, lat, long, pid, function(l, lo) {
                trackerView.hideLoad();
                trackerView.showMap();
                trackerModel.load(l, lo);
                trackerModel.init();
                trackerView.hideStartStop();
            });
        });

        trackerView.setButtonAction("start", function() {
            trackerModel.start();
            trackerView.setMap(trackerModel.getMap());
        });
        trackerView.setButtonAction("stop", function() {
            trackerModel.stop();
            trackerView.showPopup(trackerModel.getDistance());
            trackerView.hideMap();
        });
        trackerView.setButtonAction("return", function() {
            trackerModel.reset();
            trackerView.hidePopup();
            trackerView.showMap();
            location.href = "https://devweb2014.cis.strath.ac.uk/~fqb12152/317/AppCity/html/RouteTracking.html";
            location.reload();
        });
         trackerView.setButtonAction("refresh", function() {
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

    };
}

var trackerController = new TrackerController();
trackerController.init();


