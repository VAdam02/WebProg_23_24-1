//<Hallgató neve>
//<Neptun kódja>
//Webprogramozás - JavaScript csoport ZH
//Ezt a megoldást a fent írt hallgató küldte be és készítette 
//a Webprogramozás kurzus JavaScript csoport ZH-jához.
//Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy 
//használtam harmadik féltől származó megoldásokat. Nem továbbítottam 
//megoldást hallgatótársaimnak, és nem is tettem közzé. Az Eötvös Loránd 
//Tudományegyetem Hallgatói Követelményrendszere (ELTE szervezeti és 
//működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig, 
//amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak 
//jelentős részét - saját munkájaként mutatja be, az fegyelmi vétségnek számít. 
//A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.



//1. Egy tömbben tároljuk egy processzor hőmérsékleteit. Ellenőrizd, hogy a folyamat teljes ideje alatt a hőmérséklet végig 70 fok, vagy az alatt volt-e. (1 pont)
console.log("1. feladat");

const cpuTemp = randomArray(10, 60, 75);

//TODO SOLVE HERE

console.assert(checkTemp([60, 60, 64, 68, 66, 67, 68, 69, 65, 65]) === true, "A hőmérséklet nem jó!");
console.assert(checkTemp([60, 60, 64, 68, 66, 67, 68, 70, 65, 65]) === true, "A hőmérséklet nem jó!");
console.assert(checkTemp([60, 60, 64, 68, 66, 67, 68, 71, 65, 65]) === false, "A hőmérséklet nem jó!");



//2. Egy tömbben tároljuk emberek neveit. Válogasd ki azokat, akiknek a nevében van "a" betű. (1 pont)
console.log("2. feladat");

const names = ["John Doe", "Jane Doe", "John Smith", "Jane Smith"];

//TODO SOLVE HERE

console.assert(compareArrays(filterNames(["John Doe", "Jane Doe", "John Smith", "Jane Smith"]), ['Jane Doe', 'Jane Smith']), "A nevek nem jók");



//3.a Szöveg leghosszabb szavának megkeresése (1 pont)
//3.b Egyező hosszúságú esetén az utolsót (1 pont)
console.log("3. feladat");

const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit";

//TODO SOLVE HERE

console.assert(longestWord("Lorem ipsum dolor sit amet consectetur elit") === "consectetur", "A leghosszabb szó nem jó!");
console.assert(longestWord("asd sda das") === "das", "A leghosszabb szó nem jó!");



//4.a. Az oldalon lévő gomb megnyomására indíts el egy számlálót 10-től visszafelé és írd ki egy szövegobozba az állását minden egyes tick esetén (1 pont)
//4.b. Amikor eléri a 0-t, akkor állítsd le a számlálót (1 pont)
//4.c. A számlálót csak akkor lehessen elindítani amikor nem fut jelenleg is a számlálás, amiről adjunk visszajelzést a console-ra, ha éppen fut (ha véget ért, akkor újra el lehessen indítani) (1 pont)
console.log("4. feladat");

//TODO SOLVE HERE



//5.a. Hozz létre egy szövegdobozokat 2x10 elrendezésben a html fájlban (vagy scripttel generáld le) (1 pont)
//5.b. Oldd meg, hogy ha megváltoztatjuk a baloldali szövegdoboz tartalmát, akkor ugyanabban a sorban jobb oldali is változzon meg (1 pont)
//5.c. Oldd meg delegálás segítségével, vagyis ne hozz létre egy-egy eseménykezelőt minden szövegdobozhoz (1 pont)
console.log("5. feladat")

//TODO SOLVE HERE



//UTILS
function randomArray(length, min, max) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function compareArrays(arr1, arr2) {
    return arr1.length == arr2.length && arr1.every((element, index) => element === arr2[index]);
}