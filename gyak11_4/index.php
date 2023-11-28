<?php
session_start();

include_once("cartFunctions.php");
?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    if (isset($_POST["backColor"]))
    {
        $_SESSION["background"] = $_POST["backColor"];
    }
    if (isset($_POST["addToCart"]))
    {
        $cart = json_decode($_SESSION["cart"], true);
        $cart[$_POST["id"]] = ($cart[$_POST["id"]] ?? 0) + 1;
        $_SESSION["cart"] = json_encode($cart);

        echo $_SESSION["cart"] . "<br>";
    }
    if (isset($_POST["emptyCart"]))
    {
        //$_SESSION["cart"] = "{}";
        //unset($_SESSION["cart"]);
        initCart(true);
    }
    if (isset($_POST["viewCart"]))
    {
        header("Location: cart.php", true, 302);
        exit();
    }
    if (isset($_POST["updateCart"]))
    {
        $cart = json_decode($_SESSION["cart"], true);
        foreach ($_POST as $key => $value)
        {
            if (!str_starts_with($key, "quantity_")) return;

            $product = str_replace("quantity_", "", $key);
            $cart[$product] = $value;
        }
        $_SESSION["cart"] = json_encode($cart);
        header("Location: " . $_POST["from"], true, 302);
        exit();
    }
}

$products = json_decode(file_get_contents("products.json"), true);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-color: <?= $_SESSION["background"] ?? "white" ?>">
    <form method="POST" action="index.php">
        <button type="submit" name="backColor" value="blue">Kék</button>
        <button type="submit" name="backColor" value="red">Piros</button>
        <button type="submit" name="backColor" value="green">Zöld</button>
        <button type="submit" name="backColor" value="white">Fehér</button>
    </form>

    <?php for ($i = 0; $i < count($products); $i++){
        include_once("productFunctions.php");
        displayProduct($i, true);
    } ?>

    <form method="post" action="index.php">
        <button type="submit" name="viewCart">Kosár Megtekintése</button>
        <button type="submit" name="emptyCart">Kosár kiürítése</button>
    </form>
</body>
</html>