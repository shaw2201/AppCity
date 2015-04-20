/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Map(){
   var map,
            myLatlng = new google.maps.LatLng(55.8617, -4.2417);
            function initialize() {
              var mapOptions = {
                  zoom: 15,
                  center: myLatlng
                }, marker;

                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//                document.getElementById("marker").addEventListener(addMarker);

                google.maps.event.addListener(map, 'click', function(event) {
                  placeMarker(event.latLng);
                  });
            }


            function placeMarker(location) {
              var marker = new google.maps.Marker({
                position: location,
                map: map
              });
            }
            
            google.maps.event.addDomListener(window, 'load', initialize);
   }



