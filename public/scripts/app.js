<<<<<<< HEAD
function menuToggle() {
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
}

function createForm() {
  $('.cancel').on("click", function () {
    $(this).parent().parent().css('visibility','hidden');
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
      // success: function() {
      //   $(this).parent().parent().css('visibility','hidden');
      // }
    });
  });
};


$(function() {
  menuToggle();
  createForm();
  postNewPin();

});

=======
$(() => {
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });
>>>>>>> 83cdb4eed54da5c929140a0006c029ad4e9d0766

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
  
