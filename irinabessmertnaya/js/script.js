// const services = document.querySelector('a[href*="#title"]');

// services.addEventListener('click', function(event){
//     event.preventDefault();
//     services.scrollIntoView({
//         behavior: 'smooth',
//         block: "start"
//     });

// });
window.onload = function () {

    

    const animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);

        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 10;


                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }

                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }

        setTimeout(() => {
            animOnScroll();
        }, 300);

    }

    //Burger menu
    const header = document.getElementById('header');
    const menuList = document.getElementById('menu-list');
    const menuBurger = document.getElementById('burger-menu');

    // document.addEventListener('DOMContentLoaded', function(){
    //         menuList.classList.add('hidden');
        
    // });
    window.onload = () => {
        menuList.classList.add('hidden');
    };

    window.addEventListener('resize', function(){
        if(window.innerWidth <= 960){
            menuList.classList.add('hidden');
        }else{
            menuList.classList.remove('hidden');
        }
    });
   
    
    menuBurger.addEventListener('click', function(){
        menuList.classList.toggle('hidden');
        
    });

    document.addEventListener('click', function(event){
        if(window.innerWidth <= 960){
            if(!event.target.classList.contains('header__nav-btn') && !event.target.classList.contains('header__item')){
                        menuList.classList.add('hidden');
                    }

        }
        
    });


    
    

};