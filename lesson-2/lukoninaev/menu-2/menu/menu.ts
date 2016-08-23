"use strict";

/// <reference path="./menuTypes.d.ts"/>

export default class RecursiveMenu implements IRecursiveMenu {

    private menuRootElement: HTMLElement;
    private classes: recursiveMenuClasses = {
        defaultClassName: 'title',
        openClassName: 'menu-open'
    };
    private buttonsTemplate: string;

    constructor(options: IRecursiveMenuOpt) {
        this.menuRootElement = options.menuRootElement;
        this.buttonsTemplate = this.generateButtonsTemplate(options.buttons);

        this.classes.defaultClassName = (options.classes && options.classes.defaultClassName) || this.classes.defaultClassName;
        this.classes.openClassName = (options.classes && options.classes.openClassName) || this.classes.openClassName;

        this.menuRootElement.innerHTML = this.generateMenuTemplate(options.menuData);

        this.menuRootElement.addEventListener('click', (event: MouseEvent) => this.setClickHandler(event))
    }

    private generateButtonsTemplate(buttons: buttonsT): string {
        if (!buttons) {
            return '';
        }

        let template: string = '';

        for (let i: number = 0; i < buttons.length; i++) {
            template += `<button class="${buttons[i].className}">${buttons[i].title}</button>`;
        }

        return template;
    }

    private generateMenuTemplate(menuData: recursiveMenuDataT): string {
        let template:string = `<ul>`;

        menuData.forEach(item => {
            template += `<li>
                            <a ${!!(item.items) ? 'class="' + this.classes.defaultClassName + '"' : ''}>${item.title}</a>
                            ${item.hasOwnProperty('items') ? 
                                this.buttonsTemplate + this.generateMenuTemplate(item.items) : 
                        '</li>'}`;
        });

        template += `</ul>`;

        return template;
    }

    private setClickHandler(event: MouseEvent): void {
        let targetEl = event.target as HTMLElement;

        if (targetEl.classList.contains(this.classes.defaultClassName)) {
            let liItem = targetEl.parentNode as HTMLElement;

            liItem.classList.toggle(this.classes.openClassName);
        }
    }

    public getRootElement(): HTMLElement {
        return this.menuRootElement;
    }

    public toggle(event: MouseEvent): void {
        let targetEl = event.target as HTMLElement,
            liItem = targetEl.parentNode as HTMLElement;

        event.stopPropagation();

        liItem.classList.toggle(this.classes.openClassName);
    }

    public close(event: MouseEvent): void {
        let targetEl = event.target as HTMLElement,
            liItem = targetEl.parentNode as HTMLElement;

        event.stopPropagation();

        if (liItem.classList.contains(this.classes.openClassName)) {
            liItem.classList.remove(this.classes.openClassName);
        }
    }

    public open(event: MouseEvent): void {
        let targetEl = event.target as HTMLElement,
            liItem = targetEl.parentNode as HTMLElement;

        event.stopPropagation();

        if (!liItem.classList.contains(this.classes.openClassName)) {
            liItem.classList.add(this.classes.openClassName);
        }
    }
};