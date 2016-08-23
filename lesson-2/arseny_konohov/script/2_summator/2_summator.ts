///<reference path="./2_summator.d.ts" />



function sumator(...list: number[]): string;
function sumator(...list: string[]): string;
function sumator(...list: (string | number)[]): string;
function sumator(...list: any[]): string {
    let total = 0;
    for (let item of list) {
        total += parseInt(item, 10);
    }
    return `summ: ${total}`;
};

console.log("/ Sumator / Sumator / Sumator / Sumator / Sumator /");

console.log(sumator(1, "3", 12));

console.log("\n")