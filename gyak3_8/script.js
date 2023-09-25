
let elemek;
addEventListener('load', function () {
    elemek = document.querySelectorAll('div.alma');
    console.log(elemek);
    console.log(Array.from(elemek));

    console.log(document.querySelector('div#korte'));

    console.log(document.querySelector('#korte'));

    console.log(document.querySelector('div.alma > p'));

    console.log(document.querySelector('div.alma > p:nth-child(2)'));


    document.querySelector('div.task p:nth-child(2)').addEventListener('click', basicDelagation);
});


function basicDelagation(event) {
    console.log(event);

    console.log(event.target);
    console.log([event, event.clientX, event.clientY]);

    if (event.target.tagName === 'A')
    {
        if (event.target.innerHTML === 'dolor') event.preventDefault();
    }
}

addEventListener('click', preventNotElte)

function preventNotElte (event) {
    if (event.target.tagName !== 'A') return;

    let href = event.target.getAttribute('href');
    console.log(href);

    //regex nem lesz számonkérve csak könnyebb mint 20 if
    if (href.match(/^(https?:\/\/)?([a-zA-Z0-9.]+\.)?elte\.hu(\/.*)?/g) == null)
    {
        event.preventDefault();
    }
}

addEventListener('input', csakSzamotFogadEl);


function csakSzamotFogadEl(event) {
    if (event.target.tagName !== 'INPUT' || !event.target.classList.contains('csakSzam')) return;

    event.target.value = event.target.value.replace(/[^0-9]/g, '');

    console.log("csak szamot fogad el")
}


let firstClicked = null;

addEventListener('load', function () 
{
    csere.addEventListener('click', swapLi)
});

function swapLi(event) {
    if (event.target.tagName !== 'LI') return;

    if (firstClicked == null)
    {
        firstClicked = event.target;
        firstClicked.style.fontWeight = 'bold';
    }
    else
    {
        firstClicked.style.fontWeight = 'normal';
        let temp = firstClicked.innerHTML;
        firstClicked.innerHTML = event.target.innerHTML;
        event.target.innerHTML = temp;
        firstClicked = null;
    }

    csere.style.backgroundColor = 'red';
}