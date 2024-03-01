// initialize scrollspy
$("body").scrollspy({
  target: ".dotted-scrollspy"
});

// initialize lightbox
$(function() {
  $("#mdb-lightbox-ui").load("../mdb-addons/mdb-lightbox-ui.html");
});

$(".navbar-collapse a").click(function() {
  $(".navbar-collapse").collapse("hide");
});

/* WOW.js init */
new WOW().init();

// object-fit polyfill run
// objectFitImages();

/* init Jarallax */
jarallax(document.querySelectorAll(".jarallax"));

jarallax(document.querySelectorAll(".jarallax-keep-img"), {
  keepImg: true
});

$(".alert").alert();

$("#form-submit").on("click", function(e) {
  e.preventDefault();
  var contact = {
    name: $("#name")
      .val()
      .trim(),
    email: $("#email")
      .val()
      .trim(),
    subject: $("#subject")
      .val()
      .trim(),
    message: $("#message")
      .val()
      .trim()
  };
  $.ajax({
    url: "/api/contactMe",
    type: "POST",
    data: JSON.stringify(contact),
    contentType: "text/plain",
    success: function(data) {
      $("#message").val("");
      $("#messageLabel").attr("class", "");
    }
  });
});
