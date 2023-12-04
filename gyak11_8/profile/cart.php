<?php
session_start();

if (!isset($_SESSION["cart"])) $_SESSION["cart"] = array();

if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    if (isset($_GET["API"]))
    {
        echo json_encode($_SESSION["cart"]);
        http_response_code(200);
        die();
    }
}
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    if (isset($_POST["id"]))
    {
        $_SESSION["cart"][$_POST["id"]] = ($_SESSION["cart"][$_POST["id"]] ?? 0) + 1;
        http_response_code(200);
        die();
    }
}
?>