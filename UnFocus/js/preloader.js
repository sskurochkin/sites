
// preloader code goes here


var preloader = document.getElementById('preloader');
setTimeout(function() {
    preloader.classList.add('close');
//get back the scroll    
  document.body.style.overflowY= "visible";
}, 9000);
