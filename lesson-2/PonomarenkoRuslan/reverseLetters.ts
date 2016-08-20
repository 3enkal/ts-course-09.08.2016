'use strict';

function reverseLetters(sentence: string): string {
    let space: string = ' ';
    let words: string[] = sentence.split(space);

    return words.reduce((prevent: string, current: string): string => prevent + ' ' + reverseWord(current), '');
}

function reverseWord(word: string): string {


    let letters: string[] = word.split('');
    let lettersLength: number = letters.length;
    let reversedWord: string[] = new Array(lettersLength);
    let countNumbersOnTheEnd = getCountNumbersOnTheEnd(word);

    letters.forEach((letter, index) => {
        if (isLetter(letter)) {
            reversedWord[checkPosition(lettersLength - 1 - countNumbersOnTheEnd - index, word)] = letter;
        } else {
            reversedWord[index] = letter;
        }
    });


    return reversedWord.join("");
}

function checkPosition(position: number, word: string) {
    if (position < 1) return 0;
    if (isLetter(word[position])) return position;
    else return checkPosition(--position, word);
}

function getCountNumbersOnTheEnd(word: string): number {
    let match = word.match(/\d+$/g);
    if (!match) return 0;
    return match.length;
}

function isLetter(letter: string): boolean {
    let regexpLetter: RegExp = /\w/;
    let regexpNumber: RegExp = /\d/;
    let regexpUnderscore: RegExp = /_/;

    return regexpLetter.test(letter) && !regexpNumber.test(letter) && !regexpUnderscore.test(letter);
}

console.log('Expect t1rat3s ', reverseLetters('s1tar3t'));
console.log('Expect t1rat3s 2   wol5 ', reverseLetters('s1tar3t 2   low5'));
console.log('Expect wol5 ', reverseLetters('low5'));
console.log('Expect t1ra$%t3s 2 wol^leh ', reverseLetters('s1ta$%r3t 2 hel^low'));
console.log('Expect t1ra$%t3s', reverseLetters('s1ta$%r3t'));
console.log('Expect t1rat3s 2 wolleh ', reverseLetters('s1tar3t 2 hellow'));