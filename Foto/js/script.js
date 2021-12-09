const burgerItem = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const menuCloseItem = document.querySelector('.header__nav-close');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const formBody = document.querySelector('.form_bg');
const formCloseBtn = document.querySelector('.form_close');
const formShowBtn = document.querySelectorAll('.photo__btn');
const lockPadding = document.querySelectorAll('.lock-padding');

//блокировка скрола

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

    if (lockPadding) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;

}

function bodyUnLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

    if (lockPadding) {

        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = 0 + 'px';
        }
    }
    body.style.paddingRight = 0 + 'px';

}
//Call form
formShowBtn.forEach(function (e) {
    e.onclick = () => {
        bodyLock();
        formBody.classList.add('_visible');
        body.classList.add('_body-scroll');
    }
});

formCloseBtn.onclick = () => {
    bodyUnLock();
    formBody.classList.remove('_visible');
    body.classList.remove('_body-scroll');
}

//header effect
window.onscroll = () => {
    if (window.pageYOffset > 80) {
        if (window.innerWidth <= 940) {
            document.querySelector('.header__menu').classList.add('header_active');
        }
        header.classList.add('header_active');
    } else {
        header.classList.remove('header_active');
        document.querySelector('.header__menu').classList.remove('header_active');

    }


}

burgerItem.onclick = () => {
    body.classList.add('_body-scroll');
    header.classList.add('header-mobile');
    document.querySelector('.header__wrapper').classList.add('header__wrapper-mobile');
    burgerItem.classList.add('_hide');
    menuCloseItem.classList.add('_visible');
    // bodyLock();
}

menuCloseItem.onclick = () => {
    body.classList.remove('_body-scroll');
    header.classList.remove('header-mobile');
    document.querySelector('.header__wrapper').classList.remove('header__wrapper-mobile');
    menuCloseItem.classList.remove('_visible');
    burgerItem.classList.remove('_hide');
    // bodyUnLock();
}

menu.addEventListener('click', function (event) {
    if (window.innerWidth <= 940) {
        if (event.target.classList.contains('scroll-link')) {
            body.classList.remove('_body-scroll');
            header.classList.remove('header-mobile');
            document.querySelector('.header__wrapper').classList.remove('header__wrapper-mobile');
            menuCloseItem.classList.remove('_visible');
            burgerItem.classList.remove('_hide');
        }

    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth >= 940) {
        menuCloseItem.classList.remove('_visible');
        body.classList.remove('_body-scroll');
        burgerItem.classList.remove('_hide');
    }
});

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

let disabledLinks = document.querySelectorAll('.parent-link');

disabledLinks.forEach(function (elem) {
    elem.onclick = function (event) {
        event.preventDefault();
    };
});

//mobile menu
let device;

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        device = 'mobile';
    } else {
        device = 'pc';
    }
}
isMobile();

if (device === 'mobile') {
    body.classList.add('touch');
    let arrow = document.querySelectorAll('.arrow');
    let allSub = document.querySelectorAll('.sub-menu__list');
    for (let index = 0; index < arrow.length; index++) {
        let submenu = arrow[index].nextElementSibling;
        let thisArrow = arrow[index];
        let thisLink = arrow[index].previousElementSibling;

        thisLink.classList.add('parent');
        arrow[index].onclick = (e) => {


            if (thisArrow.classList.contains('arrow-active')) {
                thisArrow.classList.remove('arrow-active');
                submenu.classList.remove('open');
            } else {
                allSub.forEach(function (elem) {
                    if (elem.classList.contains('open')) {
                        elem.classList.remove('open');
                        elem.previousElementSibling.classList.remove('arrow-active');
                        thisArrow.classList.remove('arrow-active');
                    }
                });
                thisArrow.classList.add('arrow-active');
                submenu.classList.add('open');
            }

        };
    }
    document.querySelectorAll('.sub-link').forEach(function (link, index) {
        link.onclick = () => {
            link.parentElement.parentElement.classList.toggle('open');
            link.parentElement.parentElement.previousElementSibling.classList.toggle('arrow-active');

        };
    });

} else {
    body.classList.add('mouse');
    let linkShow = document.querySelectorAll('.no-line');
    for (let index = 0; index < linkShow.length; index++) {
        let submenu = linkShow[index].querySelector('.sub-menu__list');
        let thisLink = linkShow[index];

        thisLink.onmouseover = () => {
            submenu.classList.add('_visible');
            submenu.onclick = () => {
                submenu.classList.remove('_visible');
            };
        }
        thisLink.onmouseout = () => {
            submenu.classList.remove('_visible');
        }
    }
}

// $('.portfolio_card-wrapper').click(function () {
//     $(this).find('[data-fancybox="gallery"]').fancybox({
//     }).eq().click();
// });

$('[data-fancybox="gallery"]').fancybox({
    animationEffect: false,
    transitionEffect: false,
    // thumbs : {
    //     axis : 'y',
    // },
      // Custom CSS class for layout
    idleTime: 55,
    buttons: [
        //"zoom",
        //"share",
        "slideShow",
        // "fullScreen",
        //"download",
        "thumbs",
        "close"
      ],
      btnTpl: {
        // Arrows
        arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
          '<div></div>' +
          "</button>",
  
        arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
          '<div></div>' +
          "</button>",
      },
      clickContent: function (current, event) {
        return current.type === false;
      },
  
      mobile: {
        dblclickContent: function (current, event) {
          return current.type === false;
        },
        dblclickSlide: function (current, event) {
          return current.type === false;
        }
      },
  
});



window.onload = init;

var product;

function init() {

    product1 = $('.product1').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,

        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/1_p/',
        filePrefix: 'foto-',
        ext: '.png',
        height: 200,
        width: 300,
        navigation: true
    });

    product2 = $('.product2').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,

        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/2_p/',
        filePrefix: 'foto-',
        ext: '.png',
        height: 200,
        width: 300,
        navigation: true
    });

    product3 = $('.product3').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,

        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/3_p/',
        filePrefix: 'foto-',
        ext: '.png',
        height: 200,
        width: 300,
        navigation: true
    });

    //Portfolio
    portfolio1 = $('.portfolio1').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/1/',
        filePrefix: 'foto-',
        ext: '.jpg',
        navigation: true,

    });
    portfolio11 = $('.portfolio1-1').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/1_hd/',
        filePrefix: 'foto-',
        ext: '.jpg',
        navigation: true,
    });

    portfolio2 = $('.portfolio2').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/2/',
        filePrefix: 'foto-',
        ext: '.jpg',
        navigation: true,

    });
    portfolio21 = $('.portfolio2-1').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/2_hd/',
        filePrefix: 'foto-',
        ext: '.jpg',
        navigation: true,

    });
    portfolio3 = $('.portfolio3').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,

        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/3/',
        filePrefix: 'foto-',
        ext: '.jpg',
        navigation: true,

    });
    portfolio31 = $('.portfolio3-1').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,
        // height : 260,

        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/3_hd/',
        filePrefix: 'foto-',
        ext: '.jpg',
        navigation: true,

    });
    portfolio4 = $('.portfolio4').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,

        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/4/',
        filePrefix: 'foto-',
        ext: '.jpg',
        navigation: true,

    });
    portfolio41 = $('.portfolio4-1').ThreeSixty({
        totalFrames: 36,
        endFrame: 1,
        currentFrame: 1,

        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: 'img/3d/4_hd/',
        filePrefix: 'foto-',
        ext: '.jpg',
        navigation: true,

    });

}


//send mail
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
        req.onload = function () {
            if (req.status >= 200 && req.status < 400) {
                json = JSON.parse(this.response); // Ебанный internet explorer 11
                console.log(json);

                // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                if (json.result == "success") {
                    // Если сообщение отправлено
                    form.reset();
                    form.classList.remove('_sending');
                    document.querySelector('.form__message').textContent = 'Ваша заявка отправлена';

                    setTimeout(() => {
                        document.querySelector('.form__message').textContent = '';
                        document.querySelector('body').classList.remove('_body-scroll');
                        form.parentElement.parentElement.classList.toggle('_visible');
                    }, 4500);
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
        req.onerror = function () {
            alert("Ошибка отправки запроса");
        };
        req.send(new FormData(event.target));
    }
}