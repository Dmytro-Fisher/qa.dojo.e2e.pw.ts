import { log } from "console";

const a = 10;
const b = 11;

console.log(a > b);
console.log(b > a);
console.log(10 == "10");
console.log(b === a);
console.log(b !== a);

const res1 = {
  a: 10,
  b: 15,
  c: 30,
};
const res2 = {
  a: 20,
  b: 35,
  c: 5150,
};

const comparisonResult = res1.c > res2.c;
console.log(comparisonResult);

const temp = 10;

if (temp >= 15) {
  console.log("Vetrovka");
}
if (temp <= 15) {
  console.log("Vetrovka + sviter");
}

let alco = 18;

if (alco >= 18) {
  console.log("Продаємо");
}
if (alco < 18) {
  console.log("Не продаємо");
}
