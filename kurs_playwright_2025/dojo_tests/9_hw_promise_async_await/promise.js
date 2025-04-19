//#region
// const myPromise = new Promise((resolve, reject) => {
//   // Асинхронна операція
//   if (успіх) {
//     resolve("Операція завершена успішно");
//   } else {
//     reject("Сталася помилка");
//   }
// });

const { error } = require("console");

// myPromise.then((result) => {
//   console.log(result); // Виконається при успіху
// });

// new Promise((resolve, reject) => {
//   resolve("Крок 1");
// })
//   .then((result) => {
//     console.log(result); // Виведе "Крок 1"
//     return "Крок 2";
//   })
//   .then((result) => {
//     console.log(result); // Виведе "Крок 2"
//     throw new Error("Помилка на Кроці 3");
//   })
//   .catch((error) => {
//     console.error(error); // Виведе помилку
//   })
//   .finally(() => {
//     console.log("Процес завершено");
//   });
//#endregion

/*
 Створіть функцію, яка використовує проміс для імітації затримки у 2 секунди перед поверненням значення.
Вимоги:

• Створіть функцію waitForTwoSeconds(), яка повертає проміс, що вирішується через 2 секунди.
• Після виконання проміса функція повинна вивести в консоль повідомлення “2 секунди пройшло!”.

* треба буде погугліть (або подитись кінець лекції)
* використовуйте setTimeout()

*/

function waitForTwoSeconds() {
  return new Promise((resolve, reject) => {
    let seconds = 0;
    const timer = setInterval(() => {
      seconds += 0.5;
      console.log(`${seconds} секунд пройшло`);
    }, 500);
    setTimeout(() => {
      clearInterval(timer);
      resolve("2 секунди пройшло");
    }, 2000);
  });
}

waitForTwoSeconds()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
