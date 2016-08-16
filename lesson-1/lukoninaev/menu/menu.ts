type recursiveMenuDataT = {title: string, items?: recursiveMenuDataT}[];

export default class RecursiveMenu {

    menuNode: HTMLElement;

    constructor(menuData:recursiveMenuDataT, menuNode:HTMLElement) {
        this.menuNode = menuNode;

        this.createMenu(menuData);

        this.menuNode.onclick = (event: MouseEvent) => RecursiveMenu.setClickHandler(event);
    }

    generateMenuTemplate(menuData:recursiveMenuDataT): string {
        let template:string = `<ul>`;

        menuData.forEach(item => {
            template += `<li>
                            <a ${!!(item.items) ? 'class="title"' : ''}>${item.title}</a>`;

            if (!!(item.items)) {
                template += this.generateMenuTemplate(item.items);
            } else {
                template += '</li>'
            }
        });

        template += `</ul>`;

        return template;
    }

    createMenu(menuData:recursiveMenuDataT): void {
        this.menuNode.innerHTML = this.generateMenuTemplate(menuData);
    }

    static setClickHandler(event:MouseEvent): void {
        let targetEl = event.target as HTMLElement;

        if (targetEl.classList.contains('title')) {
            let liItem = targetEl.parentNode as HTMLElement;

            liItem.classList.toggle('menu-open');
        }
    }

};