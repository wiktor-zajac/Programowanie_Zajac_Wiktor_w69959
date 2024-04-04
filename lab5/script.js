const $ = (q, s=document) => s.querySelector(q);
// TODO: zamienić console.log na wyświetlanie w HTML i poformatować

// Zadanie 1
// const tab1 = [];
// for (i=0;i<=10;i++) {
//     let x = Number(prompt('cyfra='));
//     tab1.push(x);
// }
// let s = Number(prompt('szukana='));

const tab1 = [3, 6, 9, 2, 7, 5, 8, 2, 1, 5, 8, 8, 5, 3];
let s = 8;

let found = tab1.filter((el) => el == s);
console.log(`Cyfrę ${s} znaleziono ${found.length} razy`);


// Zadanie 2
// TODO: walidacja
const tab2 = [1, 2, 3, 4, 5, 6];
let usersInput = Number(prompt('Podaj liczbę całkowitą'));
tab2.splice(usersInput, 0, usersInput);
console.log(tab2);


// Zadanie 3
const tab3 = tab1.reverse();
$('#js-3').innerHTML = tab1 + ' | ' + tab3;


// Zadanie 4
const tab4 = Array.from({length: 50}, () => Math.floor(Math.random() * 100));
$('#js-4').innerHTML = tab4;


// Zadanie 5
const tab5 = {
    sum: 0,
    evenFoundIndexes: [],
    mulBy3: 0,
    addedIndex: 0,
    avg: 0,
    max: 0,
    occurences: 0,
}

tab1.sum = tab1.reduce((a, b) => a+b, 0);
tab1.filter((v, i) => {
    if (v % 2 == 0)
        tab5.evenFoundIndexes.push(i);
});
tab5.mulBy3 = tab1.map((v) => v*3);
tab1.push(69959);
tab5.addedIndex = tab1.find(el => el == 69959);
tab5.avg = (tab5.sum + 69959) / tab1.length;
tab5.max = Math.max(tab1);
tab5.occurences = tab1.filter((el) => el == 5);


// Zadanie 6
let i = 0;
const fib = [0, 1];

for (i = 2; i <= 100; i++) 
    fib.push(fib[i - 2] + fib[i - 1]);


// Zadanie 7
const nextBiggest = (arr) => {
    let
        max = -Infinity,
        result = -Infinity;
  
    for (const value of arr) {
        const nextResult = value;
  
        if (nextResult > max)
            [result, max] = [max, nextResult];
        else if (nextResult < max && nextResult > result)
            result = nextResult;
    }
  
    return [max, result];
}
const tab7 = nextBiggest(tab1);
console.log(tab7);


// Zadanie 8
const tab8 = [...new Set(tab1)];
console.log(tab8);


// Zadanie 9
const isPrime = (num) => {
    for(let i = 2, s = Math.floor(Math.sqrt(num)); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
};
console.log(isPrime(69959));


// Zadanie 10
let text10 = 'Ala ma kota a kot ma Alę';
const tab10 = text10.split(' ');
text10 = tab10.reverse().join(' ');
console.log(text10);


// Zadanie 11
const randomFromArray = (arr) => arr[Math.floor(Math.random()*arr.length)];
const randomPassword = (length = 16) => {
    const allChars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    let result = [];
    for (let i = 0; i <= length; i++)
        result.push(randomFromArray(allChars));
    return result.join('');
}
console.log(randomPassword());


// Zadanie 12



// Zadanie 13
