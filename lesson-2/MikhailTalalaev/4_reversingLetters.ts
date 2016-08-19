function reversingLetters(str: string): string {
	let arr:string[] = str.split(" "),
		i:number,
		j:number;
	
	for ( let i = 0, length = arr.length; i < length; i++ ) {
		arr[i] = revers(arr[i]);
	}
	
	function revers(str: string): string {
		let res = Array(str.length),
			j:number = str.length;
		
		for ( let i = 0, length = str.length; i < length; i++ ) {
			if ( !isLetter(str[i]) ) {
				res[i] = str[i];
				continue;
			}
			for ( ; j--; ) {
				if ( !isLetter(str[j]) ) {
					res[j] = str[j];
					continue;
				}
				res[i] = str[j];
				res[j] = str[i];
				break;
			}
		}
		
		return res.join("");
	}
	
	function isLetter(n):boolean {
		return !!~n.search(/[A-Za-z]/);
	}
	
    return arr.join(" ");
}

alert( reversingLetters("s1tar3t 2 hellow") === "t1rat3s 2 wolleh" );
alert( reversingLetters("s1ta$%r3t 2 hel^low") === "t1ra$%t3s 2 wol^leh");
alert( reversingLetters("s1tar3t 2 low5") === "t1rat3s 2 wol5");