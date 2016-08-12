// for(let i=0;i<3;i++){
//     setTimeout(function(){
//         console.log(i);
//     },0)
// }
// const a:{readonly a:number,readonly b:number}={a:1,b:2};


//let a=2**2;
//
// enum Size{
//     S,
//     M,
//     L=50,
//     XL=52,
//     XLL=54
// }
//
// console.log(Size['S']);
// console.log(Size[52]);


// let myName: any = 'Igor';
// myName = {a:1};
// myName = true;

// let noVar:void;
//
// function a():void{
//    console.log('Hi')
// }
//
// let foo={id:1,name:'Igor'};
//
//
// let bar:typeof foo;

//
// interface IA{
//
// }
//
// let bar1 = IA;

// let arr:{name?:string,id:number};
//
// arr={name:'Igor'};
// interface IAccount{
//
// }
// let accounts:IAccount[];

// let  account:[string,number];
//
// account = ["sdsdasd",4,'asdasd',2332,333,33];
//
// let acc:{name:string,id:number}[][];
//
//  let calc: (a:number,b:number)=>number;
//
//
// calc = function (a,b) {
//     return a+b;
// }

// interface IAccount{
//     getName():this;
//     getSurname:()=>this;
// }
// let foo:IAccount;
//type g ={x:g}

// type account = {name:string,id:number};
// let acc:account;


// let account = {name:'Igor',id:1};
// let acc: typeof account;

// interface AnimationOpt{
//     delayX:number;
//     delayY:number;
//     easing:'ease-out'|'ease-in'
// }
//
// let animation:AnimationOpt={
//     delayX:100,
//     delayY:200,
//     easing:'ease-in'
// }

// interface Mover {
//     move(): void;
//     getStatus: ()=>{speed: number};
// }
//
// interface Shaker {
//     move(): void;
//     getStatus: ()=>{frequency: number};
// }
//
// interface MoveShake extends Mover,Shaker {
//     getStatus: ()=>{speed: number,frequency: number};
// }


// interface IA{
//     readonly a:number;
// }

// interface IBase{
//     id:number;
// };
// let base1:IBase={id:1,name:'Igor',isFemale:true};
//
// interface IBase{
//     name:string;
// }
// let base2:IBase={id:1,name:'Igor',isFemale:true};
//
// interface IBase{
//     isFemale:boolean;
// }
// let base3:IBase={id:1,name:'Igor',isFemale:true};

// function reverse<T>(list:T[]):T[]{
//     return list;
// }
//
// reverse<number>([1,3,4,5]);
// reverse<boolean>([true,false]);

// interface IRepo<T,TId>{
//     getById(id:TId):T;
// }

// interface A <T extends {id:number,name:string}>{
//     someProp:T;
// }
//
// let b:A<{id:number,isFemale:true}>;
// let c:A<{id:number,name:string,isFemale:boolean}>;

// interface A {
//     a:string;
//     b:string;
// }
// interface B{
//     a:number;
//     b:number;
//     c:number;
// }
//
// let x:A|B;
// let a=x.a;
// let b=x.b;
// let c=x.c;

// interface A {
//     a:number;
// }
//
//
// interface B {
//     b:number;
// }
//
// let ab:A&B={a:1,b:1};

// function n(a) {
//     if (a) {
//         interface I {
//             x: number;
//         }
//         let v:I;
//         v.x=1;
//     } else {
//         interface I {
//             x: string;
//         }
//         let v:I;
//         v.x='Igor';
//     }
// }
