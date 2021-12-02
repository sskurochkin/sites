// var slider;





$(document).ready(function () {

  // let width = window.innerWidth;
  // let number = 2;
  // if (window.innerWidth < 767) {
  //   number = 1;
  // }
  $('.slider').slick({

    slidesToShow: 2,
    slidesToScroll: 2,

    responsive: [{
      breakpoint: 741,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }]
  });
});


