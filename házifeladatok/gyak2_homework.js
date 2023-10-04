/*
Minden script, ami az előre létrehozott, statikus html oldal egy elemére hivatkozik (pl input mezők, gombok, div, stb) az csak és kizárólag az oldal "load" eseménye után hivatkozhat rájuk, mert addig még nem léteznek.
Mostantól szokjunk hozzá ahhoz a módszerhez, hogy a script elején az oldal load eventlistenerjében iratkozunk fel a statikus oldal elemeinek eseményeire és ezzel bebiztosítjuk magunkat, hogy nem kapunk hibát pusztán amiatt, hogy a script hol lett include-olva a html oldalba.
*/

//az egyes feladatok input mezőinek grafikus elkülönítését oldjuk meg valamilyen formában, amihez használható például az órán látott stílus is

addEventListener("load", () => {
    console.log("Page loaded");

    //TODO EVENTLISTENERS GOES HERE

});

//15.a. Készíts egy számlálót, ami az oldal betöltése óta eltelt másodperceket írja ki. A számlálást setInterval segítségével valósítsd meg! (5 perc)
//15.b. A számlálás csak 3 másodperccel az oldal betöltése után induljon el, amit timeout segítségével valósíts meg
//https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
console.log("15. feladat");

//TODO solve here

//4. Írj egy kör kerületét, területét kiszámoló programot! (5 perc)
//A kör sugarát a felhasználó adja meg egy input mezőben.
//4.a. A kör kerülete automatikusan számolódjon újra ha új értéket adunk meg a sugárnak.
console.log("4.a. feladat");

//TODO solve here

//4.b. A kör területe csak akkor számolódjon újra, ha a felhasználó rákattint egy gombra.
console.log("4.b. feladat");

//TODO solve here

//11.a. Adott egy három oszlopból álló táblázat! A táblázat felett 3 szöveges beviteli mezővel és egy gombbal. A gombra kattintva a 3 beviteli mező értéke új sorként szúródjon be a táblázatba. (5 perc)
//11.b. Csak akkor adjuk hozzá, ha mind a 3 cella tartalma nem üres
//11.c. A gombra kattintva a beviteli mezők tartalma ürüljön ki
console.log("11. feladat");

//TODO solve here

//14. Adott egy könyvtári nyilvántartás. Egy könyvről a következő adatokat tároljuk (hozzunk létre neki egy objektumot): (15 perc)
//szerző
//cím
//kiadás éve
//kiadó
//ISBN szám

//TODO solve here

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

//TODO solve here

//14.b. Felületen kérj be egy évszámot, és listázd ki az abban az évben megjelent könyvek címét! (tömbfüggvény segítségével válogasd ki és fűzd össze a címeket), ha pedig nincs találat, akkor írd ki, hogy "Nincs találat!"
console.log("14.b. feladat");

//TODO solve here

//14.c. Készíts egy legördülő mezőt, amelyben az egyes kiadók vannak felsorolva. Ha kiválasztunk egy kiadót a legördülő listából, akkor táblázatos formában jelenítsd meg a kiválasztott kiadóhoz tartozó könyveket! A legördülő lista választéka automatikus frissüljön, ha új könyvet adunk hozzá egy új kiadóval
//tipp: az ismétlődések kiszűrésére használható a tömbfüggvény filter és indexOf kombinációja
//a filternek felhasználjuk mind a 3 inputját és minden egyes elemnél megvizsgáljuk, hogy a most vizsgált értéknek az indexe megegyezik-e a tömbben az indexOf-al, ami az első előfordulásának helyét adja vissza, ha megegyezik, akkor megtartjuk, ha nem egyezik meg, akkor eldobjuk
console.log("14.c. feladat");

//TODO solve here