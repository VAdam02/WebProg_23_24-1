<?php
/*
Nyilatkozom, hogy a feladatsort és/vagy annak megoldását részben vagy egészben sem teszem közzé 
semmilyen platformon, illetve nem továbbítom másik személy számára. Emellett kijelentem, hogy 
nem szereztem meg sem a feladatsort, sem annak megoldását részben vagy egészben sem, semmilyen 
platformon vagy másik személyen keresztül. Tudomásul veszem, hogy a fenti nyilatkozat 
megszegésének gyanúja esetén az érintettek (mindkét fél) zárthelyi eredményét érvénytelennek 
kell tekinteni nem megengedett segészkeszhöz használatából kifolyólag, akár visszamenőleg is!
A megoldások közzétételének tiltásának határideje: 2023. november 27. 23:59

[NÉV] [NEPTUN KÓD]
*/

/*
KÜRTŐSKALÁCS ÁRUS

1. feladat (1 pont)
Validáld PHP kódból, hogy a beküldött adatok megfelelnek-e az alábbi követelményeknek:
- név 1 szóból álljon
- név maximum 50 karakter hosszú lehet
- név minimum 3 karakter hosszú legyen
- egyik mennyiség sem lehet negatív
- mennyiség legalább 1 db legyen összesen (üres rendelést ne vegyünk fel)

2. feladat (1 pont)
Az űrlap adatai legyenek állapottartóak, vagyis hibás beküldés esetén ne veszítsék el a mezők az értékeiket, helyes beküldés esetén pedig állítsd vissza az alapértelmezett értékeket és adj visszajelzést a felhasználónak

3. feladat (1 pont)
A beérkezett megrendeléseket tárold el egy json fájlban (ne felejtd el a fájlt létrehozni egy üres JSON szerkezettel)

4. feladat (1 pont)
Legyen lehetőség az űrlap kitöltését újrakezdeni egy gomb segítségével, ami visszaállítja az alapértelmezett értékeket

5. feladat (1.5 pont)
localhost:3000/index.php?id=1 esetén listázd ki a megrendelés adatait, ahol látható a rendelés ID, a név, a megrendelt kürtőskalácsok száma ízesítés szerint csoportosítva és a megrendelés ideje (ne csak az 1. id-ra működjön)

6.a feladat (1 pont)
Sikeres rendelésfelvétel esetén irányítsd a felhasználót a localhost:3000/index.php?id=1 oldalra, ahol az "1" helyére az aktuális rendelés ID-ját írd
6.b feladat (0.5 pont)
Az átirányítást 303 See other állapottal tedd meg

7. feladat (1 pont)
localhost:3000/index.php?name=Anna esetén a rendelés űrlap név alapértelmezett értéke legyen "Anna", de a felhasználó módosíthassa azt (ne csak az "Anna" felhasználóval működjön)

8.a feladat (1 pont)
localhost:3000/index.php?name=Anna GET kérés esetén listázd ki egy táblázatban ennek a felhasználónak a nevével leadott megrendeléseket egy táblázatban, ahol látható a rendelés ID, a név, a megrendelt kürtőskalácsok száma ízesítés szerint csoportosítva és a megrendelés ideje (ne csak az "Anna" felhasználóval működjön)
8.b feladat (0.5 pont)
admin felhasználó esetén írjuk ki az összes rendelést

9. feladat (0.5 pont)
Csinálj egy kereső mezőt, ahol lehet keresni a felhasználók rendeléseit a felhasználó alapján localhost:3000/index.php?name=Anna GET kérés segítségével

10. feladat (+1 házi pluszpont [szubjektíven lesz értékelve])
Legyen hibatűrő az oldalunk, vagyis minél jobban védje ki a rossz szándékú felhasználók kéréseit
Legyen igényes (nem a desingra értem), vagyis ne jelenjenek meg olyan HTML modulok, amelyek a kérés pillanatában irrelevánsak
*/
?>

<?php
    //PREINITIALIZATION TO DEFAULT VALUES
    $errorMessages = [];
    $name = isset($_GET) && isset($_GET["name"]) ? $_GET["name"] : "";
    $chocolate = "";
    $cinnamon = "";
    $json = json_decode(file_get_contents("orders.json"), true);

    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if (isset($_POST["orderForm"]) && $_POST["orderForm"] == "order")
        {
            $name = validateString($_POST, "name", 3, 50, 1, "Kötelező megadni", "Nem megfelelő karakterszám", "Nem megfelelő szószám");
            if ($name !== true) $errorMessages["name"] = $name;
            $name = $_POST["name"] ?? "";

            $chocolate = validateNum($_POST, "chocolate", 0, 100, "Nem szám!", "Nem megfelelő tartomány!");
            if ($chocolate !== true) $errorMessages["chocolate"] = $chocolate;
            $chocolate = $_POST["chocolate"] ?? "";

            $cinnamon = validateNum($_POST, "cinnamon", 0, 100, "Nem szám!", "Nem megfelelő tartomány!");
            if ($cinnamon !== true) $errorMessages["cinnamon"] = $cinnamon;
            $cinnamon = $_POST["cinnamon"] ?? "";

            if (count($errorMessages) == 0)
            {
                $sumCount = $chocolate + $cinnamon;
                if ($sumCount == 0) $errorMessages["other"][] = "Legalább egyet kell rendelni!";
            }

            if (count($errorMessages) == 0)
            {
                $id = $json[count($json) - 1]["id"] + 1;
                $json[] = array(
                    "id" => $id,
                    "name" => $name,
                    "chocolate"=> $chocolate,
                    "cinnamon"=> $cinnamon,
                    "date" => date("Y-m-d H:i:s")
                );
                file_put_contents("orders.json", json_encode($json, JSON_PRETTY_PRINT));

                header("Location: index.php?id=" . $id, true, 303);
                die();
            }
        }
        else if (isset($_POST["orderForm"]) && $_POST["orderForm"] == "clear")
        {
            //do nothing
        }
    }
    else if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        if (isNumber($_GET, "id"))
        {
            for ($i = 0; $i < count($json); $i++)
            {
                if (isset($json[$i]["id"]) && $json[$i]["id"] == $_GET["id"])
                {
                    $order = $json[$i];
                    break;
                }
            }
        }

        if ($name != "")
        {
            $orders = [];
            for ($i = 0; $i < count($json); $i++)
            {
                if (isset($json[$i]["name"]) && ($name == "admin" || $json[$i]["name"] == $name))
                {
                    $orders[] = $json[$i];
                }
            }
        }
    }

    function validateString($array, $key, $min, $max, $words, $msgNotString, $msgNotInRangeChar, $msgNotInRangeWord)
    {
        if (!isset($array)) return $msgNotString;
        if (!isset($array[$key])) return $msgNotString;

        $value = $array[$key];

        if (!is_string($value)) return $msgNotString;
        if (strlen($value) < $min || strlen($value) > $max) return $msgNotInRangeChar;
        if (str_word_count($value) != $words) return $msgNotInRangeWord;

        return true;
    }

    function isNumber($array, $key)
    {
        if (!isset($array)) return false;
        if (!isset($array[$key])) return false;
        if (!is_numeric($array[$key])) return false;

        return true;
    }

    function validateNum($array, $key, $min, $max, $msgNotNum, $msgNotInRange)
    {
        if (!isNumber($array, $key)) return $msgNotNum;

        $value = $array[$key];

        if ($value < $min || $value > $max) return $msgNotInRange;

        return true;
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>KÜRTŐSKALÁCS ÁRUS</h1>
    <form action="index.php" method = "POST">
        <label for="name">Név</label>
        <input type="text" name="name" id="name" value="<?= $name ?>">
        <?php if (isset($errorMessages["name"])) { ?>
            <span><?= $errorMessages["name"] ?></span>
        <?php } ?><br>

        <label for="chocolate">Csokis</label>
        <input type="number" name="chocolate" id="chocolate" value="<?= $chocolate ?>">
        <?php if (isset($errorMessages["chocolate"])) { ?>
            <span><?= $errorMessages["chocolate"] ?></span>
        <?php } ?><br>

        <label for="cinnamon">Fahéjas</label>
        <input type="number" name="cinnamon" id="cinnamon" value="<?= $cinnamon ?>">
        <?php if (isset($errorMessages["cinnamon"])) { ?>
            <span><?= $errorMessages["cinnamon"] ?></span>
        <?php } ?><br>

        <button name="orderForm" value="order">Rendel</button>
        <button name="orderForm" value="clear">Visszaállít</button>

        <?php if (isset($errorMessages["other"]) && count($errorMessages["other"]) > 0) { ?>
            <ul>
                <?php foreach ($errorMessages["other"] as $error) { ?>
                <li><?= $error ?>
                <?php } ?>
            </ul>
        <?php } ?>
    </form>
    

    <?php if (isset($order)) { ?>
        <hr>
        <p>ID: <?= $order["id"] ?></p>
        <p>Név: <?= $order["name"] ?></p>
        <p>Csokis: <?= $order["chocolate"] ?></p>
        <p>Fahéjas: <?= $order["cinnamon"] ?></p>
        <p>Rendelés ideje: <?= $order["date"] ?></p>
    <?php } ?>


    <hr>


    <form action="index.php" type="get">
        <input type="text" name="name" value="<?= $name ?>" placeholder="Keresés név alapján">
        <button name="searchForm" value="Search">Keresés</button>
    </form>
    <?php if (isset($orders)) { ?>
    <table>
        <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Csokis</th>
            <th>Fahéjas</th>
            <th>Rendelés ideje</th>
        </tr>
        <?php foreach ($orders as $curorder) { ?>
            <tr>
                <td><?= $curorder["id"] ?></td>
                <td><?= $curorder["name"] ?></td>
                <td><?= $curorder["chocolate"] ?></td>
                <td><?= $curorder["cinnamon"] ?></td>
                <td><?= $curorder["date"] ?></td>
            </tr>
        <?php } ?>
    </table>
    <?php } ?>
</body>
</html>