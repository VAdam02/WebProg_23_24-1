<?php
function displayProduct($productID, $addToCartFunction = false)
{
    $products = json_decode(file_get_contents("products.json"), true);
    foreach ($products as $curproduct)
    {
        if ($curproduct["id"] == $productID)
        {
            $product = $curproduct;
            break;
        }
    }
    if (!isset($product)) return;
    ?>
    <div>
            <h2><?= $product["name"] ?></h2>
            <p><?= $product["price"] ?> Ft</p>
            <p><?= $product["description"] ?></p>
            <?php if ($addToCartFunction) { ?>
            <form method="post" action="index.php">
                <input type="hidden" name="id" value="<?= $product["id"] ?>">
                <button type="submit" name="addToCart">Kosárba</button>
            </form>
            <?php } ?>
    </div>
    <?php
}
?>