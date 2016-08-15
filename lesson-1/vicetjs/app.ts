/*
* Подумал, что есть смысл писать в наименовании кастомного типа, что это тип, т.к. для переменных типом может быть и целый класс.
* А тут сразу видно, что тип создан через ключевое слово type
* */
type menuItemType = {title: string; items?: menuListType};
type menuListType = menuItemType[];

let menu: menuListType = [
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
            },
            {
                title: 'Другие',
                items: [
                    {title: 'Змеи'},
                    {title: 'Птицы'},
                    {title: 'Ящерицы'},
                ]
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
    },
    {
        title: '1',
        items: [
            {
                title: '1.1',
                items: [
                    {
                        title: '1.1.1',
                        items: [
                            {
                                title: '1.1.1.1'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

function createMenuList(menuList: menuListType) : string {
    if ( !menuList ) return '';

    var html: string = '<div class="menu-list">';

    menuList.forEach(function(menuItem: menuItemType) : void {
        html += '<div class="menu-item">';
        html += `<span class="title">${ menuItem.title }</span>`;
        html += createMenuList(menuItem.items);
        html += '</div>';
    });

    html += '</div>';

    return html;
}

function init() : void {
    let menuElement: HTMLElement = document.querySelector('#menu') as HTMLElement;
    menuElement.innerHTML = createMenuList(menu);

    menuElement.addEventListener('click', function(event: Event) : void {
        var target: HTMLElement = event.target as HTMLElement;

        if ( !target.classList.contains('title') ) return;

        // Не смог избавиться от ошибки, якобы у хтмл элемента нет такого метода
        target.closest('.menu-item').classList.toggle('open');
    })
}

init();
