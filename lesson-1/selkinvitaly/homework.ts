"use strict";

import fixtures from "./fixtures";

interface IMenu {
  render(): string;
  init(): void;
  destroy(): void;
}

class Menu implements IMenu {

  protected _passedOpts;
  protected _toggleHandler: (e: MouseEvent) => void;

  constructor(opts: Object) {
    this._passedOpts = opts;

    this._toggleHandler = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      let classes = this._passedOpts.classes;

      if (!target.classList.contains(classes.title)) {
        return;
      }

      let parentLi = target.parentNode as HTMLElement;

      parentLi.classList.toggle(classes.opened);
    };
  }

  render(): string {
    let fixtures = this._passedOpts.fixtures;

    return this._createList(fixtures);
  }

  init(): void {
    let container = this._passedOpts.elems.container as HTMLElement;

    container.innerHTML = this.render();
    container.addEventListener("click", this._toggleHandler);
  }

  destroy(): void {
    let container = this._passedOpts.elems.container as HTMLElement;

    container.removeEventListener("click", this._toggleHandler);
    container.innerHTML = "";
  }

  protected _createList(menuList: menuList): string {
    let classes = this._passedOpts.classes;

    let template = `<ul>`;

    for (let menuItem of menuList) {
      let hasChildList = !!menuItem.items && !!menuItem.items.length;
      let titleClass = hasChildList ? classes.title : "";

      template += `<li>`;
      template += `<a class="${titleClass}">${menuItem.title}</a>`;

      // Дочерний список. Почему assertion не хочет работать?
      template += hasChildList ? this._createList(menuItem.items as menuList) : "";

      template += `</li>`;
    }

    template += `</ul>`;

    return template;
  }

}

let menu: Menu = new Menu({
  elems: {
    container: document.querySelector(".menu")
  },
  classes: {
    opened: "menu-open",
    title: "title"
  },
  fixtures
});

menu.init();
