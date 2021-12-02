const burgerItem = document.querySelector('.burger');
const menu = document.querySelector('.menu__wrapper');
const menuCloseItem = document.querySelector('.header__nav-close');
const body = document.querySelector('body');
const formHeaderBtn = document.querySelector('.menu-btn');
const formHeader = document.querySelector('.header-form-form');
const lockPadding = document.querySelectorAll('.lock-padding');



//Бургер-меню
burgerItem.addEventListener('click', () => {
    menu.classList.add('_active');
    burgerItem.classList.toggle('_close');
    menuCloseItem.classList.toggle('_show');
    body.classList.toggle('_body-scroll');
});

menuCloseItem.addEventListener('click', () => {
    menu.classList.remove('_active');
    burgerItem.classList.toggle('_close');
    menuCloseItem.classList.toggle('_show');
    body.classList.remove('_body-scroll');
});

menu.addEventListener('click', function(event) {
    if (window.innerWidth < 1001) {
        if (event.target.classList.contains('_close-menu')) {
            if (event.target.classList.contains('menu-btn')) {
                menu.classList.remove('_active');
                burgerItem.classList.toggle('_close');
                menuCloseItem.classList.toggle('_show');
            } else {
                body.classList.remove('_body-scroll');
                menu.classList.remove('_active');
                burgerItem.classList.toggle('_close');
                menuCloseItem.classList.toggle('_show');
            }
        }

    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 1000) {
        menuCloseItem.classList.remove('_show');
        body.classList.remove('_body-scroll');
    }
});


//блокировка скрола

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;

}

function bodyUnLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = 0 + 'px';
    }
    body.style.paddingRight = 0 + 'px';

}


//Форма для звонка
formHeaderBtn.addEventListener('click', function() {
    bodyLock();
    body.classList.add('_body-scroll');
    formHeader.parentElement.classList.toggle('_visible');
});



//Форма с ценами
let button = document.querySelectorAll('.prices-btn');
let formClose = document.querySelectorAll('.form_close');

function showModal(color, text) {
    let form = document.querySelector('.prices-form');
    let modalName = document.querySelector('.form__title');
    form.parentElement.classList.toggle('_visible');
    modalName.textContent = text;
    modalName.parentElement.style.backgroundColor = color;
}

button.forEach(function(but) {
    but.addEventListener('click', function(event) {
        let color = event.target.dataset.color;
        let text = event.target.dataset.text;
        bodyLock();
        body.classList.toggle('_body-scroll');
        showModal(color, text);
    });
});


//Закрытие любой формы
formClose.forEach(function(elem) {
    elem.addEventListener('click', function() {
        elem.parentElement.parentElement.classList.toggle('_visible');
        elem.nextElementSibling.reset();
        bodyUnLock();
        body.classList.toggle('_body-scroll');
    });
});

//Скролл по разделам
const anchor = document.querySelectorAll('._anchor');
document.querySelectorAll('.menu-link').forEach(function(link, index) {

    link.addEventListener('click', function(e) {
        e.preventDefault();

        let href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        let topOffset = anchor[index].offsetHeight;
        if (window.innerWidth < 1001) {
            if (window.innerWidth < 551) {
                topOffset = topOffset + 45;
            } else {
                topOffset = topOffset + 30;
            }
        }
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

//Показ портфолио
const portfolioHide = document.querySelectorAll('.portfolio_more');
const portfolioBtn = document.querySelector('.portfolio_btn');

portfolioBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.textContent == 'Смотреть больше проектов') {
        event.target.textContent = 'Показать меньше';
    } else {
        event.target.textContent = 'Смотреть больше проектов';
    }
    portfolioHide.forEach(function(elem, ) {
        elem.classList.toggle('portfolio_show');
    });
});


//Показ отзывов
const reviewBtns = document.querySelectorAll('.review_card-link');
const hiddenReviews = document.querySelectorAll('.hidden_review');
const closeReviews = document.querySelectorAll('.review_close');

reviewBtns.forEach(function(btn, index) {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        if (window.innerWidth > 550) {
            let reviewWrap = document.querySelector('.hidden_review-wrapper');
            reviewWrap.classList.toggle('_visible');
            bodyLock();
            body.classList.toggle('_body-scroll');
            hiddenReviews[index].classList.add('show-review');
            closeReviews[index].addEventListener('click', function(event) {
                hiddenReviews[index].classList.remove('show-review');
                event.target.parentElement.parentElement.classList.remove('_visible');
                bodyUnLock();
                body.classList.remove('_body-scroll');
            });
        }
    });
});

//Показ галереи
$('[data-fancybox="gallery"]').fancybox({
    loop: true,
});


//Проверка телефона
$(document).ready(function() {
    $("._phone").mask("+375 (99) 99 99 999");
});


// Отправка данных на сервер
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
        form.classList.add('_sending');
        console.log("Отправка запроса");
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        var req = new XMLHttpRequest();
        req.open('POST', php, true);
        req.onload = function() {
            if (req.status >= 200 && req.status < 400) {
                json = JSON.parse(this.response); // Ебанный internet explorer 11

                // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                if (json.result == "success") {
                    // Если сообщение отправлено
                    requestForm.classList.add('show-request');
                    form.parentElement.parentElement.classList.remove('_visible');
                    setTimeout(() => {
                        requestForm.classList.remove('show-request');

                    }, 3000);
                    setTimeout(() => {
                        form.reset();
                    }, 1000);
                    body.classList.remove('_body-scroll');
                } else {
                    // Если произошла ошибка
                    form.classList.remove('_sending');
                    alert("Ошибка. Сообщение не отправлено");
                }
                // Если не удалось связаться с php файлом
            } else {
                alert("Ошибка сервера. Номер: " + req.status);
            }
        };

        // Если не удалось отправить запрос. Стоит блок на хостинге
        req.onerror = function() {
            alert("Ошибка отправки запроса");
        };
        req.send(new FormData(event.target));
    }
}