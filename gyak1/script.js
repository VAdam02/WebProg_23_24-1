console.log("Helloo világ");

const szum = 5;
const elvalaszto = "29";
const alma = 6;

console.log(szum + elvalaszto + alma);

for (let i = 0; i<10; i++)
{
    if (i % 2 === 0)
    {
    console.log("hello world");
    }
}

function fahrenheitToCelsius(fahrentheit)
{
    return (fahrentheit -32) / 1.8;
}

const fahrenheitToCelsius2 = fahrenheitToCelsius;

const fahrenheitToCelsius3 = (fahrentheit) => (fahrentheit - 32) /1.8;

let fahrenheitToCelsius4 = fahrenheitToCelsius;

function percentage(number, percent)
{
    return number* percent / 100;
}

const percentage2 = (number, percent) => number * percent / 100;


function swap(a, b)
{
    let c = a;
    a = b;
    b = c;
}

function lnko (a, b)
{
    if (a < b)
    {
        swap(a, b);
    }

    let maradek = a % b;
    while (maradek > 0)
    {
        a = b;
        b = maradek;
        maradek = a % b;
    }
    return b;
}