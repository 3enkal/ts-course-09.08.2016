type menuList = {title: string, items?: menuList}[];
let getType = {}.toString;


function render( data:menuList ): string {
    var res = "<ul>";
    
    for ( let val of data ) {
        if ( val.items && getType.call(val.items) === "[object Array]" )
            res += `<li><a href="#" class="title">${val.title}</a>${render(val.items)}</li>`;
        else
            res += `<li><a href="#">${val.title}</a></li>`;
    }
    res += "</ul>";
    
    return res;
}


let menuData: menuList = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    {
                        title: 'Коровы'
                    },
                    {
                        title: 'Ослы'
                    },
                    {
                        title: 'Собаки'
                    },
                    {
                        title: 'Тигры'
                    }
                ]
            },
            {
                title: 'Другие',
                items: [
                    {
                        title: 'Змеи'
                    },
                    {
                        title: 'Птицы'
                    },
                    {
                        title: 'Ящерицы'
                    }
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
                    {
                        title: 'Гуппи'
                    },
                    {
                        title: 'Скалярии'
                    }
                ]
            },
            {
                title: 'Форель',
                items: [
                    {
                        title: 'Морская форель'
                    }
                ]
            },
        ]
    }
];


var nav = document.getElementsByClassName("menu")[0] as HTMLElement;
nav.innerHTML = render( menuData );

nav
    .addEventListener("click", function(e: MouseEvent) {
        let target = e.target as HTMLElement,
            classList = target.classList;
        if ( classList.contains('title') ) {
            let parentLi = target.parentNode as HTMLElement;
            parentLi.classList.toggle('open-menu');
        }
    });