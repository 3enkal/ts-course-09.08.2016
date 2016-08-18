"use strict";

function isInArray(arr: any[], ...args: any[]): boolean {
  let checkedArr: any[] = arr.slice();

  for (let argItem of args) {
    let foundIndex: number = checkedArr.indexOf(argItem);
    let contains: boolean = !!~foundIndex;

    if (!contains) {
      return false;
    }

    // можно закомментить эту строчку,
    // тогда будет проверять уникальное значение
    checkedArr.splice(foundIndex, 1);
  }

  return true;
}

assert(
  isInArray([1,2,3], 3,2,1),
  true
);
assert(
  isInArray([2,3,4,4], 2,3,4,4),
  true
);
assert(
  isInArray([2,3,4], 2,3,4,4),
  false
);
assert(
  isInArray(["abeb",2,false,null,3,4,4], "abeb",null,false,2),
  true
);

// Q1: как пофиксить, чтобы tcs не регался на типы в теле функции с общей сигнатурой?
function summator(...args: number[]): number;
function summator(...args: string[]): string;
function summator(...args: Array<number|string>): number|string {
  return args.reduce((sum, currentItem) => sum + currentItem);
}

assert(
  summator(1,2,3),
  6
);
assert(
  summator("1","2","3"),
  "123"
);

// из-за того что TS (печально) не транспайлит Set и Map коллекции,
// этот вариант будет бросать ошибку в runtime
// хотя через babel я всегда использую такой вариант для краткости

// function getUniqueES2015(arr: any[]): any[] {
//   return [...new Set(arr)];
// }
//
// assert(getUniqueES2015([1,1,3,6]).join(), "1,3,6");

function getUniqueES5(arr: any[]): any[] {
  return arr.filter((item: any, i: number) => arr.indexOf(item) === i);
}

assert(
  getUniqueES5([1,1,3,6]).join(),
  "1,3,6"
);

function reverse(str: string): string {
  let parsedWord: string = "";
  let result: string = "";

  for (let i: number = 0; i < str.length; i++) {
    let char = str[i];
    let isLastChar = (i === str.length - 1);

    // если это не конец слова или предложения
    // то продолжаем парсить слово
    if (char !== " " && !isLastChar) {
      parsedWord += char;
      continue;
    }

    // если это конец, то допишем этот символ в слово
    // а сам символ сделаем пустым, чтобы повторно не приконкатинировался
    if (isLastChar) {
      parsedWord += char;
      char = "";
    }

    // если идут пустые пробелы подряд, то просто допишем их в результат
    // чтобы не делать вызывы по трансформу слова в пустую
    if (!parsedWord.length) {
      result += char;
      continue;
    }

    result += (transformWord(parsedWord) + char);
    parsedWord = "";
  }

  return result;

  // трансформирует передаваемое слово нужным образом
  // Q2: как сделать, чтобы можно было записывать свойства в named function declaration?
  function transformWord(word: string): string {
    // возьмём из кэша
    if (transformWord.cache && transformWord.cache[word]) {
      return transformWord.cache[word];
    }

    let leftIndex: number = 0;
    let rightIndex: number = word.length - 1;
    let characters: string[] = word.split(""); // преобразуем в массив, чтобы менять элементы на месте

    while (leftIndex < rightIndex) {
      // бежим слева и ищем букву
      if (!isLetter(characters[leftIndex])) {
        leftIndex++;
        continue;
      }

      // найдём позицию с конца массива, с которой можно произвести обмен
      while (leftIndex < rightIndex) {
        if (isLetter(characters[rightIndex])) break;
        rightIndex--;
      }

      // проверим полученный правосторонний индекс
      // позиция не найдена, значит достигли конца
      if (leftIndex >= rightIndex) break;

      // произведём обмен
      swap(characters, leftIndex, rightIndex);

      // передвинем индексы дальше
      leftIndex++;
      rightIndex--;
    }

    let result: string = characters.join("");

    // закэшируем
    !transformWord.cache && (transformWord.cache = {});
    transformWord.cache[word] = result;

    return result;
  }

  // меняет элементы местами в массиве
  function swap(arr: string[], leftIndex: number, rightIndex: number): void {
    let savedItem: string = arr[leftIndex];

    arr[leftIndex] = arr[rightIndex];
    arr[rightIndex] = savedItem;
  }

  function isLetter(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

}

assert(
  reverse("s1tar3t 2 hellow"),
  "t1rat3s 2 wolleh"
);
assert(
  reverse("s1ta$%r3t 2 hel^low"),
  "t1ra$%t3s 2 wol^leh"
);
assert(
  reverse("s1tar3t 2   low5"),
  "t1rat3s 2   wol5"
);

// хэлпер
function assert(actual: any, expected: any): void {
  if (actual === expected) {
    return;
  }

  throw new Error(`There are expected: ${expected}, but you gave: ${actual}`);
}
