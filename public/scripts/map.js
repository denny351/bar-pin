
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281902, lng: -123.108317},
    zoom: 13,
    styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":"35"},{"gamma":"1"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"lightness":"-11"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"color":"#e37f00"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#475058"},{"lightness":"-48"},{"saturation":"-73"},{"weight":"3.98"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"7"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"lightness":"63"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16},{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"lightness":"-8"},{"gamma":"1.73"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"lightness":"-1"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"lightness":"24"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#475058"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d1e0e9"},{"lightness":"-70"},{"saturation":"-75"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-54"},{"hue":"#ff0000"}]}]
  });

  // RIGHT CLICK ON MAP FOR NEW PIN
  google.maps.event.addListener(map, 'rightclick', function(event) {
    if (confirm("Do you want to pin a bar here?")){
      $(".createContainer").fadeIn(650, 'linear', function() {
        $("#createName").focus();
      });
      $("#createForm").attr("data-long", event.latLng.lng()).attr("data-lat", event.latLng.lat());
    }
  });

  function addMarker(options) {
    options.position = {
      lat: options.lat,
      lng: options.lng
    }
    return createMarker(options);
  }

  function createMarker(options) {
    options.map = map;
    options.draggable = true;
    options.clickable = true;
    options.icon = "../images/bar.png";
    return new google.maps.Marker(options);
  }
    var infoWindow = new google.maps.InfoWindow({
      maxWidth: 350
    });

  //PLACE MARKERS FROM DATABASE
  $.get("/api/pins", function(data) {
    console.log(data);
    for(var i = 0; i < data.length; i++){
      let myData = data[i];
      let marker = addMarker(myData);
      console.log(marker);
      marker.addListener('click', function(event) {
        console.log("fuck");
        infoWindow.setContent(generateContent(myData));
        infoWindow.open(map, marker);
      });
    }
  });

  function generateContent(data) {
    return `<div id="iw-container">
              <div class="iw-title">${data.title}</div>
              <div class="iw-content">
                <img src=${data.image}>
                <p>${data.description}</p>
              </div>
            </div>`;
  }

  // GEOLOCATION FUNCTION
  geolocator(map, infoWindow);

  function geolocator(map, infoWindow) {
    if (navigator.geolocation) {
      const callback = function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here!');
        infoWindow.open(map);
        map.setCenter(pos);
      };

      const errback = function() {
        handleLocationError(true, infoWindow, map.getCenter());
      };

      navigator.geolocation.getCurrentPosition(callback, errback);
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
  }
}

