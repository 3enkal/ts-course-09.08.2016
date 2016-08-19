// просто перевод решения из js на ts 

let sliderElem = document.getElementById('slider') as HTMLElement;
let thumbElem = sliderElem.children[0] as HTMLElement;

thumbElem.onmousedown = function (e: MouseEvent) {
    let thumbCoords: {top: number, left: number} = getCoords(thumbElem);
    let shiftX: number = e.pageX - thumbCoords.left;

    let sliderCoords: {top: number, left: number} = getCoords(sliderElem);

    document.onmousemove = function (e: MouseEvent): void {
        let newLeft: number = e.pageX - shiftX - sliderCoords.left;

        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge: number = sliderElem.offsetWidth - thumbElem.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        thumbElem.style.left = newLeft + 'px';
    }

    document.onmouseup = function (): void {
        document.onmousemove = document.onmouseup = null;
    };

    return false;
};

thumbElem.ondragstart = function (): boolean {
    return false;
};

function getCoords(elem): {top: number, left: number} {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}