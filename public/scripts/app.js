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


