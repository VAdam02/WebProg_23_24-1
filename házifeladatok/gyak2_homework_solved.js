/*
Minden script, ami az előre létrehozott, statikus html oldal egy elemére hivatkozik (pl input mezők, gombok, div, stb) az csak és kizárólag az oldal "load" eseménye után hivatkozhat rájuk, mert addig még nem léteznek.
Mostantól szokjunk hozzá ahhoz a módszerhez, hogy a script elején az oldal load eventlistenerjében iratkozunk fel a statikus oldal elemeinek eseményeire és ezzel bebiztosítjuk magunkat, hogy nem kapunk hibát pusztán amiatt, hogy a script hol lett include-olva a html oldalba.
*/

//az egyes feladatok input mezőinek grafikus elkülönítését oldjuk meg valamilyen formában, amihez használható például az órán látott stílus is

addEventListener("load", () => {
    console.log("Page loaded");

    //TODO EVENTLISTENERS GOES HERE

    setTimeout(() => { interval = setInterval(count, 1000); }, 2000);

    circleRadius.addEventListener("change", calculatePerimeter);
    circleAreaButton.addEventListener("click", calculateArea);

    tableButton.addEventListener("click", addRow);

    bookButton.addEventListener("click", addBook);
    yearSearchButton.addEventListener("click", searchByYear);

    fillPublisherSelect();

    publisherSelect.addEventListener("change", fillTableByPublisher);
});

//15.a. Készíts egy számlálót, ami az oldal betöltése óta eltelt másodperceket írja ki. A számlálást setInterval segítségével valósítsd meg! (5 perc)
//15.b. A számlálás csak 3 másodperccel az oldal betöltése után induljon el, amit timeout segítségével valósíts meg
//https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
console.log("15. feladat");

let counter = 0;
let interval = null;

function count()
{
    counter++;
    counterP.innerHTML = counter;
}

//4. Írj egy kör kerületét, területét kiszámoló programot! (5 perc)
//A kör sugarát a felhasználó adja meg egy input mezőben.
//4.a. A kör kerülete automatikusan számolódjon újra ha új értéket adunk meg a sugárnak.
console.log("4.a. feladat");

function calculatePerimeter()
{
    let radius = circleRadius.value;

    if (!radius.match(/^\d+$/)) return;

    let perimeter = 2 * radius * Math.PI;

    circlePerimeterP.innerHTML = perimeter;
}

//4.b. A kör területe csak akkor számolódjon újra, ha a felhasználó rákattint egy gombra.
console.log("4.b. feladat");

function calculateArea()
{
    let radius = circleRadius.value;

    if (!radius.match(/^\d+$/)) return;

    let area = radius * radius * Math.PI;

    circleAreaP.innerHTML = area;
}

//11.a. Adott egy három oszlopból álló táblázat! A táblázat felett 3 szöveges beviteli mezővel és egy gombbal. A gombra kattintva a 3 beviteli mező értéke új sorként szúródjon be a táblázatba. (5 perc)
//11.b. Csak akkor adjuk hozzá, ha mind a 3 cella tartalma nem üres
//11.c. A gombra kattintva a beviteli mezők tartalma ürüljön ki
console.log("11. feladat");

function addRow()
{
    let value1 = tableInput1.value;
    let value2 = tableInput2.value;
    let value3 = tableInput3.value;

    if (value1 == "" || value2 == "" || value3 == "") return;

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.textContent = value1;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.textContent = value2;
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.textContent = value3;
    tr.appendChild(td3);

    table.appendChild(tr);

    tableInput1.value = "";
    tableInput2.value = "";
    tableInput3.value = "";
}

//14. Adott egy könyvtári nyilvántartás. Egy könyvről a következő adatokat tároljuk (hozzunk létre neki egy objektumot): (15 perc)
//szerző
//cím
//kiadás éve
//kiadó
//ISBN szám

class Book
{
    constructor(author, title, year, publisher, isbn)
    {
        this.author = author;
        this.title = title;
        this.year = year;
        this.publisher = publisher;
        this.isbn = isbn;
    }
}

let books = [
    new Book("J. K. Rowling", "Harry Potter and the Philosopher's Stone", 1997, "Bloomsbury", "9780747532743"),
    new Book("J. K. Rowling", "Harry Potter and the Chamber of Secrets", 1998, "Bloomsbury", "9780747538493"),
    new Book("J. K. Rowling", "Harry Potter and the Prisoner of Azkaban", 1999, "Bloomsbury", "9780747542155"),
    new Book("J. K. Rowling", "Harry Potter and the Goblet of Fire", 2000, "Bloomsbury", "9780747551003"),
    new Book("J. K. Rowling", "Harry Potter and the Order of the Phoenix", 2003, "Bloomsbury", "9780747551003"),
    new Book("J. K. Rowling", "Harry Potter and the Half-Blood Prince", 2005, "Bloomsbury", "9780747581086"),
    new Book("J. K. Rowling", "Harry Potter and the Deathly Hallows", 2007, "Bloomsbury", "9780747591054"),
    new Book("J. R. R. Tolkien", "The Hobbit", 1937, "Allen & Unwin", "9780048231470"),
    new Book("J. R. R. Tolkien", "The Lord of the Rings", 1954, "Allen & Unwin", "9780618640157"),
    new Book("J. R. R. Tolkien", "The Silmarillion", 1977, "Allen & Unwin", "9780007284257"),
    new Book("J. R. R. Tolkien", "The Children of Húrin", 2007, "HarperCollins", "9780007246224")
];

//14.a. Biztosíts lehetőséget új könyvek felvételéhez
console.log("14.a. feladat");

function addBook()
{
    let author = authorInput.value;
    let title = titleInput.value;
    let year = yearInput.value;
    let publisher = publisherInput.value;
    let isbn = isbnInput.value;

    if (author == "" || title == "" || year == "" || publisher == "" || isbn == "") return;

    if (!year.match(/^\d+$/)) return;

    let book = new Book(author, title, year, publisher, isbn);
    books.push(book);

    authorInput.value = "";
    titleInput.value = "";
    yearInput.value = "";
    publisherInput.value = "";
    isbnInput.value = "";

    fillPublisherSelect();
}

//14.b. Felületen kérj be egy évszámot, és listázd ki az abban az évben megjelent könyvek címét! (tömbfüggvény segítségével válogasd ki és fűzd össze a címeket), ha pedig nincs találat, akkor írd ki, hogy "Nincs találat!"
console.log("14.b. feladat");

function searchByYear()
{
    let year = yearSearchInput.value;

    if (!year.match(/^\d+$/)) return;

    let output = books.filter(book => book.year == year).map(book => book.title).join(", ");
    if (output == "") output = "Nincs találat!";

    yearSearchOutput.innerHTML = output;
}

//14.c. Készíts egy legördülő mezőt, amelyben az egyes kiadók vannak felsorolva. Ha kiválasztunk egy kiadót a legördülő listából, akkor táblázatos formában jelenítsd meg a kiválasztott kiadóhoz tartozó könyveket! A legördülő lista választéka automatikus frissüljön, ha új könyvet adunk hozzá egy új kiadóval
//tipp: az ismétlődések kiszűrésére használható a tömbfüggvény filter és indexOf kombinációja
//a filternek felhasználjuk mind a 3 inputját és minden egyes elemnél megvizsgáljuk, hogy a most vizsgált értéknek az indexe megegyezik-e a tömbben az indexOf-al, ami az első előfordulásának helyét adja vissza, ha megegyezik, akkor megtartjuk, ha nem egyezik meg, akkor eldobjuk
console.log("14.c. feladat");

function fillPublisherSelect()
{
    let publishers = books.map(book => book.publisher).filter((value, index, self) => self.indexOf(value) === index);

    publisherSelect.innerHTML = "";
    publishers.forEach(publisher => {
        let option = document.createElement("option");
        option.value = publisher;
        option.textContent = publisher;
        publisherSelect.appendChild(option);
    });
}

function fillTableByPublisher()
{
    let publisher = publisherSelect.value;

    let output = books.filter(book => book.publisher == publisher).map(book => `<tr><td>${book.author}</td><td>${book.title}</td><td>${book.year}</td><td>${book.isbn}</td></tr>`).join("");

    publisherTable.innerHTML = "<tr><th>Szerző</th><th>Cím</th><th>Év</th><th>Kiadó</th><th>ISBN</th></tr>" + output;
}