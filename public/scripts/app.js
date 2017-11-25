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
    let type = $("input[name='barType']:checked").val();

    $.ajax({
      method: 'POST',
      url: '/api/pins',
      dataType: 'JSON',
      data: {title: name, desc: description, img: img, lng: long, lat: lat, type: type}
    })
    .done(function(){
      $('.createContainer').fadeOut(200);
    })
  });
}





$(() => {
  //Document ready function
  menuToggle();
  cancelForm();
  postNewPin();
  // editPin();
});
