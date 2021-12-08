"use strict";

let body = document.querySelector('body');
const header = document.querySelector('.header__menu');
let modalBtn = document.querySelectorAll('.m-btn');
let modal = document.querySelector('.modal');
let modalTitle = document.querySelector('.form__title');
let closeBtn = document.querySelector('.modal__close');
let requestForm = document.querySelector('.request-form');
const lockPadding = document.querySelectorAll('.lock-padding');
let portfolioSlider = new Swiper('.portfolio__slider', {
  spaceBetween: 20,
  speed: 550,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.button-next',
    prevEl: '.button-prev'
  },
  breakpoints: {
    800: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      autoHeight: false
    },
    750: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      autoHeight: false
    },
    530: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      autoHeight: false
    }
  }
});
$('[data-fancybox="gallery"]').fancybox({
  animationEffect: false,
  transitionEffect: false,
  // Custom CSS class for layout
  idleTime: 55,
  buttons: ["zoom", "slideShow", "fullScreen", "download", "thumbs", "close"]
});
$(document).ready(function () {
  $('.faq__list__title').click(function (event) {
    $('.faq__list__title').not($(this)).next().slideUp(500);
    $(this).toggleClass('ac_active');
    $('.faq__list__title').not($(this)).removeClass('ac_active');
    $(this).next().slideToggle(1000);
  });
});
$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__burger, .header__menu').toggleClass('active');

    if (body.classList.contains('lock')) {
      bodyUnLock();
    } else {
      bodyLock();
    }
  });
});
$(document).ready(function () {
  $('.header__link').click(function () {
    if (body.classList.contains('lock')) {
      body.classList.remove('lock');
      $('.header__burger, .header__menu').toggleClass('active');
    }

    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - 45 + 'px'
    }, {
      duration: 1000,
      easing: 'swing'
    });
    return false;
  });
});

function bodyLock() {
  let lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

  if (lockPadding) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
}

function bodyUnLock() {
  let lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

  if (lockPadding) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = 0 + 'px';
    }
  }

  body.style.paddingRight = 0 + 'px';
  body.classList.remove('lock');
}

modalBtn.forEach(function (elem) {
  elem.addEventListener('click', function (e) {
    e.preventDefault();
    bodyLock();
    modal.classList.add('modal_active');
    modalTitle.textContent = elem.textContent;
  });
});

closeBtn.onclick = () => {
  if (header.classList.contains('active')) {
    closeBtn.parentElement.parentElement.classList.remove('modal_active');
  } else {
    bodyUnLock();
    closeBtn.parentElement.parentElement.classList.remove('modal_active');
  }
};

modal.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal_active')) {
    modal.classList.remove('modal_active');
    bodyUnLock();
  }

  ;
});

function sendForm() {
  $.post('./tlg.php', {
    'title': $('#formTitle').text(),
    'name': $('#formName').val(),
    'phone': $('#formPhone').val()
  }, onAjaxSuccess);
}

function onAjaxSuccess(data) {
  requestForm.firstElementChild.innerHTML = data + '<span class="title">Спасибо!</span>';
  requestForm.classList.add('show-request');
  setTimeout(() => {
    requestForm.classList.remove('show-request');
  }, 3000);
  modal.classList.remove('modal_active');
  bodyUnLock();
  setTimeout(() => {
    form.reset();
  }, 1000);
}