clearInputField = () => {
  // To clear username and password inputs
  $('#inputUsername').val("");
  $('#inputPassword').val("");
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
    .done((response) => {
      $("#wrapper").toggleClass("toggled");
      // $(".welcomeMessage").css({'right': '0',
      //                           'padding': '15px',
      //                           'position': "absolute",
      //                           'z-index': "100",
      //                           'color': "#ef7500"})
      $(".welcomeMessage").append(response);
      clearInputField();
      window.location.reload();
    })
    .fail((jqXHR, textStatus) => {
      clearInputField();
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
      clearInputField();
      window.location.reload();

    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR.responseText);
      console.log(textStatus);
      $(".displayError").html(jqXHR.responseText);
      clearInputField();
    })
  })
}

logoutUser = ()=> {
  //Logout handler
  $("#logoutButton").on("click", (event) => {
    event.preventDefault();

    $.ajax({
      url: '/api/users/logout',
      type: 'POST',
      success: () => {
        window.location.reload();
      }
    })
   });
}

$(() => {
  //Document ready function
  loginUser();
  registerUser();
  logoutUser();
});
