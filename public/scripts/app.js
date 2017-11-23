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
  let $name = $('#createName');
  let $img = $('#createImage');
  let $description = $('#createDescription');

  $submit.on('click', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/pins',
      data: JSON.stringify({title: $name, description: $description, img: $img})
    });
  });
}

function loginUser() {
  $("#loginButton").on("click", function(event){
    event.preventDefault();
    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();
    $.ajax({
      url: '/api/users/login',
      type: 'PUT',
      dataType: 'JSON',
      data: {'userName': username, 'password': password}
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
  $("#registerButton").on("click", function(event){
    event.preventDefault();
    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();

    console.log(username, password);
    $.ajax({
      url: '/api/users/register',
      type: 'PUT',
      dataType: 'JSON',
      data: {'userName': username, 'password': password}
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
