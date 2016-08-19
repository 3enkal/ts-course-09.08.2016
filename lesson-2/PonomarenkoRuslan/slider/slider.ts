'use strict';

let thumb = <HTMLDivElement>document.querySelector('div.thumb');
let slider = <HTMLDivElement>document.querySelector('div#slider');
let sliderWidth = 310; //slider.style.width;
let thumbWidth = 10;

thumb.onmousedown = function(e: MouseEvent): void {
    slider.onmousemove = function (e: MouseEvent) {
        if (e.pageX <= sliderWidth)
            thumb.style.left = (e.pageX - thumbWidth / 2) + 'px';
    };
    document.onmouseup = function (e: MouseEvent) {
        slider.onmousemove = null;
    };
};