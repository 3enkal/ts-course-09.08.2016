// namespace Shipping{
//     export interface Ship{
//         name:string;
//         port:number;
//     }
//
//     export class Ferry implements Ship{
//         name:string;
//         constructor( name:string,public port:number,public dist:number){
//             this.name=name;
//         }
//     }
// }
//
// let a:Shipping.Ship;
//
// let b=new Shipping.Ferry('Audio',200,20);
//
//
// namespace Docking{
//     import Ship = Shipping.Ship;
// }


// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

// class MathLib {
//     @logMethod
//     public areaOfCircle(r: number) {
//         return Math.PI * r ** 2;
//     }
// }
//
// function logMethod(target: any, key: string, descriptor: TypedPropertyDescriptor<any>):TypedPropertyDescriptor<any> {
//     let originalDesc = descriptor.value;
//     descriptor.value = (...args: any[]): any=> {
//         let b = args.map((a: any)=> JSON.stringify(a)).join();
//         let result = originalDesc.apply(this, args);
//         let r = JSON.stringify(result);
//         console.log(`Call: ${key}(${b}) => ${r}`);
//         return result;
//     };
//     return descriptor;
// }
//
// let a = new MathLib();
// a.areaOfCircle(3);


// class Account {
//     @logProperty
//     public firstName: string;
//     public lastName: string;
//
//     constructor(firstName: string, lastName: string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
//
// function logProperty(target: any, key: string): void {
//     let _val = target[key];
//
//     let getter = (): typeof _val=> {
//         console.log(`Get: ${key} => ${_val}`);
//         return _val;
//     }
//
//     let setter = (newVal: string): void => {
//         console.log(`Set: ${key} => ${newVal}`);
//         _val = newVal;
//     }
//
//     Object.defineProperty(target, key, {
//         get: getter,
//         set: setter,
//         enumerable: true,
//         configurable: true
//     })
// }
//
// let me = new Account('Igor', 'Nepipenko');
// let my_name = me.firstName;
// me.firstName = 'Vova';

// @logClass
// class Account {
//     public firstName: string;
//     public lastName: string;
//
//     constructor(firstName: string, lastName: string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
//
// function logClass(target:any):any{
//     return ()=>{
//         console.log(`New instance of ${target.name}`);
//         return target;
//     }
// }
//
// let firstPersone = new Account('Vlad','Zotke');
// let secondPersone = new Account('Anton ','Pavlov');


class Account {
    public firstName: string;
    public lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @readMetaData
    public sayMessage(@logParameter msg: string): string {
        return `${this.firstName} ${this.lastName} : ${msg}`
    }

}

function logParameter(target: any, key: string, index: number): void {
    let metadataKey = `__log_${key}_parameters`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
        return;
    }
    target[metadataKey] = [index];
}

function readMetaData(target: any, key: string, descriptor: any): any {
    let metadataKey = `__log_${key}_parameters`;
    let indecies = target[metadataKey];
    let originalDesc = descriptor.value;
    descriptor.value = (...args: any[])=> {
        console.log(`${key} arg[${indecies}]: ${args[indecies]}`);
        return originalDesc.apply(this, args);
    }
    return descriptor;
}

let persone = new Account('Igor', 'Nepipenko');
persone.sayMessage('typescript is good');
persone.sayMessage('typescript is good and i love it');