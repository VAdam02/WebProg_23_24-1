<?php
/*
 * ------------------------------Kötelező rész (PHP)------------------------------
 * Készíts űrlapot regisztációhoz, ahol bekérjük a felhasználótól az alábbi adatokat POST metódussal
 * AZ űrlap legyen állapottartó
 * Hibás bemenet esetén soroljuk fel a hibákat egy listában
 * - email cím (PHP side van beépített függvény hozzá, de használható regex is)
 * - felhasználónév (min. 5 karakter)
 * - jelszó (min. 8 karakter)
 * - jelszó megerősítése (meg kell egyeznie a jelszóval)
 * - életkor (szám típusú és 18-100 közötti)
 * 
 * -------------------------Opcionális gyakorló rész (PHP)------------------------
 * A jelszó nem tartalmazhatja a felhasználónevet
 * Adjunk hozzá két checkboxot, amivel elfogadhatjuk a felhasználási feltételeket, illetve még egyet, amivel feliratkozhatunk a hírlevélre (mindkettőt be kell kattintani a regisztrációhoz)
 * 
 * -------------------------Opcionális gyakorló rész (JS)-------------------------
 * Valósidőben jelezzünk vissza a felhasználónak valamilyen grafikus módon, ha valamelyik mező nem felel meg a feltételeknek (pl. piros háttérszín)
 * 
 * email regex: [a-zA-Z0-9]+(\.[a-zA-Z0-9])*@[a-zA-Z0-9]+(\.[a-zA-Z0-9])+
*/
?>