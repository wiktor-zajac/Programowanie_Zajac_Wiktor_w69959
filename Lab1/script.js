// Zadanie 3
const a = 10.0, b = 20.0, c = 23.2;

const abcOperations = {
    add: a + b + c,
    sub: a - b - c,
    mul: a * b * c,
    div: a / b / c,
};
const abcOpsString = JSON.stringify(abcOperations);

alert(abcOpsString);
console.log(abcOpsString);
document.querySelector('p#js-abc-ops').innerHTML = abcOpsString;


// Zadanie 4
const evenNumbersFrom0To100Arrray = [];

for (i = 0; i <= 100; i += 2)
    evenNumbersFrom0To100Arrray.push(i);
console.log(evenNumbersFrom0To100Arrray);


// Zadanie 5
const triangleArea = () => {
    const p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
};
console.log(triangleArea());
document.querySelector('p#js-triangle-area').innerHTML = triangleArea();


// Zadanie 6
const usersFirstName = prompt('Podaj swoje imię: ');
alert(`Witaj ${usersFirstName}!`);


// Zadanie 7
// Zmienna `z` należy do zadania 8
const
    x = Number(prompt('x=', 20)),
    y = Number(prompt('y=', 18)),
    z = Number(prompt('z=', 23));
alert(`x+y=${x + y}`);


// Zadanie 8
let biggestOutOfThree = 0.0;
if (x >= y) {
    if (x >= z) biggestOutOfThree = x;
    else biggestOutOfThree = z;
} else {
    if (y >= z) biggestOutOfThree = y;
    else biggestOutOfThree = z;
}

console.log(biggestOutOfThree);
document.querySelector('p#js-max-number').innerHTML = biggestOutOfThree;


// Zadanie 9
// https://stackoverflow.com/a/17445304
const gcd = (a, b) => {
    if (!b) return a;
    return gcd(b, a % b);
};
document.querySelector('p#js-gcd').innerHTML = gcd(parseInt(x), parseInt(y));


// Zadanie 10
const timeAndDateStringBuilder = () => {
    const date = new Date();
    return {
        Y: date.getFullYear(),
        M: date.getMonth() + 1,
        D: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
    }
};

const timeAndDateHTMLRender = () => {
    const dt = timeAndDateStringBuilder();
    const out = `${dt.D}.${dt.M}.${dt.Y} ${dt.h}:${dt.m}:${dt.s}`;
    document.querySelector('p#js-date-time').innerHTML = out;
};
timeAndDateHTMLRender();
setInterval(timeAndDateHTMLRender, 1000);


// Zadanie 11
const gameHTMLNodeForm = document.querySelector('form#js-game');
const gameHTMLNodeFormGuess = gameHTMLNodeForm.querySelector('input#js-game-guess');
const randomNumber = Math.round(Math.random() * 100);
let attemptsCounter = 0;
gameHTMLNodeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    attemptsCounter++;
    const guess = gameHTMLNodeFormGuess.value;
    if (guess == randomNumber) {
        alert(`Odgatnięto poprawną liczbę! Wymagało to ${attemptsCounter} prób`);
        window.location.reload();
    }
    else if (guess > randomNumber) alert('Mniejsze');
    else alert('Większe');
})
