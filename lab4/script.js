const $ = (q, c=document) => c.querySelector(q);
const $all = (q, c=document) => c.querySelectorAll(q);
const sleep = async (ms) => new Promise(r => setTimeout(r, ms));

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
const
    tableBody = $('#js-7-tbody'),
    firstNameInput = $('#js-7-fname'),
    lastNameInput = $('#js-7-lname'),
    tableInsertBtn = $('#js-7-btn');

tableInsertBtn.addEventListener('click', () => {
    let row = tableBody.insertRow();

    let cell = row.insertCell();
    cell.innerHTML = firstNameInput.value;

    cell = row.insertCell();
    cell.innerHTML = lastNameInput.value;

    firstNameInput.value = '';
    lastNameInput.value = '';
});


// Zadanie 8
const unitConvInputNode = $('#js-8-in-value');
const unitConvInputRadios = $all('.js-8-radio');

unitConvInputNode.addEventListener('input', () => convert());
unitConvInputRadios.forEach((v) => v.addEventListener('change', () => convert()));

const convert = () => {
    const
        inUnit = $('input[type=radio][name=js-8-in-unit]:checked').value,
        outUnit = $('input[type=radio][name=js-8-out-unit]:checked').value,
        outValueNode = $('#js-8-out-value');
    let inValue = Number(unitConvInputNode.value);

    if (inUnit == 'K')
        inValue -= 273.15;
    else if (inUnit == 'F')
        inValue = (inValue - 32) / 1.8;

    if (outUnit == 'K')
        inValue += 273.15;
    else if (outUnit == 'F')
        inValue = inValue * 1.8 + 32;

    outValueNode.value = Math.round((inValue + Number.EPSILON) * 100) / 100;
};


// Zadanie 9
// https://stackoverflow.com/a/17445304
const gcd = (a, b) => {
    if (!b) return a;
    return gcd(b, a % b);
};

const
    GCDfirstNumberNode = $('#js-9-num1'),
    GCDsecondNumberNode = $('#js-9-num2'),
    GCDbutton = $('#js-9-btn'),
    GCDparagraph = $('#js-9-p');

GCDbutton.addEventListener('click', () => {
    let
        x = GCDfirstNumberNode.value,
        y = GCDsecondNumberNode.value;
    GCDparagraph.innerHTML = `NWD(${x}, ${y})=${gcd(x, y)}`;
})


// Zadanie 10
const
    clacUpperScreen = $('#js-10-upper'),
    calcLowerScreen = $('#js-10-lower'),
    calcOps = $all('.js-10-ops');

calcOps.forEach((v) => {
    v.addEventListener('click', () => {
        let
            x = Number(clacUpperScreen.value),
            y = Number(calcLowerScreen.value),
            o = v.value;

        switch (o) {
            case '+':
                x += y;
                break;
            case '-':
                x -= y;
                break;
            case '*':
                x *= y;
                break;
            case '/':
                x /= y;
                break;
        }

        clacUpperScreen.value = x;
        calcLowerScreen.value = 0;
    })
})
