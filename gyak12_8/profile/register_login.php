<?php
if (session_status() == PHP_SESSION_NONE) session_start();

$errorMessages = [];
if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    if (isset($_GET["API"]))
    {
        if (isset($_GET["username"]))
        {
            echo "{\"exists\":" . (checkUserExists($_GET["username"]) ? "true" : "false") . "}";
        }
    }
    else
    {
        displayRegisterPage();
    }
}
else if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    if (isset($_POST["register"]))
    {
        if (($result = validateUserName($_POST["username"])) !== true) $errorMessages["username"] = $result;
        if (($result = validatePassword($_POST["password"])) !== true) $errorMessages["password"] = $result;
        if (($result = validateEmailAddress($_POST["email"])) !== true) $errorMessages["email"] = $result;

        if (count($errorMessages) == 0)
        {
            register();   
        }
        else
        {
            displayRegisterPage();
        }
    }
    else if (isset($_POST["login"]))
    {
        login();
    }
}

function register() {
    $json = json_decode(file_get_contents("{$_SERVER["DOCUMENT_ROOT"]}/profile/users.json"), true);
    $json[] = [
        "username" => $_POST["username"],
        "password" => $_POST["password"],
        "email" => $_POST["email"],
        "address" => $_POST["address"],
        "phone" => $_POST["phone"]
    ];
    file_put_contents("{$_SERVER["DOCUMENT_ROOT"]}/profile/users.json", json_encode($json));

    login();
}

function login() {

}

function validateUserName($username) {
    if (!preg_match("/^[a-zA-Z0-9]$/", $username)) return "A felhasználónév csak betűket és számokat tartalmazhat!";
    if (!(8 <= strlen($username) && strlen($username) < 16)) return "A felhasználónévnek 8 és 15 karakter között kell lennie!";
    if (checkUserExists($username)) return "A felhasználónév már foglalt!";
    return true;
}

function validatePassword($password) {
    if (!preg_match("/^[a-zA-Z0-9]$/", $password)) return "A jelszó csak betűket és számokat tartalmazhat!";
    if (!(8 <= strlen($password) && strlen($password) < 16)) return "A jelszónak 8 és 15 karakter között kell lennie!";
    if (str_contains($_POST["username"], $password)) return "A jelszó nem tartalmazhatja a felhasználónevet!";
    return true;
}

function validateEmailAddress($email) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return "Helytelen email cím formátum!";
    return true;
}

function checkUserExists($username) {
    $json = json_decode(file_get_contents("{$_SERVER["DOCUMENT_ROOT"]}/profile/users.json"), true);
    foreach ($json as $user)
    {
        if ($user["username"] == $username) return true;
    }
    return false;
}
?>

<?php
function displayRegisterPage()
{
    global $errorMessages;
?>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    label {
        margin: 5px;
        padding: 5px;
        width: 200px;
    }

    input {
        margin: 5px;
        padding: 5px;
        width: 200px;
        transition: background-color 0.75s;
    }

    input[type="submit"] {
        width: 100px;
    }
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/core.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/md5.js"></script>

<script>
    let usernameExistsXHTTP = null;
    addEventListener('load', () => {
        let username = Array.from(register.children).find((element) => element.name == "username")
        username.addEventListener('input', () => {
            username.style.backgroundColor = "white";
            if (usernameExistsXHTTP != null) usernameExistsXHTTP.abort();

            usernameExistsXHTTP = new XMLHttpRequest();
            usernameExistsXHTTP.onload = (event) => {
                let response = JSON.parse(event.target.responseText);
                if (response.exists) {
                    username.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
                }
                else {
                    username.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
                }
            };
            usernameExistsXHTTP.open("GET", "http://<?= $_SERVER["SERVER_NAME"] ?>:<?= $_SERVER["SERVER_PORT"] ?>/profile/register_login.php?API&username=" + username.value, true);
            usernameExistsXHTTP.send();
        });

        login.addEventListener("submit", (event) => {
            event.preventDefault();
            let formData = new FormData(login);
            formData.set("password", CryptoJS.MD5("jej").toString());

            let xhttp = new XMLHttpRequest();
            xhttp.onload = (event) => {
                console.log(event.target.responseText);
            };
            xhttp.open("POST", "http://<?= $_SERVER["SERVER_NAME"] ?>:<?= $_SERVER["SERVER_PORT"] ?>/profile/register_login.php", false);
            xhttp.send(formData);
        });
    });
</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regisztráció/bejelentkezés</title>
</head>
<body>
    <?php include "{$_SERVER["DOCUMENT_ROOT"]}/header/header.php"; ?>

    <form id="register" action="<?= "http://{$_SERVER["SERVER_NAME"]}:{$_SERVER["SERVER_PORT"]}/profile/register_login.php" ?>" method="post">
        <label for="username">Felhasználónév:</label>
        <input type="text" name="username" placeholder="Felhasználónév" required>
        <?php if (isset($errorMessages["username"])) echo "<span style=\"color: red\">{$errorMessages["username"]}</span>" ?>
        <label for="password">Jelszó:</label>
        <input type="password" name="password" placeholder="Jelszó" required>
        <?php if (isset($errorMessages["password"])) echo "<span style=\"color: red\">{$errorMessages["password"]}</span>" ?>
        <label for="email">E-mail cím:</label>
        <input type="email" name="email" placeholder="E-mail cím" required>
        <?php if (isset($errorMessages["email"])) echo "<span style=\"color: red\">{$errorMessages["email"]}</span>" ?>
        <label for="address">Lakcím:</label>
        <input type="text" name="address" placeholder="Lakcím" required>
        <label for="phone">Telefonszám:</label>
        <input type="text" name="phone" placeholder="Telefonszám" required>
        <input type="submit" name="register" value="Regisztráció">
    </form>
    <hr>
    <form id="login" action="<?= "http://{$_SERVER["SERVER_NAME"]}:{$_SERVER["SERVER_PORT"]}/profile/register_login.php" ?>" method="post">
        <label for="username">Felhasználónév:</label>
        <input type="text" name="username" placeholder="Felhasználónév" required>
        <label for="password">Jelszó:</label>
        <input type="password" name="password" placeholder="Jelszó" required>
        <input type="submit" name="login" value="Bejelentkezés">
    </form>

    <?php /*include "{$_SERVER["DOCUMENT_ROOT"]}/footer/footer.php";*/ ?>
</body>
</html>

<?php
}
?>