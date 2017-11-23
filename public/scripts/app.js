$(() => {
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });

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

});

$("#logoutButton").on("click", function(event){
  event.preventDefault();

  $.ajax({
    url: '/api/users/logout',
    type: 'POST'
  })
});

