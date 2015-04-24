//*jslint node: true, browser: true */
"use strict";

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function TrackerModel() {
    var pos = 0, poly, path, latArray = [], longArray = [], startLong = 0, startLat = 0, stopLat = 0, stopLong = 0, buttonPressed = true, options, map, content, infowindow, mapOptions = {
        zoom: 18
    },
    polyOptions = {
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    },
    handleNoGeolocation = function(errorFlag) {
        if (errorFlag) {
            content = 'Error: The Geolocation service failed.';
        } else {
            content = 'Error: Your browser doesn\'t support geolocation.';
        }
        options = {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
        };

        infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
    };

    this.getLatLong = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                startLat = position.coords.latitude;
                latArray.push(position.coords.latitude);
                startLong = position.coords.longitude;
                longArray.push(position.coords.longitude);

                pos = new google.maps.LatLng(startLat,
                        startLong);
                map.setCenter(pos);
                var placeMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: "Start"
                });

            }, function() {
                handleNoGeolocation(true);
            });

        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }
    };

    this.init = function() {
        this.getLatLong();
        map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
    };

    this.centreMap = function(lat, long) {
        map.setCenter(new google.maps.LatLng(lat, long));
    };

    this.setButton = function(value) {
        buttonPressed = value;

    };

    this.getLatArray = function() {
        return latArray;
    };

    this.getLongArray = function() {
        return longArray;
    };

    this.getMap = function() {
        return map;
    };

    this.updatePosition = function() {
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var currentLat = position.coords.latitude, currentLong = position.coords.longitude;
                latArray.push(position.coords.latitude);
                longArray.push(position.coords.longitude);
                pos = new google.maps.LatLng(currentLat,
                        currentLong);
                map.setCenter(pos);
                path = poly.getPath();
                path.push(new google.maps.LatLng(latArray[latArray.length - 1], longArray[longArray.length - 1]));
            }, function() {
                handleNoGeolocation(true);
            });

        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }
        
    };

    this.start = function() {
        poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);
        path = poly.getPath();
        startLat = latArray[0];
        startLong = longArray[0];
        path.push(new google.maps.LatLng(startLat,
                startLong));
    };

    this.stop = function() {
        stopLat = latArray[latArray.length - 1];
        stopLong = longArray[longArray.length - 1];
        console.log(startLat + " " + startLong + " stop: " + stopLat + " " + startLong);
    };

}

