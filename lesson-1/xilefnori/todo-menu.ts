// todo Уже хочется require

/* Types */

type MenuItem = {title: string, items: MenuItem[]};

/* Functions */

function generateList(items: MenuItem[], html: string = '') {
    /**
     * используйте отрицательную логику
     */
    if (items && items.length) {
        /**
         * почему везде не использовать шаблоны
         */
        html +=
            '<ul>' +
                items.reduce((str, item: MenuItem) => str += generateItem(item), '') +
            '</ul>'
        ;
    }

    return html;
}

function generateItem(item: MenuItem) {
    /**
     * почему везде не использовать шаблоны
     */
    return  `<li><a class="${item.items ? 'title' : ''}">` + item.title + '</a>' +
                generateList(item.items) +
            '</li>';
}

/* Data */

let menuList: MenuItem[] = <MenuItem[]>[
    {title: 'TypeScript', items: [
        {title: '1 TypeScript', items: [
            {title: '1.1 TypeScript', items: [
                {title: '1.1.1 TypeScript', items: [
                    {title: '1.1.1.1 TypeScript', items: [
                        {title: '1.1.1.1.1 TypeScript'},
                        {title: '1.1.1.1.1 TypeScript'},
                    ]},
                    {title: '1.1.1.2 TypeScript'},
                ]},
                {title: '1.2.1 TypeScript'},
                {title: '1.2.1 TypeScript'},
                {title: '2.2.1.4 TypeScript'},
            ]},
            {title: '1.2 TypeScript'}
        ]},
        {title: '2 TypeScript', items: [
            {title: '2.2 TypeScript', items: [
                {title: '2.2.1 TypeScript', items: [
                    {title: '2.2.1.1 TypeScript'},
                    {title: '2.2.1.2 TypeScript'},
                    {title: '2.2.1.3 TypeScript', items: [
                        {title: '2.2.1.3.1 TypeScript', items: [
                            {title: '2.2.1.3.1.1 TypeScript'},
                            {title: '2.2.1.3.1.2 TypeScript', items: [
                                {title: '2.2.1.3.1.2.1 TypeScript'},
                                {title: '2.2.1.3.1.2.2 TypeScript'},
                            ]},
                        ]},
                        {title: '2.2.1.3.1 TypeScript'},
                    ]},
                    {title: '2.2.1.4 TypeScript'},
                ]},
                {title: '2.2.2 TypeScript'},
                {title: '2.2.3 TypeScript'},
                {title: '2.2.4 TypeScript'},
            ]},
            {title: '2.2 TypeScript'},
        ]}
    ]},
    {title: 'Dart', items: [
        {title: 'Angular2', items: [
            {title: '2.1 Angular2'},
            {title: '2.2 Angular2', items: [
                {title: '2.2.1 Angular2', items: [
                    {title: '2.2.1.1 Angular2'},
                    {title: '2.2.1.2 Angular2'},
                    {title: '2.2.1.3 Angular2', items: [
                        {title: '2.2.1.3.1 Angular2'},
                        {title: '2.2.1.3.1 Angular2'},
                    ]},
                ]},
                {title: '2.2.2 Angular2'},
            ]}
        ]},
        {title: 'Polymer'}
    ]},
];

/* Action */

let navMenuList = <HTMLElement>document.querySelector('.menu');
navMenuList.innerHTML = generateList(menuList);

navMenuList.onclick = (e: MouseEvent)=> {
    let el = <HTMLElement>e.target;
    let classList = el.classList;
    if (classList.contains('title')) {
        (<HTMLElement>el.parentNode).classList.toggle('menu-open')
    }
};

