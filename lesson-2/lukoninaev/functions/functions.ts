/**
 * 1)
 */
type simpleType = number|string|boolean;

/**
 * Закомментированный код выдает ошибку
 * TS2322: Type 'number | string | boolean' is not assignable to type 'boolean'.
 * Type 'number' is not assignable to type 'boolean'.
 * Почему?
 */
// function isInArray(array: simpleType[], ...values: simpleType[]): boolean {
//
//     let callbackFn: (prevIsInArray: boolean, value: simpleType) => boolean;
//
//     callbackFn = (prevIsInArray, value) => prevIsInArray && !!(array.indexOf(value) + 1);
//
//     return values.reduce(callbackFn, true);
// };

function isInArray(array: simpleType[], ...values: simpleType[]): boolean {
    for (let i: number = 0; i < values.length; i++) {
        if (!~array.indexOf(values[i])) {
            return false;
        }
    }

    return true;
}


/**
 * 2)
 */
function summator(...args: number[]): number;
function summator(...args: string[]): number;
function summator(...args: Array<number|string>): number {
    //??? Почему ошибка
    return args.reduce<number>((sum: number, arg: number|string) => {
        let argNumber: number = parseInt(arg.toString(), 10);

        if (isNaN(argNumber)) {
            argNumber = 0;
        }

        return sum + argNumber;
    }, 0);
}


/**
 * 3)
 */
function getUnique(...args: simpleType[]): simpleType[] {
    let resultArray: simpleType[] = [];

    for (let i: number = 0; i < args.length; i++) {
        if (!~resultArray.indexOf(args[i])) {
            resultArray.push(args[i]);
        }
    }

    return resultArray;
}


/**
 * 4)
 */
function inversLetters(phrase: string): string {
    let words: string[] = phrase.split(' '),
        resultWords: string[] = [],
        symbols: string[],
        reverseSymbols: string[],
        resultSymbols: string[];

    for (let i: number = 0; i < words.length; i++) {
        symbols = words[i].split('');
        reverseSymbols = words[i].replace(/[^a-zA-Z]/g, '').split('').reverse();
        resultSymbols = new Array(symbols.length);

        for (let j: number = 0, k: number = 0; j < symbols.length; j++) {
            if (!/[a-zA-Z].*/.test(symbols[j])) {
                resultSymbols[j] = symbols[j];
                continue;
            }

            resultSymbols[j] = reverseSymbols[k++];
        }

        resultWords.push(resultSymbols.join(''));
    }

    return resultWords.join(' ');
}

console.log('inversLetters - ', inversLetters('s1tar3t 2 hellow'), '=', 't1rat3s 2 wolleh');
console.log('inversLetters - ', inversLetters('s1ta$%r3t 2 hel^low'), '=', 't1ra$%t3s 2 wol^leh');
console.log('inversLetters - ', inversLetters('s1tar3t 2  low5'), '=', 't1rat3s 2  wol5');