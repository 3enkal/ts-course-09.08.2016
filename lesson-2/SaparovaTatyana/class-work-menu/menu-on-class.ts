//  5) Улучшите класс с менюшкой добавив публичные методы
//     getElem -возвращает елемент в котором генерится меню;
//      toggle открыть/закрыть элемент меню по метке;
//      close закрыть элемент меню по метке;
//      open открыть элемент меню по метке

//  в интерфейсе реализуйте кнопками вызов этих методов ( например над меню)
//  P.S. для демонстрации

type listOfMenu = {title: string,link?: string,items?: listOfMenu}[]
type menuOpt={element:HTMLElement,menuList:listOfMenu}



class Menu{
    private element:HTMLElement;
    
    private menuList:listOfMenu;

    private _tmpItem:HTMLElement[] = []; // Массив для кэширования открытых элементов


    constructor(opt:menuOpt) {
        this.element = opt.element;
        this.menuList = opt.menuList;
        this.element.innerHTML = this.generateMenuHtml(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }


    public getElem():HTMLElement {
        return this.element;
    }


    public open():void {
        for (let el of this._tmpItem){
            el.classList.add("menu-open");
        }
    }
    
    
    public close():void {
        let elemArr:any = this.element.querySelectorAll('.menu-open');

        if (elemArr.length === 0){
            return;
        }
        
        this._tmpItem = [];
        
        for (let el of elemArr){
            el.classList.remove("menu-open");
            this._tmpItem.push(el); // кэшируем список открытых менюшек
        }
        
    }


    public toggle():void {
        let elemArr:any = this.element.querySelectorAll('.menu-open');
        
        if (elemArr.length > 0){
            // закрываем
            this.close();
        } else {
            // открываем
            this.open();
        }
    }


    private clickHandler(e:MouseEvent):void {
        let el = e.target as HTMLElement;
        let classList = el.classList;
        if (classList.contains('title')) {
            let parentLi = el.parentNode as HTMLElement;
            parentLi.classList.toggle('menu-open');
        }
    }


    private generateMenuHtml(menuList:listOfMenu):string {
        let z:string = '';

        for (let a of menuList) {
            z += `<li><a ${a.items ? 'class=title' : ''} ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += `${this.generateMenuHtml(a.items)}</li>`;
        }
        return `<ul>${z}</ul>`
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
let menuNav = new Menu({element, menuList:listOfMenu});

document.getElementById('toggle').onclick = () => { menuNav.toggle() };
document.getElementById('open').onclick = () => { menuNav.open() };
document.getElementById('close').onclick = () => { menuNav.close() };

document.getElementById('getElem').onclick = () => { console.log( menuNav.getElem() ) };

