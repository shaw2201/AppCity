//*jslint node: true, browser: true */
"use strict";

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function TrackerModel() {
    var pos = 0, poly, path, positionArray = [], options, map, content, infowindow, pathDistance = 0, testingVariable = 0.0001, mapOptions = {
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

        map.setCenter(options.position);
    },
            updatePosition = function(position) {

                pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);
                document.getElementById("check").innerHTML = "lat: " + position.coords.latitude + " long: " + position.coords.longitude + " watch";
                positionArray.push(pos);
                map.setCenter(pos);

                path = poly.getPath();
                path.push(pos);


            }, error = function(error) {
        console.log("failed")
    },
            options = {
                timeout: 5000
            };

    this.init = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);
                positionArray.push(pos);
                console.log("fucks here");
                map.setCenter(pos);
                var marker = new google.maps.Marker({
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
                poly = new google.maps.Polyline(polyOptions);
                poly.setMap(map);
                path = poly.getPath();
                path.push(pos);
            }, function() {
                handleNoGeolocation(true);
            });

        };
        var watch = navigator.geolocation.watchPosition( updatePosition, error, options);
    };

    this.stop = function() {
        pathDistance = google.maps.geometry.spherical.computeDistanceBetween(positionArray[0], positionArray[1]).toFixed(0);
        pathDistance = parseFloat(pathDistance);
        for (var i = 1; i < positionArray.length - 1; i++) {
            pathDistance = pathDistance + parseFloat(google.maps.geometry.spherical.computeDistanceBetween(positionArray[i], positionArray[i + 1]).toFixed(0));
        }
        console.log(pathDistance);
    };

    this.getDistance = function() {
        return pathDistance;
    };

    this.reset = function() {
        pathDistance = 0;
        positionArray = [];

    };

}

