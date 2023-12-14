<?php
    if (session_status() != PHP_SESSION_ACTIVE) session_start();

    if (!isset($_SESSION["cart"])) $_SESSION["cart"] = array();

    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        if (isset($_GET["API"]))
        {
            $json = json_decode(file_get_contents("{$_SERVER["DOCUMENT_ROOT"]}/products/products.json"), true);
            $cart = [];

            foreach ($_SESSION["cart"] as $id => $quantity)
            {
                $product = $json[$id];
                $product["quantity"] = $quantity;
                $cart[] = $product;
            }
            echo json_encode($cart);
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
    <link rel="stylesheet" href="<?= "http://{$_SERVER["SERVER_NAME"]}:{$_SERVER["SERVER_PORT"]}" ?>/common/common.css">
    <style>
        .product {
            margin: 10px 0;
            width: 100%;
            height: 100px;
        }

        .product > div > .product-icon {
            max-width: 100%;
            max-height: 100%
        }

        .product > div > div > .product-name {
            font-size: 20px;
            white-space: nowrap;
            overflow: hidden;
            -webkit-mask-image: linear-gradient(90deg, #000 70%, transparent);
        }
    </style>
    <script>
        function displayCart(div, callback) {
            let xhttp = new XMLHttpRequest();
            xhttp.onload = (event) => drawCart(event, div);
            xhttp.open("GET", "/profile/cart.php?API", true);
            xhttp.send();

            function drawCart(event, div)
            {
                let json = JSON.parse(event.target.responseText);
                div.innerHTML = "";
                if (json.length == 0)
                {
                    let emptyCart = document.createElement("p");
                    emptyCart.innerText = "Your cart is empty.";
                    div.appendChild(emptyCart);
                }
                else
                {
                    json.forEach((product) => {
                        let productDiv = document.createElement("div");
                        productDiv.classList.add("flex-container", "product");
                        let productImgDiv = document.createElement("div");
                        productImgDiv.classList.add("flex-col4", "flex-container", "flex-middle");
                        let productImg = document.createElement("img");
                        productImg.classList.add("product-icon");
                        productImg.src = "<?= "http://{$_SERVER["SERVER_NAME"]}:{$_SERVER["SERVER_PORT"]}" ?>/products/img/" + product.images[0];
                        productImgDiv.appendChild(productImg);
                        productDiv.appendChild(productImgDiv);
                        let productInfoDiv = document.createElement("div");
                        productInfoDiv.classList.add("flex-col8", "flex-container", "flex-wrap");
                        let productNameDiv = document.createElement("div");
                        productNameDiv.classList.add("flex-col12");
                        let productName = document.createElement("h1");
                        productName.classList.add("product-name");
                        productName.innerText = product.name;
                        productNameDiv.appendChild(productName);
                        productInfoDiv.appendChild(productNameDiv);
                        let productPriceDiv = document.createElement("div");
                        productPriceDiv.classList.add("flex-col8");
                        let productPrice = document.createElement("p");
                        productPrice.innerText = "Price: " + product.price;
                        productPriceDiv.appendChild(productPrice);
                        productInfoDiv.appendChild(productPriceDiv);
                        let productQuantityDiv = document.createElement("div");
                        productQuantityDiv.classList.add("flex-col4", "flex-container", "flex-middle");
                        let productQuantity = document.createElement("input");
                        productQuantity.type = "number";
                        productQuantity.name = "quantity";
                        productQuantity.value = product.quantity;
                        productQuantity.min = "1";
                        productQuantity.max = "100";
                        productQuantityDiv.appendChild(productQuantity);
                        let productId = document.createElement("input");
                        productId.type = "hidden";
                        productId.name = "id";
                        productId.value = product.id;
                        productQuantityDiv.appendChild(productId);
                        productInfoDiv.appendChild(productQuantityDiv);
                        productDiv.appendChild(productInfoDiv);
                        div.appendChild(productDiv);
                    });
                }
            }
        }
    </script>
<?php
}
?>