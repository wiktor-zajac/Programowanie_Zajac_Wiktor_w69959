const $ = (q, c=document) => c.querySelector(q);

// Zadanie 1
const books = [
    {
        title: '',
        author: '',
        releaseDate: 0,
    },
    {
        title: '',
        author: '',
        releaseDate: 0,
    },
    {
        title: '',
        author: '',
        releaseDate: 0,
    }
]

const printBookProperties = (book) =>
    console.log(`${book.title} - ${book.author} (${book.releaseDate})`)


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
            physics: 4,
            chemistry: 5,
        }
    },
    {
        firstName: 'c',
        lastName: 'c',
        index: 3,
        grades: {
            math: 3,
            physics: 4,
            chemistry: 5,
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


// Zadanie 3
const triangles = [];
class Triangle {
    #height = 0;
    #baseLength = 0;
    #name = '';

    constructor(height, baseLength, name) {
        this.#height = height;
        this.#baseLength = baseLength;
        this.#name = name;
    }

    get area() {
        return (this.#baseLength * this.#height) / 2;
    }
}

const compareAreas = (tr1, tr2) => {
    if (tr1.area >= tr2.area)
        return tr1;
    else tr2;
}

for (let i = 1; i <= 3; i++)
    triangles.push(new Triangle(i, i*2, `Trójkąt #${i}`));


// Zadanie 4
const trapezes = [];
class Trapeze {
    #height = 0;
    #base1 = 0;
    #base2 = 0;
    #name = '';

    constructor(height, base1, base2, name) {
        this.#height = height;
        this.#base1 = base1;
        this.#base2 = base2;
        this.#name = name;
    }

    get area() {
        return ((this.#base1 + this.#base2) * this.#height) / 2;
    }
}

const renameTrapeze = (trapeze, newName) => {
    trapeze.name = newName;
}

for (let i = 1; i <= 3; i++)
    triangles.push(new Trapeze(i, i-1, i*2, `Trójkąt #${i}`));


// Zadanie 5
const comapreAndDisplayBiggerObject = (obj1, obj2) =>
    console.log(compareAreas(obj1, obj2));


// Zadanie 6
class Rectangle {
    #a = 0;
    #b = 0;

    constr

    get area() {
        return this.#a * this.#b;
    }

    get circumference() {
        return 2*this.#a+ 2*this.#b;
    }
}

const
    rectangleDOMa = $('#js-6-a'),
    rectangleDOMb = $('#js-6-b'),
    rectangleDOMbtn = $('#js-6-btn');
let rectangle;

rectangleDOMbtn.addEventListener('click', () => {
    let
        a = Number(rectangleDOMa.value),
        b = Number(rectangleDOMb.value);
    rectangle = new Rectangle(a, b);
});
