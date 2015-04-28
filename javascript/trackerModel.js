//*jslint node: true, browser: true */
"use strict";

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function TrackerModel() {
    var pos = 0,
            geo,
            poly,
            intervalObject,
            positionArray = [],
            latArray = [],
            longArray = [],
            marker,
            options,
            map,
            content,
            watch,
            infowindow,
            pathDistance = 0,
            testingVariable = 0.0001,
            postQueue = {}, //associative array to hold posts
            postcallback,
            highestIDseen = -1, //only show IDs over this number - initialise to -1 to show all
            msgid = -1,
            mapOptions = {
                zoom: 18
            },
    polyOptions = {
        path: [],
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    },
    incrementMsgID = function() {
        msgid += 1;
        return msgid;
    },
            addPath = function(str, loc, lat, long, des) {
                console.log("adding " + str + " to post queue");
                var id = incrementMsgID();
                if (str !== "") {
                    postQueue["_" + id] = "location=" + encodeURIComponent(loc) + "&author=" + encodeURIComponent(str) + "&csID="
                            + encodeURIComponent(id) + "&lat=" + encodeURIComponent(lat) + "&long=" + encodeURIComponent(long) + "&description=" + encodeURIComponent(des);
                }
            },
            removePath = function(id) {
                console.log("Removing post " + id);
                delete postQueue["_" + id];
            },
            postPath = function(message) {
                // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
                var xhr = new XMLHttpRequest();
                xhr.open('get', '../php/postPath.php?' + message);

                // Track the state changes of the request.
                xhr.onreadystatechange = function() {
                    var DONE = 4, OK = 200; // readyState 4 = the request is done; status 200 = successful return
                    if (xhr.readyState === DONE) {
                        if (xhr.status === OK) {
                            if (isNaN(xhr.responseText)) {
                                console.log("error from server " + xhr.responseText);
                            } else {
                                removePath(xhr.responseText);
                            }
                        } else {
                            console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
                };

                xhr.send(); // Send the request to send-ajax-data.ph
                window.setTimeout(checkPaths, 300);
            },
            checkPaths = function() {
                // Initialize the Ajax request.   From http://en.wikipedia.org/wiki/Ajax_%28programming%29
                var xhr = new XMLHttpRequest();
                xhr.open('get', '../php/getPath.php?last=' + (highestIDseen >= 0 ? highestIDseen : 0));

                // Track the state changes of the request.
                xhr.onreadystatechange = function() {
                    var DONE = 4, OK = 200, index, lines, line, msg, seenID; // readyState 4 = the request is done; status 200 = successful return
                    if (xhr.readyState === DONE) {
                        if (xhr.status === OK) {
                            //console.log("reply = "+xhr.responseText);
                            lines = xhr.responseText.split("\n");
                            for (index = 0; index < lines.length; index++) {
                                line = lines[index];
                                if (line.length > 0) {
                                    msg = JSON.parse(line);
                                    seenID = parseInt(msg.pid, 10);// need to parse and parse as decimal or else risk unexpected behaviour
                                    console.log("got post ID " + seenID + " (highest was " + highestIDseen + ")");
                                    if (seenID > highestIDseen) {
                                        highestIDseen = msg.pid;
                                        postcallback(msg.author, msg.location, msg.description, msg.lat, msg.longitude, msg.pid);
                                    }
                                }
                            }
                        } else {
                            console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
                };

                xhr.send(); // Send the request to send-ajax-data.php
            },
            checkQueue = function() {
                var key;
                for (key in postQueue) {
                    console.log("postPath" + postQueue[key]);
                    postPath(postQueue[key]);
                }
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
                    pos = new google.maps.LatLng(position.coords.latitude + testingVariable,
                            position.coords.longitude + testingVariable);
                    latArray.push(position.coords.latitude + testingVariable);
                    longArray.push(position.coords.longitude + testingVariable);
                    testingVariable = testingVariable + 0.0001;
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
        if (positionArray.length !== 0) {
            console.log("this may work");
            polyOptions.path = positionArray;
            poly = new google.maps.Polyline(polyOptions);
            poly.setMap(map);
            map.setCenter(positionArray[0]);
            marker = new google.maps.Marker({
                position: positionArray[0],
                map: map,
                icon: 'https://devweb2014.cis.strath.ac.uk/~fqb12152/317/AppCity/images/running.png',
                title: "Start"
            });
        } else {
            if (navigator.geolocation) {
                geo = navigator.geolocation;
                geo.getCurrentPosition(function(position) {
                    pos = new google.maps.LatLng(position.coords.latitude + 0.001,
                            position.coords.longitude);
                    document.getElementById("check").innerHTML = "lat: " + position.coords.latitude + " long: " + position.coords.longitude;
                    map.setCenter(pos);
                    window.setInterval(checkQueue, 2000);
                    window.setInterval(checkPaths, 600);
                }, function() {
                    handleNoGeolocation(true);
                });
            } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }
            map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
        }
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
                latArray.push(position.coords.latitude);
                longArray.push(position.coords.longitude);
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
//        watch = geo.watchPosition(updatePosition, error, options);
        intervalObject = window.setInterval(updatePosition, 2000);
    };
    this.stop = function() {
        if (positionArray.length === 1) {
            pathDistance = 0;
        } else {
            pathDistance = google.maps.geometry.spherical.computeDistanceBetween(positionArray[0], positionArray[1]).toFixed(0);
            pathDistance = parseFloat(pathDistance);
            for (var i = 1; i < positionArray.length - 1; i++) {
                pathDistance = pathDistance + parseFloat(google.maps.geometry.spherical.computeDistanceBetween(positionArray[i], positionArray[i + 1]).toFixed(0));
            }
        }
        testingVariable = 0.0001;
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
        geo.clearWatch(watch);
        watch = 0;
        geo = navigator.geolocation;
        window.clearInterval(intervalObject);
    };

    this.load = function(lat, long) {
        if(positionArray.length > 0){
             positionArray = [];
             poly.setMap(null);
             marker.setMap(null);
        }
        var latitude = JSON.parse(lat), longitude = JSON.parse(long), p;
        for (var i = 0; i < latitude.length; i++) {
            pos = new google.maps.LatLng(latitude[i],
                    longitude[i]);
            positionArray.push(pos);
        }
    };

    this.postPath = function() {
        var author = document.getElementById("fAuthor").value, loc = document.getElementById("fLoc").value, des = document.getElementById("fDes").value,
                lat = JSON.stringify(latArray), long = JSON.stringify(longArray);


        var p = JSON.stringify({positionArray: positionArray});
        addPath(author, loc, lat, long, des);
    };

    this.setPathCallback = function(f) {
        postcallback = f;
    };
}

