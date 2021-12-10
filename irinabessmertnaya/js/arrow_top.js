//Появление стрелки
    const anchor = document.getElementById('_arrow-anchor').offsetHeight;
    const arrow = document.querySelector('.arrowtop');
    window.addEventListener('scroll', function(){
         if(pageYOffset > anchor){
            arrow.classList.remove('hidden');
            arrow.classList.add('show');
        }else{
            arrow.classList.remove('show');
            arrow.classList.add('hidden');
        }
    });

//Плавная прокрутка вверх    
    function smoothScroll(){
        let scrolled;
        let timer;

        arrow.onclick = function(){
            scrolled = window.pageYOffset;
            scrollToTop();
    
        };
        function scrollToTop(){
            if (scrolled > 0){
                window.scrollTo(0, scrolled);
                scrolled = scrolled - 40;  //скорость прокрутки
                timer = setTimeout (scrollToTop, 5);
            }else{
                clearTimeout(timer);
                window.scrollTo(0, 0);
            }
        }

    }
    smoothScroll();  
    

