// let links = document.querySelectorAll('section');
const body = document.querySelector('body');
const page = document.querySelector('.page');
const header = document.querySelector('.header');
const burgerItem = document.querySelector('.burger');
const menu = document.querySelector('.menu__list');
const menuCloseItem = document.querySelector('.header__nav-close');
const lockPadding = document.querySelector('.lock-padding');

window.onscroll = () => {
	if (window.pageYOffset > 80) {
		header.classList.add('header_active');
		document.querySelector('.logo__text').classList.add('logo_active');
	} else {
		header.classList.remove('header_active');
		document.querySelector('.logo__text').classList.remove('logo_active');

	}

}
burgerItem.onclick = () => {
	menu.classList.add('_visible');
	burgerItem.classList.add('_hide');
	menuCloseItem.classList.add('_show');
	bodyLock();
}
menuCloseItem.onclick = () => {
	menu.classList.remove('_visible');
	burgerItem.classList.remove('_hide');
	menuCloseItem.classList.remove('_show');
	bodyUnLock();
}
window.onresize = () => {
	if (window.innerWidth > 1080)
		menuCloseItem.classList.remove('_show');

}
menu.onclick = (e) => {
	if (window.innerWidth < 1080 && e.target.classList.contains('menu__link')) {
		menu.classList.remove('_visible');
		burgerItem.classList.remove('_hide');
		menuCloseItem.classList.remove('_show');
		bodyUnLock();
	}
}

//Скролл по разделам
const anchor = document.querySelectorAll('._anchor');
document.querySelectorAll('.scroll-link').forEach(function (link, index) {

	link.addEventListener('click', function (e) {
		e.preventDefault();
		let href = this.getAttribute('href').substring(1);
		const scrollTarget = document.getElementById(href);
		let topOffset = anchor[index].offsetHeight;
		const elementPosition = scrollTarget.offsetTop - 50;
		window.scrollTo({
			top: elementPosition,
			behavior: 'smooth'
		});
	});
});

//блокировка скрола

function bodyLock() {
	const lockPaddingValue = window.innerWidth - page.offsetWidth + 'px';

	for (let index = 0; index < lockPadding.length; index++) {
		const el = lockPadding[index];
		el.style.paddingRight = lockPaddingValue;
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('body-lock')

}

function bodyUnLock() {
	const lockPaddingValue = window.innerWidth - page.offsetWidth + 'px';

	for (let index = 0; index < lockPadding.length; index++) {
		const el = lockPadding[index];
		el.style.paddingRight = 0 + 'px';
	}
	body.style.paddingRight = 0 + 'px';
	body.classList.remove('body-lock')
}


$('.docs__link').magnificPopup({
	type: 'image',
	
	gallery: {
		enabled : true,
	}
});


$(document).ready(function ($) {
	$('.service-popup').magnificPopup({
		type: 'inline',
	});
});

let reviewSlider = new Swiper('.slider__wrapper', {
	spaceBetween: 40,
	centeredSlides: true,
	slidePerView: 1,
	autoHeight: true,
	speed: 600,
	loop: true,
	pagination: {
	  el: '.swiper-pagination',
	  type: 'bullets',
	  clickable: true
	},
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev'
	}
  });