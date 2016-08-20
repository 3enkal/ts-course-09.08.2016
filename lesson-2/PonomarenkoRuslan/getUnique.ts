'use strict';

function getUnique(...args: any[]): any[] {
    let arr = [];

    args.forEach(arg => {
        if (arr.indexOf(arg) !== -1) return;

        arr.push(arg);
    });

    return arr;
}

console.log('Expect [1, 2, 3]', getUnique(1, 1, 2, 3));
console.log('Expect [1, 2, 3]', getUnique(1, 2, 3));
console.log('Expect [1, 2, "3"]', getUnique(1, 2, "3"));
console.log('Expect [1, 2, "3"]', getUnique(1, 2, "3", "3"));
console.log('Expect [1, 2, ["3"], ["3"]]', getUnique(1, 2, ["3"], ["3"]));
