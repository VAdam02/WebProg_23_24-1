<?php
    session_start();

    if (!isset($_SESSION["cart"])) $_SESSION["cart"] = array();

    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        if (isset($_GET["API"]))
        {
            echo json_encode($_SESSION["cart"]);
            header("Content-Type: application/json");
            exit;
        }
        else
        {
            displayCart();
        }
        
    }
    else if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if (isset($_POST["id"]))
        {
            $_SESSION["cart"][$_POST["id"]] = isset($_SESSION["cart"][$_POST["id"]]) ? $_SESSION["cart"][$_POST["id"]] + 1 : 1;
        }
        /////TODO POST remove product by id
        //TODO POST modify product count
    }
?>



<?php
function displayCart()
{
?>
    //TODO display cart
<?php
}
?>