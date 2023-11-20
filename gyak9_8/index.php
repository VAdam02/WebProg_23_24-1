<?php
    $errorMessages = [];

    $json = file_get_contents("excel.json", true);
    $json = json_decode($json, true);

    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if (isset($_POST["add"])) //kiválasztom melyik formot vizsgálom
        {
            if ($_POST["add"] == "AddNewUser")
            {
                //TODO verificate datas
                //név az 2 szavas
                //név az 10-30 karakter
                //kor 18-50 éves
                $num = validateNum($_POST, "age", 18, 50, "Nem szám", "Nem 18-50 közötti az életkor");
                if ($num !== true) $errorMessages["age"] = $num;
                $num = $num ? $_POST["age"] : -1; //csak helyes érték lesz benne
                //$num = $_POST["age"] ?? -1; //helytelen érték is benne lesz

                $id = $json[count($json) - 1]["id"] + 1;
                $nev = $_POST["name"];
                $kor = $_POST["age"];
                $ferfi = isset($_POST["ferfi"]) && $_POST["ferfi"] == "on" ? true : false;

                if (count($errorMessages) == 0)
                {
                    $json[] = [
                        "id" => $id,
                        "nev" => $nev,
                        "kor" => $kor,
                        "ferfi" => $ferfi
                    ];

                    file_put_contents("excel.json", json_encode($json, JSON_PRETTY_PRINT));
                }
            }
            else if ($_POST["add"] == "DeleteUser")
            {
                //delete one
                /*
                for ($i = 0; $i < count($json); $i++)
                {
                    if ($json[$i]["nev"] == $_POST["name"])
                    {
                        array_splice($json, $i, 1);
                        break;
                    }
                }
                */

                //delete more
                $indexes = [];
                for ($i = 0; $i < count($json); $i++)
                {
                    if ($json[$i]["nev"] == $_POST["name"])
                    {
                        $indexes[] = $i;
                    }
                }

                for ($i = count($indexes) - 1; $i >= 0; $i--)
                {
                    array_splice($json, $indexes[$i], 1);
                }

                file_put_contents("excel.json", json_encode($json, JSON_PRETTY_PRINT));
            }
        }
    }



    function validateNum($array, $key, $min, $max, $msgNotNum, $msgNotInRange) {
        if (!isset($array[$key])) return $msgNotNum;

        $num = $array[$key];

        if (!is_numeric($num)) return $msgNotNum;
        if ($num < $min || $num > $max) return $msgNotInRange;
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
    <?php
        $file = fopen("excel.csv", "r");
    ?>
    <h1>CSV</h1>
    <table>
        <?php while (($line = fgetcsv($file, null, ";")) !== false) { ?>
            <tr>
                <?php foreach ($line as $cell) { ?>
                    <td><?= htmlspecialchars($cell) ?></td>
                <?php } ?>
            </tr>
        <?php } ?>
    </table>

    <?php
        fclose($file);

        ?>
        <h1>JSON</h1>
        <table>
            <?php for ($i = 0; $i < count($json); $i++) { ?>
            <tr>
                <td><?= $json[$i]["nev"] ?></td>
                <td><?= $json[$i]["kor"] ?></td>
                <td><?= $json[$i]["ferfi"] ? "férfi" : "nő" ?></td>
            </tr>
            <?php } ?>
        </table>


        <form action="index.php" method="post">
            <!--<input type="text" name="id" placeholder="Index"> -->
            <input type="text" name="name" placeholder="Név"></br>
            <input type="number" name="age" placeholder="Kor" value=<?= count($errorMessages) > 0? $_POST["age"] : "" ?>><?= isset($errorMessages["age"]) ? "<span>" . $errorMessages["age"] . "</span>" : "" ?></br>
            <input type="checkbox" name="ferfi" placeholder="Férfi">
            <label for="ferfi">Férfi</label></br>
            <button type="submit" name="add" value="AddNewUser">Hozzáadás</button>
            <button type="submit" name="add" value="DeleteUser">Törlés</button>
        </form>
</body>
</html>