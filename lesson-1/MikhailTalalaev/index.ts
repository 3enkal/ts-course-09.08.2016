import render from './render.ts'
import menuData from './menuData.ts'

var nav = document.getElementsByClassName("menu")[0] as HTMLElement;
nav.innerHTML = render( menuData );

nav
    .addEventListener("click", function(e: MouseEvent) {
        let target = e.target as HTMLElement,
            classList = target.classList;
        if ( classList.contains('title') ) {
            let parentLi = target.parentNode as HTMLElement;
            parentLi.classList.toggle('open-menu');
        }
    });