// types:

type menuList = {
    title: string;
    list? : menuList;
}[];

type menuOptions = {
    selector: string;
    menuData: menuList;
    toggle? : boolean
}


// interfaces: