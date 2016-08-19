"use strict";

/// <reference path="./sliderD.d.ts"/>

class Slider implements ISlider {

  protected _passedOpts;
  protected _rootElem: HTMLElement;
  protected _barElem: HTMLElement;
  protected _barWidth: number;
  protected _deltaClickBar: number;
  protected _sliderWidth: number;
  protected _sliderLeft: number;
  protected _downHandler: (e: MouseEvent) => void;
  protected _moveHandler: (e: MouseEvent) => void;
  protected _upHandler: (e: MouseEvent) => void;

  constructor(opts) {
    this._passedOpts = opts;

    this._rootElem = null;
    this._barElem = null;
    this._barWidth = null;
    this._deltaClickBar = null;
    this._sliderWidth = null;
    this._sliderLeft = null;

    this._downHandler = (e: MouseEvent) => {
      this._preparedMove(e.pageX);
    };

    this._moveHandler = (e: MouseEvent) => {
      this._handleMove(e.pageX);
    };

    this._upHandler = (e: MouseEvent) => {
      this._finishMove();
    };
  }

  get value() {
    let barElem: HTMLElement = this._barElem;
    let barWidth: number = this._barWidth;
    let sliderWidth: number = this._sliderWidth;

    let currentPos: number = parseFloat(barElem.style.left);
    return (currentPos + barWidth / 2) / sliderWidth * 100;
  }

  set value(val: number) {
    let barWidth: number = this._barWidth;
    let sliderWidth: number = this._sliderWidth;

    let leftPosition: number = sliderWidth / 100 * val - barWidth / 2;

    this._setPosition(leftPosition);
  }

  init(val: number=0): void {
    let container = this._passedOpts.elems.container;

    container.innerHTML = this._render();
    this._findElems();
    this._calcDimensions();
    this._attachHandlers();
    this.value = val;
  }

  destroy(): void {
    let container = this._passedOpts.elems.container;

    this._removeHandlers();
    container.innerHTML = "";
  }

  protected _getCoords(elem: HTMLElement): {left: number, top: number} {
    let clientCoords = elem.getBoundingClientRect();

    return {
      left: clientCoords.left + window.pageXOffset,
      top: clientCoords.top + window.pageYOffset
    };
  }

  protected _calcDimensions() {
    let rootElem: HTMLElement = this._rootElem;
    let barElem: HTMLElement = this._barElem;

    this._barWidth = barElem.offsetWidth;
    this._sliderWidth = rootElem.offsetWidth;
    this._sliderLeft = this._getCoords(rootElem).left;
  }

  protected _preparedMove(pageX: number): void {
    let barElem: HTMLElement = this._barElem;

    this._deltaClickBar = pageX - this._getCoords(barElem).left;

    document.addEventListener("mousemove", this._moveHandler);
    document.addEventListener("mouseup", this._upHandler);
  }

  protected _handleMove(pageX: number): void {
    let fixedPageX: number = pageX - this._deltaClickBar;
    let sliderWidth: number = this._sliderWidth;
    let barWidth: number = this._barWidth;
    let sliderLeft: number = this._sliderLeft;
    let maxPageX: number = sliderWidth + sliderLeft - barWidth;

    if (fixedPageX < sliderLeft) {
      fixedPageX = sliderLeft;
    } else if (fixedPageX > maxPageX) {
      fixedPageX = maxPageX;
    }

    this._setPosition(fixedPageX - sliderLeft);
  }

  protected _setPosition(position: number): void {
    let barElem: HTMLElement = this._barElem;

    barElem.style.left = `${position}px`;
  }

  protected _finishMove(): void {
    document.removeEventListener("mousemove", this._moveHandler);
    document.removeEventListener("mouseup", this._upHandler);
  }

  protected _findElems(): void {
    let classes = this._passedOpts.classes;
    let container = this._passedOpts.elems.container;

    this._barElem = container.querySelector("." + classes.bar) as HTMLElement;
    this._rootElem = container.querySelector("." + classes.root) as HTMLElement;
  }

  protected _attachHandlers(): void {
    let rootElem = this._rootElem;

    rootElem.addEventListener("mousedown", this._downHandler);
  }

  protected _removeHandlers(): void {
    let rootElem = this._rootElem;

    rootElem.removeEventListener("mousedown", this._downHandler);
  }

  protected _render(): string {
    let classes = this._passedOpts.classes;
    let template = `
      <div class="${classes.root}">
        <div class="${classes.path}">
          <p style="left: 0;" class="${classes.bar}"></p>
        </div>
      </div>`;

    return template;
  }
}

let slider: Slider = new Slider({
  elems: {
    container: document.querySelector(".container")
  },
  classes: {
    root: "slider",
    path: "slider__path",
    bar: "slider__bar"
  }
});

slider.init(50);
