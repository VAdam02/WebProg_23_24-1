<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        //echo json_encode($_SERVER) . "<br>";

        if ($_SERVER["REMOTE_ADDR"] == "::1" || $_SERVER["REMOTE_ADDR"] == "127.0.0.1" || $_SERVER["REMOTE_ADDR"] == "localhost")
        {
            echo "Hello world";
        }
        else
        {
            echo "Hozzáférés megtagadva";
        }


        if (isset($_GET["color"])) { ?>
            <script>document.body.style.backgroundColor = "<?= $_GET["color"] ?>"; </script>
    <?php }
        
        
        
        $nev2 = (isset($_POST) && isset($_POST["nev"])) ? $_POST["nev"] : "";
        $kor = (isset($_POST) && isset($_POST["kor"])) ? $_POST["kor"] : "";

        
        $errorMessages = [];
        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            if ($nev2 == "") { $errorMessages[] = "Nevet kötelező megadni"; }
            else if (strlen($nev2) < 5 || strlen($nev2) > 10)
            {
                $errorMessages[] = "A név nem megfelelő hosszúságú";
            }

            if (is_numeric($kor))
            {
                $errorMessages[] = "A kor nem szám";
            }
            if ($kor < 18 || $kor > 100)
            {
                $errorMessages[] = "A kor nem megfelelő";
            }
        }
        
        ?>

        <a href="index.php?color=red">Piros</a>
        <a href="index.php?color=green">Zöld</a>
        <a href="index.php?color=blue">Kék</a>


        <form action="index.php" method="post">
            <input type="text" name="nev" id="nev" placeholder="Név">
            <input type="number" name="kor" id="kor" placeholder="Kor">
            <input type="submit" name="send" id="send" value="Küldés">
            <input type="submit" name="clear" id="clear" value="Törlés">
        </form>

        <ul>
            <?php foreach ($errorMessages as $message) { ?>
                <li><?= $message ?></li>
            <?php } ?>
        </ul>

        <?php
            $a = (isset($_POST) && isset($_POST["a"])) ? $_POST["a"] : "";
            $b = (isset($_POST) && isset($_POST["b"])) ? $_POST["b"] : "";
            
            if ($_SERVER["REQUEST_METHOD"] == "GET")
            {
                if (is_numeric($a))
                {
                    $errorMessages[] = "Az A érték nem szám";
                }
                else { $a = intval($a); }

                if (is_numeric($b))
                {
                    $errorMessages[] = "Az B érték nem szám";
                }
                else { $b = intval($b); }
            }
            echo "x: " . ((-$b)/$a);
            ?>


        <form action="index.php" method="post">
            <input type="number" id="a" name="a" value="<?= $a ?>">
            <input type="number" id="b" name="b" value="<?= $b ?>">
            <input type="submit" id="send" value="Küldés">
        </form>
</body>
</html>