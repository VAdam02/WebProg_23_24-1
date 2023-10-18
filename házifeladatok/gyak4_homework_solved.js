//Akasztófa
//A feladat részletes leírása itt található:
//http://webprogramozas.inf.elte.hu/#!/subjects/webprog-pti/gyak/akasztofa/akasztofa
//Nem kötelező végig megcsinálni minden egyes feladatot a pluszpontért, mert több időt igénybe
//tud venni az elkészítése, de egy reális mennyiséget csináljatok meg belőle és adjátok be.
//Ez a feladat már elkezd projektben gondolkodtatni és alaposan gyakoroltatja veletek a
//tanultakat, így javasolt foglalkozni vele, mert megkönnyítheti a beadandó elkészítésének
//menetét.

addEventListener("load", () => {
    newGameButton.addEventListener("click", startGame);
    characters.addEventListener("click", tipp)
})

const abc = "abcdefghijklmnopqrstuvwxyz";
const possibleWords = ["apple", "ball", "cat", "dog", "elephant", "fish", "giraffe", "horse", "ice", "jelly", "kite", "lion", "monkey", "nut", "owl", "pig", "queen", "rabbit", "snake", "tiger", "umbrella", "vase", "whale", "xylophone", "yoyo", "zebra"]
const maxTips = 10;

let chosenWord;
let goodTips;
let badTips;

function startGame() {
    characters.innerHTML = abc.split('').map(c => `<button>${c}</button>`).join('');

    chosenWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    goodTips = [];
    badTips = [];

    Array.from(visualisation.childNodes).filter(c => c.tagName).forEach(c => { c.classList.remove("rajzol"); });

    printWordByTips();
}

function printWordByTips() {
    if (!chosenWord) return;

    if (badTips.length < maxTips) displayedWord.innerHTML = chosenWord.split('').map(c => goodTips.includes(c) ? c : '_').map(c => `<span>${c}</span>`).join('');
    else displayedWord.innerHTML = chosenWord.split('').map(c => goodTips.includes(c) ? `<span>${c}</span>` : `<span style="color: red">${c}</span>`).join('');

    tippCountDisplay.innerHTML = badTips.length + "/" + maxTips;
}

function tipp(event) {
    if (badTips.length >= maxTips) return;
    if (chosenWord.split('').every(c => goodTips.includes(c))) return;
    if (event.target.tagName != "BUTTON") return;

    let tip = event.target.textContent[0];
    if (chosenWord.includes(tip)) goodTips.push(tip);
    else {
        badTips.push(tip);

        Array.from(visualisation.childNodes).filter(c => c.tagName)[badTips.length - 1].classList.add("rajzol");
    }

    event.target.disabled = true;

    printWordByTips();
}