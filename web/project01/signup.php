<?php

session_start();

if (isset($_SESSION["isAuthenticated"])) {
    header("Location:app.php");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>

    <link rel="stylesheet" href="/lib/bulma.min.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>

    <link rel="stylesheet" href="/project01/style/login.css">
    <link rel="stylesheet" href="/project01/style/toast.css">
</head>

<body>
    <section class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-8-tablet is-6-widescreen">
                        <form onsubmit="return login();" class="box" name="mainForm">
                            <div class="section">
                                <div class="title">Sign up</div>
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control has-icons-left">
                                        <input name="email" type="email" class="input" required>
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-envelope"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Username</label>
                                    <div class="control has-icons-left">
                                        <input name="username" type="text" class="input" required maxlength="25">
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Password</label>
                                    <div class="control has-icons-left">
                                        <input name="password" type="password" class="input" required>
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Verify Password</label>
                                    <div class="control has-icons-left">
                                        <input name="verifyPassword" type="password" class="input" required>
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="level">
                                    <div class="level-left">
                                        <div class="level-item">
                                            <button id="login-button" class="button is-success">
                                                Sign up
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div id="error" class="notification is-danger"></div>

    <script src="/project01/scripts/utilities/util.js"></script>
    <script src="/project01/scripts/signup.js"></script>
</body>

</html>