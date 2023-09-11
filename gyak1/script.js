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

function lkkt(a, b)
{
    let x = a;
    let y = b;

    while (x !== y)
    {
        if ( x<y)
        {
            x += a;
        }
        else
        {
            y += b;
        }
    }

    return x;
}

function factorial(n)
{
    let result = 1;

    for (let i = 2; i <= n; i++)
    {
        result *= i;
    }

    return result;
}

function factorial2(n)
{
    let result = 1;
    while (n > 1)
    {
        result *= n;
        n--;
    }
    return result;
 }

 function randomArray(min, max, count)
 {
    let arr = [];
    for (var i = 0; i < count; i++)
    {
        arr.push(Math.floor(Math.random() * (max -min +1)) + min);
    }
    return arr;
 }


 function asd(a)
 {
    return ;
    a;
 }

 let xy = randomArray(1, 10, 4).filter((number) => number > 5)
 .filter((number) => number % 2 === 0);

 console.log(randomArray(1, 10, 10).findIndex((number) => number > 5));



 console.log(randomArray(1, 10, 10).every((number) => number > 0));

 function isMatrixAllEven(matrix)
 {
    return matrix.every(row => row.every(element => element % 2 === 0));
 }


 function nonZeroRowsCount(matrix)
 {
    return matrix.filter(row => row.every(element => element !== 0)).length;
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

    add(product)
    {
        this.stock.push(product);
    }

    get()
    {
        return this.stock.map(product => product.name).join("\n") + "\n";
    }

    getLeastProduct()
    {
        return this.stock.reduce((least, product) => product.quantity < least.quantity ? product : least, this.stock[0]).name;
    }
}

let warehouse = new Warehouse();
warehouse.add(new Product("alma", "alma kft", 10010, 100, 10));
warehouse.add(new Product("körte", "körte kft", 10210, 110, 15));
warehouse.add(new Product("narancs", "narancs kft", 10410, 120, 13));
warehouse.add(new Product("másmilyen alma", "alma kft", 10510, 90, 12));

