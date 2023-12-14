<?php
if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    if (isset($_GET["API"]))
    {
        if (isset($_GET["username"]))
        {
            echo "{\"exists\":" . (checkUserExists($_GET["username"]) ? "true" : "false") . "}";
        }
    }
    else {
        displayRegisterPage();
    }
}

function checkUserExists($username)
{
    $users = json_decode(file_get_contents("{$_SERVER["DOCUMENT_ROOT"]}/profile/users.json"), true);
    foreach ($users as $user)
    {
        if ($user["username"] == $username) return true;
    }
    return false;
}

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
<script>
    let usernameXhttp = null;
    addEventListener('load', () => {
        usernameBox.addEventListener('input', () => {
            usernameBox.style.backgroundColor = "white";

            if (usernameXhttp != null) usernameXhttp.abort();
            usernameXhttp = new XMLHttpRequest();
            usernameXhttp.onload = (event) => {
                let response = JSON.parse(event.target.responseText);
                if (response.exists) {
                    usernameBox.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
                }
                else {
                    usernameBox.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
                }
                usernameXhttp = null;
            }
            usernameXhttp.open("GET", "http://<?= $_SERVER["SERVER_NAME"] ?>:<?= $_SERVER["SERVER_PORT"] ?>/profile/register_login.php?API&username=" + usernameBox.value, true);
            usernameXhttp.send();
        })
    })
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
        <input id="usernameBox" type="text" name="username" placeholder="Felhasználónév" required>
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

    <?php /*include "{$_SERVER["DOCUMENT_ROOT"]}/footer/footer.php";*/ ?>
</body>
</html>

<?php
}
?>