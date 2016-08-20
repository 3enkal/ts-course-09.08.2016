/** почему any???? */
function getUnique(...args:any[]):any[] {
	if ( !args.length ) return [];
	let arr = [args[0]];
	for ( let val of args ) {
		if ( !~arr.indexOf(val) )
			arr.push(val);
	}
	return arr;
}

alert( getUnique(1,2,3,3,"Hello", "Mama", 9, "Hello", 1) );