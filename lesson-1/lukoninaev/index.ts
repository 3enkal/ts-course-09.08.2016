import RecursiveMenu from './menu/menu';

// ??? нужно ли здесь при задании переменной указывать тип
// ??? или достаточно, того, что этот тип указан в аргументе функции, куда передается переменная
// type recursiveMenuDataT = {title: string, items?: recursiveMenuDataT}[];
// let menuData:recursiveMenuDataT = ...;

// ??? и здесь же вопрос про импорт типа
// ??? хотелось бы объявить его в module menu для валидации параметра конструктора класса
// ??? и импортировать сюда для валидации данных

let menuData = [
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

// ??? нужно ли здесь при задании переменной указывать тип document.getElementById('menu') as HTMLElement
// ??? или достаточно, того, что этот тип указан в конструкторе класса, куда передается переменная
let menuNode = document.getElementById('menu');

new RecursiveMenu(menuData, menuNode);
