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
objectFitImages();

/* init Jarallax */
jarallax(document.querySelectorAll(".jarallax"));

jarallax(document.querySelectorAll(".jarallax-keep-img"), {
  keepImg: true
});
