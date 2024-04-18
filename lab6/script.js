const $ = (q, c = document) => c.querySelector(q);


// Zadanie 1
const books = [
    {
        title: 'Metro 2033',
        author: 'Dmitry Gluhovsky',
        releaseDate: new Date('2010-03-16'),
    },
    {
        title: 'Clean code',
        author: 'Robert C. Martin',
        releaseDate: new Date('2008-08-01'),
    },
    {
        title: 'Miecz Przeznaczenia',
        author: 'Andrzej Sapkowski',
        releaseDate: new Date('1992'),
    }
]

const printBookProperties = (book) =>
    console.log(`${book.title} - ${book.author} (${book.releaseDate})`);

printBookProperties(books[0]);


// Zadanie 2
const students = [
    {
        firstName: 'a',
        lastName: 'a',
        index: 1,
        grades: {
            math: 3,
            physics: 4,
            chemistry: 5,
        }
    },
    {
        firstName: 'b',
        lastName: 'b',
        index: 2,
        grades: {
            math: 3,
            physics: 3,
            chemistry: 5,
        }
    },
    {
        firstName: 'c',
        lastName: 'c',
        index: 3,
        grades: {
            math: 5,
            physics: 4,
            chemistry: 4,
        }
    }
]

const averageGradeOfStudent = (student) => {
    let sum = 0, i = 0;
    for (const subject in student.grades) {
        sum += student.grades[subject];
        i++;
    }
    return sum / i;
}
console.log(averageGradeOfStudent(students[0]));


// Zadanie 3
const triangles = [];
class Triangle {
    #height = 0;
    #base = 0;
    #name = '';

    //#region construct get set
    constructor(height, base, name) {
        this.#height = height;
        this.#base = base;
        this.#name = name;
    }

    get height() {
        return this.#height;
    }

    set height(value) {
        this.#height = value;
    }

    get base() {
        return this.#base;
    }

    set base(value) {
        this.#base = value;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }
    //#endregion

    get area() {
        return (this.base * this.height) / 2;
    }
}

const compareAreas = (tr1, tr2) => {
    if (tr1.area >= tr2.area)
        return tr1;
    else return tr2;
}

for (let i = 1; i <= 3; i++)
    triangles.push(new Triangle(i, i * 2, `Trójkąt #${i}`));
console.log(triangles);


// Zadanie 4
const trapezes = [];
class Trapeze {
    #height = 0;
    #base1 = 0;
    #base2 = 0;
    #name = '';

    //#region construct get set
    constructor(height, base1, base2, name) {
        this.#height = height;
        this.#base1 = base1;
        this.#base2 = base2;
        this.#name = name;
    }

    get height() {
        return this.#height;
    }

    set height(value) {
        this.#height = value;
    }

    get base1() {
        return this.#base1;
    }

    set base1(value) {
        this.#base1 = value;
    }

    get base2() {
        return this.#base2;
    }

    set base2(value) {
        this.#base2 = value;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }
    //#endregion

    get area() {
        return ((this.base1 + this.base2) * this.height) / 2;
    }
}

const renameTrapeze = (trapeze, newName) => {
    trapeze.name = newName;
}

for (let i = 1; i <= 3; i++)
    trapezes.push(new Trapeze(i, i + 1, i * 2, `Trapez #${i}`));
console.log(trapezes);


// Zadanie 5
const comapreAndDisplayBiggerObject = (obj1, obj2) => {
    console.log(compareAreas(obj1, obj2));
}
comapreAndDisplayBiggerObject(trapezes[0], trapezes[1]);


// Zadanie 6
class Rectangle {
    #a = 0;
    #b = 0;

    // #region construct get set

    constructor(a, b) {
        this.#a = a;
        this.#b = b;
    }

    get a() {
        return this.#a;
    }

    set a(value) {
        this.#a = value;
    }

    get b() {
        return this.#b;
    }

    set b(value) {
        this.#b = value;
    }

    //#endregion

    get area() {
        return this.a * this.b;
    }

    get circumference() {
        return 2 * this.a + 2 * this.b;
    }
}

const
    rectangleDOMa = $('#js-6-a'),
    rectangleDOMb = $('#js-6-b'),
    rectangleDOMbtn = $('#js-6-btn'),
    rectangleDOMdesc = $('#js-6-desc');
let rectangle;

rectangleDOMbtn.addEventListener('click', () => {
    let
        a = Number(rectangleDOMa.value),
        b = Number(rectangleDOMb.value),
        rectangle = new Rectangle(a, b);
    rectangleDOMdesc.innerHTML = `a=${a}<br>b=${b}<br>pole=${rectangle.area}<br>obwód=${rectangle.circumference}`;
});


// Zadanie 7
class Car {
    #brand = '';
    #model = '';
    #yearOfProduction = new Date();
    #color = '';
    #maxSpeed = 0;

    // #region construct get set

    constructor(brand, model, yop, color, maxSpeed) {
        this.brand = brand;
        this.model = model;
        this.yearOfProduction = new Date(String(yop));
        this.color = color;
        this.maxSpeed = maxSpeed;
    }

    get brand() {
        return this.#brand
    }

    set brand(value) {
        this.#brand = value;
    }

    get model() {
        return this.#model
    }

    set model(value) {
        this.#model = value;
    }

    get yearOfProduction() {
        return this.#yearOfProduction
    }

    set yearOfProduction(value) {
        this.#yearOfProduction = value;
    }

    get color() {
        return this.#color
    }

    set color(value) {
        this.#color = value;
    }

    get maxSpeed() {
        return this.#maxSpeed
    }

    set maxSpeed(value) {
        this.#maxSpeed = value;
    }
    // #endregion

    increaseMaxSpeedBy(value) {
        this.maxSpeed += value;
    }

    decreaseMaxSpeed(value) {
        this.increaseMaxSpeedBy(-value);
    }

    toString() {
        return `${this.brand} ${this.model} (${this.yearOfProduction.getFullYear()}), Kolor: ${this.color}, Prędkość: ${this.maxSpeed}`;
    }

    get age() {
        return new Date().getFullYear() - this.yearOfProduction.getFullYear();
    }
}

const car = new Car('Ford', 'Focus', 2002, 'silver', 160);
console.log(
    car.increaseMaxSpeedBy(10),
    car.decreaseMaxSpeed(10),
    car.toString(),
    car.age);


// Zadanie 8
class BankAccount {
    #balance = 0.0;

    constructor(balance) {
        this.#balance = balance;
    }

    get balance() {
        return this.#balance;
    }

    deposit(value) {
        this.#balance += value;
    }

    withdraw(value) {
        if (value > this.balance) throw new Error('Not enough funds on account');
        else this.#balance -= value;
    }
}
const bankAccount = new BankAccount(1000);
console.log(bankAccount.balance);
console.log(bankAccount.deposit(100));
console.log(bankAccount.withdraw(500));
try {
    console.log(bankAccount.withdraw(2000));
} catch (e) {
    console.error(e)
}
console.log(bankAccount.balance);


// Zadanie 9
class Employee {
    #firstName = '';
    #lastName = '';
    #salary = 0.0;

    //#region construct get set
    constructor(fName, lName, salary) {
        this.firstName = fName;
        this.lastName = lName;
        this.salary = salary;
    }

    get firstName() {
        return this.#firstName;
    }

    set firstName(value) {
        this.#firstName = value;
    }

    get lastName() {
        return this.#lastName;
    }

    set lastName(value) {
        this.#lastName = value;
    }

    get salary() {
        return this.#salary;
    }

    set salary(value) {
        this.#salary = value;
    }
    //#endregion

    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            salary: this.salary
        }
    }
}

class EmployeeManagment {
    #employees = []

    constructor() {
        this.#employees = []
    }

    addEmployee(employee) {
        this.#employees.push(employee);
    }

    removeEmployee(fName, lName) {
        const indexToRemove = this.#employees.findIndex((v) =>
            v.firstName == fName && v.lastName == lName);
        if (indexToRemove > -1) this.#employees.splice(indexToRemove, 1);
        else console.error(`Employee with index ${indexToRemove} not found`);
    }

    getEmployee(fName, lName) {
        return this.#employees.find((v) => {
            if (v.firstName == fName && v.lastName == lName) return v;
        });
    }

    saveToJSON() {
        return JSON.stringify(this.#employees);
    }

    loadFromJSON(jsonString) {
        this.#employees = JSON.parse(jsonString);
    }
}

const exampleEmployee = new Employee('Wiktor', 'Zając', 69959);
const employeeManagment = new EmployeeManagment();
employeeManagment.addEmployee(exampleEmployee);
console.log(employeeManagment.getEmployee('Wiktor', 'Zając'));
const employeesJSON = employeeManagment.saveToJSON();
console.log(employeesJSON);
employeeManagment.removeEmployee('Wiktor', 'Zając');
console.log(employeeManagment.getEmployee('Wiktor', 'Zając'));
employeeManagment.loadFromJSON(employeesJSON);
console.log(employeeManagment.getEmployee('Wiktor', 'Zając'));


// Zadanie 10
class Product {
    #name = '';
    #price = 0.0;
    #available = 0;

    //#region construct get set
    constructor(name, price, available) {
        this.name = name;
        this.price = price;
        this.available = available;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        this.#price = value;
    }

    get available() {
        return this.#available;
    }

    set available(value) {
        this.#available = value;
    }
    //#endregion

    toJSON() {
        return {
            name: this.name,
            price: this.price,
            available: this.available
        }
    }
}

class ProductRepository {
    #products = [];

    constructor() {
        this.#products = [];
    }

    addProduct(product) {
        this.#products.push(product);
    }

    removeProduct(name) {
        const indexToRemove = this.#products.findIndex((v) => v.name == name);
        if (indexToRemove > -1) this.#products.splice(indexToRemove, 1);
        else console.error(`Product with index ${indexToRemove} not found`);
    }

    updatePrice(name, price) {
        const indexToUpdate = this.#products.findIndex((v) => v.name == name);
        if (indexToUpdate > -1) this.#products[indexToUpdate].price = price;
        else console.error(`Product with index ${indexToRemove} not found`);
    }

    saveToJSON() {
        return JSON.stringify(this.#products);
    }

    loadFromJSON(jsonString) {
        this.#products = JSON.parse(jsonString);
    }
}

const exampleProduct = new Product('Chleb', 3.49, 12);
const productRepository = new ProductRepository();
productRepository.addProduct(exampleProduct);
productRepository.updatePrice('Chleb', '4.19');
const productsJSON = productRepository.saveToJSON();
console.log(productsJSON);
productRepository.removeProduct('Chleb');
console.log(productRepository.saveToJSON());
productRepository.loadFromJSON(productsJSON);
