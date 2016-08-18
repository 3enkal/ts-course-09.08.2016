// 1) Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
//    Возвращает true, если все аргументы, кроме первого входят в первый.
//    Первым всегда должен быть массив.

type freeType = number|string|boolean;
function isInArray (arr: freeType[], ...num: freeType[]):boolean {
    let result:any[] = [];

    if (!arr || arr.length !== num.length) return false;

    comparison:
    for (let i of arr) {
        for (let k of num) {
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




// 2) писать функцию summator(), которая сумирует переданые ей аргументы.
//    Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено


function summator (...elem: number[]):number;
function summator (...elem: string[]):string;
function summator (...elem: (string|number)[]):number|string {
    let sum = (typeof elem[0] === "number") ? null : '';
    for (let el of elem){
       sum = sum + el;
    }
    return sum;
}

console.log(summator(2, 4, 4, 5, 2));
console.log(summator('2', '4'));
console.log(summator('lesson', '4', '3'));



// 3)
//   Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
//   и возвращает массив уникальных элементов. Аргумент не должен изменяться.
//   Порядок элементов результирующего массива должен совпадать с порядком,
//   в котором они встречаются в оригинальной структуре.
//   Специально обрабатывать значение NaN не обязательно.

function getUnique(...arg:any[]):any[]{

    return arg.filter(function(el, index, array) {
      return array.indexOf(el) === index;
    });

};

console.log( getUnique('tt', 5, 5, 'hrum', false, 'hrum') );



// 4)
//    Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
//    цифры и специальные символы должны остаться на месте
//       s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
//       s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
//       s1tar3t 2   low5  ->  t1rat3s 2   wol5

function spread(str:string):string {
    let strArr:string[] = str.split(' '); // разбираем фразу на слова

    // перебираем каждое слово побуквенно
    let strArrBack = strArr.map(function(word:string):string {
        let arrBack:any[] = word.split("").reverse(); // массив наизнанку
        let strBackExc:any[]; // массив наизнанку без цифр и специальных символов
        let objExc:any = {}; // цифры и специальные символы в объекте

        // собмраем объект из цифр и специальных символов
        word.replace(/[^A-Za-zА-Яа-яЁё]/g, function(str: string, offset: number):any{
            objExc[offset] = str;
            return objExc;
        });
 
        // собираем в строку и выкидываем цифры и специальные символы, потом опять разбиваем на массив
        strBackExc = arrBack.join("").replace(/[^A-Za-zА-Яа-яЁё]/g, "").split("");

        // перебираем объект и урезанную строку вставляем на нужную позицию цифры и спец.символы
        for (let key in objExc) {
          strBackExc.splice(+key, 0, objExc[key]);
        }

        // собираем слово возвращаем
        return strBackExc.join("");
    });
    // собираем фразу возвращаем
    return strArrBack.join(' ');
}
console.log( spread('s1tar3t 2 hellow') + ' => t1rat3s 2 wolleh' );
console.log( spread('s1ta$%r3t 2 hel^low') + ' => t1ra$%t3s 2 wol^leh');
console.log( spread('s1tar3t 2   low5') + ' => t1rat3s 2   wol5');