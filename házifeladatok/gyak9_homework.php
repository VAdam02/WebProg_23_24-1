<?php
/*
TELEFONKÖNYV

1. feladat (1.5 pont)
Készíts egy űrlapot, ahol bekérjük és POST kérés segítségével elküldjük a felhasználó nevét, telefonszámát és email címét

2. feladat (1.5 pont)
Validáld PHP kódból, hogy a beküldött adatok megfelelnek-e az alábbi követelményeknek:
- név 2-3 szóból álljon
- név maximum 50 karakter hosszú lehet (szóközzel együtt)
- név minimum 10 karakter hosszú legyen (szóközzel együtt)
- telefonszám 7-12 számjegy hosszú legyen (praktikus szövegként kezelni)
- email cím tartalmazzon @ jelet és legalább egy pontot a @ után (regex használata esetén segítség: [a-zA-Z0-9]+(\.[a-zA-Z0-9])*@[a-zA-Z0-9]+(\.[a-zA-Z0-9])+)

3. feladat (1 pont)
Az űrlap adatai legyenek állapottartóak, vagyis hibás beküldés esetén ne veszítsék el a mezők az értékeiket, helyes beküldés esetén pedig állítsd vissza az alapértelmezett értékeket és adj visszajelzést a felhasználónak

4. feladat (1 pont)
A beérkezett névjegyzékeket tárold el egy json fájlban (ne felejtd el a fájlt létrehozni egy üres JSON szerkezettel)

5. feladat (1 pont)
Csinálj egy keresőmezőt, ahol telefonszám alapján lehessen keresni a névjegyzékek között és írd ki a névjegyzék adatait

6. feladat (2 pont)
localhost:3000/index.php?user=Kis%20Anna esetén a név alapértelmezett értéke legyen Kis Anna, de a felhasználó módosíthassa azt

7.a feladat (1 pont)
localhost:3000/index.php?user=Kis%20Anna GET kérés esetén listázd ki egy táblázatban ennek a felhasználónak a nevével leadott névjegyzékeket
7.b feladat (1 pont)
Minden egyes sor mellett jelenjen meg egy törlés gomb, amivel törölni lehet az adott névjegyzéket

8. feladat (0 pont)
Kérlek jelezz vissza mennyi idő volt megoldani a feladatsort, mert ez alapján tudom korrigálni az éles zh nehézségét
Javasolt az éles zh-ra előre elkészíteni validátor függvényeket, illetve egy template-t a fájlkezelés, űrlap megjelenítéshez, állapottartáshoz és hibavisszajelzéshez
*/
?>