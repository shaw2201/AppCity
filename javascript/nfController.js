/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var map, infoWindow, service;
var markers = [];

function NfController() {
    
        function initialize() {
            var mapOptions = {
              zoom: 14
            };

            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {

                  var currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                  map.setCenter(currentLocation);
                  
                  
                    var marker = new google.maps.Marker({
                        position: currentLocation,
                        map: map,
                        title: 'You are here'
                    });
                google.maps.event.addListener(marker, 'click', function() {
                  infoWindow.setContent('You are here');
                  infoWindow.open(map, marker);
                });
              });
            } else {
               document.getElementById("map-canvas").innerHTML = "Geolocation not supported";
            }
            infoWindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);
            var gym = document.getElementById("gym");
            var swimming = document.getElementById("swimming");
            var golf = document.getElementById("golf");
            var parks = document.getElementById("parks");
            google.maps.event.addDomListener(gym, 'click', gymSearch);
            google.maps.event.addDomListener(swimming, 'click', swimmingSearch);
            google.maps.event.addDomListener(golf, 'click', golfSearch);
            google.maps.event.addDomListener(parks, 'click', parkSearch);
        }


        function gymSearch() {  
          var request = {
                  bounds: map.getBounds(),
                  types: ['gym']
              };              
          service.radarSearch(request, gymCallback);
        };
        
        function swimmingSearch() {
          var request = {
                  bounds: map.getBounds(),
                  keyword: 'swimming'
              };              
          service.radarSearch(request, swimmingCallback);
        };
        
        function golfSearch() {
          var request = {
                  bounds: map.getBounds(),
                  keyword: 'golf'
              };              
          service.radarSearch(request, golfCallback);
        };
        
        function parkSearch() {
          var request = {
                  bounds: map.getBounds(),
                  types: ['park']
              };              
          service.radarSearch(request, parkCallback);
        };

        function gymCallback(results, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
            }
              for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
              }
                markers.length = 0;
            for (var i = 0, result; result = results[i]; i++) {
                createGymMarker(result);
            }
        }
        
        function swimmingCallback(results, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
            }
              for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
              }
                markers.length = 0;
            for (var i = 0, result; result = results[i]; i++) {
                createSwimmingMarker(result);
            }
        }
        
        function golfCallback(results, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
            }
              for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
              }
                markers.length = 0;
            for (var i = 0, result; result = results[i]; i++) {
                createGolfMarker(result);
            }
        }

        function parkCallback(results, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
            }
              for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
              }
                markers.length = 0;
            for (var i = 0, result; result = results[i]; i++) {
                createParkMarker(result);
            }
        }

        function createGymMarker(place) {
            var image = '../images/gym.png';
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon:image
            });
            markers.push(marker);
          google.maps.event.addListener(marker, 'click', function() {
            service.getDetails(place, function(result, status) {
              if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
              }
              infoWindow.setContent(result.name);
              infoWindow.open(map, marker);
            });
          }); 
        }
        
        function createSwimmingMarker(place) {
            var image = '../images/swimming.png';
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon:image
            });
            markers.push(marker);
          google.maps.event.addListener(marker, 'click', function() {
            service.getDetails(place, function(result, status) {
              if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
              }
              infoWindow.setContent(result.name);
              infoWindow.open(map, marker);
            });
          }); 
        }
        
        function createGolfMarker(place) {
            var image = '../images/golf.png';
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon:image
            });
            markers.push(marker);
          google.maps.event.addListener(marker, 'click', function() {
            service.getDetails(place, function(result, status) {
              if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
              }
              infoWindow.setContent(result.name);
              infoWindow.open(map, marker);
            });
          }); 
        }
        
        function createParkMarker(place) {
            var image = '../images/park.png';
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon:image
            });
            markers.push(marker);
          google.maps.event.addListener(marker, 'click', function() {
            service.getDetails(place, function(result, status) {
              if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
              }
              infoWindow.setContent(result.name);
              infoWindow.open(map, marker);
            });
          }); 
        }
 
    
    this.init = function () {
        google.maps.event.addDomListener(window, 'load', initialize);
    };
    
    
}

var nfController = new NfController();

window.addEventListener("load",nfController.init(),false);

