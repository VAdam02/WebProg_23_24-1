<?php
    session_start();
    if (!isset($_SESSION["color"])) $_SESSION["color"] = "white";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-color: <?= $_SESSION["color"] ?>">
    
</body>
</html>