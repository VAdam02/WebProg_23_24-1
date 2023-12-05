<link rel="stylesheet" href="<?= "http://{$_SERVER["SERVER_NAME"]}:{$_SERVER["SERVER_PORT"]}" ?>/common/common.css">
<style>
    /*
    #cartDiv {
        position: fixed;
        background-color: #EEEEEE;
        right: 10px;
        border-radius: 20px 3px 3px 20px;
        width: 350px;
        height: 300px;
        border: 1px solid #BBBBBB;
        overflow: hidden scroll;
        scroll-behavior: smooth;
        padding: 0 20px;
        opacity: 1;
        transition: height 1s, opacity 1s;
    }

    #cartDiv.hidden {
        height: 0;
        opacity: 0;
        transition: height 1s, opacity 1s;
    }
    */
    
    header > div#headerContent {
        background-color: #333;
        color: #fff;
        margin: 0px;
        font-size: 30px;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
        text-transform: uppercase;
        letter-spacing: 2px;
        box-shadow: 0 0 10px #000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 100;
    }

    header > div#headerContent > * {
        margin: 20px 20px;
    }

    header > div#headerContent > div > .button-img {
        width: 30px;
        height: 30px;
        padding: 7.5px;
        background-color: #DDD;
        border-radius: 30%;
        overflow: visible;
    }

    header > div#headerContent > div > button {
        height: 45px;
        padding: 7.5px;
        background-color: #DDD;
        border-radius: 10px;
        overflow: visible;
    }

    @media screen and (max-width: 850px) {
        #header-title {
            order: -1;
            width: 100%;
        }
    }
</style>
<script>
    addEventListener("load", () => {
        windowResize();
        addEventListener("resize", () => windowResize());

        //cartDiv.addEventListener("click", () => showCart());
    });

    function windowResize() {
        headerPlaceholder.style.height = headerContent.clientHeight + "px";
    }

    /*
    function showCart() {
        if (cartDiv.classList.contains("hidden"))
        {
            displayCart(cartDiv);
            cartDiv.classList.remove("hidden");
        }
        else
        {
            cartDiv.classList.add("hidden");
        }
    }
    */
</script>
<header>
    <div id="headerContent" class="flex-container flex-wrap flex-center">
        <div class="flex-container flex-left flex-fill" style="font-size: 15px">
            Welcome, user!
        </div>
        <div id="header-title" class="flex-container flex-middle flex-fill">
            Webprog Minishop
        </div>
        <div class="flex-container flex-right flex-fill">
            <?= "<button onclick=\"window.location.href='http://{$_SERVER["SERVER_NAME"]}:{$_SERVER["SERVER_PORT"]}/profile/" . (isset($_SESSION['token']) ? "logout" : "register_login") . ".php'\">" . (isset($_SESSION['token']) ? "Kijelentkezés" : "Regisztráció/Bejelentkezés") . "</button>" ?>
            <img id="cart" class="button-img" src="./header/cart.png" alt="cart">
        </div>
    </div>
    <div id="headerPlaceholder"></div>
    <div id="cartDiv" class="hidden"></div>
</header>