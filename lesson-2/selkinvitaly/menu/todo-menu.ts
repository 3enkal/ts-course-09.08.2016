"use strict";

/// <reference path="./todoMenu.d.ts"/>

let fixtures:menuList = [
  {
    title: "Животные", items: [
      {
        title: "Млекопитающие", items: [
          { title: "Коровы" },
          { title: "Ослы" },
          { title: "Собаки" },
          { title: "Тигры" }
        ]
      },
      {
        title: "Другие", items: [
          { title: "Змеи" },
          { title: "Птицы" },
          { title: "Ящерицы" },
        ],
      },
    ]
  }, {
    title: "Рыбы", items: [
      {
        title: "Аквариумные", items: [
          { title: "Гуппи" },
          { title: "Скалярии" }
        ]
      },
      {
        title: "Форель", items: [
          { title: "Морская форель" }
        ]
      },
    ]
  }
];

class Menu implements IMenu {

  protected _passedOpts;
  protected _toggleHandler: (e: MouseEvent) => void;

  state: string;

  protected static _STATE_DESTROYED = "destroyed";
  protected static _STATE_INITIALIZED = "initialized";

  constructor(opts: Object) {
    this._passedOpts = opts;

    this.state = Menu._STATE_DESTROYED;

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

  getContainer(): HTMLElement {
    return this._passedOpts.elems.container;
  }

  init(): void {
    if (this.state === Menu._STATE_INITIALIZED) {
      throw new Error("Menu component: It's already initialized!");
    }

    let container = this._passedOpts.elems.container as HTMLElement;

    container.innerHTML = this._render();
    container.addEventListener("click", this._toggleHandler);
    this.state = Menu._STATE_INITIALIZED;
  }

  toggle(label: string): void {
    if (this.state === Menu._STATE_DESTROYED) {
      throw new Error("Menu component: It isn't yet initialized!");
    }

    let classes = this._passedOpts.classes;
    let foundMenuItem = this._findMenuItemByLabel(label);

    foundMenuItem.classList.toggle(classes.opened);
  }

  open(label: string): void {
    if (this.state === Menu._STATE_DESTROYED) {
      throw new Error("Menu component: It isn't yet initialized!");
    }

    let classes = this._passedOpts.classes;
    let foundMenuItem = this._findMenuItemByLabel(label);

    foundMenuItem.classList.add(classes.opened);
  }

  close(label: string): void {
    if (this.state === Menu._STATE_DESTROYED) {
      throw new Error("Menu component: It isn't yet initialized!");
    }

    let classes = this._passedOpts.classes;
    let foundMenuItem = this._findMenuItemByLabel(label);

    foundMenuItem.classList.remove(classes.opened);
  }

  destroy(): void {
    let container = this._passedOpts.elems.container as HTMLElement;

    container.removeEventListener("click", this._toggleHandler);
    container.innerHTML = "";
    this.state = Menu._STATE_DESTROYED;
  }

  protected _findMenuItemByLabel(label: string): HTMLElement {
    let container = this._passedOpts.elems.container;
    let attrs = this._passedOpts.attrs;

    let linkElem: HTMLElement = container.querySelector(`*[${attrs.label}="${label}"]`);

    return linkElem.parentNode as HTMLElement;
  }

  protected _render(): string {
    let fixtures = this._passedOpts.fixtures;

    return this._createList(fixtures);
  }

  protected _createList(menuList: typeof fixtures): string {
    let classes = this._passedOpts.classes;
    let attrs = this._passedOpts.attrs;

    let template: string = `<ul>`;

    for (let menuItem of menuList) {
      let hasChildList = !!menuItem.items && !!menuItem.items.length;
      let titleClass = hasChildList ? classes.title : "";

      template += `<li>`;
      template += `<a class="${titleClass}" ${attrs.label}="${menuItem.title}">${menuItem.title}</a>`;
      template += hasChildList ? this._createList(menuItem.items as typeof fixtures) : "";
      template += `</li>`;
    }

    template += `</ul>`;

    return template;
  }

}

// =====================================================

let menu: Menu = new Menu({
  elems: {
    container: document.querySelector(".menu")
  },
  classes: {
    opened: "menu-open",
    title: "title"
  },
  attrs: {
    label: "data-menu-label"
  },
  fixtures
});

document.querySelector(".btn__open").addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  try {
    menu.open("Животные");
  } catch (err) {
    alert(err.message);
  }
});

document.querySelector(".btn__close").addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  try {
    menu.close("Животные");
  } catch (err) {
    alert(err.message);
  }
});

document.querySelector(".btn__toggle").addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  try {
    menu.toggle("Животные");
  } catch (err) {
    alert(err.message);
  }
});

document.querySelector(".btn__init").addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  try {
    menu.init();
  } catch (err) {
    alert(err.message);
  }
});

document.querySelector(".btn__destroy").addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  try {
    menu.destroy();
  } catch (err) {
    alert(err.message);
  }
});
