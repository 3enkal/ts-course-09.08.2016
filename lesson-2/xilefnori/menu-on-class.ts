type listOfMenu = { title: string, link?: string, items?: listOfMenu }[]
type menuOpt = { menuList: listOfMenu }

class Menu {
    private element: HTMLElement;
    private menuList: listOfMenu;

    constructor(opt: menuOpt) {
        this.menuList = opt.menuList;
    }

    public init(parent: HTMLElement) {
        parent.appendChild(this.getElem());
    }

    public getElem() {
        if (!this.element) {
            this.element           = document.createElement('nav');
            this.element.className = 'menu';

            this.element.innerHTML = this.generateMenuHtml(this.menuList);
            this.element.addEventListener('click', this.clickHandler.bind(this))
        }

        return this.element;
    }

    public open(): void {
        let elements = this.element.querySelectorAll('.title')

        for(let i = 0; i<elements.length; i++) {
            (<HTMLElement>elements.item(i).parentNode).classList.add('menu-open');
        }
    }

    public close(el: HTMLElement): void {
        let elements = this.element.querySelectorAll('.title')

        for(let i = 0; i<elements.length; i++) {
            (<HTMLElement>elements.item(i).parentNode).classList.remove('menu-open');
        }
    }

    public toggle(): void {
        let elements = this.element.querySelectorAll('.title')

        for(let i = 0; i<elements.length; i++) {
            elements.item(i).parentElement.classList.toggle('menu-open');
        }
    }

    private clickHandler(e: MouseEvent): void {
        (<HTMLElement>e.target).parentElement.classList.toggle('menu-open');
    }

    private generateMenuHtml(menuList: listOfMenu): string {
        let z: string = `<ul>`;
        for (let a of menuList) {
            z += `<li><a ${a.items ? 'class=title' : ''} ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
            if (a.items) {
                z += this.generateMenuHtml(a.items);
            }
            z += `</li>`;
        }
        return `${z}</ul>`
    }
}


let listOfMenu: listOfMenu = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
            { title: 'Коровы' },
            { title: 'Ослы' },
            { title: 'Собаки' },
            { title: 'Тигры' }
        ]
        },
        {
            title: 'Другие', items: [
            { title: 'Змеи' },
            { title: 'Птицы' },
            { title: 'Ящерицы' },
        ],
        },
    ]
    },
    {
        title: 'Рыбы', items: [
        {
            title: 'Аквариумные', items: [
            { title: 'Гуппи' },
            { title: 'Скалярии' }
        ]
        },
        {
            title: 'Форель', items: [
            { title: 'Морская форель' }
        ]
        },
    ]
    }
];

let menuNav = new Menu({menuList: listOfMenu });

let buttons = document.createElement('div');
buttons.innerHTML = '\
    <button onclick="menuNav.toggle()">menu.toggle()</button>\
    <button onclick="menuNav.open()">menu.open()</button>\
    <button onclick="menuNav.close()">menu.close()</button>\
';
document.body.appendChild(buttons);

menuNav.init(document.body);

