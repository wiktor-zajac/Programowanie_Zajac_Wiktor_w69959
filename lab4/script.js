const $ = (q) => document.querySelector(q);
const $all = (q) => document.querySelectorAll(q);
const sleep = async ms => new Promise(r => setTimeout(r, ms));

// Zadanie 1
const countDownForNode = $('#js-1-for');
const countDownWhileNode = $('#js-1-while');
const zad1_for = async () => {
    for (let i = 10; i >= 1; i--) {
        await sleep(1000);
        countDownForNode.innerHTML += `${i}<br>`;
    }
    countDownForNode.innerHTML += `Szczęśliwego nowego roku!`;
};

const zad1_while = async () => {
    i = 10;
    while (i >= 1) {
        await sleep(1000);
        countDownWhileNode.innerHTML += `${i}<br>`;
        i--;
    }
    countDownWhileNode.innerHTML += `Szczęśliwego nowego roku!`;
}

zad1_for();
zad1_while();

// Zadanie 2
const silnia = (n) => !(n > 1) ? 1 : silnia(n - 1) * n;


// Zadanie 3
if (!window.confirm('Czy jesteś pełnoletni?'))
    window.open('strona2.html');


// Zadanie 4
const buttons = $all('.js-4-btn');
buttons.forEach((v, k) => {
    v.addEventListener('click', () => {v.classList.toggle('js-4-anim-start')});
});


// Zadanie 5
const hideImgBtn = $('.js-5-btn');
const hideImgImg = $('.js-5-img');

hideImgBtn.addEventListener('click', () => {
    hideImgImg.classList.toggle('hide');
    hideImgBtn.value = hideImgBtn.value == 'Schowaj' ? 'Pokaż!' : 'Schowaj';
});


// Zadanie 6
const
    addToListBtn = $('#js-6-btn'),
    addToListTxt = $('#js-6-txt'),
    addToListList = $('#js-6-list');

addToListBtn.addEventListener('click', () => {
    let node = document.createElement('li');
    node.append(addToListTxt.value);
    addToListList.appendChild(node);
    addToListTxt.value = '';
});


// Zadanie 7

