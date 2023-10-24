<?php
#AZOKNAK AKIK NEM A CANVASBŐL TÖLTIK LE A TELEPíTŐT, HANEM XAMPP-T HASZNÁLNAK PL:
#EZZEL A 3 SORRAL TUDOD KIíRATNI A HIBAÜZENETEKET
#A BEADOTT KÓDBAN TILOS BENNEHAGYNI

#ini_set('display_errors', 1);
#ini_set('display_startup_errors', 1);
#error_reporting(E_ALL);
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
        echo "<p>hello world</p>";
    ?>

    <?=
        "<p>hello world</p>";
    ?>

    <?php
        $variable = "VAdam";
        echo "<p>$variable</p>";
    ?>

    <?php
        for ($i = 0; $i < 10; $i++)
        {
            echo "<p style='font-size:" . ($i + 10) . "px;'>Hello world</p>";
        }
    ?>

    <?php for ($i = 0; $i < 10; $i++) { ?>
        <p style='font-size:<?php echo ($i + 10) ?>px;'>Hello world</p>
    <?php } ?>

    <?php
        echo date("d.m.Y H:i:s");
    ?>

    <?php
        function factorial($n)
        {
            $output = 1;
            for ($i = 2; $i <= $n; $i++)
            {
                $output *= $i;
            }
            return $output;
        }

        function factorial2($n)
        {
            if ($n == 0) return 1;

            return $output = $n * factorial2($n-1);
        }

        echo "<p>" . factorial(5) . "</p>";
        echo "<p>" . factorial2(5) . "</p>";
    ?>


    <?php
        $data1 = [
            "egy", "kettő", "három"
        ];

        $users = [
            [
                "name" => "Péter",
                "age" => 43,
                "isBoy" => true
            ],
            [
                "name" => "Ábel",
                "age" => 10,
                "isBoy" => true
            ],
            [
                "name" => "Anna",
                "age" => 25,
                "isBoy" => false
            ],
            [
                "name" => "Ágoston",
                "age" => 43,
                "isBoy" => true
            ]
        ];
                
        function processUsers()
        {
            global $users;
            $firstData = implode(";", $users[0]);
            $splitted = explode(";", $firstData);
            echo implode("-", $splitted);
            //echo $users;

            echo "<p>" . json_encode($users) . "</p>";
        }

        processUsers();
    ?>

    <table>
        <?php foreach ($users as $user) { ?>
            <tr>
                <!--<?php foreach ($user as $key => $value) { ?>
                    <td><?= $value ?></td>
                <?php } ?>-->

                <td><?php echo $user["name"] ?></td>
                <td><?php echo $user["age"] ?></td>
                <td><?php echo $user["isBoy"] ? "fiú" : "lány" ?></td>
            </tr>
        <?php } ?>
    </table>

    <?php
        $questions = [
            [
                "question" => "Mi a fővárosa Magyarországnak?",
                "answers" => [
                    "Budapest",
                    "Pécs",
                    "Debrecen",
                    "Szeged",
                ],
                "correct" => [0],
            ],
            [
                "question" => "Mi a fővárosa Németországnak?",
                "answers" => [
                    "Berlin",
                    "Párizs",
                    "Róma",
                    "London",
                ],
                "correct" => [0, 1],
            ],
            [
                "question" => "Mi a fővárosa Franciaországnak?",
                "answers" => [
                    "Párizs",
                    "Berlin",
                    "Róma",
                    "London",
                ],
                "correct" => [2, 3],
            ],
        ];
    ?>


    <div>
        <?php foreach ($questions as $question) { ?>
            <div>
            <p><?php echo $question["question"] ?></p>

            <form>
                <?php foreach ($question["answers"] as $answer) { ?>
                    <label for="<?php echo $question["question"] . $answer ?>"><?php echo $answer ?></label>
                    <input type="checkbox" name="<?php echo $question["question"] ?>" id="<?php echo $question["question"] . $answer ?>"/>
                <?php } ?>
            </form>
        </div>
        <?php } ?>
    </div>

    <?php
        $val = random_int(0, 255 * 255*255);
        $hex = dechex($val);
        $hex = "#" . str_pad($hex, 6, "0", STR_PAD_LEFT);
        echo $hex;
    ?>
</body>
</html>