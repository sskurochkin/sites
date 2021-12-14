$(document).ready(function(){
	$('.slider').slick({
		arrows:true,
		dots:false,
		slidesToShow:2,
		slidesToScroll:1,
		InitialSlide:7,
		autoplay:false,
		infinite:false,
		speed:1000,
		autoplaySpeed:800,
		variableWidth:true,
		draggable: false,
		edgeFriction: true,
		responsive:[
			{
				breakpoint: 768,
				settings: {
					arrows:false,
					slidesToShow:2,
				}
			},
			{
				breakpoint: 550,
				settings: {
					arrows:false,
					slidesToShow:1,
				}
			}
		]
	});
});

