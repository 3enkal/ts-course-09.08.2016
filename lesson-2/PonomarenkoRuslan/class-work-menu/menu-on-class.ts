type listOfMenu = {title: string,link?: string,items?: listOfMenu}[]
type menuOpt={element: HTMLElement,menuList: listOfMenu, labelElement: HTMLInputElement}
class Menu {
    private element: HTMLElement;
    private menuList: listOfMenu;
    private labelElement: HTMLInputElement;

    constructor(opt: menuOpt) {
        this.element = opt.element;
        this.labelElement = opt.labelElement;
        this.menuList = opt.menuList;
        this.element.innerHTML = this.generateMenuHtml(this.menuList);
        this.element.addEventListener('click', this.clickHandler)
    }

    public getElem(): HTMLElement {
        return this.element;
    }

    private getLabel(): string {
        return this.labelElement.value;
    }

    private getElementByLabel(label: string): HTMLLIElement {
        return <HTMLLIElement>this.element.querySelector(`li[data-title="${label}"]`);
    }

    public toggle(): void {
        let el = this.getElementByLabel(this.getLabel());
        if (el) {
            el.classList.toggle('menu-open');
        }
    }

    public open(): void {
        let el = this.getElementByLabel(this.getLabel());
        if (el) {
            el.className = 'menu-open';
        }
    }

    public close(): void {
        let el = this.getElementByLabel(this.getLabel());
        if (el) {
            el.className = '';
        }
    }

    private clickHandler(e: MouseEvent): void {
        let el = e.target as HTMLElement;
        let classList = el.classList;
        if (classList.contains('title')) {
            let parentLi = el.parentNode as HTMLElement;
            parentLi.classList.toggle('menu-open');
        }
    }

    private generateMenuHtml(menuList: listOfMenu): string {
        let z: string = `<ul>`
        for (let a of menuList) {
            z += `<li data-title="${a.title}"><a ${a.items ? 'class=title' : ''} ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += `${this.generateMenuHtml(a.items)}</li>`;
        }
        return `${z}</ul>`
    }
}


let listOfMenu: listOfMenu = [
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

let element = document.querySelector('.menu') as HTMLElement;
let labelElement = document.querySelector('#label') as HTMLInputElement;
let menuNav=new Menu({element, menuList: listOfMenu, labelElement});

let toggleBtn = document.querySelector('#toggle') as HTMLButtonElement;
let openBtn = document.querySelector('#open') as HTMLButtonElement;
let closeBtn = document.querySelector('#close') as HTMLButtonElement;

toggleBtn.addEventListener('click', (): void => menuNav.toggle());
openBtn.addEventListener('click', (): void => menuNav.open());
closeBtn.addEventListener('click', (): void => menuNav.close());

