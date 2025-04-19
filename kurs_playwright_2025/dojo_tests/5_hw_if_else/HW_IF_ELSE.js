// Парне чи непарне число

function chekNumber(num) {
  if (typeof num !== "number") {
    return "Допустимі тільки числа";
  }
  if (num % 2 === 0) {
    return "Число парне";
  } else {
    return "Число не парне";
  }
}
console.log(chekNumber("hi"));

// Привітання за часом

function greeting(time) {
  if (time < 12) {
    return "Доброго ранку!";
  }
  if (time >= 12 && time <= 18) {
    return "Доброго дня!";
  }
  if (time > 18) {
    return "Доброго вечора, ми з України!";
  }
  if (time >= 22 && time <= 4) {
    return "Доброї ночі!";
  }
}
console.log(greeting(22));

//Перевірка оцінки

function checkExam(mark) {
  if (mark >= 50 && mark <= 100) {
    return "Тест складено";
  } else {
    return "Тест не складено";
  }
}
console.log(checkExam(49));

//Вік для голосування

function votingAge(vote) {
  if (vote >= 18) {
    return "Голосувати можна, але не за Трампа";
  } else {
    return "Голосувати не можна, ще малий";
  }
}
console.log(votingAge(18));

// Порівняння чисел

function compareNumbers(num1, num2) {
  if (num1 > num2) {
    return "Перше число більше";
  }
  if (num2 > num1) {
    return "Друге число більше";
  }
  if (num1 === num2) {
    return "Числа рівні";
  }
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return "Допустимі тільки числа";
  }
}
console.log(compareNumbers(5, 5));

//Дорога і світлофор

function trafficLight(light) {
  if (light === "red") {
    return "Зачекайте";
  }
  if (light === "yellow") {
    return "Приготуйтесь";
  }
  if (light === "green") {
    return "Можна йти";
  }
}
console.log(trafficLight("red"));

// Визначення типу числа

function plusOrMinus(numeric) {
  if (numeric < 0) {
    return "Число від'ємне";
  }
  if (numeric === 0) {
    return "Число дорівнює нулю";
  }
  if (numeric > 0) {
    return "Число додатнє";
  }
}
console.log(plusOrMinus(0));
