let links = document.querySelectorAll('section');
let page = document.querySelector('.page');
let header = document.querySelector('.header');
let progressBar = document.querySelector('.progress-bar');
// let  = document.querySelector('body');

header.onmouseover = (e) => {
	if(e.target.classList[0] == 'menu__link'){
		console.log(1);
		page.classList.add('_blend');
	}else{
		page.classList.remove('_blend');
	}
	// console.log(e.target.classList);
}
window.onscroll = () =>{
	if(window.pageYOffset > 80){
		header.classList.add('header_active');
	} else {
		header.classList.remove('header_active');
	}
	let max = page.scrollHeight - window.outerHeight;
	let percent = (pageYOffset / max) * innerWidth;
	progressBar.style.clip = 'rect( 0,' + percent +'px' + ', 4px, 0)';

}

// page.onmouseenter = ()=>{
// 	console.log(1);
// }

