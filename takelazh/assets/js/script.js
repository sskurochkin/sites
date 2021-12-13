"use strict";

let body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
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
$(document).ready(function () {
  $('.service__card__link').click(function (event) {
    $('.service__card__link').not($(this)).next().slideUp(500); // $(this).toggleClass('ac_active');

    $('.service__card__link').not($(this)).removeClass('ac_active');
    $(this).next().slideToggle(1000);
  });
});
$(document).ready(function () {
  $('.project__more').click(function (event) {
    $('.project__more').not($(this)).prev().slideUp(500);
    $(this).prev().slideToggle(1000);
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
} //color menu link


let sections = $('.menu_link'),
    nav = $('.header__menu'),
    nav_height = nav.outerHeight();
$(window).on('scroll', function () {
  $('nav a').removeClass('active-menu');
  let cur_pos = $(this).scrollTop();
  sections.each(function () {
    let top = $(this).offset().top - nav_height - 200,
        bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active-menu');
      sections.removeClass('active-menu');
      $(this).addClass('active-menu');
      nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active-menu');
    }
  });
}); //smooth scroll

$(document).ready(function () {
  $('.header__link, .scroll-link, .footer__link').click(function () {
    if (body.classList.contains('lock')) {
      body.classList.remove('lock');
      $('.header__burger, .header__menu').toggleClass('active');
    }

    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - 75 + 'px'
    }, {
      duration: 1000,
      easing: 'swing'
    });
    return false;
  });
}); //send mail

let requestForm = document.querySelector('.request-form');

function send(event, php) {
  event.preventDefault();
  let form = event.target;
  let error = formValidate(form);

  function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('_phone')) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }

    return error;
  }

  function formAddError(input) {
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  function phoneTest(input) {
    return /^(\+375)\((29|25|44|33)\)[0-9]{2}[0-9]{2}[0-9]{3}$/.test(input.value);
  }

  if (error === 0) {
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);

    req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
        let json = JSON.parse(this.response); // Ебанный internet explorer 11
        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ

        if (json.result == "success") {
          // Если сообщение отправлено
          requestForm.classList.add('show-request');
          setTimeout(() => {
            requestForm.classList.remove('show-request');
          }, 3000);
          setTimeout(() => {
            form.reset();
          }, 1000);
        } else {
          // Если произошла ошибка
          alert("Ошибка. Сообщение не отправлено");
        } // Если не удалось связаться с php файлом

      } else {
        alert("Ошибка сервера. Номер: " + req.status);
      }
    }; // Если не удалось отправить запрос. Стоит блок на хостинге


    req.onerror = function () {
      alert("Ошибка отправки запроса");
    };

    req.send(new FormData(event.target));
  }
}