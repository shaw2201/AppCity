//*jslint node: true, browser: true */
"use strict";

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function TrackerModel() {
    var pos = 0, geo, poly, path, intervalObject, positionArray = [], marker, options, map, content, watch, infowindow, pathDistance = 0, testingVariable = 0.0001, mapOptions = {
        zoom: 18
    },
    polyOptions = {
        path: [],
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
        map.setCenter(options.position);
    },
            updatePosition = function() {
                geo.getCurrentPosition(function(position) {
                    pos = new google.maps.LatLng(position.coords.latitude,
                            position.coords.longitude);
//                    testingVariable = testingVariable + 0.0001;
                    document.getElementById("check").innerHTML = "lat: " + position.coords.latitude + " long: " + position.coords.longitude + " watch";
                    positionArray.push(pos);
                    map.setCenter(pos);
                    poly.setMap(null);
                    polyOptions.path = positionArray;
                    poly = new google.maps.Polyline(polyOptions);
                    poly.setMap(map);
                });
            }, error = function(error) {
        console.log("failed");
    },
            options = {
                timeout: 5000
            };
    this.init = function() {
        if (navigator.geolocation) {
            geo = navigator.geolocation;
            geo.getCurrentPosition(function(position) {
                pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);
                document.getElementById("check").innerHTML = "lat: " + position.coords.latitude + " long: " + position.coords.longitude;
                map.setCenter(pos);
            }, function() {
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }
        map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
    };
    this.getPosArray = function() {
        return positionArray;
    };
    this.getMap = function() {
        return map;
    };
    this.start = function() {
        if (geo) {
            geo.getCurrentPosition(function(position) {
                pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);
                positionArray.push(pos);
                console.log("fucks here");
                map.setCenter(pos);
                marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: 'https://devweb2014.cis.strath.ac.uk/~fqb12152/317/AppCity/images/running.png',
                    title: "Start"
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "Start of route"
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });
                polyOptions.path = positionArray;
                poly = new google.maps.Polyline(polyOptions);
                poly.setMap(map);
            }, function() {
                handleNoGeolocation(true);
            });
        }
        ;
        watch = geo.watchPosition(updatePosition, error, options);
//                intervalObject = window.setInterval(updatePosition, 2000);
    };
    this.stop = function() {
        if (positionArray.length == 1) {
            pathDistance = 0;
        } else {
            pathDistance = google.maps.geometry.spherical.computeDistanceBetween(positionArray[0], positionArray[1]).toFixed(0);
            pathDistance = parseFloat(pathDistance);
            for (var i = 1; i < positionArray.length - 1; i++) {
                pathDistance = pathDistance + parseFloat(google.maps.geometry.spherical.computeDistanceBetween(positionArray[i], positionArray[i + 1]).toFixed(0));
            }
        }
        testingVariable = 0.0001;
        geo.clearWatch(watch);
        console.log(pathDistance);
    };
    this.getDistance = function() {
        return pathDistance;
    };
    this.reset = function() {
        pathDistance = 0;
        positionArray = [];
        poly.setMap(null);
        marker.setMap(null);
//                window.clearInterval(intervalObject);
    };
}

