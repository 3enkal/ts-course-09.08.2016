type menuList={title: string,items: string[]}[];
let menuList: menuList = [
    {title: 'JavaScript', items: ['Ember', 'Angular2']},
    {title: 'Dart', items: ['Angular2', 'Polymer']},
];


function generateMenu(list: menuList): string {
    let z: string = `<ul>`;
    for (let a of list) {
        z += `<li><a class="title">${a.title}</a>`;
        z += `<ul>`;
        for (let item of a.items) {
            z += `<li><a>${item}</a></li>`
        }
        z += `</li></ul>`
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
        parentLi.classList.toggle('menu-open')
    }
};