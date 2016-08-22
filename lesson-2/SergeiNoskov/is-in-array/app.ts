/**
 * Created by user on 18.08.2016.
 */

function isInArray(arrEvery:string[],...a: string[]):boolean{
    const arrTest = a;
    let result:boolean = true;
    arrTest.forEach(function(item){
        console.log(item);
        if(arrEvery.indexOf(item) < 0) {
            result = false;
        }

    });
    return result;
}

let result = isInArray(['a','b'],'b');
//console.log(result);

function unrolling(str:string):string{
    let result:string ='';

    let out = [];
    const ws = str.split(' ');
    ws.forEach(function(word) {
        let arr = [];
        for (let i = 0; i < word.length; i++) {
            if (word[i].charCodeAt(0) > 30 && word[i].charCodeAt(0) < 65) continue;
            arr.unshift(word[i]);
        }

        for (let i = 0; i < word.length; i++) {
            if (word[i].charCodeAt(0) > 30 && word[i].charCodeAt(0) < 65) {
                out.push(word[i]);
            } else {
                out.push(arr.shift());
            }
        }
        out.push(' ');
    })


    result = out.join('');
    return result;
}

let out = unrolling('s1tar3t 2 hellow');
console.log(out);