///<reference path="./1_isinarray.d.ts" />

function isInArray<GEN extends t>(first:GEN[], ...list:GEN[]):boolean {
    for (let el of list) {
        if (first.indexOf(el) === -1) {
            return false;
        }
    }
    return true;
}
console.log("\n/ isInArray / isInArray / isInArray / isInArray /")

console.log(isInArray<number|string>([1, "sdfa", 43], 1, "43"));

console.log("\n")