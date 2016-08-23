///<reference path="./4_reverse_text.d.ts" />

function reverseText(text: string): string {
    let words:  string[] = text.split(/[^A-Za-z]/g).filter((item) => (item !== ""));
    let rWords: string[] = words.map((item:string)=>item.split("").reverse().join(""));
    let signs:  string[] = text.split(/[A-Za-z]/g).filter((item) => (item !== ""));
    let len:    number   = 0;
    let rsult:  string[] = [];

    (rWords.length > signs.length) ? len = rWords.length : len = signs.length

    for (let i = 0; i < len; i++) {
        if (/[A-Za-z]/g.test(text[0])) {
            rsult.push(rWords[i]);
            rsult.push(signs[i]);
        } else {
            rsult.push(signs[i]);
            rsult.push(rWords[i]);
        }
    }

    return rsult.join("");
};


console.log("/ reverseText / reverseText / reverseText / reverseText /");

let test = "222s1ta$%root3rt 2doo hel^low"
let first = reverseText(test);
console.log(test);
console.log(first);

console.log("\n");




// try / try / try / try / try / try / try / try / try / try / try / try /
// arr1.reduce((curr, next, i) => [...curr, next, arr2[i]], [])
// try / try / try / try / try / try / try / try / try / try / try / try /