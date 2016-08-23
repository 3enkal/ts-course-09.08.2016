import RecursiveMenu from './menu/menu';

let menuData: recursiveMenuDataT = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    {title: 'Коровы'},
                    {title: 'Ослы'},
                    {title: 'Собаки'},
                    {title: 'Тигры'}
                ]
            }, {
                title: 'Другие',
                items: [
                    {title: 'Змеи'},
                    {title: 'Птицы'},
                    {title: 'Ящерицы'},
                ],
            }
        ]
    },
    {
        title: 'Рыбы',
        items: [
            {
                title: 'Аквариумные',
                items: [
                    {title: 'Гуппи'},
                    {title: 'Скалярии'}
                ]
            },
            {
                title: 'Форель',
                items: [
                    {title: 'Морская форель'}
                ]
            }
        ]
    }
];

let menuNode: HTMLElement = document.getElementById('menu') as HTMLElement;

let menu: RecursiveMenu = new RecursiveMenu({
        menuData: menuData,
        menuRootElement: menuNode,
        classes: {
            defaultClassName: 'title',
            openClassName: 'menu-open'
        },
        buttons: [{
            title: 'Toggle',
            className: 'toggle'
        }, {
            title: 'Open',
            className: 'open'
        }, {
            title: 'Close',
            className: 'close'
        }]
    }),
    toggleBtns: NodeList = menu.getRootElement().querySelectorAll('.toggle'),
    openBtns: NodeList = menu.getRootElement().querySelectorAll('.open'),
    closeBtns: NodeList = menu.getRootElement().querySelectorAll('.close');

function setOnclickForCollection(collection: NodeList, cb: (event: MouseEvent) => void): void {
    for (let i: number = 0; i < collection.length; i++) {
        collection[i].addEventListener('click', cb);
    }
}

setOnclickForCollection(toggleBtns, (event: MouseEvent) => menu.toggle(event));
setOnclickForCollection(openBtns, (event: MouseEvent) => menu.open(event));
setOnclickForCollection(closeBtns, (event: MouseEvent) => menu.close(event));