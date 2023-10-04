//1. Egy tömbben tároljuk egy processzor hőmérsékleteit. Ellenőrizd, hogy a folyamat teljes ideje alatt a hőmérséklet végig 70 fok, vagy az alatt volt-e. (1 pont)
console.log("1. feladat");

const cpuTemp = randomArray(10, 60, 75);

function checkTemp(cpuTemp) {
    return cpuTemp.every(temp => temp <= 70);
}

console.assert(checkTemp([60, 60, 64, 68, 66, 67, 68, 69, 65, 65]) === true, "A hőmérséklet nem jó!");
console.assert(checkTemp([60, 60, 64, 68, 66, 67, 68, 70, 65, 65]) === true, "A hőmérséklet nem jó!");
console.assert(checkTemp([60, 60, 64, 68, 66, 67, 68, 71, 65, 65]) === false, "A hőmérséklet nem jó!");



//2. Egy tömbben tároljuk emberek neveit. Válogasd ki azokat, akiknek a nevében van "a" betű. (1 pont)
console.log("2. feladat");

const names = ["John Doe", "Jane Doe", "John Smith", "Jane Smith"];

function filterNames(names) {
    return names.filter(name => name.includes('a'));
}

console.assert(compareArrays(filterNames(["John Doe", "Jane Doe", "John Smith", "Jane Smith"]), ['Jane Doe', 'Jane Smith']), "A nevek nem jók");



//3.a Szöveg leghosszabb szavának megkeresése (1 pont)
//3.b egyező hosszúságú esetén az utolsót (1 pont)
console.log("3. feladat");

const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit";

function longestWord(text) {
    return text.split(' ').reduce((longest, currentWord) => {
        return currentWord.length >= longest.length ? currentWord : longest;
    });
}

console.assert(longestWord("Lorem ipsum dolor sit amet consectetur elit") === "consectetur", "A leghosszabb szó nem jó!");
console.assert(longestWord("asd sda das") === "das", "A leghosszabb szó nem jó!");



//4.a. Az oldalon lévő gomb megnyomására indíts el egy számlálót 10-től visszafelé és írd ki egy szövegobozba az állását minden egyes tick esetén (1 pont)
//4.b. Amikor eléri a 0-t, akkor állítsd le a számlálót (1 pont)
//4.c. A számlálót csak akkor lehessen elindítani amikor nem fut jelenleg is a számlálás, amiről adjunk visszajelzést a console-ra, ha éppen fut (ha véget ért, akkor újra el lehessen indítani) (1 pont)
console.log("4. feladat");

addEventListener('load', () => {
    timerButton.addEventListener('click', () => startTimer());
});

let interval = undefined;
function startTimer() {
    if (interval != undefined)
    {
        console.log("A számláló jelenleg is fut");
        return;
    }

    let counter = 10;

    interval = setInterval(() => {
        counter--;
        timerTextbox.value = counter;

        if (counter == 0) {
            clearInterval(interval);
            interval = undefined;
        }
    }, 1000);
}



//5.a. Hozz létre egy szövegdobozokat 2x10 elrendezésben a html fájlban (vagy scripttel generáld le) (1 pont)
//5.b. Oldd meg, hogy ha megváltoztatjuk a baloldali szövegdoboz tartalmát, akkor ugyanabban a sorban jobb oldali is változzon meg (1 pont)
//5.c. Oldd meg delegálás segítségével, vagyis ne hozz létre egy-egy eseménykezelőt minden szövegdobozhoz (1 pont)
console.log("5. feladat")

addEventListener('load', () => {
    copyTable.addEventListener('input', copyValue)
})

function copyValue(event)
{
    if (event.target.tagName !== 'INPUT') return;

    document.getElementById(event.target.id + "To").value = event.target.value;
}



//UTILS
function randomArray(length, min, max) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function compareArrays(arr1, arr2) {
    return arr1.length == arr2.length && arr1.every((element, index) => element === arr2[index]);
}