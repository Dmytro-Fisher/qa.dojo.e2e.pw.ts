// Arrays

//#region Перевірка масиву
/* // Перевірка масиву  
Напиши функцію, яка перевіряє, чи є input масивом.  
Тестові дані:  
console.log(isArray('QA DOJO')); // false  
console.log(isArray([1, 2, 4, 0])); // true    */

function isArray(input) {
  return Array.isArray(input);
}
console.log(isArray());
//#endregion

//#region Клонування масиву
//Клонування масиву
/*Напиши функцію для створення копії масиву.  
Тестові дані:  
console.log(cloneArray([1, 2, 4, 0])); // [1, 2, 4, 0]  
console.log(cloneArray([1, 2, [4, 0]])); // [1, 2, [4, 0]]  
*/
// let arr = [1,2,4,0];
// let clone = arr;
// arr.pop();
// arr.pop();
// clone.push([4,0]);
// console.log(clone);

function cloneArray(arr) {
  let clone = [...arr];
  return clone;
}

console.log(cloneArray(["a", 1, "b"]));
//#endregion
//
//#region Перші елементи масиву
/* Перші елементи масиву  
Напиши функцію для отримання перших n елементів масиву.  
Тестові дані:  
console.log(first([7, 9, 0, -2])); // 7  
console.log(first([7, 9, 0, -2], 3)); // [7, 9, 0]     */

function first(arr, n) {
  if (n === null || n === undefined) {
    return arr[0];
  } else {
    return arr.slice(0, n);
  }
}
console.log(first([7, 9, 0, -2]));
//#endregion

//#region Останні елементи масиву
/*
Останні елементи масиву  
✏️ Напиши функцію для отримання останніх n елементів масиву.  
Тестові дані:  
console.log(last([7, 9, 0, -2])); // -2  
console.log(last([7, 9, 0, -2], 3)); // [9, 0, -2]    
*/
function last(arr, n) {
  if (n === null || n === undefined) {
    return arr[arr.length - 1];
  } else {
    return arr.slice(-n);
  }
}
console.log(last([7, 9, 0, -2]));
//#endregion

//#region Об’єднання елементів масиву
/*
Об’єднання елементів масиву  
✏️ Напиши програму, що об'єднує елементи масиву у строку.   (гугліть як це зробити)
Приклад:  
myColor = ["Red", "Green", "White", "Black"];  
// "Red,Green,White,Black"  
// "Red+Green+White+Black"    
*/
function myColor(arr, symbol) {
  return arr.join(symbol);
}
console.log(myColor(["Red", "Green", "White", "Black"], "+"));
//#endregion

//#region Числа від 1 до 345
/*
Числа від 1 до 345
✏️ Використай цикл, щоб створити масив з числами  від 1 до 345.
*/
function count(num) {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
}
console.log(count(345));
//#endregion

//#region Сума чисел від 1 до 100
/*
Сума чисел від 1 до 100
✏️ Напиши програму, яка знайде суму чисел від 1 до 100.
*/
function sum(num1, num2) {
  let sum = 0;
  for (let i = num1; i <= num2; i++) {
    sum += i;
  }
  return sum;
}
console.log(sum(1, 100));
//#endregion

//#region Числа від 241 до 1
/*
Числа від 241 до 1
✏️ Використай цикл, щоб створити масив з числами у зворотному порядку від 241 до 1. 
*/

function back(num1, num2) {
  const back = [];
  for (let i = num1; i <= num2; i++) {
    back.push(i);
  }
  const reverse = back.reverse();

  return reverse;
}
console.log(back(1, 241));
//#endregion

//#region Максимальне число з двох
/*
Максимальне число з двох
✏️ Напиши програму, яка знаходить найбільше ціле число з двох. Використай if для порівняння.

maxNumber(10, 20); // Вивід: 20  
maxNumber(5, 5); // Вивід: Обидва числа рівні  
maxNumber(-10, 0); // Вивід: 0  
*/

function maxNumber(number1, number2) {
  if (number1 > number2) {
    return number1;
  }
  if (number1 === number2) {
    return "Обидва числа рівні";
  }
  if (number2 > number1) {
    return number2;
  }
}
console.log(maxNumber(5, 5));
//#endregion

// 30.03.2025

//#region Split string to Array
/*
№1 

Write a JavaScript function to split a string and convert it into an array of words.
Test Data :
console.log(string_to_array("Robin Singh"));
["Robin", "Singh"]
*/

function string(text) {
  const arr = text
    .replace(/[^\w\s]/g, "")
    .trim()
    .split(/\s+/);
  return arr;
}
console.log(string("Say, hi to me!!!!!!! Now!!!!"));

//#endregion
