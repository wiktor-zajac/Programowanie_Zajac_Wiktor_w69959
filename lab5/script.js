const $ = (q, s = document) => s.querySelector(q);
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);


// Zadanie 1
// TODO: uncomment before deploy
const tab1 = [];
for (let i = 0; i <= 10; i++) {
    let x = Number(prompt(`cyfra[${i}]=`, i * 2));
    tab1.push(x);
}
let s = Number(prompt('szukana=', 10));

let found = tab1.filter((el) => el == s).length;
$('#js-1-answer').innerHTML = `Cyfrę ${s} znaleziono ${found} ` + (found == 1 ? 'raz' : 'razy');
$('#js-1-nums').innerHTML = tab1;


// Zadanie 2
const tab2 = [1, 2, 3, 4, 5, 6];
let usersInput = 0;
while (true) {
    usersInput = Number(prompt('Podaj liczbę całkowitą (mniejszą od 7)', 5));
    if (usersInput < 7) break;
}
tab2.splice(
    usersInput - 1,
    tab2.length - usersInput + 1,
    usersInput, ...tab2.slice(usersInput - 1).map((v) => v + 1)
);
$('#js-2-user-input').innerHTML = usersInput;
$('#js-2-state').innerHTML = tab2;


// Zadanie 3
$('#js-3-before').innerHTML = tab1;
$('#js-3-after').innerHTML = tab1.reverse();

// Zadanie 4
const arrayOfRandomNumbers = (length = 50, min = 0, max = 100) =>
    Array.from({ length: length }, () => randomInt(min, max))
const tab4 = arrayOfRandomNumbers();
$('#js-4-answer').innerHTML = tab4;


// Zadanie 5
const tab5 = {
    sum: 0,
    foundIndexesOfEvenNumbers: [],
    multipliedByThree: 0,
    indexOfAddedValue: 0,
    average: 0,
    max: 0,
    occurencesOfRandomValue: 0,
}


tab5.sum = tab4.reduce((accumulator, value) => accumulator + value, 0);

tab4.forEach((value, index) => {
    if (value % 2 == 0) {
        tab5.foundIndexesOfEvenNumbers.push(index);
    }
});

tab5.multipliedByThree = tab4.map((v) => v * 3);

tab4.push(69959);
tab5.indexOfAddedValue = tab4.findIndex((el) => el == 69959);

tab5.average = (tab5.sum + 69959) / tab4.length;

tab5.max = Math.max(...tab4);

const seekedValue = randomInt(0, 100);
tab5.occurencesOfRandomValue = tab4.filter((el) => el == seekedValue).length;


$('#js-5-seeked-value').innerHTML = seekedValue;
for (const property of Reflect.ownKeys(tab5)) {
    $(`#js-5-${property}`).innerHTML = tab5[property];
}


// Zadanie 6
const tab6 = [0, 1];

for (let i = 2; i <= 100; i++)
    tab6.push(tab6[i - 2] + tab6[i - 1]);
$('#js-6-answer').innerHTML = tab6;


// Zadanie 7
const sumOfTwoBiggestNumbers = (arr) => {
    let max = 0, result = 0;

    for (const el of arr) {
        if (el > max)
            [result, max] = [max, el];
        else if (el < max && el > result)
            result = el;
    }

    return max + result;
}
$('#js-7-answer').innerHTML = sumOfTwoBiggestNumbers(tab4);


// Zadanie 8
$('#js-8-answer').innerHTML = [...new Set(tab4)];


// Zadanie 9
const primeCheckerInputNode = $('#js-9-num'),
    primeCheckerOutput = $('#js-9-answer');
primeCheckerInputNode.addEventListener('input', () => {
    checkIfInputIsPrime();
});

const isPrime = (num) => {
    sqrtOfNum = Math.floor(Math.sqrt(num));
    for (let i = 2; i <= sqrtOfNum; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
};
const checkIfInputIsPrime = () => {
    primeCheckerOutput.innerHTML = isPrime(Number(primeCheckerInputNode.value)) ? 'TAK' : 'NIE';
}
checkIfInputIsPrime();


// Zadanie 10
const reverseWordOrderInput = $('#js-10-input'),
    reverseWordOrderOutput = $('#js-10-output');
const reverseWordOrder = () => reverseWordOrderOutput.value = reverseWordOrderInput.value.split(' ').reverse().join(' ');
reverseWordOrder();
reverseWordOrderInput.addEventListener('input', () => {
    reverseWordOrder();
});


// Zadanie 11
const randomPasswordButton = $('#js-11-output');
const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomPassword = (length = 16) => {
    const allChars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    let result = [];
    for (let i = 0; i <= length; i++)
        result.push(randomFromArray(allChars));
    return result.join('');
}
randomPasswordButton.value = randomPassword();
$('#js-11-btn').addEventListener('click', () => randomPasswordButton.value = randomPassword());


// Zadanie 12
const tableNode = $('#js-12-table');
for (let x = 1; x <= 10; x++) {
    let row = tableNode.insertRow();
    for (let y = 1; y <= 10; y++) {
        row.insertCell().innerHTML = x * y;
    }
}


// Zadanie 13
const firstNames = ['Jan', 'Jakub', 'Sebastian', 'Wiktor', 'Piotr', 'Natalia', 'Anna', 'Ewa', 'Małgorzata'];
const lastNames = ['Nowak', 'Kowalski', 'Zając', 'Królik', 'Dąb', 'Świerk', 'Brzoza', 'Bąk', 'Mucha'];
const people = [];
const AMOUNT_OF_PERSONAL_DETAILS_TO_GENERATE = 20;

for (let i = 0; i <= AMOUNT_OF_PERSONAL_DETAILS_TO_GENERATE; i++) {
    const person = {
        firstName: randomFromArray(firstNames),
        lastName: randomFromArray(lastNames),
        age: randomInt(18, 80),
        phoneNumber: randomInt(5_000_000, 8_000_000),
    }
    people.push(person);
}

let amountOfRecordsAlreadyDisplayed = 0;

const
    previewNum = $('#js-13-num'),
    previewBtn = $('#js-13-btn'),
    previewTBody = $('#js-13-tbody');

previewBtn.addEventListener('click', () => {
    const amountOfPeopleToDisplay = Number(previewNum.value);

    for (let i = 0;
        i < amountOfPeopleToDisplay && amountOfRecordsAlreadyDisplayed < AMOUNT_OF_PERSONAL_DETAILS_TO_GENERATE;
        i++) {
        const
            row = previewTBody.insertRow(),
            person = people[amountOfRecordsAlreadyDisplayed + i],
            propertiesToDisplay = Reflect.ownKeys(person);

        for (const property of propertiesToDisplay) {
            const cell = row.insertCell();
            cell.innerHTML = person[property];
        }
    }
    amountOfRecordsAlreadyDisplayed += amountOfPeopleToDisplay;
});
