<?php
    error_reporting(E_ALL ^ E_WARNING);

    $input = json_decode(file_get_contents('php://input'));
    $user_id = htmlspecialchars($input->id);

    $response = new stdClass();
    $response->email = "email";
    $response->error = false;

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

    $usersPDO = $db->prepare("SELECT email FROM public.user WHERE id = $user_id");
    $usersPDO->execute();
    
    while ($row = $usersPDO->fetch(PDO::FETCH_ASSOC)) {
        $response->email = $row["email"];
    }

    echo json_encode($response);
?>