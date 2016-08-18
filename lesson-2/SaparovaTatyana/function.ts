// 1) Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
//    Возвращает true, если все аргументы, кроме первого входят в первый.
//    Первым всегда должен быть массив.

function isInArray (numberArray: (number|string|boolean)[], ...numbers: (number|string|boolean)[]):boolean {
    let result:any[] = [];

    if (numberArray.length !== numbers.length) return false;

    comparison:
    for (let i of numberArray) {
        for (let k of numbers) {
            if(i===k) continue comparison;
        }
        result.push(i);
    }
    return !(result.length > 0);

};
console.log( isInArray([2, 8, "foo", false], false, 'gav', 3, 6) );
console.log( isInArray([2, 8, "foo", false], false, 'foo', 2, 8, 8, true ) );
console.log( isInArray([2, 8, "foo", false], false, 'foo', 8, false ) );
console.log( isInArray([2, 2, "foo", false], false, 'foo', 8, 2 ) );
console.log( isInArray([2, 8, "foo", false], false, 'foo', 2, 8 ) );

// isInArray(a, ...b){
//  if(!b || b.length !== a.length) return false;
 
// for(let i= 0; i<a.lenght; i++)
//    if (a.indexOf(b[i]) === -1) return false;
// }

// return true;
// }




// 2) писать функцию summator(), которая сумирует переданые ей аргументы.
//    Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено

function summator (...elem: number[]):number;
function summator (...elem: string[]):string;
function summator (...elem: (string|number)[]):string {

    let sum = 0;
    for (let el of elem){
       sum = +sum + el;
    }

    return `Summa = ${sum}`;
}

console.log(summator(2, 4, 4, 5, 2));
console.log(summator('2', '4'));
console.log(summator('lesson', '4'));

