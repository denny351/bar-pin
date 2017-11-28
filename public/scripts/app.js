menuToggle = ()=> {
  $("#menu-toggle").on("click", function(event) {
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

$(() => {
  //Document ready function
  menuToggle();
  cancelForm();
});
