<?php
initCart();

function initCart($forced = false)
{
    if (isset($_SESSION["cart"]) && !$forced) return;
    
    $_SESSION["cart"] = "{}";
}
?>