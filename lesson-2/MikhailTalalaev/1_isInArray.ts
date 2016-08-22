/** показывали этот случай с rest параметром*/
function isInArray(arr:[String|Number], ...args:(String|Number)[]):boolean {
	arr.sort();
	args.sort();
	
	for ( let i:number = arr.length; i--; ) {
		if ( arr[i] === arr[i - 1] ) 
			arr.splice(i, 1);
	}
	for ( let i:number = args.length; i--; ) {
		if ( args[i] === args[i - 1] )
			args.splice(i, 1);
	}
	
	let res = true,
		arrLength:number = arr.length,
		argsCount:number = args.length,
		overlapCount:number = 0;
		
	if ( arrLength !== argsCount ) return false;
		
	for ( let i:number = arrLength; i--; ) {
		if ( arr[i] !== args[i] ) return false; 
	}
	
	return true;
}

alert( isInArray([1,2,3,1], 1,1,1,1,2,3) );