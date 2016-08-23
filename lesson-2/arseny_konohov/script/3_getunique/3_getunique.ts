///<reference path="./3_getunique.d.ts" />


function getUnic < GEN extends gunic > (...list: GEN[]): GEN[] {
    let result: GEN[] = [];
    for (let item of list) {
        if (result.indexOf(item) === -1) {
            result.push(item)
        }
    }
    return result;
};


console.log("/ getUnic / getUnic / getUnic / getUnic / getUnic /");

console.log(getUnic <(number|string|boolean)> (1, "3", 12, 1, false, true, 1, 4, 3, "2", "lsdf", false, "3", 12, 1, false, true, 1, 1, false, true, 1));

console.log("\n");