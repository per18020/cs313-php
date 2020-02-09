<?php
    // error_reporting(0); // Turn off error reporting. I'll handle my own errors with json

    $input = json_decode(file_get_contents('php://input'));
    $email = htmlspecialchars($input->email);
    $password = htmlspecialchars($input->password);

    $response = new stdClass();
    $response->error = false;
    $response->authenticated = false;
    $response->user = new stdClass();

    $email = "thefloatingtree@gmail.com";
    $password = "oatmeal";

    $db = NULL;

    // necessary to catch errors thrown from other requried files
    function exception_error_handler($errno, $errstr, $errfile, $errline ) {
        throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
    }
    set_error_handler("exception_error_handler");

    // if db doesn't exist
    try {
        require "dbConnect.php";
        $db = get_db();
    } catch (Exception $e) {
        $response->error = true;
        echo json_encode($response);
        exit;
    }

    $usersPDO = $db->prepare("SELECT * FROM public.user WHERE email = $email AND password = $password");
    $usersPDO->execute();
    
    while ($row = $usersPDO->fetch(PDO::FETCH_ASSOC)) {
        $response->user->id = $row["id"];
        $response->user->email = $row["email"];
        $response->user->username = $row["username"];
        $response->authenticated = true;
    }

    echo json_encode($response);
?>