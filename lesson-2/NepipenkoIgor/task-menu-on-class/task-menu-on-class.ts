/**
 * Created by igor on 1/10/16.
 */


interface  IMenu {
    getElem :() =>  HTMLElement;
    toggle:(listName:string) => void;
    close :(listName:string) => void;
    open :(listName:string) => void;
}

/* tslint:disable */
var menu:{ title: string, link?: string, items?: typeof menu}[];
/* tslint:enable */
type menuOption = {element:HTMLElement, menuList:typeof menu}
class Menu1 implements IMenu {
    protected element:HTMLElement;
    protected menuList:typeof menu;
    protected listCount:number = 1;

    constructor(opt:menuOption) {
        let {element, menuList} = opt;
        this.element = element;
        this.menuList = menuList;
        this.element.innerHTML = this.generateMenuHTMl(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }

    public getElem():HTMLElement {
        return this.element;
    }

    public open(listName:string):void {
        this.element.querySelector(`.${listName}`).classList.add('menu-open');
    }

    public close(listName:string):void {
        this.element.querySelector(`.${listName}`).classList.remove('menu-open');
    }

    public toggle(listName:string):void {
        this.element.querySelector(`.${listName}`).classList.toggle('menu-open');
    }

    protected clickHandler(e:MouseEvent):void {
        let el = <HTMLElement>e.target;
        let classList = el.classList;
        if (classList.contains('title')) {
            let parentLi = <HTMLElement>el.parentNode;
            parentLi.classList.toggle('menu-open');
        }
    }

    protected generateMenuHTMl(menuList:typeof menu):string {
        let z:string = `<ul>`;
        for (let a of menuList) {
            z += `<li ${a.items ? `class=list-${this.listCount++}` : ''}><a ${a.items ? 'class=title' : ''}
            ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += this.generateMenuHTMl(a.items) + `</li>`;
        }
        return z + `</ul>`;
    }
}

let menuTree:typeof menu = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
        ]
        },
        {
            title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
        ],
        },
    ]
    },
    {
        title: 'Рыбы', items: [
        {
            title: 'Аквариумные', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
        ]
        },
        {
            title: 'Форель', items: [
            {title: 'Морская форель'}
        ]
        },
    ]
    }
];
let elem = <HTMLElement>document.querySelector('.menu');
/* tslint:disable */
let menu2 = new Menu1({element: elem, menuList: menuTree});
/* tslint:enable */
document.querySelector('.button-open').addEventListener('click', () => {
    menu2.open.call(menu2, 'list-1');
});
document.querySelector('.button-close').addEventListener('click', () => {
    menu2.close.call(menu2, 'list-1');
});
document.querySelector('.button-toggle').addEventListener('click', () => {
    menu2.toggle.call(menu2, 'list-1');
});

