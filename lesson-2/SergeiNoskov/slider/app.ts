type menuOpt={thumbElem: HTMLElement, sliderElem: HTMLElement,sliderValueElem: HTMLElement}
type elemCoords={top:number, left: number}

class Slider {
    private _thumbElem: HTMLElement;
    private _sliderElem: HTMLElement;
    private _sliderValueElem: HTMLElement;
    private _sliderValue:string;
    private _onMouseMoveWithContext;// type??

    constructor(options:menuOpt){
        this._thumbElem = options.thumbElem;
        this._sliderElem = options.sliderElem;
        this._sliderValueElem= options.sliderValueElem;
        this._onMouseMoveWithContext = this._onMouseMove.bind(this);

        this._thumbElem.addEventListener('mousedown', this._onMouseDown.bind(this));
        this._thumbElem.addEventListener('dragstart', function(){ return false; });
        this._thumbElem.addEventListener('mouseup', this._onMouseUp.bind(this));
    }

    _onMouseMove(e:MouseEvent){
         this.moveAt(e);
    }
    _onMouseUp(e:MouseEvent){
        this._sliderElem.removeEventListener('mousemove', this._onMouseMoveWithContext);
        document.onmousemove = null;
    //            this._thumbElem.removeEventListener('mouseup', this._onMouseUpWithContext);

    }
    _onMouseDown(e:MouseEvent){
    //            event = this.fixEvent(event);
        this._sliderElem.addEventListener('mousemove', this._onMouseMoveWithContext);
    //            this.moveAt(event);
        document.onmouseup = function(){
            document.onmouseup = document.onmousemove = null;
        }
    }

    moveAt(e:MouseEvent):void{
        let minX:number = this.getCoords(this._sliderElem).left;
        let maxX:number = minX + this._sliderElem.clientWidth - this._thumbElem.clientWidth;
        let workWidth:number = this._sliderElem.clientWidth - this._thumbElem.clientWidth;
        let pixelsPerValue:number = workWidth/100;

        let newX:number = e.pageX;
        if(newX < minX){
            newX = minX;
        } else if(newX > maxX){
            newX = maxX;
        }
        this._thumbElem.style.left = newX - minX + 'px';
        this._sliderValue = Math.round((newX - minX)/pixelsPerValue).toString();
        this._sliderValueElem.innerHTML = this._sliderValue;

    }

    getCoords(elem:HTMLElement):elemCoords{
         var box = elem.getBoundingClientRect();
         var body = document.body;
         var docEl = document.documentElement;
         var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
         var scrollLeft = window.pageXOffset || docEl.scrollTop || body.scrollLeft;
         var clientTop = docEl.clientTop || body.clientTop || 0;
         var clientLeft = docEl.clientLeft || body.clientLeft || 0;
         var top = box.top + scrollTop - clientTop;
         var left = box.left + scrollLeft - clientLeft;
         return {top: Math.round(top), left: Math.round(left)};
    }

}


//let element = document.querySelector('.slider') as HTMLElement;
let thumbElem = document.getElementById('thumb');
let sliderElem = document.getElementById('slider');
let sliderValueElem = document.getElementById('slider-value');

let slider = new Slider({
    thumbElem:thumbElem,
    sliderElem:sliderElem,
    sliderValueElem:sliderValueElem
});