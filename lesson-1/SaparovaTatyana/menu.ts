type menuList={title: string, items?: menuList}[];

let menuList: menuList = [
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

function generateMenu(list: menuList): string {
    let z: string = `<ul>`;
    for (let a of list) {
        z += `<li ${ a.items ? 'class="up"'  : '' }><a class="title">${a.title}</a>`;

        if (a.items){
            z += generateMenu(a.items);
        }
    }
    z += `</ul>`;
    return z;
}



let navMenuList = document.querySelector('.menu') as HTMLElement;
navMenuList.innerHTML = generateMenu(menuList);

navMenuList.onclick = (e: MouseEvent)=> {
    let el = e.target as HTMLElement;
    let classList = el.classList;
    if (classList.contains('title')) {
        let parentLi = el.parentNode as HTMLElement;
        if(el.nextSibling){
            parentLi.classList.toggle('menu-open');
        }
    }
};