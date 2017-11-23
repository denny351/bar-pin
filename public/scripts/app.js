function menuToggle() {
  $("#menu-toggle").click(function(event) {
    event.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
}

function cancelForm() {
  $('.cancel').on("click", function () {
    $(this).parent().parent().fadeOut(200);
  });
}

function postNewPin() {
    let $submit = $('#submitPin');

  $submit.on('click', function(event) {
    event.preventDefault();

    let $name = $('#createName').val();
    let $img = $('#createImage').val();
    let $description = $('#createDescription').val();
    let $long = $('#createForm').data('long');
    let $lat = $('#createForm').data('lat');

    $.ajax({
      method: 'POST',
      url: '/api/pins',
      dataType: 'JSON',
      data: {title: $name, desc: $description, img: $img, lng: $long, lat: $lat}
    });
  });
}

function loginUser() {
  $(".loginForm").on("submit", function(event){
    event.preventDefault();

    $.ajax({
      url: '/api/users/login',
      type: 'PUT',
      data: $(event.target).serialize()
    })
    .done(function(response){
      console.log(response);
    })
    .fail(function(jqXHR, textStatus) {
      console.log(textStatus);
    })
  })
}

function registerUser() {
  $(".loginForm").on("submit", function(event){
    event.preventDefault();

    $.ajax({
      url: '/api/users/register',
      type: 'PUT',
      data: $(event.target).serialize()
    })
    .done(function(response){
      console.log(response);
    })
    .fail(function(jqXHR, textStatus) {
      console.log(textStatus);
    })
  })
}

function logoutUser(){
  $("#logoutButton").on("click", function(event){
    event.preventDefault();

    $.ajax({
      url: '/api/users/logout',
      type: 'POST'
    })
   });
}

$(function() {
  menuToggle();
  loginUser();
  registerUser();
  cancelForm();
  postNewPin();
  logoutUser();
});
