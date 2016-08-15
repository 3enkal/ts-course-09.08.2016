type menuList = {title: string, items?: menuList}[];
let getType = {}.toString;

export default 
function render( data:menuList ): string {
    var res = "<ul>";
    
    for ( let val of data ) {
        if ( val.items && getType.call(val.items) === "[object Array]" ) {
            res += `<li><a href="#" class="title">${val.title}</a>${render(val.items)}</li>`;
            
        } else {
            res += `<li><a href="#">${val.title}</a></li>`;
        }
    }
    res += "</ul>";
    
    return res;
}