// define type:
type menuList = {title: string;list ? : menuList;}[];

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


// create menu:
function menuBuilder(list:menuList):string {
    let menu:string = `<ul>`;
    for (let item of list) {
        menu += `<li><a href="javascript:void(0);">${item.title}</a></li>`;
        if (item.list) {
            menu += menuBuilder(item.list);
        }
    }
    menu += "</ul>"
    return menu;
}



// drop menu in to the DOM.
let nav = document.getElementById("menu_wrapper");
nav.innerHTML = menuBuilder(navBarData);





