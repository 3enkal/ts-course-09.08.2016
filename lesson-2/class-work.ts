// function getAverage(a:number,b:number,c:number):string{
//     let total=a+b+c;
//     let average=total/3;
//     return `Result: ${average}`
// }
//
// console.log(getAverage(1,2,5));


// function getAverage(a: number, b: number, c?: number): string {
//     let total = a;
//     let count = 1;
//     total+=b;
//     count++;
//     if(typeof c!=='undefined'){
//         total+=c;
//         count++;
//     }
//     let average = total / count;
//     return `Result: ${average}`
// }
//
// console.log(getAverage(1, 2));


// function getAverage(a: number, b: number, c: number=0): string {
//     let total=a+b+c;
//     let average=total/3;
//     return `Result: ${average}`
// }
// console.log(getAverage(1, 2));

// function getAverage(...a:Array<number|string>): string {
//     let total = 0;
//     let count = 0;
//
//     for (let i = 0; i < a.length; i++) {
//         total += a[i];
//         count++;
//     }
//     let average = total / count;
//     return `Result: ${average}`
// }
// console.log(getAverage(1, 2,4,5,6,7,8,89));

// function getAverage(a: string, b: string, c: string): string;
// function getAverage(a: number, b: number, c: number): string;
//
// function getAverage(a: string|number, b: any, c: any): string {
//     let total = parseInt(<string>a , 10) + parseInt(b, 10) + parseInt(c, 10);
//     let average = total / 3;
//     return `Result: ${average}`
// }

// class Handler {
// }
// class RandomHandler {
// }
// class ReversedHandler {
// }
// class OpenHandler {
// }
//
// function getHandler(a: 'Random'): RandomHandler;
// function getHandler(a: 'Reversed'): ReversedHandler;
// function getHandler(a: 'Open'): OpenHandler;
//
//
// function getHandler(a: string): Handler;
// function getHandler(a: string): Handler {
//     switch (a) {
//         case 'Random':
//             return new RandomHandler();
//         case 'Reversed':
//             return new ReversedHandler();
//         case 'Open':
//             return new OpenHandler();
//         default:
//             return new Handler()
//     }
// }
//
// getHandler('Random'); // instance of RandomHandler
// getHandler('Reversed'); // instance of Handler
// getHandler('asdasdasdasdasdasd'); // instance of Handler

// class Point {
//     public x: number;
//     public y: number;
//
//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
//
//     public sumCoord():number{
//         return this.x+this.y;
//     }

//}


// class FooBase {
//     public x: number;
//     private _y: number;
//     protected _z: number;
// }
//
// let foo = new FooBase();
// foo.x;
//
// class FooChild extends FooBase {
//     constructor() {
//         super();
//         this.x;
//     }
//
// }

// class Something{
//     static instances = 0;
//     constructor(){
//         Something.instances++;
//     }
// }
// let inst1=new Something();
// let inst2=new Something();
// console.log(inst1.instances)
// console.log(Something.instances)

//
// interface C {
//     getC(): string;
// }
// interface D {
//     getB(): string;
// }
//
// class C implements A,B {
//     public getA() {
//         return 'a';
//     }
//
//     public getB() {
//         return 'b';
//     }
// }
// class E{
//
// }
// abstract class A extends E{
//     abstract getA():string;
// }
//
// class B extends A {
//     getA(){
//         return 'a';
//     }
//     getC(){
//         return 'a';
//     }
//     getB(){
//         return 'a';
//     }
// }

// class Account {
//     private _name;
//     get name() {
//         return this._name;
//     }
//
//     set name(newName: string) {
//         this._name = newName;
//     }
// }
//
// let acc= new Account();
// acc.name='Igor';
// console.log(acc.name);