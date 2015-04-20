//*jslint node: true, browser: true */
"use strict";

function AppController() {
    var appView = new AppView(),
            map = new Map();
    this.init = function (){
        document.getElementById("map-wrapper").style.display = "none";
        appView.setMenuButtons();
        document.getElementById("popupScore").style.display = "block";
    };
}

var appController = new AppController();
appController.init();


