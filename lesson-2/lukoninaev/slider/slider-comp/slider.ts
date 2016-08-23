"use strict";

/// <reference path="./sliderTypes.d.ts"/>

export default class Slider {
    private sliderRootElement: HTMLElement;
    private sliderThumbElement: HTMLElement;
    private thumbClassName: string;

    private minX: number;
    private maxX: number;
    private deltaX: number;

    constructor(options: sliderOptions) {
        this.sliderRootElement = options.element || null;
        this.thumbClassName = options.thumbClassName || 'thumb';

        this.renderThumbElement();
        this.calcSettings();

        this.sliderThumbElement.addEventListener('mousedown', (event: MouseEvent) => this.moveThumb(event));
        this.sliderThumbElement.ondragstart = (event: DragEvent) => event.preventDefault();
    }

    private renderThumbElement(): void {
        this.sliderRootElement.innerHTML = `<div class="${this.thumbClassName}"></div>`;

        this.sliderThumbElement = this.sliderRootElement.querySelector('.' + this.thumbClassName) as HTMLElement;
    }

    private calcSettings(): void {
        this.deltaX = this.sliderRootElement.offsetLeft;

        this.minX = 0;
        this.maxX = this.sliderRootElement.offsetWidth - this.sliderThumbElement.offsetWidth;
    }

    private moveThumb(event: MouseEvent): void {
        let shiftX: number = event.pageX - this.getCoords(this.sliderThumbElement).left

        document.onmousemove = (event: MouseEvent) => this.moveTo(event, shiftX);
        document.onmouseup = (event: MouseEvent) => {
            document.onmousemove = document.onmouseup = null;
        };

        event.preventDefault();
    }

    private moveTo(event: MouseEvent, shiftX): void {
        let coordX: number = event.pageX - this.deltaX - shiftX;

        if (coordX < this.minX) {
            this.sliderThumbElement.style.transform = `translateX(${this.minX + 'px'})`;
            return;
        }

        if (coordX > this.maxX) {
            this.sliderThumbElement.style.transform = `translateX(${this.maxX + 'px'})`;
            return;
        }

        this.sliderThumbElement.style.transform = `translateX(${coordX + 'px'})`;
    }

    private getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }
}