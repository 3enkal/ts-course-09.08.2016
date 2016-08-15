type MenuItem = {title: string, items?: MenuList};
type MenuList = MenuItem[];

interface IMenuGenerator {
    init(): this;
    openList(): this;
    closeList(): this;
    getMenu(): string;
    openListItem(): this;
    closeListItem(): this;
    createLink(title: string): this;
    createList(list: MenuList): this;
    handleItem(item: MenuItem): this;
}


class MenuGenerator implements IMenuGenerator {
    str: string;

    init(): this {
        this.str = '';
        return this;
    }

    createList(list: MenuList): this {
        this.openList();

        for (let listItem of list) {
            this.openListItem()
                .createLink(listItem.title)
                .handleItem(listItem)
                .closeListItem();
        }

        this.closeList();
        return this;
    }

    openList(): this {
        this.str += `<ul>`;
        return this;
    }

    closeList(): this {
        this.str += '</ul>';
        return this;
    }

    openListItem(): this {
        this.str += '<li>';
        return this;
    }

    closeListItem(): this {
        this.str += '</li>';
        return this;
    }

    createLink(title: string): this {
        this.str += `<a class="title">${title}</a>`;
        return this;
    }

    handleItem(item: MenuItem): this {
        if (!item.items || !item.items.length)
            return this;

        this.createList(item.items);

        return this;
    }

    getMenu(): string {
        return this.str;
    }

}

let menuList: MenuList = [
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

let menuGenerator: MenuGenerator = new MenuGenerator();

function generateMenu(list: MenuList): string {
    return menuGenerator.init().createList(list).getMenu();
}

let menuEl = document.querySelector('.menu') as HTMLElement;
menuEl.innerHTML = generateMenu(menuList);

menuEl.onclick = (e: MouseEvent)=> {
    let el = e.target as HTMLElement;
    let classList = el.classList;
    if (classList.contains('title')) {
        let parentLi = el.parentNode as HTMLLIElement;
        parentLi.classList.toggle('menu-open');
    }
};
