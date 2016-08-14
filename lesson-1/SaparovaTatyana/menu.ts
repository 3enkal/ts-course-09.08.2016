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

// <ul>
//   <li>
//     <a href="javascript://">title</a>

//     <ul>
//       <li>
//         <a href="javascript://">title</a>
//       </li>
//       <li>
//         <a href="javascript://">title</a>
//       </li>
//     </ul>

//   </li>
// </ul>

// menu = [
//     {
//         title: 'Животные', items: [
//         {  
//             title: 'Млекопитающие', items: [
//               {title: 'Коровы'},
//               {title: 'Ослы'},
//               {title: 'Собаки'},
//               {title: 'Тигры'}
//             ]
//         },
//         {
//             title: 'Другие', items: [
//               {title: 'Змеи'},
//               {title: 'Птицы'},
//               {title: 'Ящерицы'},
//             ],
//         },
//       ]
//     },
//     {
//         title: 'Рыбы', items: [
//           {
//               title: 'Аквариумные', items: [
//                 {title: 'Гуппи'},
//                 {title: 'Скалярии'}
//               ]
//           },
//           {
//               title: 'Форель', items: [
//                 {title: 'Морская форель'}
//               ]
//           },
//       ]
//     }
// ]

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