'use strict';

type T = number|string;

function summator(...numbers: T[]): number {
    return <number>numbers.reduce((prev: number, current: T, currIndex: number, arr: T[]): number => {
        if (typeof current === "string") {
            current = parseInt(<string>current, 10);
            return prev + <number>current;
        } else {
            return prev + <number>current;
        }
    }, 0);
}

console.log('Expected (4)', summator(2, "2"));
console.log('Expected (6)', summator(3, "3"));
console.log('Expected (6)', summator(2, "4"));
