///<reference path="./5_menu.d.ts" />

// Data for creating our navBar:
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


type menuList = {title: string; list ? : menuList;}[];
type menuOptions = {element: HTMLElement; menu: menuList}

class Menu {
    private element: HTMLElement;
    private menu:    menuList;
    static h: string = "javascript:void(0);";

    constructor(opt: menuOptions) {
        this.element = opt.element;
        this.menu    = opt.menu;
        this.element.innerHTML = this.generateHtml(this.menu);
        this.element.addEventListener("click", this.clickHandler);
    }

    private generateHtml(list:menuList):string {
        let menu:string = `<ul>`;
        for (let item of list) {
            menu += `<li><a ${item.list ? "class='toggle'": ""} href=${Menu.h} >${item.title}</a>`;
            if (!item.list) {
                menu += "</li>";
                continue;
            }
            menu += `${this.generateHtml(item.list)} </li>`;
        }
        return `${menu} </ul>`;
    }

    private clickHandler(e:MouseEvent) {
        let elem = e.target as HTMLElement;
        let classList = elem.classList;
        if (classList.contains("toggle")) {
            let parentItem = elem.parentNode as HTMLElement;
            parentItem.classList.toggle("active")
        }
    }
}


// // drop menu in to the DOM.
let asideContainer = document.getElementById("menu_wrapper");
let asideMenu = new Menu({element: asideContainer, menu: navBarData});







