<?php

    session_start();

    if (isset($_SESSION["isAuthenticated"])) {
        echo $_SESSION["isAuthenticated"];
    } else {
        $error = new stdClass();
        $error->error = true;
        $error->authenticated = false;

        echo json_encode($error);
    }

    

?>