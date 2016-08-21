// types:

type menuList = {
    title: string;
    list? : menuList;
}[];

type menuOptions = {
    selector: string;
    menuData: menuList;
    trigger? : boolean
}


// interfaces: