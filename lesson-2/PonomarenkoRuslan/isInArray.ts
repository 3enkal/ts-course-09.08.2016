'use strict';



type Types = number|string|boolean;
type Arr = Types[];

function isInArray(a: Arr, ...b: Array<Types>): boolean {
    for (let i = 0; i < b.length; i++) {
        if (a.indexOf(b[i]) === -1) {
            return false;
        }
    }

    return true;
}

let arrExample = [1, 2, 3, 4, 5, true, 'Ruslan', 'OOP'];

console.log('One (expected true)', isInArray(arrExample, 1, 5));
console.log('Two (expected true)', isInArray(arrExample, 'Ruslan'));
console.log('Three (expected false)', isInArray(arrExample, 'ruslan'));
console.log('Four (expected false)', isInArray(arrExample, false));
console.log('Five (expected false)', isInArray(arrExample, 6));
console.log('Six (expected false)', isInArray(arrExample, 6, 'OOP'));
