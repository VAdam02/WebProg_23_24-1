//BASIC TUTORIAL TASKS: (5 perc)

//6. Adott egy pont a síkon. Írj függvényt, amely megmondja, hogy a pont melyik síknegyedbe esik!
//basic syntax: function, if-else, return
console.log("6. feladat");

//TODO solve here

console.assert(quadrant(1, 1) === 1, "1, 1 should be in the first quadrant");
console.assert(quadrant(-1, 1) === 2, "-1, 1 should be in the second quadrant");
console.assert(quadrant(-1, -1) === 3, "-1, -1 should be in the third quadrant");
console.assert(quadrant(1, -1) === 4, "1, -1 should be in the fourth quadrant");
console.assert(quadrant(0, 0) === 0, "0, 0 should be in the center");

//10. Adott a és b egész szám. Osztás művelete nélkül add meg a-nak b-vel való osztásakor keletkező maradékot.
//basic syntax: function, while, return
console.log("10. feladat");

//TODO solve here

console.assert(modulo(10, 5) === 0, "modulo(10, 5) should be 0");
console.assert(modulo(10, 3) === 1, "modulo(10, 3) should be 1");
console.assert(modulo(10, 4) === 2, "modulo(10, 4) should be 2");
console.assert(modulo(0, 10) === 0, "modulo(0, 10) should be 0");


//PREDICATE TUTORIAL TASKS: (5 perc) (dokumentációt igényel)

//12. Egy sorozatban keresd meg az elsőt, ami megfelel a predikátumnak.

//12.a. Oldd meg egy új függvény létrásával
//basic syntax: function, for, if, return, predicate
console.log("12.a. feladat");

//TODO solve here

console.assert(find([1, 2, 3, 4, 5], x => x < 0) === -1, "find([1, 2, 3, 4, 5], x => x < 0) should be -1");
console.assert(find([1, 2, 3, -4, 5], x => x < 0) == 3, "find([1, 2, 3, -4, 5], x => x < 0) should be 3");
console.assert(find([1, 2, 3, 4, 5], x => x % 2 === 1) == 0, "find([1, 2, 3, 4, 5], x => x % 2 === 1) should be 0");
console.assert(find([1, 2, 3, 4, 5], x => x % 2 === 0) == 1, "find([1, 2, 3, 4, 5], x => x % 2 === 0) should be 1");
console.assert(find([1, 2, 3, 4, 5], x => x === factorial(2)) == 1, "find([1, 2, 3, 4, 5], x => x === factorial(2)) should be 1");

//12.b. Oldd meg ugyanezt arrow function (const változóban megírt => függvény) és tömbfüggvény segítségével
//basic syntax: arrow function, predicate, array method
console.log("12.b. feladat");

//TODO solve here
//const find2 = 

console.assert(find2([1, 2, 3, 4, 5], x => x < 0) === find([1, 2, 3, 4, 5], x => x < 0), "find2([1, 2, 3, 4, 5], x => x < 0) should be -1");
console.assert(find2([1, 2, 3, -4, 5], x => x < 0) == find([1, 2, 3, -4, 5], x => x < 0), "find2([1, 2, 3, -4, 5], x => x < 0) should be 3");
console.assert(find2([1, 2, 3, 4, 5], x => x % 2 === 1) == find([1, 2, 3, 4, 5], x => x % 2 === 1), "find2([1, 2, 3, 4, 5], x => x % 2 === 1) should be 0");
console.assert(find2([1, 2, 3, 4, 5], x => x % 2 === 0) == find([1, 2, 3, 4, 5], x => x % 2 === 0), "find2([1, 2, 3, 4, 5], x => x % 2 === 0) should be 1");
console.assert(find2([1, 2, 3, 4, 5], x => x === factorial(2)) == find([1, 2, 3, 4, 5], x => x === factorial(2)), "find2([1, 2, 3, 4, 5], x => x === factorial(2)) should be 1");

//TÖMBFÜGGVÉNYEK: (10 perc) (dokumentációt igényel)

//19. Adott egy matematikai kifejezés, ami (, [ és { zárójeleket is használ. Döntsd el egy verem segítségével, hogy helyes-e a zárójelezés!
//for, if-else, push, pop
console.log("19. feladat");

//TODO solve here

console.assert(isParenthesisValid("()") === true, "isParenthesisValid('()') should be true");
console.assert(isParenthesisValid("[]") === true, "isParenthesisValid('[]') should be true");
console.assert(isParenthesisValid("{}") === true, "isParenthesisValid('{}') should be true");
console.assert(isParenthesisValid("()[]{}") === true, "isParenthesisValid('()[]{}') should be true");
console.assert(isParenthesisValid("([{}])") === true, "isParenthesisValid('([{}])') should be true");
console.assert(isParenthesisValid("(") === false, "isParenthesisValid('(') should be false");
console.assert(isParenthesisValid(")") === false, "isParenthesisValid(')') should be false");
console.assert(isParenthesisValid("([)]") === false, "isParenthesisValid('([)]') should be false");
console.assert(isParenthesisValid("([)") === false, "isParenthesisValid('([)') should be false");

//29. Pár napon keresztül minden délben megmértük a levegő hőmérsékletét.
//array method

//29.a. Válogasd ki azokat az értékeket, amikor fagyott!
console.log("29.a. feladat");

//TODO solve here

console.assert(compareArrays(freezing([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), []), "freezing([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) should be []");
console.assert(compareArrays(freezing([-1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), [-1]), "freezing([-1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) should be [-1]");
console.assert(compareArrays(freezing([-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]), [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]), "freezing([-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]) should be [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]");
console.assert(compareArrays(freezing([5, -4, 4, 10, 0, 3, 5, 1, "alma"]), [-4]), "freezing([5, -4, 4, 10, 0, 3, 5, 1, 'alma']) should be [-4]");

//29.b. Mindegyik hőmérséklet érték végére fűzd oda a C szöveget!
console.log("29.b. feladat");

//TODO solve here

console.assert(compareArrays(addC([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C"]), "addC([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) should be ['1C', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C']");

//29.c. Add meg a legmagasabb hőmérséklet értékét!
console.log("29.c. feladat");

//TODO solve here

console.assert(max([1, 2, 3, 4, 5, 6, 7, 8, 11, 10]) === 11, "max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) should be 11");

//29.d. Add meg, hányszor ment a hőmérséklet 20 fok alá!
console.log("29.d. feladat");

//TODO solve here

console.assert(countBelow20([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === 10, "countBelow20([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) should be 10");
console.assert(countBelow20([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -20]) === 11, "countBelow20([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -20]) should be 11");
console.assert(countBelow20([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -20, 20]) === 11, "countBelow20([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -20, 20]) should be 11");
console.assert(countBelow20([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -20, 20, 21]) === 11, "countBelow20([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -20, 20, 21]) should be 11");

//29.e. Döntsd el, van-e 40 fok fölötti érték!
console.log("29.e. feladat");

//TODO solve here

console.assert(hasAbove40([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === false, "hasAbove40([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) should be false");
console.assert(hasAbove40([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 40]) === false, "hasAbove40([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 40]) should be false");
console.assert(hasAbove40([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 40, 41]) === true, "hasAbove40([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 40, 41]) should be true");

//29.f. Döntsd el, hogy mindegyik hőmérsékletérték pozitív-e!
console.log("29.f. feladat");

//TODO solve here

console.assert(allPositive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === true, "allPositive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) should be true");
console.assert(allPositive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -40]) === false, "allPositive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -40]) should be false");

//29.g. Add meg az első olyan értéket, amikor 10 fok fölé ment a hőmérséklet!
console.log("29.g. feladat");

//TODO solve here

console.assert(firstAbove10([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === undefined, "firstAbove10([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) should be undefined");
console.assert(firstAbove10([1, 2, 3, 4, 5, 6, 7, 11, 9, 10, 10]) === 11, "firstAbove10([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) should be 11");

//ADATSZERKEZETEK: (2 perc)

//21. Egy űrlap adatainak ellenőrzése során számos hiba lehet. Készítsd el azt az adatszerkezetet, amelyekben a hibákat tárolod (szöveges típus, szöveges megjegyzés). Írd ki konzolra külön külön az egyes hibaüzeneteket!
//class, constructor, method, array method
//javasolt létrehozni egy ValidationError osztályt is az egyes hibák tárolására és kiírására
console.log("21. feladat");

//TODO solve here

let validationManager = new ValidationManager();
validationManager.addError("email", "Invalid email address");
validationManager.addError("password", "Password must be at least 8 characters long");
validationManager.addError("password", "Password must contain at least one uppercase letter");
validationManager.addError("password", "Password must contain at least one lowercase letter");
validationManager.addError("password", "Password must contain at least one number");
validationManager.addError("password", "Password must contain at least one special character");
validationManager.addError("password", "Password must not contain spaces");

console.assert(validationManager.getErrors() === "email: Invalid email address\npassword: Password must be at least 8 characters long\npassword: Password must contain at least one uppercase letter\npassword: Password must contain at least one lowercase letter\npassword: Password must contain at least one number\npassword: Password must contain at least one special character\npassword: Password must not contain spaces", "validationManager.getErrors() should be 'email: Invalid email address\npassword: Password must be at least 8 characters long\npassword: Password must contain at least one uppercase letter\npassword: Password must contain at least one lowercase letter\npassword: Password must contain at least one number\npassword: Password must contain at least one special character\npassword: Password must not contain spaces'");
validationManager.printErrors();


//ADATSZERKEZETEK ÉS TÖMBFÜGGVÉNY HALADÓ: (8 perc)

//27. Filmekről szeretnénk adatokat tárolni (cím, hossz, kategória, év, rendezők, színészek).
//class, constructor, method, array method
console.log("27. feladat");

//TODO solve here

let movies = [
    new Movie("Avatar", 162, "action", 2009, ["James Cameron"], ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"]),
    new Movie("Titanic", 194, "drama", 1997, ["James Cameron"], ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"]),
    new Movie("Star Wars: Episode VII - The Force Awakens", 138, "action", 2015, ["J.J. Abrams"], ["Daisy Ridley", "John Boyega", "Oscar Isaac"]),
    new Movie("Avengers: Endgame", 181, "action", 2019, ["Anthony Russo", "Joe Russo"], ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"]),
    new Movie("Jurassic World", 124, "action", 2015, ["Colin Trevorrow"], ["Chris Pratt", "Bryce Dallas Howard", "Ty Simpkins"]),
    new Movie("The Lion King", 118, "animation", 1994, ["Roger Allers", "Rob Minkoff"], ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"]),
    new Movie("The Dark Knight", 152, "action", 2008, ["Christopher Nolan"], ["Christian Bale", "Heath Ledger", "Aaron Eckhart"])
];

//27.a. Listázd ki a filmek címének első 10 karakterét és zárójelben a kiadás évét egy tömbben
console.log("27.a. feladat");

//TODO solve here

console.assert(compareArrays(first10Chars(movies), ['Avatar (2009)', 'Titanic (1997)', 'Star Wars: (2015)', 'Avengers:  (2019)', 'Jurassic W (2015)', 'The Lion K (1994)', 'The Dark K (2008)']), "first10Chars(movies) should be ['Avatar (2009)', 'Titanic (1997)', 'Star Wars: (2015)', 'Avengers:  (2019)', 'Jurassic W (2015)', 'The Lion K (1994)', 'The Dark K (2008)']");

//27.b. Listázd ki azokat a filmeket, amelyeknek több rendezője is van
console.log("27.b. feladat");

//TODO solve here

console.assert(compareArrays(multipleDirectors(movies), ["Avengers: Endgame (2019)", "The Lion King (1994)"]), "multipleDirectors(movies) should be ['Avengers: Endgame (2019)', 'The Lion King (1994)']");

//27.c. Add meg a leghosszabb film objektumot
console.log("27.c. feladat");

//TODO solve here

console.assert(longestMovie(movies).toString() === "Titanic (1997)", "longestMovie(movies) should be 'Titanic (1997)'");

//27.d. Add meg azokat a filmeket, amelyekben egy paraméterként megkapott színész játszik egy tömbben
console.log("27.d. feladat");

//TODO solve here

console.assert(compareArrays(moviesWithActor(movies, "Leonardo DiCaprio"), ["Titanic (1997)"]), "moviesWithActor(movies, 'Leonardo DiCaprio') should be ['Titanic (1997)']");


//UTILS
function factorial(n)
{
    let result = 1;
    for (let i = 2; i <= n; i++)
    {
        result *= i;
    }
    return result;
}

function compareArrays(arr1, arr2)
{
    if (arr1.length !== arr2.length) { return false; }
    for (let i in arr1)
    {
        if (arr1[i] !== arr2[i]) { return false; }
    }
    return true;
}
