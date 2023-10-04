//1. válogasd ki egy tömbből a páros számokat (1 pont)
console.log("1. feladat");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

function filterEvenNumbers(numbers) {
    return numbers.filter(number => number % 2 == 0);
}

console.assert(compareArrays(filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]), [2, 4, 6, 8]), "A páros számok nem jók");



//2. keresd ki a legnagyobb abszolútértékű számot egy tömbből (1 pont)
console.log("2. feladat");

function findBiggestAbsoluteNumber(numbers) {
    return numbers.reduce((biggest, current) => Math.abs(current) > Math.abs(biggest) ? current : biggest);
}

console.assert(findBiggestAbsoluteNumber([1, -2, 3, -4, 5, -6, 7, -8]) === -8, "A legnagyobb abszolútértékű szám nem jó");



//3. hány szóból áll a leghosszabb karakterszámú névvel rendelkező személy neve? (2 pont)
console.log("3. feladat");

const names = ["Emma", "Benjamin James", "Sophia Rose", "Liam Alexander", "Olivia Grace", "Henry Joseph", "Mia Elizabeth", "Noah William", "Ava Charlotte Smith", "Ethan Daniel Johnson Williams"];

function countWordsInLongestName(names) {
    return names.reduce((longest, current) => current.length > longest.length ? current : longest).split(' ').length;
}

console.assert(countWordsInLongestName(names) === 4, "A leghosszabb név szavainak száma nem jó");



//4.a. egy gomb lenyomására írd ki consolera az oldal összes linkjének a szövegét (2 pont)
//4.b. csak akkor írd ki, ha hosszabb a szövege, mint 10 karakter (1 pont)
console.log("4. feladat");

addEventListener('load', () => {
    printLinksButton.addEventListener('click', () => printLinks());
});

function printLinks() {
    document.querySelectorAll('a').forEach(link => {
        if (link.textContent.length > 10) console.log(link.textContent);
    });
}



//5.a. Egy div-en belül hozz létre 5 db szövegdobozt (1 pont)
//5.b. Oldd meg, hogy ha megváltoztatjuk bármelyik szövegdoboz tartalmát, akkor a többiben is változzon meg (2 pont)
console.log("5. feladat");

addEventListener('load', () => {
    textBoxDiv.addEventListener('input', updateTextBoxes);
});

function updateTextBoxes(event) {
    textBoxDiv.querySelectorAll('input').forEach(textBox => textBox.value = event.target.value);
}



//UTILS
function compareArrays(arr1, arr2)
{
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}