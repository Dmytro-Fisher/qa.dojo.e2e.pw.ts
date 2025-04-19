const car = {
  color: "black", // властивість
  size: "normal",
  wheelsNumber: 4,
  mark: "Audi",
  country: "Germany",
  isAutomat: true,
  price: 5000,
  maxSpeed: 240,
  startEngine: () => {
    console.log("Врууум!!");
  }, //метод(поведінка)
  drive: () => {
    console.log("Машина їде");
  },
  driveAtMaxSpeed: function () {
    console.log(`Я їду зі швидкістю ${this.maxSpeed} км/год`);
  },
};

car.startEngine();
car.drive();
car.driveAtMaxSpeed();

class Car {
  color: string = "White";
  size: string = "normal";
  wheelsNumber: number = 4;
  mark: string = "Audi";
  country: string = "Germany";
  isAutomat: boolean = true;
  price: number = 5000;
  maxSpeed: number = 240;

  constructor(color: string) {
    this.color = color;
  }

  startEngine() {
    console.log("Врууум!!");
  }
  drive() {
    console.log("Машина їде");
  }
  driveAtMaxSpeed() {
    console.log(`Я їду зі швидкістю ${this.maxSpeed} км/год`);
  }
}

const whiteCar = new Car("Black");
console.log(whiteCar.color);
whiteCar.
