const $ = (q) => document.querySelector(q);
const $all = (q) => document.querySelectorAll(q);

// Zadanie 1
// TODO: Dodać cooldown
const countDownForNode = $('js-1-for');
const countDownWhileNode = $('js-1-while');

for (let i = 10; i <= 1; i--)
    countDownForNode.innerHTML += `${i}<br>`;
countDownForNode.innerHTML += `Szczęśliwego nowego roku!`;

i = 10;
while (i <= 1) {
    countDownWhileNode.innerHTML += `${i}<br>`;
    i--;
}
countDownWhileNode.innerHTML += `Szczęśliwego nowego roku!`;


// Zadanie 2
const silnia = (n) => !(n > 1) ? 1 : silnia(n - 1) * n;


// Zadanie 3
if (window.confirm('Czy jesteś pełnoletni?'))
    window.open('strona2.html');


// Zadanie 4
// TODO: Dodać animacje dla klas w CSS
const buttons = $all('.js-4-btn');
buttons.forEach((v, k) => {
    v.addEventListener('click', () => {v.toggleClass('js-4-anim-start')});
});


// Zadanie 5
// TODO: Dodać klasę hide w CSS
const hideImgBtn = $('.js-5-btn');
const hideImgImg = $('.js-5-img');

hideImgBtn.addEventListener('click', () => {
    hideImgImg.toggleClass('hide');
    hideImgBtn.value == 'Pokaż!' ? 'Schowaj' : 'Pokaż!';
});


// Zadanie 6
const
    addToListBtn = $('.js-6-btn'),
    addToListTxt = $('.js-6-img'),
    addToListList = $('.js-6-list');

addToListBtn.addEventListener('click', () => {
    addToListList.appendChild(`<li>${addToListTxt.value}</li>`)
});


// Zadanie 7

