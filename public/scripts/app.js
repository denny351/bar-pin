menuToggle = ()=> {
  $("#menu-toggle").click(function(event) {
    event.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#inputUsername").focus();
  });
}

cancelForm = ()=> {
  $('.cancel').on("click", function () {
    $(this).parent().parent().fadeOut(200);
  });
}

postNewPin = ()=> {
    let $submit = $('#submitPin');

  $submit.on('click', (event) => {
    event.preventDefault();

    let name = $('#createName').val();
    let img = $('#createImage').val();
    let description = $('#createDescription').val();
    let long = $('#createForm').data('long');
    let lat = $('#createForm').data('lat');

    $.ajax({
      method: 'POST',
      url: '/api/pins',
      dataType: 'JSON',
      data: {title: name, desc: description, img: img, lng: long, lat: lat}
    })
    .done(function(){
      $('.createContainer').fadeOut(200);
    })

  });
}

loginUser = ()=> {
  //Login Handler from home page
  $("#loginButton").on("click", (event) => {
    event.preventDefault();
    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();
    $.ajax({
      url: '/api/users/login',
      type: 'PUT',
      dataType: 'JSON',
      data: {'userName': username, 'password': password}
    })
<<<<<<< HEAD
    .done((response) => {
      $("#wrapper").toggleClass("toggled");
      $(".welcomeMessage").css({'right': '0',
                                'padding': '15px',  
                                'position': "absolute",
                                'z-index': "100",
                                'color': "#ef7500"})
      $(".welcomeMessage").html(response);
      $('#inputUsername').val("");
      $('#inputPassword').val("");
=======
      .done(function(response){
        console.log(response);
>>>>>>> d726b4ec13ba3de4cac47aaf1e10b3b3555b85e4
    })
    .fail((jqXHR, textStatus) => {
      $('#inputUsername').val("");
      $('#inputPassword').val("");
      $(".displayError").html(jqXHR.responseText);
    })
  })
}

registerUser = () => {
  //Register Handler from home page
  $("#registerButton").on("click", (event) => {
    event.preventDefault();
    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();

    $.ajax({
      url: '/api/users/register',
      type: 'PUT',
      dataType: 'JSON',
      data: {'userName': username, 'password': password}
    })
    .done((response) => {
      console.log(response);
      $("#wrapper").toggleClass("toggled");
      $(".welcomeMessage").html(response);
      $('#inputUsername').val("");
      $('#inputPassword').val("");
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR.responseText);
      console.log(textStatus);
      $(".displayError").html(jqXHR.responseText);
      $('#inputUsername').val("");
      $('#inputPassword').val("");
    })
  })
}

logoutUser = ()=> {
  //Logout handler 
  $("#logoutButton").on("click", (event) => {
    event.preventDefault();

    $.ajax({
      url: '/api/users/logout',
      type: 'POST'
    })
   });
}

$(() => {
  //Document ready function
  menuToggle();
  loginUser();
  registerUser();
  cancelForm();
  postNewPin();
  logoutUser();
});
