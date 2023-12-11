<?php
    session_start();
    if (!isset($_SESSION["color"])) $_SESSION["color"] = "white";

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["color"])) {
        $_SESSION["color"] = $_POST["color"];
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-color: <?= $_SESSION["color"] ?>">
    <form action="index.php" method="POST">
        <input type="submit" name="color" value="white">
        <input type="submit" name="color" value="red">
        <input type="submit" name="color" value="green">
        <input type="submit" name="color" value="blue">
    </form>
</body>
</html>