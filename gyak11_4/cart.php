<?php
session_start();

include_once("cartFunctions.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="post" action="index.php">
        <?php
        $cart = json_decode($_SESSION["cart"], true);
        foreach ($cart as $key => $value) {
            ?>
            <div>
                <?php
                include_once("productFunctions.php");
                displayProduct($key, false);
                ?>
                    <input type="number" name="quantity_<?= $key ?>" value="<?= $value ?>">
            </div>
        <?php } ?>
        <input type="hidden" name="from" value="<?= (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" ?>">
        <button type="submit" name="updateCart">Kosár frissítése</button>
    </form>
</body>
</html>