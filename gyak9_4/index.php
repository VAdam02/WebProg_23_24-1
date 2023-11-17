<?php
#php -S localhost:3000 index.php
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

        <p>CSV táblázat</p>
        <table>
            <?php while (($line = fgetcsv($file, null, ';')) !== false) {?>
            <tr>
                <?php foreach ($line as $cell) { ?>
                    <td><?= htmlspecialchars($cell) ?></td>
                <?php } ?>
                <?php // json_encode($line) . "<br>" ?>
            </tr>
            <?php } ?>
        </table>

        <?php
        fclose($file);


        $json = file_get_contents("excel.json");
        $json = json_decode($json, true);

        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            $errorMessages = [];
            if (isset($_POST["delete"]))
            {
                $id = validateNum($_POST, "id", 0, $json[count($json) - 1]["id"]);
                if ($id !== true) $errorMessages[] = $id;

                //TODO do all of the validations

                if (count($errorMessages) == 0)
                {
                    for ($i = 0; $i < count($json); $i++)
                    {
                        if ($json[$i]["id"] == $_POST["id"])
                        {
                            array_splice($json, $i, 1);
                            file_put_contents("excel.json", json_encode($json));
                            break;
                        }
                    }
                }
            }

            if (isset($_POST["add"]))
            {
                $nev = validateString($_POST, "nev", 5, 64);
                if ($nev !== true) $errorMessages[] = $nev;

                $kor = validateNum($_POST, "kor", 30, 100);
                if ($kor !== true) $errorMessages[] = $kor;

                if (count($errorMessages) == 0)
                {
                    $newRow = array(
                        "id" => $json[count($json) - 1]["id"] + 1,
                        "nev" => $_POST["nev"],
                        "kor" => $_POST["kor"],
                        "ferfi" => isset($_POST["Nem"])
                    );

                    $json[] = $newRow;
                    file_put_contents("excel.json", json_encode($json));
                }
            }
        }

        function validateNum($array, $key, $min, $max, $notNum = "Nem szám", $tooSmall = "Túl kicsi", $tooBig = "Túl nagy")
        {
            if (!isset($array)) return $notNum;
            if (!isset($array[$key])) return $notNum;

            $num = $array[$key];

            if (!is_numeric($num)) return $notNum;
            if ($num < $min) return $tooSmall;
            if ($num > $max) return $tooBig;

            return true;
        }

        function validateString($array, $key, $minLength, $maxLength, $notString = "Nem string", $tooShort = "Túl rövid", $tooLong = "Túl hosszú")
        {
            return true;
        }
        ?>

        <p>JSON táblázat</p>
        <table>
            <?php foreach ($json as $row) { ?>
            <tr>
                <form action="index.php" method="post">
                    <td><?= htmlspecialchars($row["nev"]) ?></td>
                    <td><?= htmlspecialchars($row["kor"]) ?></td>
                    <td><?= $row["ferfi"] ? "férfi" : "nő" ?></td>
                    <input type="hidden" name="id" value="<?= $row["id"] ?>">
                    <td><input type="submit" name="delete" value="Törlés"></td>
                </form>
            </tr>
            <?php } ?>
        </table>

        <form action="index.php" method="post">
            <input type="text" name="nev" placeholder="Név">
            <input type="number" name="kor" placeholder="Kor">
            <input type="checkbox" name="Nem" value="férfi" id="ferfi">
            <label for="ferfi">Férfi</label>
            <input type="submit" name="add" value="Hozzáad">
        </form>

        <?php if ($_SERVER["REQUEST_METHOD"] == "POST") { ?>
        <ul>
            <?php foreach ($errorMessages as $errorMessage) { ?>
                <li><?= $errorMessage ?></li>
            <?php } ?>
        </ul>
        <?php } ?>
</body>
</html>