/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function TrackerModel() {
    var startLong = 0, startLat=0, stopLat =0, stopLong = 0, buttonPressed = true, map, mapOptions = {
            zoom: 18
        },
        
        handleNoGeolocation = function(errorFlag) {
            if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
            } else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
            }
            var options = {
                map: map,
                position: new google.maps.LatLng(60, 105),
                content: content
            };

            var infowindow = new google.maps.InfoWindow(options);
                map.setCenter(options.position);
            };
    
    this.getLatLong = function() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            if(buttonPressed === true){
                startLat = position.coords.latitude;
                startLong = position.coords.longitude;
            } else if(buttonPressed === false){
                stopLat = position.coords.latitude+0.0025;
                stopLong = position.coords.longitude; 
            }
            var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'Location found using HTML5.'
            });
            map.setCenter(pos);
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
    
    this.centreMap = function (lat, long){
        map.setCenter(new google.maps.LatLng(lat,long));
        
    };
    
    this.setButton = function(value){
        buttonPressed = value;
        
    };
    
    this.getStartLat= function() {
         return startLat;
    };
     
    this.getStartLong = function(){
         return startLong;
    };
     
    this.getStopLat= function() {
         return stopLat;
    };
     
    this.getStopLong = function(){
         return stopLong;
    };
    
    
}

