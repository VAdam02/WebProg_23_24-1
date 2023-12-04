<?php
////////GET
//HTML kód generálása //semmi extra
//összes termék lekérdezése JSON //?API
//1 termék lekérdezése ID alapján //?API&ID=2

/////////POST
/////////termék darabszám módosítása
/////////termék hozzáadása
/////////termék törlése


if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    if (isset($_GET["API"]))
    {
        $json = json_decode(file_get_contents("{$_SERVER["DOCUMENT_ROOT"]}/products/products.json"), true);
        if (isset($_GET["id"]))
        {
            header("Content-Type: application/json");
            for ($i = 0; $i < count($json); $i++)
            {
                if ($json[$i]["id"] == $_GET["id"])
                {
                    echo json_encode($json[$i]);
                    http_response_code(200);
                    die();
                }
            }
            http_response_code(404);
            die();
        }
        else
        {
            header("Content-Type: application/json");
            //TODO filter to only available products
            echo json_encode($json);
            http_response_code(200);
            die();
        }
    }
    else
    {
        displayProducts();
    }
}
?>

<?php
function displayProducts()
{
?>
<link rel="stylesheet" href="<?= "http://{$_SERVER["SERVER_NAME"]}:{$_SERVER["SERVER_PORT"]}" ?>/common/common.css">
<style>
    .product-big {
        min-width: 300px !important;
        height: 400px;
    }

    .product-big > div > .product-icon {
        max-width: 100%;
        height: 300px
    }

    .product-big > div:nth-child(2) {
        height: 100px;
    }

    .product-big > div > .product-name {
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(90deg, #000 70%, transparent);

        margin-block-start: 0.67em;
        margin-block-end: 0;
    }

    .product-big > div > div > .product-price {
        margin-block-start: 0.2em;
        margin-block-end: 0.2em;
    }
</style>
<script>
    addEventListener("load", () => {
        displayProducts(productsDiv);
    })

    function displayProducts(div)
    {
        let xhttp = new XMLHttpRequest();
        xhttp.onload = (event) => drawProducts(event, div);
        xhttp.open("GET", "/products/?API", true);
        xhttp.send();
    }

    function drawProducts(event, div)
    {
        let json = JSON.parse(event.target.responseText);
        div.innerHTML = "";

        json.forEach((product) => {
            let productDiv = document.createElement("div");
            productDiv.classList.add("flex-col3", "product-big");
            div.appendChild(productDiv);
            let imgDiv = document.createElement("div");
            productDiv.appendChild(imgDiv);
            let img = document.createElement("img");
            img.src = "<?= "http://{$_SERVER["SERVER_NAME"]}:{$_SERVER["SERVER_PORT"]}" ?>/products/img/" + product.images[0];
            img.classList.add("product-icon");
            imgDiv.appendChild(img);
            productDiv.appendChild(imgDiv);

            let infoDiv = document.createElement("div");
            infoDiv.classList.add("flex-container", "flex-wrap", "flex-center");

            let nameH1 = document.createElement("h1");
            nameH1.classList.add("flex-col12", "product-name");
            nameH1.innerText = product.name;
            infoDiv.appendChild(nameH1);

            let priceDiv = document.createElement("div");
            priceDiv.classList.add("flex-col6");
            let priceH1 = document.createElement("h1");
            priceH1.classList.add("product-price");
            priceH1.innerText = product.price + "Ft";
            priceDiv.appendChild(priceH1);
            infoDiv.appendChild(priceDiv);

            let buttonDiv = document.createElement("div");
            buttonDiv.classList.add("flex-col6");
            let button = document.createElement("button");
            button.innerText = "Kosárba";
            button.addEventListener("click", () => addToCart(product.id))
            buttonDiv.appendChild(button);
            infoDiv.appendChild(buttonDiv);

            productDiv.appendChild(infoDiv);
        })
    }

    function addToCart(id)
    {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/profile/cart.php", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send("id=" + id);
    }

</script>
<div id="productsDiv" class="flex-container flex-wrap flex-justify"></div>
<?php
}
?>