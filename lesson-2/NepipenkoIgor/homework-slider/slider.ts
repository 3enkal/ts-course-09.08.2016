type sliderOption = {element:HTMLElement}
class Slider {
    protected slider:HTMLElement;
    protected thumb:HTMLElement;
    protected leftBorder:number;
    protected rightBorder:number;
    protected shiftX:number;
    protected isDrag:boolean = false;

    constructor(opt:sliderOption) {
        let {element} = opt;
        this.slider = element;
        this.thumb = <HTMLElement>this.slider.querySelector('.thumb');
        let sliderRect = this.slider.getBoundingClientRect();
        this.leftBorder = sliderRect.left;
        this.rightBorder = sliderRect.right - sliderRect.left - this.thumb.getBoundingClientRect().width;
        this.slider.addEventListener('mousedown', this.onMouseDownHandler.bind(this));
    };

    protected onMouseDownHandler(e:MouseEvent):void {
        let target = <HTMLElement>e.target;
        if (!target.classList.contains('thumb')) {
            return;
        }
        this.shiftX = e.pageX - this.thumb.getBoundingClientRect().left;
        document.onmousemove = this.onMouseMoveHandler.bind(this);
        document.onmouseup = this.onMouseUpHandler.bind(this);
        this.isDrag = true;
    }

    protected onMouseUpHandler():void {
        this.isDrag = false;
        document.onmousemove = null;
        document.onmouseup = null;
    }

    protected onMouseMoveHandler(e:MouseEvent):void {
        if (!this.isDrag) {
            return;
        }
        let thumbPosition = e.pageX - this.shiftX - this.leftBorder;
        if (thumbPosition >= this.rightBorder) {
            this.thumb.style.left = `${this.rightBorder}px`;
            return;
        }
        if (thumbPosition <= this.leftBorder) {
            this.thumb.style.left = `0px`;
            return;
        }
        this.thumb.style.left = `${thumbPosition}px`;
    }
}


let slider = new Slider({element: <HTMLElement>document.querySelector('#slider')});
