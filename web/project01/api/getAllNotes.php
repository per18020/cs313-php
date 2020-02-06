<?php
    error_reporting(E_ALL ^ E_WARNING);

    $input = json_decode(file_get_contents('php://input'));
    $user_id = htmlspecialchars($input->id);

    $response = new stdClass();
    $response->id = 0;
    $response->folder_id = 0;
    $response->title = "Title";
    $response->creation = "Creation";
    $response->last_edited = "Last_Edited";
    $response->data = "[]";
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

    $usersPDO = $db->prepare("SELECT * FROM public.note WHERE user_id = $user_id");
    $usersPDO->execute();
    
    while ($row = $usersPDO->fetch(PDO::FETCH_ASSOC)) {
        $response->id = $row["id"];
        $response->folder_id = $row["folder_id"];
        $response->title = $row["title"];
        $response->creation = $row["creation"];
        $response->last_edited = $row["last_edited"];
        $response->data = $row["data"];
    }

    echo json_encode($response);
?>