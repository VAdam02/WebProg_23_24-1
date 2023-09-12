console.log("Hello világ");

const alma = 100;

let i = 0;
while (i < alma)
{
    console.log("Hello világ");
    i++;
}

let akarmi = "alma";
console.log(akarmi);
akarmi++;
console.log(akarmi);


console.log('"Hello" világ');

console.log("'Hello' világ");

console.log(`"Hello" 'világ' ${alma}`);

function fahrenheitToCelsius(fahrenheit)
{
    return (fahrenheit - 32) / 1.8;
}

console.assert(fahrenheitToCelsius(32) === 0);
//console.assert(fahrenheitToCelsius(212) === 101);


function percent(number, percent)
{
    return number * percent / 100;
}

function swap(a, b)
{
    const temp = a;
    a = b;
    b = temp;
}

function lnko(a, b)
{
    if (a < b)
    {
        swap(a, b);
    }

    let maradek = a % b;

    while (maradek !== 0)
    {
        a = b;
        b = maradek;
        maradek = a % b;
    }

    return b;
}



function randomArray(min, max, count)
{
    let arr = [];
    for (var i = 0; i < count; i++)
    {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

let arr = randomArray(1, 100, 10);

function biggerThan50(arr)
{
    let output = [];

    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i] > 50)
        {
            output.push(arr[i]);
        }
    }
    return output;
}

function biggerThan50_2(arr)
{
    return arr.filter(function (item) {
        return item > 50;
    });
}

function biggerThan50_3(arr)
{
    return arr.filter(item => item > 50);
}

const biggerThan50_4 = arr => arr.filter((item, index, self) => item > 50);


function randomMatrix(min, max, row, column)
{
    let matrix = [];
    for (var i = 0; i < row; i++)
    {
        matrix.push(randomArray(min, max, column));
    }
    return matrix;
}

let matrix = randomMatrix(1, 100, 10, 10);

function allIsEven(matrix)
{
    return matrix.every(row => row.every(item => item % 2 === 0));
}

function filterWithoutZero(matrix)
{
    return matrix.filter(row => row.every(item => item !== 0));
}

class Product
{
    constructor(name, manufacturer, sku, price, quantity)
    {
        this.name = name;
        this.manufacturer = manufacturer;
        this.sku = sku;
        this.price = price;
        this.quantity = quantity;
    }
}

class Warehouse
{
    constructor()
    {
        this.stock = [];
    }

    addProduct(product)
    {
        this.stock.push(product);
    }

    getTotalValue()
    {
        return this.stock.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
}