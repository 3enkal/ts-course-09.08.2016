function summator(...args:Array<number>):number;
function summator(...args:Array<string>):string;
function summator(...args:Array<number|string>): number|string {
	let res;
	if ( typeof args[0] === "string" ) {
		res = "";
		for ( let val of args )
			res = res + val;
	}
	if ( typeof args[0] === "number" ) {
		res = 0;
		for ( let val of args )
			res += val;
	}
	
	return res;
}

alert( summator("Hello ", "World", "!") );
alert( summator(1,2,3,4,5,6,7,8) );