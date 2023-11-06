<?php
#AZOKNAK AKIK NEM A CANVASBŐL TÖLTIK LE A TELEPíTŐT, HANEM XAMPP-T HASZNÁLNAK PL:
#EZZEL A 3 SORRAL TUDOD KIíRATNI A HIBAÜZENETEKET
#A BEADOTT KÓDBAN TILOS BENNEHAGYNI

#ini_set('display_errors', 1);
#ini_set('display_startup_errors', 1);
#error_reporting(E_ALL);

#php -S localhost:3000 index.php

#1

/*
1
2
3
*/
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
    echo "<p>5</p>";
    echo "<p>4</p>";
    echo "<p>3</p>";

    $variable = "VAdam";
    echo "<p>" . $variable . "</p>";
    ?>

    <p>For ciklus</p>

    <?php
        for ($i = 0; $i < 10; $i++)
        {
            //echo "<p>" . $i . "</p>";
            echo "<p style='font-size:" . ($i + 10) . "px;'>Hello world</p>";
        }
    ?>

    <?php
        for ($i = 0; $i < 10; $i++)
        {
    ?>
        <p style='font-size:<?php echo ($i + 10) ?>px;'>Hello world</p>
    <?php
        }
    ?>

    <?php
        echo "<p>" . date("Y-m/d") . "</p>";


        function factorial($n)
        {
            $output = 1;
            for ($i = 2; $i <= $n; $i++)
            {
                $output *= $i;
            }
            return $output;
        }

        echo "<p>" . factorial(5) . "</p>";

        $data1 = ["egy", "ketto", "harom"];

        $user = [
            "name" => "Péter",
            "age" => 43,
            "isBoy" => true
        ] ;

        $users = [
            $user,
            [
                "name" => "Anna",
                "age" => 22,
                "isBoy" => false
            ],
            [
                "name" => "Ákos",
                "age" => 56,
                "isBoy" => true
            ]
        ];

        echo "<p>" . $user["name"] . "</p>";

        echo "<p>" . json_encode($user) . "</p>";
        echo "<p>" . json_encode($users) . "</p>";
    ?>


    <table>
        <tr>
            <td>Név</td>
            <td>Kor</td>
            <td>Nem</td>
        </tr>
        <?php for ($i = 0; $i < count($users); $i++) : ?>
        <tr>
            <td><?php echo $users[$i]["name"] ?></td>
            <td><?php echo $users[$i]["age"] ?></td>
            <td><?php echo $users[$i]["isBoy"] ? "férfi" : "nő" ?></td>
        </tr>
        <?php endfor ?>
    </table>


    <?php
    $questions = [
        [
            "question" => "question1",
            "answers" => [
                "answer1",
                "answer2",
                "answer3"
            ],
            "correctAnswer" => 1
        ],
        [
            "question" => "question2",
            "answers" => [
                "answer1",
                "answer2"
            ],
            "correctAnswers" => [0, 1]
        ],
        [
            "question" => "question3",
            "answers" => [
                "answer1",
                "answer2",
                "answer3",
                "answer4"
            ],
            "correctAnswers" => [0, 1]
        ]
    ]
    ?>

    <form>
        <?php foreach ($questions as $task) { ?>
            <p><?= $task["question"] ?></p>

            <?php foreach ($task["answers"] as $key => $answer) { ?>
                <input type="radio" id="<?= $task["question"] . $answer; ?>" name="<?php echo $task["question"] ?>" value="<?php echo $key; ?>">
                <label for=""><?php echo $answer; ?></label><br>        
            <?php } ?>
        <?php } ?>
    </form>

    <?php
        #generálj EGY random számot
        $val = rand(0, 255*255);
        echo $val . "<br>";
        #konvertáld hexadecimálissá
        $hex = dechex($val);
        echo $hex;
        #töltsd fel 0kkal az elejét, hogy mindig 6 karakter hosszú legyen
        $hex = "#" . str_pad($hex, 6, "0", STR_PAD_LEFT);
    ?>
</body>
</html>