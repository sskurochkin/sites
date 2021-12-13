

//слайдер
let reviewSlider = new Swiper('.slider__wrapper', {
  spaceBetween: 40,
  centeredSlides: true,
  slidePerView: 1,
  effect: 'fade',
  speed: 600,
  loop: true,
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
});
const body = document.querySelector('body');
$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__burger, .header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  });
}); //скролл по кнопкам и меню

$(document).ready(function () {
  $('.header__link, .link__btn, .footer__link').click(function () {
    if (body.classList.contains('lock')) {
      body.classList.remove('lock');
      $('.header__burger, .header__menu').toggleClass('active');
    }

    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - 85 + 'px'
    }, {
      duration: 1000,
      easing: 'swing'
    });
    return false;
  });
});
$('[data-fancybox="gallery"]').fancybox({
  animationEffect: false,
  transitionEffect: false,
  // Custom CSS class for layout
  idleTime: 55,
  buttons: ["zoom", "slideShow", "fullScreen", "download", "thumbs", "close"]
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