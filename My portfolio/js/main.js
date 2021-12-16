let links = document.querySelectorAll('section');
let page = document.querySelector('.page__container');
let header = document.querySelector('.header');
let progressBar = document.querySelector('.progress-bar');
// let  = document.querySelector('body');

header.onmouseover = (e) => {
	if (e.target.classList[0] == 'menu__link') {
		page.classList.add('_blend');
	} else {
		page.classList.remove('_blend');
	}
}

window.onscroll = () => {
	if (window.pageYOffset > 80) {
		header.classList.add('header_active');
	} else {
		header.classList.remove('header_active');
	}
	let max = page.scrollHeight - window.outerHeight;
	let percent = (pageYOffset / max) * innerWidth;
	progressBar.style.clip = 'rect( 0,' + percent + 'px' + ', 4px, 0)';

}

const body = document.querySelector('body');
$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger, .header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.menu__link').click(function () {
		if (body.classList.contains('lock')) {
			body.classList.remove('lock');
			$('.header__burger, .header__menu').toggleClass('active');
		}
	});

	if(window.innerWidth < 750){
		$('.header').prepend($('.intro .social-links'));
	}
})
// page.onmouseenter = ()=>{
// 	console.log(1);
// }


//Поэкранный скролл. 
let pageSlider = new Swiper('.page', {
	wrapperClass: 'page__wrapper',
	slideClass: 'screen',
	direction: 'vertical',
	slidesPerView: 'auto',
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	mousewheel: {
		sensitivity: 1,
	},
	watchOverflow: true,
	speed: 800,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	pagination: {
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: 'page__bullet',
		bulletActiveClass: 'page__bullet_active',
	},
	scrollbar: {
		el: '.page__scroll',
		dragClass: 'page__drag-scroll',
		draggable: true,
	},
	init: false,
	on: {
		init: function () {
			menuSlider();
			setScrollType();
			page.classList.add('_loaded');
		},
		slideChange: function () {
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active-link');
		},
		resize: function () {
			setScrollType();
		}
	}

})

//Привязка ссылок меню к слайдам и их стилизация
let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider() {
	if (menuLinks.length > 0) {
		menuLinks[pageSlider.realIndex].classList.add('_active-link');
		for (let index = 0; index < menuLinks.length; index++) {
			const menuLink = menuLinks[index];
			menuLink.addEventListener('click', function (e) {
				menuSliderRemove();
				pageSlider.slideTo(index, 800);
				menuLink.classList.add('_active-link');
				e.preventDefault();
			})
		}
	}
}
//
function menuSliderRemove(params) {
	let menuLinkActive = document.querySelector('.menu__link._active-link');
	if (menuLinkActive) {
		menuLinkActive.classList.remove('_active-link');
	}
}
//Отключение слайдера при превышении высоты. Переменная page - обертка всей страницы
function setScrollType() {
	if (page.classList.contains('_free')) {
		page.classList.remove('_free');
		pageSlider.params.freeMode = false;
	}

	for (let index = 0; index < pageSlider.slides.length; index++) {
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.container');
		if (pageSlideContent) {

			const pageSlideContentHeight = pageSlideContent.offsetHeight;

			if (pageSlideContentHeight > window.innerHeight) {
				page.classList.add('_free');
				pageSlider.params.freeMode = true;
				break;
			}
		}

	}
}
pageSlider.init();



let reviewSlider = new Swiper('.slider__wrapper', {

	spaceBetween: 30,
	centeredSlides: true,
	autoHeight: true,
	speed: 600,
	loop: true,
	loopedSlides: 2,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		dynamicBullets: true,
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	// breakpoints: {
	// 	850:{
	// 		slidesPerView: 1.6,
	// 		// width: 860,
	// 	},
	// 	550: {

	// 	},
	// },

});

document.querySelector('.scroll-link').onclick = function (e) {
	e.preventDefault();
	pageSlider.slideTo(1, 800);
}
document.querySelector('.portfolio-link').onclick = function (e) {
	e.preventDefault();
	pageSlider.slideTo(2, 900);
}