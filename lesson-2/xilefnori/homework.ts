// 1) Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
//  Возвращает true, если все аргументы, кроме первого входят в первый.
//  Первым всегда должен быть массив.

let VAL = ''; // for logging

function isInArray(arr: any[], ...items: any[]) {
    for (let i of items) {
        if (~arr.indexOf(i) == 0) {
            return false
        }
    }

    return true;
}

var arr = [1, 2, 3, 4, 5];

console.log('isInArray');
console.log(true === isInArray(arr, 1, 2, 3), 'value: ' + isInArray(arr, 1, 2, 3));
console.log(false === isInArray(arr, 1, 2, 8), 'value: ' + isInArray(arr, 1, 2, 8));
console.log(false === isInArray(arr, 1, 2, '8'), 'value: ' + isInArray(arr, 1, 2, '8'));

type StrNum = (string|number);

// 2) писать функцию summator(), которая сумирует переданые ей аргументы.
//  Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено

function summator(...args: StrNum[]) {
    return args.reduce((prev: number, cur: string|number) => prev += +cur);
}

console.log('summator');
console.log(summator(1, 2, 3, '4', '5') === 15, 'value: ' + summator(1, 2, 3, '4', '5'));

// 3) Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
//  и возвращает массив уникальных элементов. Аргумент не должен изменяться.
//  Порядок элементов результирующего массива должен совпадать с порядком,
//  в котором они встречаются в оригинальной структуре.
//  Специально обрабатывать значение NaN не обязательно.


function getUnique(...args: StrNum[]) {
    let map = {};

    args.map(i => map[i] = i);

    let unique: StrNum[] = [];
    for (let i in map) {
        unique.push(map[i]);
    }

    return unique;
}

function arraysEqual(a: StrNum[], b: StrNum[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sortPhotos both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

console.log('getUnique');
let unique = getUnique(1, '2', 1, '2', 3, 3);
console.log(arraysEqual([1, '2', 3], unique), unique);


// 4) Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
// цифры и специальные символы должны остаться на месте
// s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
// s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
// s1tar3t 2   low5  ->  t1rat3s 2   wol5

function reverseNonSpecialSentence(sentence: string) {
    if(!sentence.trim().length) {
        return sentence;
    }

    let reversed_sentence = '';
    let index             = 0;
    let match;

    while (match = sentence.substr(index).match(/(\s*)(\S+)(\s*)/)) {
        index += match[0].length;

        let reversed_word = reverseNonSpecialWord(match[2])
        reversed_sentence += match[1] + reversed_word + match[3];

        // console.log(index, reversed_sentence);
    }

    return reversed_sentence;
}

function reverseNonSpecialWord(word: string) {
    let reversed = '';

    let forward  = 0;
    let backward = word.length - 1;

    while (reversed.length < word.length) {
        let forwardSymbol  = word.charAt(forward);
        let backwardSymbol = word.charAt(backward);

        let forwardIsLetter  = forwardSymbol.match(/[a-z]/i);
        let backwardIsLetter = backwardSymbol.match(/[a-z]/i);

        if (!forwardIsLetter) {
            reversed += forwardSymbol;
            forward++;
        } else if (!backwardIsLetter) {
            backward--;
        } else { // forwardIsLetter && backwardIsLetter
            reversed += backwardSymbol;
            forward++;
            backward--;
        }
    }

    return reversed;
}

console.log('reverseNonSpecialSentence');

// console.log(reverseNonSpecialWord('hel^low') == 'wol^leh');
// console.log(reverseNonSpecialWord('s1tar3t') == 't1rat3s');
// console.log(reverseNonSpecialWord('s1ta$%r3t') == 't1ra$%t3s');

console.log((VAL = reverseNonSpecialSentence('s1tar3t 2 hellow')    ) == 't1rat3s 2 wolleh', VAL);
console.log((VAL = reverseNonSpecialSentence('s1ta$%r3t 2 hel^low') ) == 't1ra$%t3s 2 wol^leh', VAL);
console.log((VAL = reverseNonSpecialSentence('s1tar3t 2   low5')    ) == 't1rat3s 2   wol5', VAL);
console.log((VAL = reverseNonSpecialSentence('                ')    ) == '                ', VAL);

// 5) Улучшите класс с менюшкой добавив публичные методы
//  getElem -возвращает елемент в котором генерится меню;
//  toggle открыть/закрыть элемент меню по метке;
//  close закрыть элемент меню по метке;
//  open открыть элемент меню по метке
//
//  в интерфейсе реализуйте кнопками вызов этих методов ( например над меню)
//  P.S. для демонстрации

/* TODO Сделать на выходных */

// 6) Реализуйте слайдер
// http://learn.javascript.ru/task/slider

/* TODO Сделать на выходных */
