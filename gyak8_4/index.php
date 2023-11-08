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
        //echo json_encode($_SERVER) . "<br>";
        echo $_SERVER["REMOTE_ADDR"] . "<br>";

        //echo $_GET['color'];

        if ($_SERVER["REMOTE_ADDR"] == "127.0.0.1" || $_SERVER["REMOTE_ADDR"] == "::1" || $_SERVER["REMOTE_ADDR"] == "localhost")
        {
            echo "Hello world";
        }
        else
        {
            echo "Hozzáférés megtagadva";
        }

        /*
        if (isset($_GET['color']))
        {
            $backColor = $_GET['color'];
        }
        else
        {
            $backColor = 'white';
        }
        */

        $backColor = isset($backColor) ? $backColor : 'white';
        $name = isset($_POST) && isset($_POST["név"]) ?  $_POST["név"] : "Anonymus";
        $age = isset($_POST) && isset($_POST["age"]) ? $_POST["age"] : "";

        $a = isset($_GET) && isset($_GET["a"]) ? $_GET["a"] : 0;
        $b = isset($_GET) && isset($_GET["b"]) ? $_GET["b"] : 0;

        $errorMessages = [];

        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            echo "adat beküldve";
            //echo $_POST["név"] . " " . $_POST["age"];
            if (isset($_POST["send"]))
            {
                if ($age <= 18)
                {
                    $errorMessages[] = "Az életkor nem megfelelő";
                    //echo "Életkor nem megfelelő";
                }

                if (strlen($name) <= 5)
                {
                    $errorMessages[] = "Név nem elég hosszú";
                    //echo "Név nem elég hosszú";
                }
            }
            if (isset($_POST["calculate"]))
            {
                if (!is_numeric($a)) $errorMessages[] = "'A' nem szám";
                if (!is_numeric($b)) $errorMessages[] = "'B' nem szám";
            }
        }
        if ($_SERVER["REQUEST_METHOD"] == "GET")
        {
            echo "üres form kérése";
        }
    ?>

    <script>
        //document.body.style.backgroundColor = "<?php /*echo $_GET['color'];*/ ?>";
        document.body.style.backgroundColor = "<?= $backColor ?>";
    </script>

    <p>
        <a href="index.php?color=red">Piros</a>
        <a href="index.php?color=green">Zöld</a>
        <a href="index.php?color=blue">Kék</a>
    </p>

    <form action="index.php" method="post">
        <input type="text" name="név" value="<?= $name ?>">
        <input type="number" name="age" value="<?= $age ?>">
        <input type="submit" name="send" value="Küldés">
    </form>

    <ul>
        <?php foreach ($errorMessages as $msg) { ?>
            <li><?= $msg ?>
        <?php } ?>
    </ul>


    <form action="index.php" method="post">
        <input type="number" name="a" value="<?= $a ?>">
        <input type="number" name="b" value="<?= $b ?>">
        <input type="submit" name="calculate" value="Számol">
    </form>
</body>
</html>