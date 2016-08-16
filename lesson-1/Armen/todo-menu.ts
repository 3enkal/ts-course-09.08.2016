// type menuList = {
//     title:string,
//     items?:{}[]
// }[];

type menuList = {
    title:string,
    items?:menuList
}[];

let menu:menuList = [
    {
        title: 'Frontend',
        items: [
            {
                title: 'JavaScript',
                items: [
                    {
                        title: 'Angular',
                        items: [
                            {title: 'Angular 1', items: [{title: 'SubSumMenu', items: [{title: 'SubSubSubMenu', items: []}]}]},
                            {title: 'Angular 2'}
                        ]
                    }
                ]
            },
            {
                title: 'React'
            }
        ]
    },
    {
        title: 'Backend',
        items: [
            {title: 'Python', items: [{title: 'Django'}]},
            {title: 'Java'}
        ]
    }
];

function generateMenu(menuList:menuList):string {
    let $ul:string = `<ul>`;

    for (let node = 0; node < menuList.length; node ++) {
        $ul += `<li><a class=${menuList[node].items && menuList[node].items.length ? 'title' : ""}>${menuList[node].title}</a>`;

        if (menuList[node].items) {
            let parent = menuList; // ВОПРОС: как правильно определить тут тип? мне все время редактор ошибку выдалавал, пока я не задал any
            $ul += generateMenu(parent[node]['items']);
        }

        // if(!menuList[node].items) continue;
        // $ul += generateMenu(menuList[node].items);
    }

    $ul += `</ul>`;

    return $ul;
}



let navMenuList = document.querySelector('.menu') as HTMLElement;
navMenuList.innerHTML = generateMenu(menu);

navMenuList.onclick = (e: MouseEvent) => {
     let el = e.target as HTMLElement;
     let classList = el.classList;

     if (classList.contains('title')) {
         let parentLi = el.parentNode as HTMLElement;
         parentLi.classList.toggle('menu-open')
     }
};
