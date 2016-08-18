// 1) Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
//    Возвращает true, если все аргументы, кроме первого входят в первый.
//    Первым всегда должен быть массив.

// TODO: предусмотреть дубли
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
console.log( isInArray([2, 8, "foo", false], false, 'foo', 8, 2 ) );
