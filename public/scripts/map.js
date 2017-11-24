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
      var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        icon: "../images/bar.png"
      });

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
      maxWidth: 300
    });

  //PLACE MARKERS FROM DATABASE
  $.get("/api/pins", function(data) {
    for(let i = 0; i < data.length; i++){
      let myData = data[i];
      let marker = addMarker(myData);

      marker.addListener('mouseover', function() {
        infoWindow.setContent(generateContent(myData));
        infoWindow.open(map, marker);
      });
      // marker.addListener('mouseout', function(event) {
      //   infoWindow.close(map, marker);
      // });
    }
  });

  //CLICK FOR EDIT FORM
  $.get("/api/pins", function(data) {
    $(document).on('click', '.editForm', (event) => {
      var parent = $(event.target).parents('#iw-container');
      id = $(parent[0]).data('id');
      for(let j = 0; j < data.length; j++){
        if(id === data[j].id){
          $(".editContainer").fadeIn(200, 'linear', function() {

            $(this).find('#editName').val(data[j].title);
            $(this).find('#editImage').val(data[j].image);
            $(this).find('#editDescription').val(data[j].description);
            // $(this).find('#editForm').attr("data-id", id);
            console.log(id)
          })
        }
      }
    })
  })

  //EDIT PIN
  $('#editPin').on('click', (event) => {
    event.preventDefault();
    let name = $('#editName').val();
    let img = $('#editImage').val();
    let description = $('#editDescription').val();
    let clickedID = id ;
    // let id = $('#editForm').data('id');

    console.log(name, img, description, clickedID)
    $.ajax({
          method: 'PUT',
          url: `/api/pins/${clickedID}/update`,
          dataType: 'JSON',
          data: {title: name, desc: description, img: img}
        })
        .done(function(){
          $('.editContainer').fadeOut(200);
        })
  })

 //DELETE PIN
  $(document).on('click', '.deleteForm', (event) => {
    event.preventDefault();
    var parent = $(event.target).parents('#iw-container');
      var deleteID = $(parent[0]).data('id');
      $.ajax({
        method: 'DELETE',
        url: `/api/pins/${deleteID}/delete`,
      })
      .done(function(){
        window.location.reload();
      })
  })

  function generateContent(data) {
    return `<div id="iw-container" data-id=${data.id}>
              <div class="iw-title">${data.title}</div>
              <div class="iw-content">
                <img src=${data.image}>
                <p>${data.description}</p>
              </div>
              <button class="deleteForm btn btn-danger btn-xs">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                <span><strong>Delete</strong></span>
              </button>
              <button class="editForm btn btn-primary btn-xs">
                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                <span><strong>Edit</strong></span>
              </button>
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



    // google.maps.event.addListener(marker, 'dragend', function (event) {
    // $.post("/api/pins", function(){

    // var point = marker.getPosition();
    // map.panTo(point);
    //   myData.position = {
    //     lat: point.lat(),
    //     lng: point.lng()
    // }
    // })
    // });
