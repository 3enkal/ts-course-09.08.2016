type listOfMenu = {title: string,link?: string,items?: listOfMenu}[]
type menuOpt={element: HTMLElement,menuList: listOfMenu}

class Menu {
    private element: HTMLElement;
    private menuList: listOfMenu;

    constructor(opt: menuOpt) {
        this.element = opt.element;
        this.menuList = opt.menuList;
        this.element.innerHTML = this.generateMenuHtml(this.menuList);
        this.element.addEventListener('click', this.clickHandler)
    }

    public get getElem (): HTMLElement {
        return this.element;
    }

    public toggle(): void {
        let titleElems = this.getElem.getElementsByClassName("menu-open") as NodeListOf<HTMLElement>;
		
		if ( titleElems.length ) {
			this.close();
		} else {
			this.open();
		}
    }
    public close(): void {
		let titleElems = this.getElem.getElementsByClassName("menu-open") as NodeListOf<HTMLElement>;
		
		for ( let i = titleElems.length; i--; ) {
			titleElems[i].classList.toggle('menu-open');
		}
	}
    public open(): void {
		let titleElems = this.getElem.getElementsByClassName("title") as NodeListOf<HTMLElement>;
		
		for ( let i = titleElems.length; i--; ) {
			let parent = titleElems[i].parentNode as HTMLElement;
			if ( ~parent.className.search(/\bmenu-open\b/) ) continue;
			parent.className += " menu-open"
		}
	}

    private clickHandler(e: MouseEvent): void {
        let el = e.target as HTMLElement;
        let classList = el.classList;
		let parentLi = el.parentNode as HTMLElement;
		
        if (classList.contains('title')) {
            parentLi.classList.toggle('menu-open');
        }
		
		let nestedLists = parentLi.getElementsByClassName("menu-open") as NodeListOf<HTMLElement>;
		
		for ( let i = nestedLists.length; i--; ) {
			nestedLists[i].classList.toggle('menu-open');
		}
    }

    private generateMenuHtml(menuList: listOfMenu): string {
        let z: string = `<ul>`
        for (let a of menuList) {
            z += `<li><a ${a.items ? 'class=title' : ''} ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
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
let menuNav = new Menu({element, menuList: listOfMenu});

