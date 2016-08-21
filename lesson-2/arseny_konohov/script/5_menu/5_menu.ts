///<reference path="./5_menu.d.ts" />

let navBarData: menuList = [
    {
        title: "JavaScript",
        list: [
            {title: "ES3"},
            {title: "ES5"},
            {title: "ES5", list: [
                {title: "let"},
                {title: "const"},
                {title: "for of"}
            ]}
        ]
    },
    {
        title: "Angular",
        list: [
            {title: "Angular 1.3"},
            {title: "Angular ^1.5.5", list: [
                {title: "component"},
                {title: "MultiplyTransclude"}
            ]},
            {title: "NG2", list: [
                {title: "@Component", list: [
                    {title: "annotations"},
                    {title: "decorator"}
                ]},
                {title: "TypeScript"},
                {title: "RxJS"}
            ]}
        ]
    }
]


class Menu {
    private element:   HTMLElement;
    private menu:      menuList;
    static  href:      string = "javascript:void(0);";
    static  className: string = "menu"

    constructor(opt: menuOptions) {
        this.element           = opt.selector ? document.getElementById(opt.selector) : document.getElementById("");
        this.menu              = opt.menuData;
        this.element.innerHTML = opt.trigger ?
                `<div class='trigger active'></div>
                <div  class=menu__container>${this._generateHtml(this.menu)}<div>`:
                `${this._generateHtml(this.menu)}`;
        this.element.addEventListener("click", this._clickItemHandler);
        this.element.classList.add(Menu.className);
    }

    private _generateHtml(list:menuList):string {
        let menu:string = `<ul class=menu__list>`;
        for (let item of list) {
            menu += `<li class=menu__item>
                        <a ${item.list ? "class='toggle'": ""} href=${Menu.href} >${item.title}</a>`;
            if (!item.list) {
                menu += "</li>";
                continue;
            }
            menu += `${this._generateHtml(item.list)} </li>`;
        }
        return `${menu} </ul>`;
    }

    private _clickItemHandler(e:MouseEvent) {
        let elem = e.target as HTMLElement;
        let classList = elem.classList;
        if (classList.contains("toggle")) {
            let parentItem = elem.parentNode as HTMLElement;
            parentItem.classList.toggle("active");
        }
        if (classList.contains("trigger")) {
            elem.classList.toggle("active");
        }
    }

    public getElement() {
        return this.element;
    }

    public menuOpen() {
        // code here...
    }

    public menuClose() {
        // code here...
    }
}




let asideMenu = new Menu({
    selector: "menu_wrapper",
    menuData: navBarData,
    trigger: true
});


let rootElem = asideMenu.getElement();
// console.log(asideMenu);
console.log(rootElem);





