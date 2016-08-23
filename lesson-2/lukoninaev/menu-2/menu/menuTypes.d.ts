type recursiveMenuDataT = {title: string, items?: recursiveMenuDataT}[];
type buttonsT = {title: string, className: string}[];
type recursiveMenuClasses = {defaultClassName: string, openClassName: string};

interface IRecursiveMenu {
    getRootElement: () => HTMLElement;
    toggle: (event: MouseEvent) => void;
    close: (event: MouseEvent) => void;
    open: (event: MouseEvent) => void;
}

interface IRecursiveMenuOpt {
    menuData: recursiveMenuDataT;
    menuRootElement: HTMLElement;
    classes: recursiveMenuClasses;
    buttons: buttonsT;
}