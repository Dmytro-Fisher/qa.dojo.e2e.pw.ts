const student = {
  name: "Dmytro",
  lastName: "Fisher",
  age: 38,
  sex: "man",
  isMarried: false,
  cars: ["Jiga", "BMW", "Audi"],
  education: [
    { name: "school", earsOfStudying: "1992-2001" },
    { name: "college", earsOfStudying: "2001-2005" },
  ],
  greetings: () => {
    console.log("Hello everyone!");
  },
};

const obj2 = new Object();
obj2.newsize = "Hi";
console.log(obj2);
student.greetings();
console.log(student.education[0].earsOfStudying);
